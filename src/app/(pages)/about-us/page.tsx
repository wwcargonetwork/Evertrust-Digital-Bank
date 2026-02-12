
'use client';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, TrendingUp, Target, Handshake } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const timelineEvents = [
    { year: "2021", title: "The Idea", description: "A small team of finance and tech experts envisioned a digital-first bank built on transparency and innovation." },
    { year: "2022", title: "Foundation & Funding", description: "Global Trusera Holdings was officially founded, securing initial seed funding to build our core platform." },
    { year: "2023", title: "Platform Launch", description: "We launched our secure banking platform to the public, offering a new way for people to manage their finances." },
    { year: "2024", title: "Expansion", description: "Expanded our services to include investments and corporate banking, serving a wider range of customers." }
];

const leadershipTeam = [
    { name: "Eleanor Vance", role: "Chief Executive Officer", image: "https://picsum.photos/seed/leader1/400/400", hint: "professional headshot woman" },
    { name: "Marcus Thorne", role: "Chief Technology Officer", image: "https://picsum.photos/seed/leader2/400/400", hint: "professional headshot man" },
    { name: "Isabella Rossi", role: "Chief Financial Officer", image: "https://picsum.photos/seed/leader3/400/400", hint: "professional headshot female" },
    { name: "Julian Endo", role: "Chief Operating Officer", image: "https://picsum.photos/seed/leader4/400/400", hint: "professional headshot male" }
];

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

const cardHover = {
    hover: {
        scale: 1.05,
        transition: { duration: 0.3 }
    }
};

export default function AboutUsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <motion.section 
            className="relative h-[60vh] min-h-[400px] w-full text-primary-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://picsum.photos/seed/about-hero/1920/1080"
                    alt="A modern office with people collaborating"
                    fill
                    className="object-cover animate-kenburns"
                    data-ai-hint="modern office collaboration"
                    priority
                />
                <div className="absolute inset-0 bg-primary/50 backdrop-brightness-50"></div>
            </div>
             <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
                <motion.h1 
                    className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.5 }}
                >
                    Redefining the Future of Finance
                </motion.h1>
                <motion.p 
                    className="mt-6 max-w-3xl text-lg text-primary-foreground/90 md:text-xl"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.7 }}
                >
                    Global Trusera is more than a bank. We are a team of visionaries, innovators, and customer advocates committed to building a transparent and accessible financial future for everyone.
                </motion.p>
            </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section 
            id="mission" 
            className="py-20 sm:py-28"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="container">
                 <div className="mx-auto max-w-2xl text-center">
                    <motion.div variants={itemVariants} className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                        Our Mission
                    </motion.div>
                    <motion.h2 variants={itemVariants} className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        To Empower Financial Freedom
                    </motion.h2>
                    <motion.p variants={itemVariants} className="mt-6 text-lg leading-8 text-muted-foreground">
                       Our mission is to democratize finance by providing intuitive, secure, and powerful tools that help people take control of their financial lives, achieve their goals, and build lasting wealth.
                    </motion.p>
                </div>
            </div>
        </motion.section>

        {/* Timeline Section */}
        <motion.section 
            id="history" 
            className="bg-secondary py-20 sm:py-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <motion.h2 variants={itemVariants} className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">Our Journey</motion.h2>
                    <motion.p variants={itemVariants} className="mt-4 text-lg text-muted-foreground">From a simple idea to a trusted digital bank.</motion.p>
                </div>
                <div className="relative mt-16">
                    <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-primary/20"></div>
                    {timelineEvents.map((event, index) => (
                        <motion.div 
                            key={index}
                            className={`relative mb-12 flex w-full items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className={`relative w-1/2 px-8 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                <div className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-primary ring-4 ring-secondary ${index % 2 === 0 ? ' -right-2' : '-left-2'}"></div>
                                <h3 className="font-headline text-2xl font-bold text-primary">{event.year}</h3>
                                <p className="mt-1 font-semibold text-accent">{event.title}</p>
                                <p className="mt-2 text-muted-foreground">{event.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>

        {/* Leadership Section */}
        <motion.section 
            id="leadership" 
            className="py-20 sm:py-28"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <motion.h2 variants={itemVariants} className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">Meet Our Leaders</motion.h2>
                    <motion.p variants={itemVariants} className="mt-6 text-lg leading-8 text-muted-foreground">
                        The visionary minds steering Global Trusera toward a brighter financial future.
                    </motion.p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 text-center sm:grid-cols-2 lg:grid-cols-4">
                    {leadershipTeam.map((leader, index) => (
                        <motion.div key={leader.name} variants={itemVariants} custom={index}>
                             <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full">
                                <Image 
                                    src={leader.image}
                                    alt={`Portrait of ${leader.name}`}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={leader.hint}
                                />
                            </div>
                            <h3 className="mt-6 font-headline text-xl font-semibold leading-7 tracking-tight text-primary">{leader.name}</h3>
                            <p className="text-sm leading-6 text-accent">{leader.role}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
        
        {/* CTA Section */}
        <motion.section 
            id="join-us" 
            className="bg-primary/5 py-20 sm:py-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
        >
            <div className="container text-center">
                 <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                    Want to be part of the story?
                </h2>
                <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-muted-foreground">
                    We're always looking for passionate and talented individuals to join our team. Explore our open roles and help us build the future of finance.
                </p>
                <div className="mt-10">
                    <Button asChild size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                        <Link href="/careers">View Careers <ArrowRight className="ml-2 h-5 w-5" /></Link>
                    </Button>
                </div>
            </div>
        </motion.section>

      </main>
      <Footer />
    </div>
  );
}
