'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, LifeBuoy, Users, Banknote } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "Unmatched Security",
    description: "Multi-layered security protocols to keep your funds and data safe, 24/7.",
  },
  {
    icon: <Banknote className="h-10 w-10 text-primary" />,
    title: "Competitive Rates",
    description: "Enjoy high-yield savings accounts and low-interest loans to help your money grow.",
  },
  {
    icon: <LifeBuoy className="h-10 w-10 text-primary" />,
    title: "24/7 Support",
    description: "Our dedicated support team is always available to assist you with any questions.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Community Focused",
    description: "We invest in local communities and projects that matter to our customers.",
  },
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

export function FeaturesSection() {
  return (
    <motion.section 
        id="features" 
        className="py-20 sm:py-28"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2 variants={itemVariants} className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Why Choose Global Trusera?
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-6 text-lg leading-8 text-muted-foreground">
            We're not just a bank; we're your financial partner. We combine cutting-edge technology with a commitment to your security and success.
          </motion.p>
        </div>
        <motion.div 
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
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
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
