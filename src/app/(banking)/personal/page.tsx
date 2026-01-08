
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, PiggyBank, CreditCard, ShieldCheck } from "lucide-react";
import Image from "next/image";

const personalBankingFeatures = [
    {
        title: "Checking & Savings Accounts",
        description: "Manage your daily finances with our feature-rich checking accounts and grow your savings with our high-yield options. No hidden fees, just straightforward banking.",
        icon: <PiggyBank className="h-8 w-8 text-primary" />,
        image: {
            src: "https://picsum.photos/seed/personal1/600/400",
            alt: "A person putting coins into a piggy bank, symbolizing savings.",
            hint: "saving money piggy bank"
        },
        cta: "Explore Accounts"
    },
    {
        title: "Mobile & Online Banking",
        description: "Bank anytime, anywhere with our top-rated mobile app. Deposit checks, transfer funds, pay bills, and monitor your accounts securely from your phone or computer.",
        icon: <Smartphone className="h-8 w-8 text-primary" />,
        image: {
            src: "https://picsum.photos/seed/personal2/600/400",
            alt: "A person using a banking app on their smartphone.",
            hint: "mobile banking app"
        },
        cta: "Discover Digital Banking"
    },
    {
        title: "Credit Cards & Personal Loans",
        description: "From cashback rewards to flexible travel points, find the perfect credit card for your lifestyle. Need financing? Our personal loans offer competitive rates and terms.",
        icon: <CreditCard className="h-8 w-8 text-primary" />,
        image: {
            src: "https://picsum.photos/seed/personal3/600/400",
            alt: "A collection of different credit cards.",
            hint: "credit card variety"
        },
        cta: "Find Your Card or Loan"
    }
];

export default function PersonalBankingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/5 py-20 text-center">
            <div className="container">
                <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
                    Banking Designed for You
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
                    Your financial life, simplified. Evertrust offers the personal banking tools and support you need to manage your money and achieve your goals.
                </p>
                 <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Button size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                        Open an Account
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section id="personal-features" className="py-20 sm:py-28">
            <div className="container space-y-24">
                {personalBankingFeatures.map((feature, index) => (
                    <div key={feature.title} className={`flex flex-col gap-12 lg:items-center ${index % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                        <div className="lg:w-1/2">
                             <div className="relative aspect-video">
                                <Image 
                                    src={feature.image.src}
                                    alt={feature.image.alt}
                                    fill
                                    className="rounded-xl object-cover shadow-lg"
                                    data-ai-hint={feature.image.hint}
                                />
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                             <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                                {feature.icon}
                            </div>
                            <h2 className="font-headline text-3xl font-bold text-primary">{feature.title}</h2>
                            <p className="mt-4 text-muted-foreground text-lg">{feature.description}</p>
                             <Button size="lg" className="mt-8" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                                {feature.cta} <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
        
        {/* Security Commitment Section */}
        <section id="security" className="bg-secondary py-20 sm:py-28">
            <div className="container">
                 <div className="mx-auto max-w-2xl text-center">
                    <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        Your Security is Our Commitment
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        We use industry-leading security measures to protect your information and your money, so you can bank with confidence.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                    <Card className="text-center bg-card shadow-lg">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">FDIC Insured</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Your deposits are insured up to $250,000 per depositor, for each account ownership category.</p>
                        </CardContent>
                    </Card>
                     <Card className="text-center bg-card shadow-lg">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">Advanced Encryption</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">We protect your data with end-to-end encryption, both online and in our mobile app.</p>
                        </CardContent>
                    </Card>
                     <Card className="text-center bg-card shadow-lg">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">24/7 Fraud Monitoring</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Our systems work around the clock to detect and prevent unauthorized activity on your accounts.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
