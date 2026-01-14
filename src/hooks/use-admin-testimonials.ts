
'use client';

import { collection, doc } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase';
import type { Testimonial } from '@/types';

interface UseAdminTestimonialsResult {
  testimonials: Testimonial[];
  isLoading: boolean;
  error: Error | null;
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
}

export function useAdminTestimonials(): UseAdminTestimonialsResult {
  const firestore = useFirestore();

  const testimonialsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'testimonials');
  }, [firestore]);

  const { data, isLoading, error } = useCollection<Testimonial>(testimonialsQuery);

  const addTestimonial = async (testimonial: Omit<Testimonial, 'id'>) => {
    if (!testimonialsQuery) throw new Error("Firestore not initialized");
    await addDocumentNonBlocking(testimonialsQuery, testimonial);
  };

  const deleteTestimonial = async (id: string) => {
    if (!firestore) throw new Error("Firestore not initialized");
    const testimonialDocRef = doc(firestore, 'testimonials', id);
    await deleteDocumentNonBlocking(testimonialDocRef);
  };
  
  return { 
    testimonials: data || [], 
    isLoading, 
    error,
    addTestimonial,
    deleteTestimonial
  };
}
