'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This page just redirects to the overview page.
export default function DashboardPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/dashboard/overview');
    }, [router]);

    return null;
}
