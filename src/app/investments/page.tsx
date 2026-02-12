'use client';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Briefcase, ChevronRight, UserCog, LineChart as LineChartIcon, PieChart as PieChartIcon } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";

const chartData = [
  { date: 'Jan', performance: 10000 },
  { date: 'Feb', performance: 10500 },
  { date: 'Mar', performance: 10400 },
  { date: 'Apr', performance: 10800 },
  { date: 'May', performance: 11200 },
  { date: 'Jun', performance: 11500 },
];

const chartConfig = {
  performance: {
    label: "Growth",
    color: "hsl(var(--accent))",
  },
};

const allocationData = [
  { name: 'Stocks', value: 60, fill: "var(--color-stocks)" },
  { name: 'Bonds', value: 25, fill: "var(--color-bonds)" },
  { name: 'Alternatives', value: 10, fill: "var(--color-alts)" },
  { name: 'Cash', value: 5, fill: "var(--color-cash)" },
];

const allocationConfig = {
  stocks: { label: "Stocks", color: "hsl(var(--chart-1))" },
  bonds: { label: "Bonds", color: "hsl(var(--chart-2))" },
  alts: { label: "Alternatives", color: "hsl(var(--chart-3))" },
  cash: { label: "Cash", color: "hsl(var(--chart-4))" },
};

const investmentProducts = [
  {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: "Global Trusera Robo-Advisor",
    description: "Our intelligent automated investing platform builds and manages a diversified portfolio for you. Just set your risk level, and we'll handle the rest. Perfect for hands-off investors.",
    features: ["Automated rebalancing", "Tax-loss harvesting", "Low advisory fees", "Personalized portfolios"],
    cta: "Get Started with Robo-Advisor"
  },
  {
    icon: <UserCog className="h-10 w-10 text-primary" />,
    title: "Self-Directed Trading",
    description: "Take control of your financial future with our powerful, easy-to-use trading platform. Trade stocks, ETFs, options, and more with zero commission fees.",
    features: ["Commission-free trades", "Real-time market data", "Advanced charting tools", "Mobile trading app"],
    cta: "Start Trading Now"
  },
  {
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    title: "Managed Portfolios",
    description: "Partner with a dedicated financial advisor to create a custom investment strategy tailored to your unique goals, timeline, and risk tolerance. Ideal for complex financial situations.",
    features: ["Personalized financial plan", "Active portfolio management", "Access to exclusive investments", "Regular performance reviews"],
    cta: "Consult an Advisor"
  },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

const cardHover = {
    hover: { scale: 1.03, transition: { duration: 0.3 } }
};

export default function InvestmentsPage() {
  const investmentsImage = PlaceHolderImages.find(img => img.id === "investments-hero");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <motion.section 
          className="relative h-[60vh] min-h-[400px] w-full overflow-hidden text-primary-foreground md:h-[70vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
             <div className="absolute inset-0 z-0">
                {investmentsImage && (
                <Image
                    src={investmentsImage.imageUrl}
                    alt={investmentsImage.description}
                    fill
                    className="object-cover animate-kenburns"
                    data-ai-hint={investmentsImage.imageHint}
                    priority
                />
                )}
                <div className="absolute inset-0 bg-primary/40 backdrop-brightness-75"></div>
            </div>
             <motion.div 
              className="container relative z-10 flex h-full flex-col items-center justify-center text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
             >
                <motion.h1 variants={itemVariants} className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                    Invest with Confidence
                </motion.h1>
                <motion.p variants={itemVariants} className="mt-6 max-w-3xl text-lg text-primary-foreground/90 md:text-xl">
                    Whether you're a seasoned trader or just starting, our powerful tools and expert guidance can help you build a stronger financial future.
                </motion.p>
                 <motion.div variants={itemVariants} className="mt-10 flex items-center gap-x-6">
                    <Button size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                        Explore Investment Options
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </motion.div>
            </motion.div>
        </motion.section>

        {/* Investment Products Section */}
        <motion.section 
            id="products" 
            className="py-20 sm:py-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <motion.h2 variants={itemVariants} className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        Find Your Investing Style
                    </motion.h2>
                    <motion.p variants={itemVariants} className="mt-6 text-lg leading-8 text-muted-foreground">
                        We offer a range of investment solutions designed to meet you where you are and help you get where you want to go.
                    </motion.p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                     {investmentProducts.map((product) => (
                        <motion.div key={product.title} variants={itemVariants} whileHover="hover">
                            <motion.div variants={cardHover} className="h-full">
                                <Card className="flex flex-col bg-card shadow-lg h-full">
                                     <CardHeader className="items-center text-center">
                                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                                          {product.icon}
                                        </div>
                                        <CardTitle className="font-headline text-2xl">{product.title}</CardTitle>
                                        <CardDescription className="text-base">{product.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <ul className="space-y-3">
                                            {product.features.map(feature => (
                                                <li key={feature} className="flex items-start gap-3">
                                                    <ChevronRight className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                                                    <span className="text-muted-foreground">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                                            {product.cta}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>

        {/* Market Performance & Allocation Section */}
        <motion.section 
            id="performance" 
            className="bg-secondary py-20 sm:py-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div variants={itemVariants}>
                         <div className="flex items-center gap-4 mb-4">
                            <LineChartIcon className="h-8 w-8 text-primary" />
                             <h3 className="font-headline text-2xl font-bold text-primary">Hypothetical Growth of $10,000</h3>
                        </div>
                        <p className="text-muted-foreground mb-8">
                            See how a balanced portfolio could have performed over time. Past performance is not indicative of future results.
                        </p>
                        <Card className="bg-card shadow-lg">
                            <CardContent className="pt-6">
                                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                                    <LineChart
                                        accessibilityLayer
                                        data={chartData}
                                        margin={{
                                            left: 12,
                                            right: 12,
                                        }}
                                    >
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="date"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                        />
                                        <YAxis
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            tickFormatter={(value) => `$${value / 1000}k`}
                                        />
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent indicator="dot" />}
                                        />
                                        <Line
                                            dataKey="performance"
                                            type="monotone"
                                            stroke="var(--color-performance)"
                                            strokeWidth={2}
                                        />
                                    </LineChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </motion.div>
                     <motion.div variants={itemVariants}>
                         <div className="flex items-center gap-4 mb-4">
                            <PieChartIcon className="h-8 w-8 text-primary" />
                             <h3 className="font-headline text-2xl font-bold text-primary">Sample Portfolio Allocation</h3>
                        </div>
                        <p className="text-muted-foreground mb-8">
                            A diversified portfolio balances risk and reward by investing across different asset classes.
                        </p>
                        <Card className="bg-card shadow-lg">
                            <CardContent className="pt-6 flex justify-center">
                                <ChartContainer
                                    config={allocationConfig}
                                    className="mx-auto aspect-square h-[250px]"
                                >
                                    <PieChart>
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent hideLabel />}
                                        />
                                        <Pie
                                            data={allocationData}
                                            dataKey="value"
                                            nameKey="name"
                                            innerRadius={60}
                                            strokeWidth={5}
                                        >
                                            {allocationData.map((entry) => (
                                                <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                        <ChartLegend
                                            content={<ChartLegendContent nameKey="name" />}
                                        />
                                    </PieChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </motion.section>

      </main>
      <Footer />
    </div>
  );
}
