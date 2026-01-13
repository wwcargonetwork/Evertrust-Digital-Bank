
'use client';

import { useState, useEffect, useCallback } from 'react';
import { collection, query, where, onSnapshot, addDoc, updateDoc, doc, serverTimestamp, getDocs, limit, orderBy } from 'firebase/firestore';
import { useFirestore, useUser, useMemoFirebase, WithId } from '@/firebase';

export type Message = WithId<{
    text: string;
    senderId: string;
    senderType: 'user' | 'admin';
    createdAt: any; // Firestore Timestamp
}>;

export type Conversation = WithId<{
    userId: string;
    userName: string;
    lastMessage: string;
    lastUpdatedAt: any;
    isReadByUser: boolean;
    isReadByAdmin: boolean;
}>;

export function useUserConversation() {
    const firestore = useFirestore();
    const { user } = useUser();
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const conversationQuery = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return query(collection(firestore, 'conversations'), where('userId', '==', user.uid), limit(1));
    }, [firestore, user]);

    useEffect(() => {
        if (!conversationQuery) {
            setIsLoading(false);
            return;
        }

        const unsubscribe = onSnapshot(conversationQuery, (snapshot) => {
            if (!snapshot.empty) {
                const convoDoc = snapshot.docs[0];
                const convoData = { ...convoDoc.data(), id: convoDoc.id } as Conversation;
                setConversation(convoData);
            } else {
                setConversation(null);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [conversationQuery]);


    useEffect(() => {
        if (!conversation) {
            setMessages([]);
            return;
        }

        const messagesQuery = query(collection(firestore, `conversations/${conversation.id}/messages`), orderBy('createdAt', 'asc'));
        
        const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
            const messagesData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Message));
            setMessages(messagesData);
        });
        
        // Mark as read by user
        const convoRef = doc(firestore, 'conversations', conversation.id);
        updateDoc(convoRef, { isReadByUser: true });

        return () => unsubscribeMessages();
    }, [conversation, firestore]);

    const sendMessage = useCallback(async (message: Omit<Message, 'id' | 'createdAt'>) => {
        if (!firestore || !user) return;

        let currentConversation = conversation;

        if (!currentConversation) {
            // Create a new conversation if one doesn't exist
            const newConvoRef = await addDoc(collection(firestore, 'conversations'), {
                userId: user.uid,
                userName: user.displayName || user.email,
                lastMessage: message.text,
                lastUpdatedAt: serverTimestamp(),
                isReadByUser: true,
                isReadByAdmin: false
            });
            currentConversation = { id: newConvoRef.id, userId: user.uid, userName: user.displayName || user.email || '', lastMessage: '', lastUpdatedAt: null, isReadByUser: true, isReadByAdmin: false };
            setConversation(currentConversation);
        }

        const messagesColRef = collection(firestore, `conversations/${currentConversation.id}/messages`);
        await addDoc(messagesColRef, {
            ...message,
            createdAt: serverTimestamp()
        });

        const conversationRef = doc(firestore, 'conversations', currentConversation.id);
        await updateDoc(conversationRef, {
            lastMessage: message.text,
            lastUpdatedAt: serverTimestamp(),
            isReadByUser: true,
            isReadByAdmin: false,
        });

    }, [firestore, user, conversation]);

    return { conversation, messages, isLoading, sendMessage };
}
