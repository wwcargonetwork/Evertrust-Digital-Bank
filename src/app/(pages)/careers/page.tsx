
'use client';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Leaf, Users, BrainCircuit, Plus } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const benefits = [
    { icon: <Zap className="h-8 w-8 text-primary" />, title: "Competitive Compensation", description: "We offer top-tier salaries, performance bonuses, and equity options." },
    { icon: <Leaf className="h-8 w-8 text-primary" />, title: "Health & Wellness", description: "Comprehensive health, dental, and vision insurance, plus wellness stipends." },
    { icon: <BrainCircuit className="h-8 w-8 text-primary" />, title: "Growth & Learning", description: "Generous budget for conferences, courses, and professional development." },
    { icon: <Users className="h-8 w-8 text-primary" />, title: "Flexible Work", description: "A hybrid work model that trusts you to do your best work, wherever you are." },
];

const jobOpenings = {
    "Engineering": [
        { title: "Senior Frontend Engineer", location: "Remote, USA", type: "Full-time" },
        { title: "Lead Backend Engineer (Go)", location: "New York, NY", type: "Full-time" },
        { title: "DevOps & SRE Specialist", location: "Remote, USA", type: "Full-time" },
    ],
    "Design": [
        { title: "Senior Product Designer", location: "Remote, USA", type: "Full-time" },
        { title: "UX Researcher", location: "New York, NY", type_h: "Full-time" },
    ],
    "Marketing": [
        { title: "Content Marketing Manager", location: "Remote, USA", type: "Full-time" },
    ]
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
};

export default function CareersPage() {
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
                    Build the Future with Us
                </motion.h1>
                <motion.p variants={itemVariants} className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
                    Join a team of passionate innovators dedicated to creating a more accessible and equitable financial world. Your work will empower millions.
                </motion.p>
                 <motion.div variants={itemVariants} className="mt-10 flex items-center justify-center gap-x-6">
                    <Button size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                        See Open Positions
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </motion.div>
            </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section 
            id="benefits" 
            className="py-20 sm:py-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
        >
            <div className="container">
                 <div className="mx-auto max-w-2xl text-center">
                    <motion.h2 variants={itemVariants} className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        Perks & Benefits
                    </motion.h2>
                    <motion.p variants={itemVariants} className="mt-6 text-lg leading-8 text-muted-foreground">
                       We invest in our people. Our comprehensive benefits package is designed to support your personal and professional growth.
                    </motion.p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {benefits.map((perk) => (
                        <motion.div key={perk.title} variants={itemVariants} className="text-center p-6 rounded-xl bg-card shadow-lg hover:shadow-2xl transition-shadow duration-300">
                             <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                                {perk.icon}
                            </div>
                            <h3 className="font-headline text-xl font-semibold text-primary">{perk.title}</h3>
                            <p className="mt-2 text-muted-foreground">{perk.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>

        {/* Open Positions Section */}
        <motion.section 
            id="open-positions" 
            className="bg-secondary py-20 sm:py-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <div className="container max-w-4xl mx-auto">
                <div className="text-center">
                    <motion.h2 variants={itemVariants} className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">Current Openings</motion.h2>
                    <motion.p variants={itemVariants} className="mt-4 text-lg text-muted-foreground">Find your next opportunity and make your mark.</motion.p>
                </div>

                <motion.div variants={itemVariants} className="mt-12 space-y-8">
                    {Object.entries(jobOpenings).map(([department, jobs]) => (
                        <div key={department}>
                            <h3 className="font-headline text-2xl font-semibold text-primary mb-4">{department}</h3>
                            <div className="rounded-lg border bg-card shadow-sm">
                                {jobs.map((job, index) => (
                                    <div key={job.title}>
                                        <Accordion type="single" collapsible>
                                            <AccordionItem value={`item-${index}`} className="border-b-0">
                                                <AccordionTrigger className="flex w-full items-center justify-between p-6 text-left hover:bg-primary/5 transition-colors [&[data-state=open]]:bg-primary/5">
                                                    <div className="flex-1">
                                                        <p className="text-lg font-semibold text-primary">{job.title}</p>
                                                        <p className="text-sm text-muted-foreground">{job.location} &middot; {job.type}</p>
                                                    </div>
                                                    <Button variant="ghost" className="hidden md:inline-flex">Apply</Button>
                                                    <Plus className="h-5 w-5 shrink-0 text-primary transition-transform duration-200" />
                                                </AccordionTrigger>
                                                <AccordionContent className="p-6 pt-0">
                                                    <p className="text-muted-foreground mb-4">Job description summary... We're looking for a motivated individual with experience in X, Y, and Z to join our dynamic team. You'll be responsible for...</p>
                                                    <Button style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>View Details & Apply</Button>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                        {index < jobs.length - 1 && <div className="border-b border-border"></div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
                 <motion.div variants={itemVariants} className="text-center mt-16">
                    <p className="text-muted-foreground">Don't see the right fit?</p>
                    <Button variant="link" className="text-accent text-lg">Join our talent community</Button>
                </motion.div>
            </div>
        </motion.section>

      </main>
      <Footer />
    </div>
  );
}
