'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Fingerprint, Shield, DatabaseZap, Lock } from "lucide-react";
import { motion } from "framer-motion";

const securityLayers = {
    savings: [
      {
        icon: <Fingerprint className="h-5 w-5 text-accent" />,
        title: "Multi-Factor Authentication",
        description: "Secure your account with a combination of something you know (password), something you have (phone), and something you are (biometrics)."
      },
      {
        icon: <Lock className="h-5 w-5 text-accent" />,
        title: "End-to-End Encryption",
        description: "All data, whether at rest or in transit, is protected with AES-256 encryption, the same standard used by governments."
      },
    ],
    loans: [
      {
        icon: <DatabaseZap className="h-5 w-5 text-accent" />,
        title: "Secure Data Verification",
        description: "We use encrypted channels to verify your identity and financial information, minimizing exposure of your sensitive data."
      },
      {
        icon: <Shield className="h-5 w-5 text-accent" />,
        title: "Advanced Fraud Monitoring",
        description: "Our AI-powered systems monitor for unusual activity on your loan accounts in real-time to prevent fraud."
      },
    ],
    trading: [
        {
        icon: <Lock className="h-5 w-5 text-accent" />,
        title: "Segregated Accounts",
        description: "Your investment funds are held in segregated accounts, separate from the bank's operational funds, for ultimate protection."
        },
        {
        icon: <Fingerprint className="h-5 w-5 text-accent" />,
        title: "Trade Authentication",
        description: "Every trade requires a unique confirmation, ensuring that only you can authorize transactions on your account."
        }
    ]
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
};


export function SecuritySection() {
  return (
    <motion.section 
        id="security" 
        className="bg-secondary py-20 sm:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container">
        <motion.div 
            className="mx-auto max-w-2xl text-center"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.3 } } }}
        >
          <motion.h2 variants={itemVariants} className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Your Security is Our Priority
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-6 text-lg leading-8 text-muted-foreground">
            Explore the layers of protection we've built to safeguard your finances. Select a service to see how we keep you secure.
          </motion.p>
        </motion.div>

        <motion.div variants={itemVariants}>
            <Tabs defaultValue="savings" className="mt-12 max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 bg-primary/10">
                <TabsTrigger value="savings">Savings Services</TabsTrigger>
                <TabsTrigger value="loans">Loan Services</TabsTrigger>
                <TabsTrigger value="trading">Stock Trading</TabsTrigger>
            </TabsList>
            <TabsContent value="savings" className="mt-6">
                <SecurityAccordion layers={securityLayers.savings} />
            </TabsContent>
            <TabsContent value="loans" className="mt-6">
                <SecurityAccordion layers={securityLayers.loans} />
            </TabsContent>
            <TabsContent value="trading" className="mt-6">
                <SecurityAccordion layers={securityLayers.trading} />
            </TabsContent>
            </Tabs>
        </motion.div>
      </div>
    </motion.section>
  );
}

function SecurityAccordion({ layers }: { layers: { icon: React.ReactNode, title: string, description: string }[] }) {
    return (
        <Accordion type="single" collapsible className="w-full">
            {layers.map((layer, index) => (
                <AccordionItem value={`item-${index}`} key={layer.title}>
                    <AccordionTrigger>
                        <div className="flex items-center gap-4">
                            {layer.icon}
                            <span className="font-headline text-lg">{layer.title}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-10">
                       {layer.description}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
