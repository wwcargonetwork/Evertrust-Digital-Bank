'use client';

import * as React from 'react';
import { useUser, useDoc, useMemoFirebase, useFirestore, addDocumentNonBlocking } from '@/firebase';
import { useRouter } from 'next/navigation';
import { doc, collection, serverTimestamp } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, User, Shield, Bell, Landmark, DollarSign, ArrowUp, ArrowDown, PlusCircle, MinusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUserTransactions, type UserTransaction } from '@/hooks/use-user-transactions';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

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

const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency.toUpperCase(),
    }).format(amount);
}

function RecentActivity() {
    const { transactions, isLoading } = useUserTransactions(3);

    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="flex items-center space-x-4"><Skeleton className="h-10 w-10 rounded-full" /><div className="space-y-2"><Skeleton className="h-4 w-[150px]" /><Skeleton className="h-4 w-[100px]" /></div></div>
                <div className="flex items-center space-x-4"><Skeleton className="h-10 w-10 rounded-full" /><div className="space-y-2"><Skeleton className="h-4 w-[150px]" /><Skeleton className="h-4 w-[100px]" /></div></div>
                <div className="flex items-center space-x-4"><Skeleton className="h-10 w-10 rounded-full" /><div className="space-y-2"><Skeleton className="h-4 w-[150px]" /><Skeleton className="h-4 w-[100px]" /></div></div>
            </div>
        );
    }

    if (!transactions || transactions.length === 0) {
        return (
            <div className="text-center text-muted-foreground py-8">
                <Bell className="mx-auto h-8 w-8 mb-2"/>
                <p>No recent activity to display.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {transactions.map((tx: UserTransaction) => (
                <div key={tx.id} className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mr-4">
                        {tx.type === 'deposit' ? <ArrowDown className="h-5 w-5 text-green-500" /> : <ArrowUp className="h-5 w-5 text-red-500" />}
                    </div>
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium capitalize leading-none">{tx.type}</p>
                        <p className="text-sm text-muted-foreground">{format(tx.createdAt.toDate(), 'PPP')}</p>
                    </div>
                    <div className={`font-medium ${tx.type === 'deposit' ? 'text-green-600' : 'text-foreground'}`}>
                        {tx.type === 'deposit' ? '+' : '-'}
                        {formatCurrency(tx.amount, 'USD')}
                    </div>
                </div>
            ))}
        </div>
    );
}

const transactionSchema = z.object({
  amount: z.coerce.number().positive({ message: "Amount must be a positive number." }),
  description: z.string().min(2, { message: "Description is required." }),
  recipient: z.string().optional(),
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

function TransactionDialog({ type, onOpenChange, open }: { type: 'deposit' | 'withdrawal', onOpenChange: (open: boolean) => void, open: boolean }) {
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user } = useUser();
  
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: 0,
      description: "",
      recipient: "",
    },
  });

  const onSubmit = async (values: TransactionFormValues) => {
    if (!firestore || !user) {
      toast({ variant: 'destructive', title: 'Error', description: 'User not authenticated.' });
      return;
    }

    const transactionData = {
      amount: values.amount,
      description: values.description,
      type,
      status: 'pending',
      createdAt: serverTimestamp(),
      ...(type === 'withdrawal' && { recipient: values.recipient }),
    };

    try {
      const colRef = collection(firestore, 'users', user.uid, 'transactions');
      addDocumentNonBlocking(colRef, transactionData);
      toast({ title: 'Success!', description: `Your ${type} request has been submitted for approval.` });
      onOpenChange(false);
      form.reset();
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="capitalize">{type} Funds</DialogTitle>
          <DialogDescription>
            Enter the details for your {type} request. It will be sent to an admin for approval.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Monthly Savings" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {type === 'withdrawal' && (
              <FormField
                control={form.control}
                name="recipient"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Recipient</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Bank account number" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>Submit Request</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


export default function OverviewPage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const firestore = useFirestore();
    const [dialog, setDialog] = React.useState<{open: boolean, type: 'deposit' | 'withdrawal' | null}>({open: false, type: null});


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
        <>
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
                            <Button variant="outline" className="justify-start" onClick={() => setDialog({open: true, type: 'deposit'})}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Top Up Account
                            </Button>
                            <Button variant="outline" className="justify-start" onClick={() => setDialog({open: true, type: 'withdrawal'})}>
                                <MinusCircle className="mr-2 h-4 w-4" /> Withdraw Funds
                            </Button>
                             <Button variant="outline" className="justify-start" onClick={() => router.push('/dashboard/transactions')}>
                                <ArrowRight className="mr-2 h-4 w-4" /> View All Transactions
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl text-primary">Recent Activity</CardTitle>
                            <CardDescription>Your latest transactions.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RecentActivity />
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
            {dialog.type && <TransactionDialog type={dialog.type} open={dialog.open} onOpenChange={(open) => setDialog({open, type: dialog.type})} />}
        </>
    );
}
