'use client';

import Link from 'next/link';
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
} from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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
import { useAdminDashboardData, type Transaction, type UserProfile } from '@/hooks/use-admin-dashboard-data';
import { format } from 'date-fns';

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export default function AdminDashboard() {
  const { data, isLoading } = useAdminDashboardData();

  if (isLoading) {
    return (
      <>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Revenue</CardTitle><DollarSign className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><Skeleton className="h-8 w-1/2" /><Skeleton className="h-4 w-3/4 mt-1" /></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">New Users</CardTitle><Users className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><Skeleton className="h-8 w-1/2" /><Skeleton className="h-4 w-3/4 mt-1" /></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Transactions</CardTitle><CreditCard className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><Skeleton className="h-8 w-1/2" /><Skeleton className="h-4 w-3/4 mt-1" /></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Active Now</CardTitle><Activity className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><Skeleton className="h-8 w-1/2" /><Skeleton className="h-4 w-3/4 mt-1" /></CardContent></Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader><CardTitle>Recent Transactions</CardTitle><CardDescription>Loading recent transactions...</CardDescription></CardHeader>
            <CardContent><Table><TableHeader><TableRow><TableHead>Customer</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell colSpan={5}><Skeleton className="h-10 w-full" /></TableCell></TableRow><TableRow><TableCell colSpan={5}><Skeleton className="h-10 w-full" /></TableCell></TableRow></TableBody></Table></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Recent Signups</CardTitle></CardHeader>
            <CardContent className="grid gap-8"><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /></CardContent>
          </Card>
        </div>
      </>
    );
  }

  const {
    totalRevenue,
    revenueChange,
    totalUsers,
    userChange,
    totalTransactions,
    transactionChange,
    recentTransactions,
    recentUsers,
  } = data || {};

  const getInitials = (name: string | undefined | null) => {
    if (!name) return '??';
    const names = name.split(' ');
    if (names.length > 1 && names[0] && names[names.length - 1]) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue ?? 0)}</div>
            <p className="text-xs text-muted-foreground">{revenueChange ?? '+0%'} from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalUsers ?? 0}</div>
            <p className="text-xs text-muted-foreground">{userChange ?? '+0%'} from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalTransactions ?? 0}</div>
            <p className="text-xs text-muted-foreground">{transactionChange ?? '+0%'} from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Most recent transactions from your store.</CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/admin/transactions">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden xl:table-cell">Type</TableHead>
                  <TableHead className="hidden xl:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions?.map((tx: Transaction) => (
                  <TableRow key={tx.id}>
                    <TableCell>
                      <div className="font-medium">{tx.user?.displayName}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">{tx.user?.email}</div>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell capitalize">{tx.type}</TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <Badge className="text-xs capitalize" variant={tx.status === 'approved' ? 'default' : tx.status === 'pending' ? 'secondary' : 'destructive'}>{tx.status}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{format(new Date(tx.createdAt), 'PP')}</TableCell>
                    <TableCell className="text-right">{formatCurrency(tx.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Signups</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            {recentUsers?.map((user: UserProfile) => (
                <div key={user.id} className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">{user.displayName}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
