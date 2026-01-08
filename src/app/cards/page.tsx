
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Gift, Plane, Star } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";

const cardsData = [
    {
        title: "Evertrust Cashback Plus",
        description: "Maximize your everyday spending with industry-leading cashback on groceries, gas, and dining. Simple, rewarding, and no annual fee.",
        icon: <Gift className="h-8 w-8 text-primary" />,
        image: {
            src: "https://picsum.photos/seed/card1/600/400",
            alt: "A modern and clean looking credit card for cashback rewards.",
            hint: "credit card design"
        },
        features: [
            "5% cashback on rotating bonus categories",
            "1.5% cashback on all other purchases",
            "No annual fee",
            "$200 sign-up bonus after spending $500"
        ]
    },
    {
        title: "Evertrust Traveler Elite",
        description: "Explore the world with points on every purchase. Enjoy premium travel perks like lounge access and travel credits.",
        icon: <Plane className="h-8 w-8 text-primary" />,
        image: {
            src: "https://picsum.photos/seed/card2/600/400",
            alt: "A stylish credit card with a world map design, for travel enthusiasts.",
            hint: "travel credit card"
        },
        features: [
            "3x points on travel and dining worldwide",
            "2x points on all other purchases",
            "$300 annual travel credit",
            "Priority Pass lounge access"
        ]
    },
    {
        title: "Evertrust Premium Access",
        description: "Unlock a world of luxury. This card offers exclusive access, concierge services, and top-tier rewards for our most discerning clients.",
        icon: <Star className="h-8 w-8 text-primary" />,
        image: {
            src: "https://picsum.photos/seed/card3/600/400",
            alt: "A luxurious, metallic credit card symbolizing premium access.",
            hint: "luxury credit card"
        },
        features: [
            "4x points on luxury hotels and fine dining",
            "24/7 personal concierge service",
            "Exclusive event access",
            "Comprehensive travel and purchase protection"
        ]
    }
];

const cardComparison = [
    { feature: "Annual Fee", cashback: "$0", travel: "$95", premium: "$550" },
    { feature: "Sign-up Bonus", cashback: "$200 cash back", travel: "50,000 bonus points", premium: "100,000 bonus points" },
    { feature: "Rewards Rate", cashback: "Up to 5% cashback", travel: "Up to 3x points", premium: "Up to 4x points" },
    { feature: "Key Perk", cashback: "Flexible bonus categories", travel: "Annual travel credit", premium: "24/7 Concierge" },
    { feature: "Purchase APR", cashback: "18.24% - 28.24% Variable", travel: "19.24% - 29.24% Variable", premium: "20.24% - 30.24% Variable" },
];


export default function CardsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/5 py-20 text-center">
            <div className="container">
                <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
                    The Perfect Card for You
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
                    Discover a card that matches your lifestyle. From generous cashback to exclusive travel perks, find the perfect fit and start earning rewards today.
                </p>
            </div>
        </section>

        {/* Cards Details Section */}
        <section id="cards-details" className="py-20 sm:py-28">
            <div className="container space-y-24">
                {cardsData.map((card, index) => (
                    <div key={card.title} className={`flex flex-col gap-12 lg:items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                        <div className="lg:w-1/2">
                             <div className="relative aspect-video">
                                <Image 
                                    src={card.image.src}
                                    alt={card.image.alt}
                                    fill
                                    className="rounded-xl object-cover shadow-lg"
                                    data-ai-hint={card.image.hint}
                                />
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                             <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                                {card.icon}
                            </div>
                            <h2 className="font-headline text-3xl font-bold text-primary">{card.title}</h2>
                            <p className="mt-4 text-muted-foreground text-lg">{card.description}</p>
                            <ul className="mt-6 space-y-3">
                                {card.features.map(feature => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-accent" />
                                        <span className="text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button size="lg" className="mt-8" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                                Learn More <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Comparison Section */}
        <section id="comparison" className="bg-secondary py-20 sm:py-28">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        Compare Our Cards
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Find the card that aligns with your spending habits and financial goals.
                    </p>
                </div>
                <Card className="mt-16 bg-card shadow-lg">
                    <CardContent className="pt-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Feature</TableHead>
                                <TableHead>Cashback Plus</TableHead>
                                <TableHead>Traveler Elite</TableHead>
                                <TableHead>Premium Access</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cardComparison.map((item) => (
                                <TableRow key={item.feature}>
                                    <TableCell className="font-medium">{item.feature}</TableCell>
                                    <TableCell>{item.cashback}</TableCell>
                                    <TableCell>{item.travel}</TableCell>
                                    <TableCell>{item.premium}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter className="justify-center gap-4 pt-6">
                        <Button style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>Apply Now</Button>
                        <Button variant="outline">See Full Details</Button>
                    </CardFooter>
                </Card>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
