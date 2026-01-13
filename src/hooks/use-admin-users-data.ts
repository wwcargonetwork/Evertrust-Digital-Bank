
'use client';

import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase, WithId } from '@/firebase';

// Define the shape of the user profile data for this page
export type UserProfile = WithId<{
  displayName: string;
  email: string;
  accountType: string;
  createdAt: { toDate: () => Date };
}>;

interface UseAdminUsersDataResult {
  users: UserProfile[] | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch all user profiles for the admin users page.
 * @returns An object containing the users, loading state, and any errors.
 */
export function useAdminUsersData(): UseAdminUsersDataResult {
  const firestore = useFirestore();

  // Memoize the query to prevent re-running on every render
  const usersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    // Create a query to get all documents from the 'users' collection, ordered by creation date
    return query(collection(firestore, 'users'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  // Use the useCollection hook to get real-time data
  const { data: users, isLoading, error } = useCollection<UserProfile>(usersQuery);

  return { users, isLoading, error };
}
