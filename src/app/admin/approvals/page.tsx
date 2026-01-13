
'use client';

import * as React from 'react';
import {
  CheckCircle,
  XCircle,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminTransactionsData, type Transaction, useTransactionActions } from '@/hooks/use-admin-transactions-data';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

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
      <TableCell><Skeleton className="h-5 w-24" /></TableCell>
      <TableCell className="text-right"><Skeleton className="h-5 w-20 ml-auto" /></TableCell>
      <TableCell><Skeleton className="h-8 w-24" /></TableCell>
    </TableRow>
  )
}

export default function ApprovalsPage() {
  const { transactions, isLoading: transactionsLoading } = useAdminTransactionsData();
  const { approveTransaction, declineTransaction, isUpdating } = useTransactionActions();
  const { toast } = useToast();

  const handleApprove = async (tx: Transaction) => {
    await approveTransaction(tx);
    toast({ title: 'Transaction Approved', description: `Transaction ID: ${tx.id} has been approved.` });
  };

  const handleDecline = async (tx: Transaction) => {
    await declineTransaction(tx);
    toast({ title: 'Transaction Declined', description: `Transaction ID: ${tx.id} has been declined.` });
  };
  
  const pendingTransactions = React.useMemo(() => {
    return transactions?.filter(tx => tx.status === 'pending') ?? [];
  }, [transactions]);


  const renderTableContent = () => {
    if (transactionsLoading) {
      return Array.from({ length: 3 }).map((_, i) => <TransactionRowSkeleton key={i} />);
    }

    if (pendingTransactions.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5} className="text-center h-24">
            No pending transactions found.
          </TableCell>
        </TableRow>
      );
    }

    return pendingTransactions.map((tx: Transaction) => (
      <TableRow key={tx.id}>
        <TableCell>
            <div className="font-medium">{tx.user?.displayName}</div>
            <div className="text-sm text-muted-foreground">{tx.user?.email}</div>
        </TableCell>
        <TableCell className="capitalize">{tx.type}</TableCell>
        <TableCell>{tx.createdAt ? format(new Date(tx.createdAt), 'PPpp') : '...'}</TableCell>
        <TableCell className="text-right">{formatCurrency(tx.amount)}</TableCell>
        <TableCell>
            <div className="flex gap-2 justify-end">
              <Button size="sm" variant="outline" onClick={() => handleApprove(tx)} disabled={isUpdating}>
                <CheckCircle className="h-4 w-4 mr-1" /> Approve
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleDecline(tx)} disabled={isUpdating}>
                 <XCircle className="h-4 w-4 mr-1" /> Decline
              </Button>
            </div>
        </TableCell>
      </TableRow>
    ));
  };


  return (
    <Card>
    <CardHeader>
        <CardTitle>Transaction Approvals</CardTitle>
        <CardDescription>
        Review and approve or decline pending transactions from users.
        </CardDescription>
    </CardHeader>
    <CardContent>
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {renderTableContent()}
        </TableBody>
        </Table>
    </CardContent>
    <CardFooter>
        <div className="text-xs text-muted-foreground">
            Showing <strong>{pendingTransactions.length}</strong> pending transactions
        </div>
        </CardFooter>
    </Card>
  );
}
