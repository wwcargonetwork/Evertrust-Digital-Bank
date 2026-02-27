
'use client';

import { useEffect, useState, useCallback } from 'react';
import { collection, query, orderBy, onSnapshot, getDocs, doc, writeBatch, increment, serverTimestamp } from 'firebase/firestore';
import { useFirestore, useMemoFirebase, addDocumentNonBlocking } from '@/firebase';
import { WithId } from '@/firebase/firestore/use-collection';
import { UserProfile } from './use-admin-users-data';

// Define type for Transaction, reusing UserProfile
export type Transaction = WithId<{
  userId: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'sale' | 'refund';
  status: 'approved' | 'pending' | 'declined';
  createdAt: any; // Can be a string from server or Date object after conversion
  description: string;
  recipient?: string;
  user?: Pick<UserProfile, 'displayName' | 'email'>; // Optional: enriched data
}>;


interface UseAdminTransactionsResult {
  transactions: Transaction[] | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch all transactions for the admin page, enriched with user data.
 * This hook first fetches all users, then sets up individual listeners for each user's
 * transactions sub-collection.
 * @returns An object containing transactions, loading state, and any errors.
 */
export function useAdminTransactionsData(): UseAdminTransactionsResult {
  const firestore = useFirestore();
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const usersRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'users');
  }, [firestore]);

  useEffect(() => {
    if (!usersRef) {
      setIsLoading(false);
      return;
    }

    const unsubs: (() => void)[] = [];
    let isMounted = true;

    const fetchAllTransactions = async () => {
      setIsLoading(true);
      try {
        const usersSnapshot = await getDocs(usersRef);
        if (!isMounted) return;

        const allUsers = usersSnapshot.docs.map(d => ({ ...d.data(), id: d.id } as UserProfile));
        const userMap = new Map(allUsers.map(u => [u.id, { displayName: u.displayName, email: u.email }]));
        let allTransactions: Transaction[] = [];
        let listenersAttached = 0;

        if (allUsers.length === 0) {
            setTransactions([]);
            setIsLoading(false);
            return;
        }

        allUsers.forEach(user => {
          const transactionsQuery = query(collection(firestore, `users/${user.id}/transactions`), orderBy('createdAt', 'desc'));
          
          const unsubscribe = onSnapshot(transactionsQuery, (snapshot) => {
            if (!isMounted) return;

            const userTransactions = snapshot.docs.map(d => ({
              ...(d.data() as Omit<Transaction, 'id' | 'user' | 'userId'>),
              id: d.id,
              userId: user.id,
              user: userMap.get(user.id),
              createdAt: d.data().createdAt?.toDate() ?? new Date(),
            }));
            
            // This logic replaces the transactions for a specific user while keeping others
            allTransactions = allTransactions.filter(t => t.userId !== user.id).concat(userTransactions);

            // Sort all transactions by date after each update
            allTransactions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
            
            setTransactions([...allTransactions]);
            setError(null);
          }, (err) => {
            console.error(`Error fetching transactions for user ${user.id}:`, err);
            setError(err); // Consider how to handle partial errors
          });

          unsubs.push(unsubscribe);
        });

        // Set initial loading to false after setting up listeners
        setIsLoading(false);

      } catch (err) {
        if (isMounted) {
          console.error("Error fetching initial user data:", err);
          setError(err instanceof Error ? err : new Error("An unknown error occurred"));
          setIsLoading(false);
        }
      }
    };
    
    fetchAllTransactions();

    return () => {
      isMounted = false;
      unsubs.forEach(unsub => unsub());
    };
  }, [usersRef, firestore]);

  return { transactions, isLoading, error };
}


export function useTransactionActions() {
  const firestore = useFirestore();
  const [isUpdating, setIsUpdating] = useState(false);

  const createNotification = (userId: string, title: string, message: string) => {
      const notificationColRef = collection(firestore, `users/${userId}/notifications`);
      const notification = {
        title,
        message,
        link: "/dashboard/transactions",
        isRead: false,
        createdAt: serverTimestamp(),
      };
      addDocumentNonBlocking(notificationColRef, notification);
  };

  const approveTransaction = useCallback(async (tx: Transaction) => {
    if (!firestore) return;
    setIsUpdating(true);
    try {
      const batch = writeBatch(firestore);
      const userDocRef = doc(firestore, 'users', tx.userId);
      const txDocRef = doc(userDocRef, 'transactions', tx.id);
      
      // Update transaction status
      batch.update(txDocRef, { status: 'approved' });

      // Update user balance ONLY if it's NOT a withdrawal.
      // Withdrawals are now deducted upon creation when pending.
      // Deposits and refunds are added upon approval.
      if (tx.type === 'deposit' || tx.type === 'refund') {
        batch.update(userDocRef, { accountBalance: increment(tx.amount) });
      }
      
      await batch.commit();

      createNotification(tx.userId, "Transaction Approved", `Your ${tx.type} of ${tx.amount} was approved.`);

    } catch (error) {
      console.error("Failed to approve transaction:", error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  }, [firestore]);

  const declineTransaction = useCallback(async (tx: Transaction) => {
    if (!firestore) return;
    setIsUpdating(true);
    try {
      const batch = writeBatch(firestore);
      const userDocRef = doc(firestore, 'users', tx.userId);
      const txDocRef = doc(userDocRef, 'transactions', tx.id);
      
      // Update transaction status
      batch.update(txDocRef, { status: 'declined' });

      // If it was a withdrawal (or similar outgoing fund), refund the balance 
      // because it was already deducted when the transaction was created as 'pending'.
      if (tx.type === 'withdrawal' || tx.type === 'transfer' || tx.type === 'sale') {
        batch.update(userDocRef, { accountBalance: increment(tx.amount) });
      }
      
      await batch.commit();
      
      createNotification(tx.userId, "Transaction Declined", `Your ${tx.type} of ${tx.amount} was declined and funds restored.`);

    } catch (error) {
      console.error("Failed to decline transaction:", error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  }, [firestore]);

  return { approveTransaction, declineTransaction, isUpdating };
}
