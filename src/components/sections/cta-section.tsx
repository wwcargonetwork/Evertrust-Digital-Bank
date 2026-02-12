'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function CtaSection() {
  return (
    <motion.section 
      id="cta" 
      className="bg-secondary"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7 }}
    >
      <div className="container py-20 sm:py-24">
        <div className="relative isolate overflow-hidden bg-primary shadow-2xl rounded-2xl px-6 pt-16 sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to take control
              <br />
              of your finances?
            </h2>
            <p className="mt-6 text-lg leading-8 text-primary-foreground/80">
              Join thousands of satisfied customers and start your journey with Global Trusera today. It only takes a few minutes.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <Button asChild size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                <Link href="/signup">
                  Open a Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative mt-16 h-80 lg:mt-8">
            <div className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              style={{
                transform: "translate(10rem, -8rem) rotate(30deg)",
                aspectRatio: "1155 / 678",
              }}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
