
'use client';

import { useEffect, useState, useCallback } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useFirestore, useMemoFirebase, WithId, useAuth } from '@/firebase';

export type Conversation = WithId<{
  userId: string;
  userName: string;
  lastMessage: string;
  lastUpdatedAt: any; // Firestore Timestamp
  isReadByUser: boolean;
  isReadByAdmin: boolean;
}>;

export type UserProfile = WithId<{
  displayName: string;
}>;

export type ConversationWithUserData = Conversation & { user?: UserProfile };

export type Message = WithId<{
    text: string;
    senderId: string;
    senderType: 'user' | 'admin';
    createdAt: any; // Firestore Timestamp
}>;

export function useAdminConversations() {
    const firestore = useFirestore();
    const [conversations, setConversations] = useState<ConversationWithUserData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const convosQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'conversations'), orderBy('lastUpdatedAt', 'desc'));
    }, [firestore]);

    useEffect(() => {
        if (!convosQuery) {
            setIsLoading(false);
            return;
        }

        const unsubscribe = onSnapshot(convosQuery, (snapshot) => {
            const convosData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as ConversationWithUserData));
            setConversations(convosData);
            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching conversations: ", error);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [convosQuery]);

    return { conversations, isLoading };
}

export function useConversationMessages(conversationId: string | null) {
    const firestore = useFirestore();
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const messagesQuery = useMemoFirebase(() => {
        if (!firestore || !conversationId) return null;
        return query(collection(firestore, `conversations/${conversationId}/messages`), orderBy('createdAt', 'asc'));
    }, [firestore, conversationId]);

    useEffect(() => {
        if (!messagesQuery) {
            setMessages([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            const messagesData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Message));
            setMessages(messagesData);
            setIsLoading(false);
        }, (error) => {
            console.error(`Error fetching messages for conversation ${conversationId}: `, error);
            setIsLoading(false);
        });

        // Mark as read by admin when conversation is opened
        if(conversationId) {
            const convoRef = doc(firestore, 'conversations', conversationId);
            updateDoc(convoRef, { isReadByAdmin: true });
        }


        return () => unsubscribe();
    }, [messagesQuery, conversationId, firestore]);

    const sendMessage = useCallback(async (message: Omit<Message, 'id' | 'createdAt'>) => {
        if (!firestore || !conversationId) return;

        const messagesColRef = collection(firestore, `conversations/${conversationId}/messages`);
        const conversationRef = doc(firestore, 'conversations', conversationId);

        // Add the new message to the subcollection
        await addDoc(messagesColRef, {
            ...message,
            createdAt: serverTimestamp()
        });

        // Update the parent conversation document
        await updateDoc(conversationRef, {
            lastMessage: message.text,
            lastUpdatedAt: serverTimestamp(),
            isReadByUser: false, // Mark as unread for the user
            isReadByAdmin: true, // Admin has just sent it, so it's read by admin
        });

    }, [firestore, conversationId]);

    return { messages, isLoading, sendMessage };
}
