'use client';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, HeartHandshake, Home, Car, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const insuranceProducts = [
    {
        title: "Life Insurance",
        description: "Protect your loved ones' financial future. Our life insurance policies provide peace of mind, ensuring your family is supported no matter what tomorrow holds.",
        icon: <HeartHandshake className="h-8 w-8 text-primary" />,
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

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

const cardHover = {
    hover: { scale: 1.03, transition: { duration: 0.3 } }
};

export default function InsurancePage() {
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
                    Protect What Matters Most
                </motion.h1>
                <motion.p variants={itemVariants} className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
                    From your family's future to your most valuable assets, Evertrust offers a range of insurance solutions to give you peace of mind and comprehensive protection.
                </motion.p>
                 <motion.div variants={itemVariants} className="mt-10 flex items-center justify-center gap-x-6">
                    <Button size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                        Get a Quote
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </motion.div>
            </div>
        </motion.section>

        {/* Insurance Products Section */}
        <motion.section 
            id="insurance-products" 
            className="py-20 sm:py-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            <div className="container space-y-24">
                {insuranceProducts.map((insurance, index) => (
                    <motion.div 
                        key={insurance.title} 
                        className={`flex flex-col gap-12 lg:items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                    >
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
                    </motion.div>
                ))}
            </div>
        </motion.section>
        
        {/* How to Apply Section */}
        <motion.section 
            id="get-a-quote" 
            className="bg-secondary py-20 sm:py-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <div className="container">
                 <motion.div variants={itemVariants} className="mx-auto max-w-2xl text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        Simple Steps to Get Covered
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Getting the right insurance coverage is easier than you think. Our streamlined process helps you get a personalized quote in minutes.
                    </p>
                </motion.div>
                <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                    <motion.div variants={itemVariants} whileHover="hover">
                        <motion.div variants={cardHover}>
                            <Card className="text-center bg-card shadow-lg h-full">
                                <CardHeader>
                                    <CardTitle className="font-headline text-xl">1. Tell Us About You</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Provide some basic information so we can understand your unique needs and situation.</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                     <motion.div variants={itemVariants} whileHover="hover">
                        <motion.div variants={cardHover}>
                            <Card className="text-center bg-card shadow-lg h-full">
                                <CardHeader>
                                    <CardTitle className="font-headline text-xl">2. Compare Your Options</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Review personalized quotes from top carriers and choose the policy that's right for you.</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                     <motion.div variants={itemVariants} whileHover="hover">
                        <motion.div variants={cardHover}>
                            <Card className="text-center bg-card shadow-lg h-full">
                                <CardHeader>
                                    <CardTitle className="font-headline text-xl">3. Get Covered Instantly</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Finalize your policy online and get immediate proof of coverage. It's that simple.</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.section>

      </main>
      <Footer />
    </div>
  );
}
