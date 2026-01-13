'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserTransactions, type UserTransaction } from "@/hooks/use-user-transactions";
import { format } from 'date-fns';
import { List } from "lucide-react";

function formatCurrency(amount: number, currency: string = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount);
}

function TransactionRowSkeleton() {
  return (
    <TableRow>
      <TableCell><Skeleton className="h-5 w-24" /></TableCell>
      <TableCell><Skeleton className="h-5 w-32" /></TableCell>
      <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
      <TableCell className="text-right"><Skeleton className="h-5 w-20 ml-auto" /></TableCell>
    </TableRow>
  )
}

export default function TransactionsPage() {
    const { transactions, isLoading, error } = useUserTransactions(50); // Fetch up to 50 recent transactions

    const renderTableContent = () => {
        if (isLoading) {
            return Array.from({ length: 5 }).map((_, i) => <TransactionRowSkeleton key={i} />);
        }

        if (error) {
            return (
                <TableRow>
                    <TableCell colSpan={4} className="text-center h-24 text-destructive">
                        Error loading transactions: {error.message}
                    </TableCell>
                </TableRow>
            );
        }

        if (!transactions || transactions.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={4} className="text-center h-24">
                        <div className="text-center text-muted-foreground py-8">
                            <List className="mx-auto h-8 w-8 mb-2"/>
                            <p>No transactions found.</p>
                        </div>
                    </TableCell>
                </TableRow>
            );
        }

        return transactions.map((tx: UserTransaction) => (
            <TableRow key={tx.id}>
                <TableCell>{format(tx.createdAt.toDate(), 'PPpp')}</TableCell>
                <TableCell className="font-medium capitalize">{tx.type}</TableCell>
                <TableCell>
                    <Badge variant={tx.status === 'approved' ? 'default' : tx.status === 'pending' ? 'secondary' : 'destructive'} className="capitalize">{tx.status}</Badge>
                </TableCell>
                <TableCell className={`text-right font-medium ${tx.type === 'deposit' ? 'text-green-600' : 'text-foreground'}`}>
                    {tx.type === 'deposit' ? '+' : '-'}
                    {formatCurrency(tx.amount)}
                </TableCell>
            </TableRow>
        ));
    };


    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Transactions</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Your Transaction History</CardTitle>
                    <CardDescription>A list of your recent transactions.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
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
                        Showing <strong>1-{transactions?.length ?? 0}</strong> of <strong>{transactions?.length ?? 0}</strong> transactions.
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
