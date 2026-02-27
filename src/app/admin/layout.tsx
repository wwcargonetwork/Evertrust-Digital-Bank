'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Bell,
  Home,
  LineChart,
  Package2,
  Settings,
  Users,
  CreditCard,
  Search,
  LogOut,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar';
import { useUser, useFirestore, useDoc, useMemoFirebase, useAuth } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useRouter, usePathname } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Toaster } from '@/components/ui/toaster';
import { Skeleton } from '@/components/ui/skeleton';

function AdminSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const isActive = (path: string) => pathname === path;
  const closeSidebar = () => setOpenMobile(false);

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/admin" className="flex items-center gap-2 font-semibold" onClick={closeSidebar}>
          <Package2 className="h-6 w-6 text-primary" />
          <span className="">Global Trusera Admin</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/admin')} onClick={closeSidebar}>
              <Link href="/admin">
                <Home />
                Dashboard
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/admin/users')} onClick={closeSidebar}>
              <Link href="/admin/users">
                <Users />
                Users
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/admin/approvals')} onClick={closeSidebar}>
              <Link href="/admin/approvals">
                <ShieldCheck />
                Approvals
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/admin/transactions')} onClick={closeSidebar}>
              <Link href="/admin/transactions">
                <CreditCard />
                Transactions
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/admin/messages')} onClick={closeSidebar}>
              <Link href="/admin/messages">
                <MessageSquare />
                Messages
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/admin/analytics')} onClick={closeSidebar}>
              <Link href="/admin/analytics">
                <LineChart />
                Analytics
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/admin/settings')} onClick={closeSidebar}>
              <Link href="/admin/settings">
                <Settings />
                Settings
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const userDocRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc(userDocRef);

  React.useEffect(() => {
    if (pathname === '/admin/login') return;
    if (isUserLoading || isProfileLoading) return;
    if (!user) {
      router.replace('/admin/login');
      return;
    }
    if (userProfile) {
      router.replace('/dashboard');
    }
  }, [user, userProfile, isUserLoading, isProfileLoading, router, pathname]);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/admin/login');
  };
  
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (isUserLoading || isProfileLoading || !user || userProfile) {
    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <p>Verifying administrative access...</p>
        </div>
    );
  }

  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="w-full flex-1">
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.photoURL || ''} alt={user.email || ''} />
                  <AvatarFallback>{getInitials(user.email || 'A')}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/admin/settings')}>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
          {children}
        </main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}