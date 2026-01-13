'use client';

import { useEffect, useState } from 'react';
import { collection, collectionGroup, getDocs, query, where } from 'firebase/firestore';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { WithId } from '@/firebase/firestore/use-collection';
import { format, getMonth } from 'date-fns';

// Re-exporting for clarity, but they should be the same as in other hooks
export type { UserProfile, UserStatus } from './use-admin-users-data';
export type { Transaction } from './use-admin-transactions-data';

import type { UserProfile, Transaction } from './use-admin-analytics-data';


// Shape for monthly aggregated data
export interface MonthlyData {
  month: string; // e.g., "Jan", "Feb"
  users: number;
  volume: number;
}

export interface AccountTypeDistribution {
    name: string;
    value: number;
}

// Shape of the data returned by the hook
interface AnalyticsData {
  monthlyData: MonthlyData[];
  accountTypeDistribution: AccountTypeDistribution[];
  totalUsers: number;
  totalRevenue: number;
}

interface UseAdminAnalyticsDataResult {
  data: AnalyticsData | null;
  isLoading: boolean;
  error: Error | null;
}

export function useAdminAnalyticsData(): UseAdminAnalyticsDataResult {
  const firestore = useFirestore();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const usersRef = useMemoFirebase(() => collection(firestore, 'users'), [firestore]);
  const transactionsGroupRef = useMemoFirebase(() => collectionGroup(firestore, 'transactions'), [firestore]);

  useEffect(() => {
    if (!usersRef || !transactionsGroupRef) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [usersSnapshot, transactionsSnapshot] = await Promise.all([
          getDocs(usersRef),
          getDocs(query(transactionsGroupRef, where('status', '==', 'approved'))),
        ]);

        const users = usersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as UserProfile));
        const transactions = transactionsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Transaction));
        
        // --- Process Monthly Data ---
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthlyAgg: MonthlyData[] = monthNames.map(m => ({ month: m, users: 0, volume: 0 }));

        users.forEach(user => {
            const month = getMonth(user.createdAt.toDate());
            monthlyAgg[month].users += 1;
        });

        transactions.forEach(tx => {
            if (tx.createdAt && typeof tx.createdAt === 'object' && 'toDate' in tx.createdAt) {
                const month = getMonth(tx.createdAt.toDate());
                monthlyAgg[month].volume += tx.amount;
            }
        });

        // --- Process Account Type Distribution ---
        const accountCounts: { [key: string]: number } = {};
        users.forEach(user => {
          const type = user.accountType || 'Other';
          accountCounts[type] = (accountCounts[type] || 0) + 1;
        });
        const accountTypeDistribution = Object.entries(accountCounts).map(([name, value]) => ({ name, value }));

        // --- Totals ---
        const totalUsers = users.length;
        const totalRevenue = transactions.reduce((acc, tx) => acc + tx.amount, 0);

        setData({
          monthlyData: monthlyAgg,
          accountTypeDistribution,
          totalUsers,
          totalRevenue,
        });

      } catch (err) {
        console.error("Error fetching admin analytics data:", err);
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

  }, [usersRef, transactionsGroupRef]);

  return { data, isLoading, error };
}
