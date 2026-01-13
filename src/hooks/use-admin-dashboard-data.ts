'use client';

import { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs, onSnapshot, where, doc as firestoreDoc, collectionGroup } from 'firebase/firestore';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { WithId } from '@/firebase/firestore/use-collection';

// Define types for our data
export type UserProfile = WithId<{
  displayName: string;
  email: string;
  createdAt: { toDate: () => Date };
}>;

export type Transaction = WithId<{
  userId: string;
  amount: number;
  type: string;
  status: 'approved' | 'pending' | 'declined';
  createdAt: string | Date; // Can be a string or Date object
  user?: UserProfile; // Optional: enriched data
}>;

// The shape of the data returned by the hook
interface DashboardData {
  totalRevenue: number;
  revenueChange: string;
  totalUsers: number;
  userChange: string;
  totalTransactions: number;
  transactionChange: string;
  recentTransactions: Transaction[];
  recentUsers: UserProfile[];
}

interface UseAdminDashboardDataResult {
  data: DashboardData | null;
  isLoading: boolean;
  error: Error | null;
}

export function useAdminDashboardData(): UseAdminDashboardDataResult {
  const firestore = useFirestore();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Memoize collection references
  const usersRef = useMemoFirebase(() => collection(firestore, 'users'), [firestore]);
  const transactionsGroupRef = useMemoFirebase(() => collectionGroup(firestore, 'transactions'), [firestore]);

  useEffect(() => {
    if (!usersRef || !transactionsGroupRef) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Queries for recent data
        const recentUsersQuery = query(usersRef, orderBy('createdAt', 'desc'), limit(5));
        const recentTransactionsQuery = query(transactionsGroupRef, orderBy('createdAt', 'desc'), limit(5));
        
        // Fetch all data in parallel
        const [
          allUsersSnapshot, 
          allTransactionsSnapshot,
          recentUsersSnapshot, 
          recentTransactionsSnapshot
        ] = await Promise.all([
          getDocs(usersRef),
          getDocs(query(transactionsGroupRef, where('status', '==', 'approved'))),
          getDocs(recentUsersQuery),
          getDocs(recentTransactionsQuery)
        ]);
        
        // Process totals
        const totalUsers = allUsersSnapshot.size;
        const totalRevenue = allTransactionsSnapshot.docs.reduce((acc, doc) => acc + doc.data().amount, 0);
        const totalTransactions = allTransactionsSnapshot.size;

        // Process recent users
        const recentUsers = recentUsersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as UserProfile));

        // Create a map of all users for quick lookup
        const allUsersMap = new Map<string, UserProfile>();
        allUsersSnapshot.docs.forEach(doc => {
            allUsersMap.set(doc.id, { ...doc.data(), id: doc.id } as UserProfile);
        });

        // Process recent transactions and enrich with user data
        const recentTransactions: Transaction[] = recentTransactionsSnapshot.docs.map(doc => {
            const userId = doc.ref.parent.parent!.id; // Get userId from parent document path
            const txData = { ...doc.data(), id: doc.id, userId, createdAt: doc.data().createdAt.toDate() } as Transaction;
            const user = allUsersMap.get(txData.userId);
            if(user){
               txData.user = user;
            }
            return txData;
          });
        
        setData({
          totalUsers,
          totalRevenue,
          totalTransactions,
          recentUsers,
          recentTransactions,
          // Placeholder values for changes
          revenueChange: '+20.1%', 
          userChange: '+18.3%',
          transactionChange: '+19.0%',
        });

      } catch (err) {
        console.error("Error fetching admin dashboard data:", err);
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

  }, [usersRef, transactionsGroupRef]);

  return { data, isLoading, error };
}
