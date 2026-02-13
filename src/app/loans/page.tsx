'use client';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Car, User, CheckCircle } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const loanProducts = [
    {
        title: "Personal Loans",
        description: "Flexible financing for life's big moments. Consolidate debt, fund a home improvement project, or cover unexpected expenses with a predictable fixed-rate loan.",
        icon: <User className="h-8 w-8 text-primary" />,
        image: {
            src: "https://www.kreditbee.in/blog/content/images/2023/06/shutterstock_1770758960.jpg",
            alt: "A person happily reviewing their personal loan documents.",
            hint: "personal finance planning"
        },
        features: [
            "Fixed rates from 7.99% APR",
            "Loan amounts from $5,000 to $50,000",
            "No origination fees or prepayment penalties",
            "Check your rate without impacting your credit score"
        ],
        cta: "Check Your Rate"
    },
    {
        title: "Auto Loans",
        description: "Get behind the wheel of your new or used car with our competitive auto financing. Enjoy a simple application process and quick decisions.",
        icon: <Car className="h-8 w-8 text-primary" />,
        image: {
            src: "https://defisolutions.com/wp-content/uploads/vehicle-lending-1.png",
            alt: "A new car with a bow on it, representing a recent purchase.",
            hint: "new car purchase"
        },
        features: [
            "Competitive rates for new and used vehicles",
            "Flexible repayment terms up to 72 months",
            "Get pre-qualified to know your budget",
            "Refinance your existing auto loan and save"
        ],
        cta: "Apply for an Auto Loan"
    },
    {
        title: "Home Loans",
        description: "Whether you're buying your first home, refinancing, or tapping into your home's equity, our mortgage specialists are here to guide you.",
        icon: <Home className="h-8 w-8 text-primary" />,
        image: {
            src: "https://img-2.outlookindia.com/outlook/outlook-money/story/047fccd24be40ddb66759d2a6ebd46b3.jpg?w=640",
            alt: "A beautiful modern house, representing a home loan.",
            hint: "modern house exterior"
        },
        features: [
            "Fixed-rate and adjustable-rate mortgages (ARMs)",
            "FHA, VA, and conventional loan options",
            "Expert guidance from pre-approval to closing",
            "Home equity line of credit (HELOC) available"
        ],
        cta: "Explore Home Loans"
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

export default function LoansPage() {
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
                    Financing Your Dreams
                </motion.h1>
                <motion.p variants={itemVariants} className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
                    From personal goals to major life purchases, Global Trusera offers a variety of loan options with competitive rates and flexible terms to help you achieve what's next.
                </motion.p>
                 <motion.div variants={itemVariants} className="mt-10 flex items-center justify-center gap-x-6">
                    <Button size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                        View Loan Options
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </motion.div>
            </div>
        </motion.section>

        {/* Loan Products Section */}
        <motion.section 
            id="loan-products" 
            className="py-20 sm:py-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            <div className="container space-y-24">
                {loanProducts.map((loan, index) => (
                    <motion.div 
                        key={loan.title} 
                        className={`flex flex-col gap-12 lg:items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="lg:w-1/2">
                             <div className="relative aspect-video">
                                <Image 
                                    src={loan.image.src}
                                    alt={loan.image.alt}
                                    fill
                                    className="rounded-xl object-cover shadow-lg"
                                    data-ai-hint={loan.image.hint}
                                />
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                             <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                                {loan.icon}
                            </div>
                            <h2 className="font-headline text-3xl font-bold text-primary">{loan.title}</h2>
                            <p className="mt-4 text-muted-foreground text-lg">{loan.description}</p>
                            <ul className="mt-6 space-y-3">
                                {loan.features.map(feature => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-accent" />
                                        <span className="text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button size="lg" className="mt-8" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                                {loan.cta} <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
        
        {/* How to Apply Section */}
        <motion.section 
            id="how-to-apply" 
            className="bg-secondary py-20 sm:py-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <div className="container">
                 <motion.div variants={itemVariants} className="mx-auto max-w-2xl text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        A Simple, Secure Application Process
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Applying for a loan is quick and easy. Follow these simple steps to get started on your financial journey.
                    </p>
                </motion.div>
                <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                    <motion.div variants={itemVariants} whileHover="hover">
                      <motion.div variants={cardHover}>
                        <Card className="text-center bg-card shadow-lg h-full">
                            <CardHeader>
                                <CardTitle className="font-headline text-xl">1. Choose Your Loan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Select the loan type that best fits your needs and review the terms and conditions.</p>
                            </CardContent>
                        </Card>
                      </motion.div>
                    </motion.div>
                     <motion.div variants={itemVariants} whileHover="hover">
                      <motion.div variants={cardHover}>
                        <Card className="text-center bg-card shadow-lg h-full">
                            <CardHeader>
                                <CardTitle className="font-headline text-xl">2. Apply Online</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Fill out our secure online application in minutes with your personal and financial information.</p>
                            </CardContent>
                        </Card>
                      </motion.div>
                    </motion.div>
                     <motion.div variants={itemVariants} whileHover="hover">
                      <motion.div variants={cardHover}>
                        <Card className="text-center bg-card shadow-lg h-full">
                            <CardHeader>
                                <CardTitle className="font-headline text-xl">3. Get a Decision</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Receive a quick decision. If approved, your funds will be disbursed promptly.</p>
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
