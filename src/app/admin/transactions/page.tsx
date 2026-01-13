
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Send,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminUsersData } from '@/hooks/use-admin-users-data';
import { useAdminTransactionsData, type Transaction } from '@/hooks/use-admin-transactions-data';
import { useFirestore } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { collection, serverTimestamp, addDoc } from 'firebase/firestore';
import { format } from 'date-fns';

const topUpFormSchema = z.object({
  userId: z.string().min(1, { message: 'Please select a user.' }),
  sender: z.string().min(2, { message: 'Sender details are required.' }),
  amount: z.coerce.number().positive({ message: 'Amount must be positive.' }),
});

type TopUpFormValues = z.infer<typeof topUpFormSchema>;

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

function TransactionRowSkeleton() {
  return (
    <TableRow>
      <TableCell><Skeleton className="h-5 w-32" /></TableCell>
      <TableCell><Skeleton className="h-5 w-16" /></TableCell>
      <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
      <TableCell><Skeleton className="h-5 w-24" /></TableCell>
      <TableCell className="text-right"><Skeleton className="h-5 w-20 ml-auto" /></TableCell>
    </TableRow>
  )
}

export default function TransactionsPage() {
  const { users, isLoading: usersLoading } = useAdminUsersData();
  const { transactions, isLoading: transactionsLoading } = useAdminTransactionsData();
  const firestore = useFirestore();
  const { toast } = useToast();

  const form = useForm<TopUpFormValues>({
    resolver: zodResolver(topUpFormSchema),
    defaultValues: {
      userId: '',
      sender: '',
      amount: 0,
    },
  });

  async function onSubmit(values: TopUpFormValues) {
    if (!firestore) return;

    try {
        const userTransactionsRef = collection(firestore, 'users', values.userId, 'transactions');
        await addDoc(userTransactionsRef, {
            amount: values.amount,
            description: values.sender,
            type: 'deposit',
            status: 'pending',
            createdAt: serverTimestamp(),
        });

        toast({
            title: 'Success!',
            description: `Successfully created a pending deposit. Please approve it in the Approvals page.`,
        });
        form.reset();
    } catch (error: any) {
      console.error('Top-up creation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Top-up Failed',
        description: error.message || 'An unexpected error occurred.',
      });
    }
  }

  const getStatusBadgeVariant = (status: Transaction['status']) => {
    switch(status) {
      case 'approved': return 'default';
      case 'pending': return 'secondary';
      case 'declined': return 'destructive';
      default: return 'outline';
    }
  }

  const renderTableContent = () => {
    if (transactionsLoading) {
      return Array.from({ length: 5 }).map((_, i) => <TransactionRowSkeleton key={i} />);
    }

    if (!transactions || transactions.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5} className="text-center h-24">
            No transactions found.
          </TableCell>
        </TableRow>
      );
    }

    return transactions.map((tx: Transaction) => (
      <TableRow key={tx.id}>
        <TableCell>
            <div className="font-medium">{tx.user?.displayName}</div>
            <div className="text-sm text-muted-foreground">{tx.user?.email}</div>
        </TableCell>
        <TableCell className="capitalize">{tx.type}</TableCell>
        <TableCell>
          <Badge variant={getStatusBadgeVariant(tx.status)} className="capitalize">{tx.status}</Badge>
        </TableCell>
        <TableCell>{tx.createdAt ? format(new Date(tx.createdAt), 'PPpp') : '...'}</TableCell>
        <TableCell className="text-right">{formatCurrency(tx.amount)}</TableCell>
      </TableRow>
    ));
  };


  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Create Deposit Request</CardTitle>
          <CardDescription>
            Create a pending deposit transaction for a user. It will appear in the 'Approvals' page for review.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select User</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={usersLoading}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={usersLoading ? "Loading users..." : "Select a user to create a deposit for"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {users?.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.displayName} ({user.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description / Sender</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'Admin Deposit' or 'Manual Correction'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <Button type="submit" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} disabled={form.formState.isSubmitting}>
                Create Deposit Request <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            A historical log of all transactions in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renderTableContent()}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-{transactions?.length ?? 0}</strong> of <strong>{transactions?.length ?? 0}</strong> transactions
            </div>
          </CardFooter>
      </Card>
    </div>
  );
}
