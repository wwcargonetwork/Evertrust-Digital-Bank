
'use client';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const pressReleases = [
    { date: "October 26, 2024", title: "Evertrust Digital Bank Launches Revolutionary AI-Powered Investment Platform", category: "Product Launch", image: "https://picsum.photos/seed/press1/800/600", hint: "financial technology app" },
    { date: "September 15, 2024", title: "Evertrust Partners with Global Fintech to Expand International Payments", category: "Partnership", image: "https://picsum.photos/seed/press2/800/600", hint: "global business meeting" },
    { date: "August 01, 2024", title: "Evertrust Reports Record Growth in Q3, Surpassing 5 Million Users", category: "Company News", image: "https://picsum.photos/seed/press3/800/600", hint: "business growth chart" },
    { date: "July 20, 2024", title: "New Study by Evertrust Reveals Changing Millennial Investment Habits", category: "Research", image: "https://picsum.photos/seed/press4/800/600", hint: "data analytics dashboard" },
];

const pressKitItems = [
    { title: "Company Logos", description: "Vector and raster formats of the Evertrust logo.", fileType: ".zip" },
    { title: "Executive Headshots", description: "High-resolution photos of our leadership team.", fileType: ".zip" },
    { title: "Brand Guidelines", description: "Our official guide to using our brand assets.", fileType: ".pdf" },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

export default function PressPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <motion.section 
            className="bg-secondary py-20 text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="container">
                <motion.h1 variants={itemVariants} className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
                    Press & Media
                </motion.h1>
                <motion.p variants={itemVariants} className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
                    Stay up to date with the latest news, announcements, and media resources from Evertrust Digital Bank.
                </motion.p>
            </div>
        </motion.section>

        {/* Press Releases Section */}
        <motion.section 
            id="press-releases" 
            className="py-20 sm:py-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            <div className="container">
                 <div className="mx-auto max-w-2xl text-center">
                    <motion.h2 variants={itemVariants} className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        Latest News
                    </motion.h2>
                    <motion.p variants={itemVariants} className="mt-6 text-lg leading-8 text-muted-foreground">
                       The official source for news and updates from Evertrust.
                    </motion.p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {pressReleases.map((release, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                        >
                            <Card className="overflow-hidden bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                                <div className="relative aspect-video">
                                    <Image 
                                        src={release.image}
                                        alt={release.title}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={release.hint}
                                    />
                                </div>
                                <CardContent className="p-6 flex-1 flex flex-col">
                                    <p className="text-sm font-semibold text-accent">{release.category.toUpperCase()}</p>
                                    <p className="text-sm text-muted-foreground mt-1 mb-2">{release.date}</p>
                                    <h3 className="font-headline text-xl font-bold text-primary flex-1">{release.title}</h3>
                                    <Button variant="link" className="mt-4 p-0 h-auto self-start text-accent">
                                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>

        {/* Press Kit Section */}
        <motion.section 
            id="press-kit" 
            className="bg-secondary py-20 sm:py-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
        >
            <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div variants={itemVariants} className="space-y-6">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        Media Resources & Press Kit
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Access official brand assets, logos, and executive headshots. For media inquiries, please contact our communications team.
                    </p>
                    <div className="space-y-2">
                        <p className="font-semibold text-primary">Media Contact:</p>
                        <a href="mailto:info@evertrustdigitalbank.com" className="text-accent hover:underline">info@evertrustdigitalbank.com</a>
                    </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-4">
                  {pressKitItems.map((item, index) => (
                    <Card key={index} className="bg-card shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                           <p className="font-semibold text-primary">{item.title}</p>
                           <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Button variant="outline" size="icon">
                            <Download className="h-5 w-5" />
                            <span className="sr-only">Download {item.title}</span>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
            </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
