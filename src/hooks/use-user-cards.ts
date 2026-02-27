
'use client';

import { useState, useEffect, useCallback } from 'react';
import { collection, query, orderBy, serverTimestamp, doc, writeBatch, increment } from 'firebase/firestore';
import { useFirestore, useUser, useMemoFirebase, WithId, useCollection, addDocumentNonBlocking } from '@/firebase';

export type UserCard = WithId<{
  type: 'debit' | 'credit' | 'virtual';
  nameOnCard: string;
  cardNumber: string;
  expiryDate: string;
  status: 'active' | 'blocked' | 'pending';
  brand: 'visa' | 'mastercard' | 'amex';
  createdAt: any;
  price?: number;
}>;

interface UseUserCardsResult {
  cards: UserCard[] | null;
  isLoading: boolean;
  error: Error | null;
  purchaseCard: (cardDetails: Omit<UserCard, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  addOwnCard: (cardDetails: Omit<UserCard, 'id' | 'createdAt' | 'status'>) => Promise<void>;
}

export function useUserCards(): UseUserCardsResult {
  const firestore = useFirestore();
  const { user } = useUser();

  const cardsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, `users/${user.uid}/cards`),
      orderBy('createdAt', 'desc')
    );
  }, [firestore, user]);

  const { data: cards, isLoading, error } = useCollection<UserCard>(cardsQuery);

  const purchaseCard = useCallback(async (cardDetails: Omit<UserCard, 'id' | 'createdAt' | 'status'>) => {
    if (!firestore || !user) return;

    const batch = writeBatch(firestore);
    const userDocRef = doc(firestore, 'users', user.uid);
    const cardRef = doc(collection(userDocRef, 'cards'));
    const txRef = doc(collection(userDocRef, 'transactions'));

    const price = cardDetails.price || 0;

    // Create the card
    batch.set(cardRef, {
      ...cardDetails,
      status: 'pending',
      createdAt: serverTimestamp(),
    });

    // Create a transaction record
    if (price > 0) {
        batch.set(txRef, {
            amount: price,
            type: 'sale',
            status: 'approved',
            description: `Card Purchase: ${cardDetails.nameOnCard} (${cardDetails.type})`,
            createdAt: serverTimestamp(),
        });

        // Deduct from balance
        batch.update(userDocRef, {
            accountBalance: increment(-price)
        });
    }

    await batch.commit();
  }, [firestore, user]);

  const addOwnCard = useCallback(async (cardDetails: Omit<UserCard, 'id' | 'createdAt' | 'status'>) => {
    if (!firestore || !user) return;

    const cardsColRef = collection(firestore, `users/${user.uid}/cards`);
    
    await addDocumentNonBlocking(cardsColRef, {
      ...cardDetails,
      status: 'active',
      createdAt: serverTimestamp(),
    });
  }, [firestore, user]);

  return { 
    cards, 
    isLoading, 
    error, 
    purchaseCard, 
    addOwnCard 
  };
}
