'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
};

export function HeroSection() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-banner");

  return (
    <motion.section 
      className="relative h-[60vh] min-h-[400px] w-full overflow-hidden text-primary-foreground md:h-[80vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 z-0">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover animate-kenburns"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-primary/40 backdrop-brightness-75"></div>
      </div>
      <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
        <motion.h1 
          className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Banking That Moves With You
        </motion.h1>
        <motion.p 
          className="mt-6 max-w-2xl text-lg text-primary-foreground/90 md:text-xl"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Experience the future of finance with Evertrust. Secure, seamless, and designed for your life.
        </motion.p>
        <motion.div 
          className="mt-10 flex items-center gap-x-6"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <Button asChild size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
            <Link href="/signup">
              Open an Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary">
            <Link href="/#features">
              Learn More
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
