
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
import { useFirestore, addDocumentNonBlocking } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { collection, serverTimestamp, writeBatch, doc, increment } from 'firebase/firestore';
import { format } from 'date-fns';

const transactionFormSchema = z.object({
  userId: z.string().min(1, { message: 'Please select a user.' }),
  description: z.string().min(2, { message: 'Description is required.' }),
  amount: z.coerce.number().positive({ message: 'Amount must be positive.' }),
  type: z.enum(['deposit', 'withdrawal', 'transfer', 'sale', 'refund'], {
    required_error: 'You need to select a transaction type.',
  }),
});

type TransactionFormValues = z.infer<typeof transactionFormSchema>;

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

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      userId: '',
      description: '',
      amount: 0,
    },
  });

  async function onSubmit(values: TransactionFormValues) {
    if (!firestore) return;

    try {
      const batch = writeBatch(firestore);
      const userDocRef = doc(firestore, 'users', values.userId);
      const txRef = doc(collection(userDocRef, 'transactions'));

      const transactionData = {
        amount: values.amount,
        description: values.description,
        type: values.type,
        status: 'pending',
        createdAt: serverTimestamp(),
      };

      // Step 1: Add the transaction request
      batch.set(txRef, transactionData);

      // Step 2: If it's a withdrawal (or other outbound fund), deduct from balance immediately
      if (values.type === 'withdrawal' || values.type === 'transfer' || values.type === 'sale') {
        batch.update(userDocRef, { accountBalance: increment(-values.amount) });
      }

      await batch.commit();

      toast({
          title: 'Success!',
          description: `Successfully created a pending ${values.type}. ${values.type === 'withdrawal' ? 'User balance adjusted.' : ''} Please approve it in the Approvals page.`,
      });
      form.reset();
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
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
          <CardTitle>Create Transaction Request</CardTitle>
          <CardDescription>
            Create a pending transaction for a user. Outbound funds (like withdrawals) will adjust the user's balance immediately.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Select User</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={usersLoading}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={usersLoading ? "Loading users..." : "Select a user to create a transaction for"} />
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a transaction type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="deposit">Deposit</SelectItem>
                        <SelectItem value="withdrawal">Withdrawal</SelectItem>
                        <SelectItem value="transfer">Transfer</SelectItem>
                        <SelectItem value="sale">Sale</SelectItem>
                        <SelectItem value="refund">Refund</SelectItem>
                      </SelectContent>
                    </Select>
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
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'Manual Correction' or 'Product Refund'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="md:col-span-2">
                <Button type="submit" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} disabled={form.formState.isSubmitting}>
                  Create Transaction Request <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>
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
