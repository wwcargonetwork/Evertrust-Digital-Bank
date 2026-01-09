'use client';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Globe, Landmark, TrendingUp, Users } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const corporateFeatures = [
    {
        title: "Treasury Management",
        description: "Optimize your cash flow, manage liquidity, and mitigate financial risk with our comprehensive treasury solutions. We help you streamline payables, receivables, and reporting.",
        icon: <Landmark className="h-8 w-8 text-primary" />,
        image: {
            src: "https://picsum.photos/seed/corp1/600/400",
            alt: "A secure bank vault, representing treasury management.",
            hint: "bank vault"
        },
        cta: "Explore Treasury Solutions"
    },
    {
        title: "Corporate Lending",
        description: "Fuel your company's growth with our flexible financing options. We offer term loans, lines of credit, and commercial real estate financing to support your strategic initiatives.",
        icon: <TrendingUp className="h-8 w-8 text-primary" />,
        image: {
            src: "https://picsum.photos/seed/corp2/600/400",
            alt: "A graph showing business growth, symbolizing corporate lending.",
            hint: "business growth chart"
        },
        cta: "View Lending Options"
    },
    {
        title: "International Trade Finance",
        description: "Expand your global reach with confidence. Our trade finance services, including letters of credit and export financing, facilitate smooth and secure international transactions.",
        icon: <Globe className="h-8 w-8 text-primary" />,
        image: {
            src: "https://picsum.photos/seed/corp3/600/400",
            alt: "Cargo ships at a port, representing international trade.",
            hint: "cargo ships port"
        },
        cta: "Learn About Trade Finance"
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

export default function CorporateBankingPage() {
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
                    Powerful Solutions for Your Business
                </motion.h1>
                <motion.p variants={itemVariants} className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
                    Evertrust provides sophisticated financial tools and expert guidance to help your business thrive in a competitive landscape.
                </motion.p>
            </div>
        </motion.section>

        {/* Corporate Features Section */}
        <motion.section 
            id="corporate-features" 
            className="py-20 sm:py-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            <div className="container space-y-24">
                {corporateFeatures.map((feature, index) => (
                    <motion.div 
                        key={feature.title} 
                        className={`flex flex-col gap-12 lg:items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                    >
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
                    </motion.div>
                ))}
            </div>
        </motion.section>

        {/* Why Partner with Us Section */}
        <motion.section 
            id="partner-with-us" 
            className="bg-secondary py-20 sm:py-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <div className="container">
                 <div className="mx-auto max-w-2xl text-center">
                    <motion.h2 variants={itemVariants} className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        Your Strategic Financial Partner
                    </motion.h2>
                    <motion.p variants={itemVariants} className="mt-6 text-lg leading-8 text-muted-foreground">
                       We're more than a bank; we're an extension of your team. Our dedicated relationship managers work to understand your business and provide tailored solutions.
                    </motion.p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                    <motion.div variants={itemVariants} whileHover="hover">
                        <motion.div variants={cardHover}>
                            <Card className="text-center bg-card shadow-lg h-full">
                                <CardHeader>
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                                        <Users className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle className="font-headline text-xl">Dedicated Relationship Managers</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Gain a single point of contact who understands your industry and your company's unique needs.</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                     <motion.div variants={itemVariants} whileHover="hover">
                        <motion.div variants={cardHover}>
                            <Card className="text-center bg-card shadow-lg h-full">
                                <CardHeader>
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                                        <Briefcase className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle className="font-headline text-xl">Customized Solutions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">We don't believe in one-size-fits-all. We create financial strategies tailored to your specific goals.</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                     <motion.div variants={itemVariants} whileHover="hover">
                        <motion.div variants={cardHover}>
                            <Card className="text-center bg-card shadow-lg h-full">
                                <CardHeader>
                                     <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                                        <Globe className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle className="font-headline text-xl">Global Expertise</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Leverage our global network and expertise to navigate the complexities of international markets.</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
                 <motion.div variants={itemVariants} className="text-center mt-12">
                    <Button size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                        Contact a Business Banker <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </motion.div>
            </div>
        </motion.section>

      </main>
      <Footer />
    </div>
  );
}
