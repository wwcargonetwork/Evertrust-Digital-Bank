import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, LifeBuoy, Users, Banknote } from "lucide-react";

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

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Why Choose Evertrust?
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We're not just a bank; we're your financial partner. We combine cutting-edge technology with a commitment to your security and success.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center bg-card shadow-lg hover:shadow-xl transition-shadow duration-300">
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
          ))}
        </div>
      </div>
    </section>
  );
}
