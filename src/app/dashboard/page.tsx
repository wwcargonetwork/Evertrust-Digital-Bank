import { redirect } from 'next/navigation';

/**
 * Server Component that handles the root dashboard route by redirecting
 * to the overview sub-page. This is faster than a client-side useEffect redirect.
 */
export default function DashboardPage() {
    redirect('/dashboard/overview');
}
