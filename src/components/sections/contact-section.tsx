
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Send } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
};

export function ContactSection() {
  return (
    <motion.section 
      id="contact" 
      className="py-20 sm:py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div className="space-y-6" variants={itemVariants}>
           <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Contact Us
            </div>
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Have Questions? We're Here to Help.
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you're a prospective customer or just have a question about our services, our team is ready to provide you with the answers you need. Fill out the form, and we'll get back to you shortly.
          </p>
          <div className="flex items-center space-x-4 text-muted-foreground">
            <Mail className="h-6 w-6 text-primary" />
            <span>info@evertrustdigitalbank.com</span>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
            <form action="https://formsubmit.co/info@evertrustdigitalbank.com" method="POST" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea id="message" name="message" placeholder="How can we help you today?" className="min-h-[120px]" required />
              </div>
              <input type="hidden" name="_next" value="/" />
              <input type="hidden" name="_captcha" value="false" />
              <Button type="submit" className="w-full" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                Send Message <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
        </motion.div>
      </div>
    </motion.section>
  );
}
