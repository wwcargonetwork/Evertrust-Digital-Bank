"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { generateCustomerTestimonial, type CustomerTestimonialOutput } from '@/ai/flows/generate-customer-testimonials';
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from '@/components/ui/skeleton';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const customerProfiles = [
  { 
    customerProfile: 'A 35-year-old female entrepreneur of Asian descent who runs a small tech startup.', 
    productOrService: 'Business Loan', 
    testimonialRequest: 'A positive testimonial about the easy and fast application process that helped her scale her business.',
    name: 'Lena Chen',
    role: 'Founder, Innovate Co.'
  },
  { 
    customerProfile: 'A 50-year-old male teacher of African descent, saving for retirement.', 
    productOrService: 'High-Yield Savings Account', 
    testimonialRequest: 'A heartfelt testimonial about how the bank\'s savings tools are helping him achieve his retirement goals with confidence.',
    name: 'David Okoro',
    role: 'High School Teacher'
  },
  { 
    customerProfile: 'A 28-year-old freelance graphic designer of Hispanic descent, managing finances on the go.', 
    productOrService: 'Mobile Banking App', 
    testimonialRequest: 'An enthusiastic review of the mobile app\'s user-friendly interface and powerful features for managing finances anywhere.',
    name: 'Sofia Reyes',
    role: 'Graphic Designer'
  }
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

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<(CustomerTestimonialOutput & { name: string; role: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const results = await Promise.all(
          customerProfiles.map(async (profile) => {
            const result = await generateCustomerTestimonial({
                customerProfile: profile.customerProfile,
                productOrService: profile.productOrService,
                testimonialRequest: profile.testimonialRequest
            });
            return { ...result, name: profile.name, role: profile.role };
          })
        );
        setTestimonials(results);
      } catch (error) {
        console.error("Failed to generate testimonials", error);
        // In case of an error, we could set a default state or show an error message.
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  return (
    <motion.section 
      id="testimonials" 
      className="py-20 sm:py-28"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2 variants={itemVariants} className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Loved by Customers Worldwide
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-6 text-lg leading-8 text-muted-foreground">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with Evertrust.
          </motion.p>
        </div>

        <motion.div variants={itemVariants}>
          <Carousel opts={{ loop: true }} className="mt-16 w-full max-w-4xl mx-auto">
            <CarouselContent>
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-4">
                      <Card className="h-[400px]">
                        <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                          <Skeleton className="h-24 w-24 rounded-full mb-4" />
                          <Skeleton className="h-4 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-1/2 mb-4" />
                          <Skeleton className="h-16 w-full" />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                testimonials.map((item, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/1">
                    <div className="p-4">
                      <Card className="h-full bg-card shadow-lg">
                        <CardContent className="flex flex-col items-center text-center p-8">
                           <div className="relative h-24 w-24 mb-4">
                              <Image
                                  src={item.headshot}
                                  alt={`Headshot of ${item.name}`}
                                  width={96}
                                  height={96}
                                  className="rounded-full object-cover"
                              />
                          </div>
                          <p className="font-headline text-xl font-semibold text-primary">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.role}</p>
                          <div className="flex justify-center my-4">
                              {Array(5).fill(0).map((_, i) => <Star key={i} className="h-5 w-5 fill-accent text-accent" />)}
                          </div>
                          <blockquote className="mt-2 text-lg italic text-foreground/80 before:content-['“'] after:content-['”']">
                            {item.testimonial}
                          </blockquote>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))
              )}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </motion.div>
      </div>
    </motion.section>
  );
}
