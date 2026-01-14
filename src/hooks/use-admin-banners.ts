
'use client';

import { collection } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase';
import type { Banner } from '@/types';
import { doc } from 'firebase/firestore';

interface UseAdminBannersResult {
  banners: Banner[];
  isLoading: boolean;
  error: Error | null;
  addBanner: (banner: Omit<Banner, 'id'>) => Promise<void>;
  deleteBanner: (id: string) => Promise<void>;
}

export function useAdminBanners(): UseAdminBannersResult {
  const firestore = useFirestore();

  const bannersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'banners');
  }, [firestore]);

  const { data, isLoading, error } = useCollection<Banner>(bannersQuery);

  const addBanner = async (banner: Omit<Banner, 'id'>) => {
    if (!bannersQuery) throw new Error("Firestore not initialized");
    await addDocumentNonBlocking(bannersQuery, banner);
  };

  const deleteBanner = async (id: string) => {
    if (!firestore) throw new Error("Firestore not initialized");
    const bannerDocRef = doc(firestore, 'banners', id);
    await deleteDocumentNonBlocking(bannerDocRef);
  };
  
  return { 
    banners: data || [], 
    isLoading, 
    error, 
    addBanner, 
    deleteBanner 
  };
}
