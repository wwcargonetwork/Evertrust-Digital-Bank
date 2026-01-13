'use client';

import { useEffect, useState, useCallback } from 'react';
import { collection, query, orderBy, onSnapshot, getDocs, collectionGroup, doc, writeBatch, increment } from 'firebase/firestore';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { WithId } from '@/firebase/firestore/use-collection';
import { UserProfile } from './use-admin-users-data';

// Define type for Transaction, reusing UserProfile
export type Transaction = WithId<{
  userId: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
  status: 'approved' | 'pending' | 'declined';
  createdAt: string | Date; // Can be a string from server or Date object after conversion
  user?: Pick<UserProfile, 'displayName' | 'email'>; // Optional: enriched data
}>;

interface UseAdminTransactionsResult {
  transactions: Transaction[] | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch all transactions for the admin page, enriched with user data.
 * @returns An object containing transactions, loading state, and any errors.
 */
export function useAdminTransactionsData(): UseAdminTransactionsResult {
  const firestore = useFirestore();
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const transactionsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collectionGroup(firestore, 'transactions'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const usersRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'users');
  }, [firestore]);

  useEffect(() => {
    if (!transactionsQuery || !usersRef) {
        setIsLoading(false);
        return;
    }

    let isMounted = true;
    let unsubscribe: (() => void) | undefined;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch all users once to create a lookup map
        const usersSnapshot = await getDocs(usersRef);
        const usersMap = new Map<string, Pick<UserProfile, 'displayName' | 'email'>>();
        usersSnapshot.forEach(doc => {
          const userData = doc.data();
          usersMap.set(doc.id, {
            displayName: userData.displayName,
            email: userData.email,
          });
        });
        
        // Set up the real-time listener for transactions
        unsubscribe = onSnapshot(transactionsQuery, (snapshot) => {
          if (!isMounted) return;

          const enrichedTransactions = snapshot.docs.map(doc => {
            const userId = doc.ref.parent.parent!.id; // Get userId from parent document path
            const txData = { ...doc.data(), id: doc.id, userId, createdAt: doc.data().createdAt.toDate() } as Transaction;
            const user = usersMap.get(userId);
            if (user) {
              txData.user = user;
            }
            return txData;
          });

          setTransactions(enrichedTransactions);
          setError(null);
          setIsLoading(false);
        }, (err) => {
          if (isMounted) {
            console.error("Error fetching transactions:", err);
            setError(err);
            setIsLoading(false);
          }
        });

      } catch (err) {
        if (isMounted) {
          console.error("Error fetching initial user data:", err);
          setError(err instanceof Error ? err : new Error("An unknown error occurred"));
          setIsLoading(false);
        }
      }
    };
    
    fetchData();

    return () => {
      isMounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [transactionsQuery, usersRef]);

  return { transactions, isLoading, error };
}

export function useTransactionActions() {
  const firestore = useFirestore();
  const [isUpdating, setIsUpdating] = useState(false);

  const approveTransaction = useCallback(async (tx: Transaction) => {
    if (!firestore) return;
    setIsUpdating(true);
    try {
      const batch = writeBatch(firestore);
      const userDocRef = doc(firestore, 'users', tx.userId);
      const txDocRef = doc(userDocRef, 'transactions', tx.id);
      
      // Update transaction status
      batch.update(txDocRef, { status: 'approved' });

      // Update user balance
      const amount = tx.type === 'deposit' ? tx.amount : -tx.amount;
      batch.update(userDocRef, { accountBalance: increment(amount) });
      
      await batch.commit();
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
      const txDocRef = doc(firestore, 'users', tx.userId, 'transactions', tx.id);
      await writeBatch(firestore).update(txDocRef, { status: 'declined' }).commit();
    } catch (error) {
      console.error("Failed to decline transaction:", error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  }, [firestore]);

  return { approveTransaction, declineTransaction, isUpdating };
}
