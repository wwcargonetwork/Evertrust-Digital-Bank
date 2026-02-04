
'use server'

import { z } from 'zod'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase/config';
import { getApp, getApps } from 'firebase/app';

export async function applyForCard(userId: string, cardType: string) {
    if (!userId || !cardType) {
        return { success: false, message: 'User ID and card type are required.' };
    }
    try {
        const app = getApps().length ? getApp() : initializeFirebase();
        const db = getFirestore(app);

        // This is a simplified action. In a real app, you might create a more detailed application document.
        // Here, we'll create a notification for an admin.
        // We're assuming there's an `admins` collection and a known admin ID.
        // For this example, we'll create a notification in a general `admin_notifications` collection.
        
        // This is a placeholder. In a real app, you'd target specific admin users.
        const adminNotificationRef = collection(db, 'admin_notifications');
        await addDoc(adminNotificationRef, {
            type: 'card_application',
            userId: userId,
            cardType: cardType,
            message: `User ${userId} has applied for the ${cardType} card.`,
            createdAt: serverTimestamp(),
            isRead: false,
        });

        return { success: true, message: `Your application for ${cardType} has been submitted for review.` };
    } catch (error) {
        console.error('Error applying for card:', error);
        return { success: false, message: 'There was an error submitting your application. Please try again.' };
    }
}
