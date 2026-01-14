'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Banknote, Wallet, ArrowUp, ArrowDown, Copy } from "lucide-react";
import { useUser, useDoc, useMemoFirebase, useFirestore } from '@/firebase';
import { useUserTransactions, type UserTransaction } from '@/hooks/use-user-transactions';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface UserProfile {
    accountBalance: number;
    accountType: string;
    preferredCurrency: string;
}

const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency.toUpperCase(),
    }).format(amount);
}

const formatAccountNumber = (uid: string) => {
    return `**** **** **** ${uid.slice(-4)}`;
}

function AccountSkeleton() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6"><Skeleton className="h-9 w-40" /></h1>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <Skeleton className="h-6 w-32 mb-2" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                        <Skeleton className="h-10 w-10 rounded-full" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-10 w-48" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function RecentTransactions() {
    const { transactions, isLoading } = useUserTransactions(5);

    if (isLoading) {
        return (
            <div className="space-y-4">
                {Array.from({length: 3}).map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                        <Skeleton className="h-5 w-20" />
                    </div>
                ))}
            </div>
        );
    }
    
    if (!transactions || transactions.length === 0) {
        return <p className="text-sm text-muted-foreground text-center py-4">No recent transactions.</p>;
    }
    
    return (
        <div className="space-y-4">
            {transactions.map((tx: UserTransaction) => (
                 <div key={tx.id} className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mr-4">
                        {tx.type === 'deposit' ? <ArrowDown className="h-5 w-5 text-green-500" /> : <ArrowUp className="h-5 w-5 text-red-500" />}
                    </div>
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium capitalize leading-none">{tx.type}</p>
                        <p className="text-sm text-muted-foreground">{tx.createdAt ? format(tx.createdAt.toDate(), 'PPP') : 'Pending...'}</p>
                    </div>
                    <div className={`font-medium ${tx.type === 'deposit' ? 'text-green-600' : 'text-foreground'}`}>
                        {tx.type === 'deposit' ? '+' : '-'}
                        {formatCurrency(tx.amount, 'USD')}
                    </div>
                </div>
            ))}
        </div>
    )
}


export default function AccountsPage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();

    const userDocRef = useMemoFirebase(() => {
        if (!user) return null;
        return doc(firestore, 'users', user.uid);
    }, [firestore, user]);

    const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: "Copied!", description: `${label} copied to clipboard.` });
    }

    if (isUserLoading || isProfileLoading) {
        return <AccountSkeleton />;
    }

    if (!userProfile) {
        return (
            <div className="text-center text-muted-foreground py-12">
                <Banknote className="mx-auto h-12 w-12 mb-4" />
                <p className="text-lg">Account information could not be loaded.</p>
                <p>Please try again or contact support if the issue persists.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Accounts</h1>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-2xl font-bold capitalize">{userProfile.accountType.replace('_', ' ')} Account</CardTitle>
                            <CardDescription>Primary Account</CardDescription>
                        </div>
                        <Wallet className="h-8 w-8 text-primary" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <p className="text-sm text-muted-foreground">Current Balance</p>
                        <p className="text-4xl font-bold">{formatCurrency(userProfile.accountBalance, userProfile.preferredCurrency)}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
                        <div>
                            <p className="text-sm text-muted-foreground">Account Number</p>
                            <div className="flex items-center gap-2">
                                <p className="font-mono font-semibold tracking-wider">{formatAccountNumber(user?.uid || '')}</p>
                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard(user?.uid || '', 'Account Number')}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Routing Number</p>
                             <div className="flex items-center gap-2">
                                <p className="font-mono font-semibold">021000021</p>
                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard('021000021', 'Routing Number')}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
             <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <RecentTransactions />
                </CardContent>
            </Card>
        </div>
    )
}
