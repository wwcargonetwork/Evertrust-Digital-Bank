
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, HeartHand, Home, Car, ShieldCheck } from "lucide-react";
import Image from "next/image";

const insuranceProducts = [
    {
        title: "Life Insurance",
        description: "Protect your loved ones' financial future. Our life insurance policies provide peace of mind, ensuring your family is supported no matter what tomorrow holds.",
        icon: <HeartHand className="h-8 w-8 text-primary" />,
        image: {
            src: "https://picsum.photos/seed/insurance1/600/400",
            alt: "A happy family, representing the peace of mind from life insurance.",
            hint: "happy family portrait"
        },
        features: [
            "Term, whole, and universal life options",
            "Affordable premiums tailored to your budget",
            "Financial support for dependents",
            "Coverage for final expenses and debt"
        ],
        cta: "Explore Life Insurance"
    },
    {
        title: "Home Insurance",
        description: "Your home is your biggest asset. Safeguard it from unexpected events like fire, theft, and natural disasters with our comprehensive home insurance.",
        icon: <Home className="h-8 w-8 text-primary" />,
        image: {
            src: "https://picsum.photos/seed/insurance2/600/400",
            alt: "A beautiful and secure home, protected by insurance.",
            hint: "suburban family house"
        },
        features: [
            "Protection for your dwelling and personal property",
            "Liability coverage for accidents on your property",
            "Customizable policies for homeowners and renters",
            "Discounts for bundling with auto insurance"
        ],
        cta: "Get a Home Quote"
    },
    {
        title: "Auto Insurance",
        description: "Stay protected on the road. Our auto insurance offers reliable coverage for you, your vehicle, and others, with great rates and excellent customer service.",
        icon: <Car className="h-8 w-8 text-primary" />,
        image: {
            src: "https://picsum.photos/seed/insurance3/600/400",
            alt: "A modern car driving on a scenic road, covered by auto insurance.",
            hint: "car scenic road"
        },
        features: [
            "Collision, comprehensive, and liability coverage",
            "Roadside assistance and rental reimbursement",
            "Safe driver and multi-policy discounts",
            "Fast and easy claims process"
        ],
        cta: "Get an Auto Quote"
    }
];

export default function InsurancePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/5 py-20 text-center">
            <div className="container">
                <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
                    Protect What Matters Most
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
                    From your family's future to your most valuable assets, Evertrust offers a range of insurance solutions to give you peace of mind and comprehensive protection.
                </p>
                 <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Button size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                        Get a Quote
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>

        {/* Insurance Products Section */}
        <section id="insurance-products" className="py-20 sm:py-28">
            <div className="container space-y-24">
                {insuranceProducts.map((insurance, index) => (
                    <div key={insurance.title} className={`flex flex-col gap-12 lg:items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                        <div className="lg:w-1/2">
                             <div className="relative aspect-video">
                                <Image 
                                    src={insurance.image.src}
                                    alt={insurance.image.alt}
                                    fill
                                    className="rounded-xl object-cover shadow-lg"
                                    data-ai-hint={insurance.image.hint}
                                />
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                             <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                                {insurance.icon}
                            </div>
                            <h2 className="font-headline text-3xl font-bold text-primary">{insurance.title}</h2>
                            <p className="mt-4 text-muted-foreground text-lg">{insurance.description}</p>
                            <ul className="mt-6 space-y-3">
                                {insurance.features.map(feature => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <ShieldCheck className="h-5 w-5 text-accent" />
                                        <span className="text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button size="lg" className="mt-8" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                                {insurance.cta} <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
        
        {/* How to Apply Section */}
        <section id="get-a-quote" className="bg-secondary py-20 sm:py-28">
            <div className="container">
                 <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        Simple Steps to Get Covered
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Getting the right insurance coverage is easier than you think. Our streamlined process helps you get a personalized quote in minutes.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                    <Card className="text-center bg-card shadow-lg">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">1. Tell Us About You</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Provide some basic information so we can understand your unique needs and situation.</p>
                        </CardContent>
                    </Card>
                     <Card className="text-center bg-card shadow-lg">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">2. Compare Your Options</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Review personalized quotes from top carriers and choose the policy that's right for you.</p>
                        </CardContent>
                    </Card>
                     <Card className="text-center bg-card shadow-lg">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">3. Get Covered Instantly</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Finalize your policy online and get immediate proof of coverage. It's that simple.</p>
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
