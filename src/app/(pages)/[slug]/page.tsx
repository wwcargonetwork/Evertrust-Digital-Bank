
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Building2 } from "lucide-react";

export default function Page({ params }: { params: { slug: string } }) {
  // Exclude 'deposits', 'credits', 'cards', 'investments', 'loans', and 'insurance' from this generic page
  if (['deposits', 'credits', 'cards', 'investments', 'loans', 'insurance'].includes(params.slug)) {
    return null;
  }
  
  const pageName = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container flex flex-col items-center justify-center text-center py-20 md:py-32">
          <Building2 className="h-16 w-16 text-primary mb-4" />
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            {pageName}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            This page is currently under construction. Please check back soon for exciting updates!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
