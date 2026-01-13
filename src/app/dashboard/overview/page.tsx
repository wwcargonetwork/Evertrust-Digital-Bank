'use client';

import * as React from 'react';
import { useUser, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, User, Shield, Bell, Landmark, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

// Define the shape of the user profile data
interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    accountType: string;
    preferredCurrency: string;
    accountBalance: number;
}

const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

export default function OverviewPage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const firestore = useFirestore();

    // Memoize the document reference to prevent re-renders
    const userDocRef = useMemoFirebase(() => {
        if (!user) return null;
        return doc(firestore, 'users', user.uid);
    }, [firestore, user]);

    const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);

    // Redirect to signin if not logged in
    React.useEffect(() => {
        if (!isUserLoading && !user) {
            router.replace('/signin');
        }
    }, [user, isUserLoading, router]);

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency.toUpperCase(),
        }).format(amount);
    }

    // Show a loading state while user or profile is being fetched
    if (isUserLoading || isProfileLoading || !user) {
        return (
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <Skeleton className="h-12 w-1/2 mb-4 sm:mb-0" />
                    <Skeleton className="h-16 w-16 rounded-full" />
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card><CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader><CardContent><Skeleton className="h-10 w-3/4" /></CardContent></Card>
                    <Card><CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader><CardContent><Skeleton className="h-10 w-3/4" /></CardContent></Card>
                    <Card><CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader><CardContent><Skeleton className="h-10 w-3/4" /></CardContent></Card>
                </div>
            </div>
        );
    }
    
    if (!userProfile) {
        return (
            <div className="flex flex-col items-center justify-center text-center">
                 <Landmark className="h-16 w-16 text-primary mb-4" />
                <h1 className="font-headline text-2xl font-bold text-primary">Profile Not Found</h1>
                <p className="mt-2 text-lg text-muted-foreground">We couldn't load your user profile. Please contact support if this issue persists.</p>
            </div>
        )
    }

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    return (
        <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <div>
                    <h1 className="font-headline text-3xl font-bold text-primary sm:text-4xl">
                        Welcome Back, {userProfile.firstName}!
                    </h1>
                    <p className="mt-2 text-lg text-muted-foreground">Here’s a summary of your account.</p>
                </div>
                 <Avatar className="h-16 w-16 mt-4 sm:mt-0">
                    <AvatarImage src={user?.photoURL || ''} alt={`${userProfile.firstName} ${userProfile.lastName}`} />
                    <AvatarFallback>{getInitials(userProfile.firstName, userProfile.lastName)}</AvatarFallback>
                </Avatar>
            </motion.div>

            <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="shadow-sm hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="font-headline text-xl text-primary">Current Balance</CardTitle>
                        <DollarSign className="h-6 w-6 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">
                            {formatCurrency(userProfile.accountBalance || 0, userProfile.preferredCurrency)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {userProfile.accountType} Account
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="font-headline text-xl text-primary">Quick Actions</CardTitle>
                        <CardDescription>Manage your account efficiently.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-3">
                        <Button variant="outline" className="justify-start" onClick={() => router.push('/dashboard/transactions')}>
                            <ArrowRight className="mr-2 h-4 w-4" /> Transfer Funds
                        </Button>
                        <Button variant="outline" className="justify-start" onClick={() => router.push('/dashboard/profile')}>
                            <User className="mr-2 h-4 w-4" /> View Profile
                        </Button>
                         <Button variant="outline" className="justify-start" onClick={() => router.push('/dashboard/settings')}>
                            <Shield className="mr-2 h-4 w-4" /> Security Settings
                        </Button>
                    </CardContent>
                </Card>

                <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="font-headline text-xl text-primary">Recent Activity</CardTitle>
                        <CardDescription>Your latest transactions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center text-muted-foreground py-8">
                            <Bell className="mx-auto h-8 w-8 mb-2"/>
                            <p>No recent activity to display.</p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}
