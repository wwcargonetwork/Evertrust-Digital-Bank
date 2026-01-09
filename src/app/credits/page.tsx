'use client';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, Landmark, Home } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";

const creditCardFeatures = [
    { feature: "Annual Fee", cashback: "$0", travel: "$95", premium: "$550" },
    { feature: "Purchase APR", cashback: "18.24% - 28.24% Variable", travel: "19.24% - 29.24% Variable", premium: "20.24% - 30.24% Variable" },
    { feature: "Cashback Rate", cashback: "Up to 5%", travel: "1%", premium: "1.5%" },
    { feature: "Travel Miles", cashback: "N/A", travel: "2x on travel & dining", premium: "3x on travel, 1x on all else" },
    { feature: "Sign-up Bonus", cashback: "$200", travel: "50,000 miles", premium: "$200 travel credit" },
];

const loanFeatures = [
    { title: "Debt Consolidation", description: "Combine your high-interest debts into one manageable monthly payment at a lower rate.", icon: <Landmark className="h-8 w-8 text-primary" /> },
    { title: "Home Improvement", description: "Finance your renovation projects, from a new kitchen to a backyard makeover.", icon: <Home className="h-8 w-8 text-primary" /> },
    { title: "Major Purchases", description: "Cover large expenses like medical bills, weddings, or a new vehicle with predictable payments.", icon: <CreditCard className="h-8 w-8 text-primary" /> },
]

const mortgageFeatures = [
    { term: "30-Year Fixed", rate: "6.75%", apr: "6.85%", description: "Lock in a low rate for the life of your loan with predictable monthly payments." },
    { term: "15-Year Fixed", rate: "6.12%", apr: "6.25%", description: "Pay off your home faster and save on interest with a shorter loan term." },
    { term: "5/1 ARM", rate: "6.25%", apr: "7.15%", description: "Enjoy a lower initial rate for the first five years, ideal for short-term homeowners." },
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

export default function CreditsPage() {
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
                    Flexible Credit Solutions for Your Needs
                </motion.h1>
                <motion.p variants={itemVariants} className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
                    From everyday purchases to your dream home, our credit and lending options are designed to provide you with the financial flexibility you deserve.
                </motion.p>
            </div>
        </motion.section>

        {/* Credit Cards Section */}
        <motion.section 
            id="credit-cards" 
            className="py-20 sm:py-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
          <div className="container">
            <div className="flex flex-col lg:flex-row lg:items-center gap-12">
                <motion.div variants={itemVariants} className="lg:w-1/3">
                    <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                        Credit Cards
                    </div>
                    <h2 className="font-headline text-3xl font-bold text-primary">A Card for Every Lifestyle</h2>
                    <p className="mt-4 text-muted-foreground text-lg">Whether you're looking for cashback, travel rewards, or premium perks, we have a card that's right for you.</p>
                    <Button size="lg" className="mt-6" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                        Find Your Card <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </motion.div>
                <motion.div variants={itemVariants} className="lg:w-2/3">
                     <Card className="bg-card shadow-lg">
                        <CardHeader>
                            <CardTitle>Credit Card Comparison</CardTitle>
                        </CardHeader>
                        <CardContent>
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
                                    {creditCardFeatures.map((item) => (
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
                    </Card>
                </motion.div>
            </div>
          </div>
        </motion.section>
        
        {/* Personal Loans Section */}
        <motion.section 
            id="personal-loans" 
            className="bg-secondary py-20 sm:py-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <div className="container">
                 <motion.div variants={itemVariants} className="mx-auto max-w-2xl text-center">
                    <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                        Personal Loans
                    </div>
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        Funding for Your Next Big Step
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Get a fixed-rate personal loan with no origination fees. Check your rate in minutes without impacting your credit score.
                    </p>
                </motion.div>
                <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                    {loanFeatures.map((feature) => (
                        <motion.div key={feature.title} variants={itemVariants} whileHover="hover">
                            <motion.div variants={cardHover}>
                                <Card className="text-center bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                                     <CardHeader>
                                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                          {feature.icon}
                                        </div>
                                        <CardTitle className="font-headline text-xl pt-4">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
                 <motion.div variants={itemVariants} className="text-center mt-12">
                    <Button size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                        Check Your Rate <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </motion.div>
            </div>
        </motion.section>

        {/* Mortgages Section */}
        <motion.section 
            id="mortgages" 
            className="py-20 sm:py-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
          <div className="container">
             <motion.div variants={itemVariants} className="mx-auto max-w-2xl text-center">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                    Mortgages
                </div>
                <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                    Unlock the Door to Your New Home
                </h2>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                    Our dedicated mortgage advisors are here to guide you through every step of the home-buying process, from pre-approval to closing.
                </p>
            </motion.div>
            <motion.div variants={itemVariants} className="mt-16">
                 <Card className="bg-card shadow-lg">
                    <CardHeader>
                        <CardTitle>Today's Mortgage Rates</CardTitle>
                        <CardDescription>Rates are subject to change. Your actual rate will depend on your credit history and other factors.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Loan Term</TableHead>
                                <TableHead>Interest Rate</TableHead>
                                <TableHead>APR</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mortgageFeatures.map((item) => (
                                <TableRow key={item.term}>
                                    <TableCell className="font-medium">{item.term}</TableCell>
                                    <TableCell>{item.rate}</TableCell>
                                    <TableCell>{item.apr}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                     <CardFooter>
                        <Button style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                            Get Pre-Approved <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
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
