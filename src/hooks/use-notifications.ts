
'use client';

import { useState, useEffect, useCallback } from 'react';
import { collection, query, orderBy, limit, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { useFirestore, useUser, useMemoFirebase, WithId, updateDocumentNonBlocking } from '@/firebase';

export type Notification = WithId<{
  title: string;
  message: string;
  link: string;
  isRead: boolean;
  createdAt: { toDate: () => Date };
}>;

interface UseNotificationsResult {
  notifications: Notification[] | null;
  unreadCount: number;
  isLoading: boolean;
  markAsRead: (notificationId: string) => void;
}

export function useNotifications(notificationLimit: number = 10): UseNotificationsResult {
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const [notifications, setNotifications] = useState<Notification[] | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const notificationsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    const notificationsPath = `users/${user.uid}/notifications`;
    return query(
      collection(firestore, notificationsPath),
      orderBy('createdAt', 'desc'),
      limit(notificationLimit)
    );
  }, [firestore, user, notificationLimit]);

  useEffect(() => {
    if (!notificationsQuery) {
      setIsLoading(isUserLoading);
      return;
    }
    
    setIsLoading(true);

    const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
      const fetchedNotifications = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          createdAt: data.createdAt?.toDate() ?? new Date(),
        } as Notification;
      });
      
      setNotifications(fetchedNotifications);
      
      const newUnreadCount = fetchedNotifications.filter(n => !n.isRead).length;
      setUnreadCount(newUnreadCount);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching notifications:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [notificationsQuery, isUserLoading]);

  const markAsRead = useCallback((notificationId: string) => {
    if (!firestore || !user) return;
    const notifRef = doc(firestore, 'users', user.uid, 'notifications', notificationId);
    updateDocumentNonBlocking(notifRef, { isRead: true });
  }, [firestore, user]);

  return { notifications, unreadCount, isLoading, markAsRead };
}
