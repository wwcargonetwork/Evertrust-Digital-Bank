
'use client';

import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase, WithId, useUser } from '@/firebase';
import { useState, useEffect } from 'react';

// Define the shape of the transaction data
export type UserTransaction = WithId<{
  amount: number;
  type: string;
  status: 'approved' | 'pending' | 'declined';
  createdAt: { toDate: () => Date };
}>;

interface UseUserTransactionsResult {
  transactions: UserTransaction[] | null;
  isLoading: boolean;
  error: Error | null;
  pendingTransactionsCount: number;
}

/**
 * Hook to fetch the most recent transactions for the currently logged-in user.
 * @param {number} transactionLimit - The maximum number of transactions to fetch.
 * @returns An object containing the transactions, loading state, and any errors.
 */
export function useUserTransactions(transactionLimit?: number): UseUserTransactionsResult {
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const [pendingTransactionsCount, setPendingTransactionsCount] = useState(0);

  // Memoize the query to prevent re-running on every render.
  // The query depends on the user's UID, so it will be re-created if the user changes.
  const transactionsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;

    // Path to the subcollection: /users/{userId}/transactions
    const transactionsPath = `users/${user.uid}/transactions`;
    
    if (transactionLimit) {
        return query(
            collection(firestore, transactionsPath),
            orderBy('createdAt', 'desc'),
            limit(transactionLimit)
        );
    }
    return query(
      collection(firestore, transactionsPath),
      orderBy('createdAt', 'desc')
    );

  }, [firestore, user, transactionLimit]);

  // The useCollection hook handles real-time data fetching, loading, and error states.
  // The loading state will also depend on the user's authentication state.
  const { data: transactions, isLoading: isCollectionLoading, error } = useCollection<UserTransaction>(transactionsQuery);

  useEffect(() => {
    if (transactions) {
      const pendingCount = transactions.filter(tx => tx.status === 'pending').length;
      setPendingTransactionsCount(pendingCount);
    }
  }, [transactions]);


  return { 
    transactions, 
    isLoading: isUserLoading || isCollectionLoading, 
    error,
    pendingTransactionsCount,
  };
}
