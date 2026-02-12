'use client';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Gift, Plane, Star } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { motion } from "framer-motion";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { applyForCard } from "@/app/actions";

const cardsData = [
    {
        title: "Global Trusera Cashback Plus",
        description: "Maximize your everyday spending with industry-leading cashback on groceries, gas, and dining. Simple, rewarding, and no annual fee.",
        icon: <Gift className="h-8 w-8 text-primary" />,
        image: {
            src: "https://i.ibb.co/gbgRXKGL/cashback.png",
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
        title: "Global Trusera Traveler Elite",
        description: "Explore the world with points on every purchase. Enjoy premium travel perks like lounge access and travel credits.",
        icon: <Plane className="h-8 w-8 text-primary" />,
        image: {
            src: "https://i.ibb.co/KcyQqHhW/traveler.png",
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
        title: "Global Trusera Premium Access",
        description: "Unlock a world of luxury. This card offers exclusive access, concierge services, and top-tier rewards for our most discerning clients.",
        icon: <Star className="h-8 w-8 text-primary" />,
        image: {
            src: "https://i.ibb.co/4ZXJ2J3y/premium.png",
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

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

export default function CardsPage() {
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  const handleApply = async (cardType: string) => {
    if (!user) {
      router.push('/signin?redirect=/cards');
      return;
    }
    
    toast({
        title: 'Submitting Application...',
        description: `Please wait while we process your application for the ${cardType}.`,
    });

    const result = await applyForCard(user.uid, cardType);
    if (result.success) {
        toast({
            title: "Application Submitted!",
            description: result.message,
        });
    } else {
        toast({
            title: "Application Failed",
            description: result.message,
            variant: "destructive",
        });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <motion.section 
            className="bg-primary/5 py-20 text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="container">
                <motion.h1 variants={itemVariants} className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
                    The Perfect Card for You
                </motion.h1>
                <motion.p variants={itemVariants} className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
                    Discover a card that matches your lifestyle. From generous cashback to exclusive travel perks, find the perfect fit and start earning rewards today.
                </motion.p>
            </div>
        </motion.section>

        {/* Cards Details Section */}
        <motion.section 
            id="cards-details" 
            className="py-20 sm:py-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            <div className="container space-y-24">
                {cardsData.map((card, index) => (
                    <motion.div 
                        key={card.title} 
                        className={`flex flex-col gap-12 lg:items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="lg:w-1/2">
                             <div className="relative aspect-video">
                                <Image 
                                    src={card.image.src}
                                    alt={card.image.alt}
                                    fill
                                    className="rounded-xl object-contain shadow-lg"
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
                            <form action={() => handleApply(card.title)}>
                                <Button size="lg" className="mt-8" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                                    Learn More <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>

        {/* Comparison Section */}
        <motion.section 
            id="comparison" 
            className="bg-secondary py-20 sm:py-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <div className="container">
                <motion.div variants={itemVariants} className="mx-auto max-w-2xl text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        Compare Our Cards
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Find the card that aligns with your spending habits and financial goals.
                    </p>
                </motion.div>
                <motion.div variants={itemVariants}>
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
                            <form action={() => handleApply('Preferred Card')}>
                                <Button style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>Apply Now</Button>
                            </form>
                            <Button variant="outline">See Full Details</Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </motion.section>

      </main>
      <Footer />
    </div>
  );
}
