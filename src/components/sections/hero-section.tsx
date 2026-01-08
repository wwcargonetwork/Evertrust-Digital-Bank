import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-banner");

  return (
    <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden text-primary-foreground md:h-[80vh]">
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
        <h1 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Banking That Moves With You
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-primary-foreground/90 md:text-xl">
          Experience the future of finance with Evertrust. Secure, seamless, and designed for your life.
        </p>
        <div className="mt-10 flex items-center gap-x-6">
          <Button size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
            Open an Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
