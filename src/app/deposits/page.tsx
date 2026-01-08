
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, DollarSign, PiggyBank, CalendarClock } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const checkingFeatures = [
    { feature: "Minimum Opening Deposit", basic: "$25", premium: "$100" },
    { feature: "Monthly Service Fee", basic: "$10 (or $0 with direct deposit)", premium: "$25 (or $0 with $5,000 balance)" },
    { feature: "ATM Fee Reimbursement", basic: "Up to $10/month", premium: "Unlimited" },
    { feature: "Interest Bearing", basic: "No", premium: "Yes, tiered rates" },
    { feature: "Overdraft Protection", basic: "Optional", premium: "Included" },
];

const savingsFeatures = [
    { feature: "Annual Percentage Yield (APY)", standard: "1.50%", highYield: "4.50%" },
    { feature: "Minimum Opening Deposit", standard: "$50", highYield: "$1,000" },
    { feature: "Monthly Service Fee", standard: "$5 (or $0 with $300 balance)", highYield: "$15 (or $0 with $10,000 balance)" },
    { feature: "Withdrawal Limit", standard: "6 per month", highYield: "6 per month" },
    { feature: "Automated Savings Tools", standard: "Yes", highYield: "Yes, with advanced planning" },
];

const cdFeatures = [
    { term: "6 Months", apy: "5.25%", minDeposit: "$500" },
    { term: "1 Year", apy: "5.10%", minDeposit: "$500" },
    { term: "2 Years", apy: "4.75%", minDeposit: "$500" },
    { term: "3 Years", apy: "4.50%", minDeposit: "$500" },
    { term: "5 Years", apy: "4.25%", minDeposit: "$500" },
];


export default function DepositsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/5 py-20 text-center">
            <div className="container">
                <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
                    Secure Your Future with Our Deposit Accounts
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
                    Whether you're saving for a rainy day, managing daily expenses, or investing for the long term, we have the right account to help you reach your goals.
                </p>
            </div>
        </section>

        {/* Checking Accounts Section */}
        <section id="checking" className="py-20 sm:py-28">
          <div className="container">
            <div className="flex flex-col lg:flex-row lg:items-center gap-12">
                <div className="lg:w-1/3">
                    <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                        Checking
                    </div>
                    <h2 className="font-headline text-3xl font-bold text-primary">Everyday Banking, Elevated</h2>
                    <p className="mt-4 text-muted-foreground text-lg">Manage your daily finances with ease and enjoy premium benefits with our checking account options.</p>
                    <Button size="lg" className="mt-6" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                        Open a Checking Account <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
                <div className="lg:w-2/3">
                     <Card className="bg-card shadow-lg">
                        <CardHeader>
                            <CardTitle>Checking Account Comparison</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead>Feature</TableHead>
                                    <TableHead>Evertrust Basic Checking</TableHead>
                                    <TableHead>Evertrust Premium Checking</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {checkingFeatures.map((item) => (
                                    <TableRow key={item.feature}>
                                        <TableCell className="font-medium">{item.feature}</TableCell>
                                        <TableCell>{item.basic}</TableCell>
                                        <TableCell>{item.premium}</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
          </div>
        </section>
        
        {/* Savings Accounts Section */}
        <section id="savings" className="bg-secondary py-20 sm:py-28">
            <div className="container">
                <div className="flex flex-col lg:flex-row-reverse lg:items-center gap-12">
                    <div className="lg:w-1/3">
                        <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                            Savings
                        </div>
                        <h2 className="font-headline text-3xl font-bold text-primary">Watch Your Money Grow</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Achieve your savings goals faster with our competitive interest rates and smart savings tools.</p>
                         <Button size="lg" className="mt-6" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                            Start Saving Today <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                    <div className="lg:w-2/3">
                        <Card className="bg-card shadow-lg">
                            <CardHeader>
                                <CardTitle>Savings Account Comparison</CardTitle>
                            </CardHeader>
                            <CardContent>
                               <Table>
                                    <TableHeader>
                                        <TableRow>
                                        <TableHead>Feature</TableHead>
                                        <TableHead>Standard Savings</TableHead>
                                        <TableHead>High-Yield Savings</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {savingsFeatures.map((item) => (
                                        <TableRow key={item.feature}>
                                            <TableCell className="font-medium">{item.feature}</TableCell>
                                            <TableCell>{item.standard}</TableCell>
                                            <TableCell>{item.highYield}</TableCell>
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>

        {/* CDs Section */}
        <section id="cds" className="py-20 sm:py-28">
          <div className="container">
             <div className="mx-auto max-w-2xl text-center">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                    Certificates of Deposit
                </div>
                <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                    Lock in a Great Rate
                </h2>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                    Certificates of Deposit (CDs) offer a fixed interest rate for a fixed term, providing a safe and predictable way to grow your savings.
                </p>
            </div>
            <div className="mt-16">
                 <Card className="bg-card shadow-lg">
                    <CardHeader>
                        <CardTitle>Current CD Rates</CardTitle>
                        <CardDescription>Rates effective as of today. APY assumes principal and interest remain on deposit for the term of the certificate.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Term</TableHead>
                                <TableHead>APY</TableHead>
                                <TableHead>Minimum Deposit</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cdFeatures.map((item) => (
                                <TableRow key={item.term}>
                                    <TableCell className="font-medium">{item.term}</TableCell>
                                    <TableCell>{item.apy}</TableCell>
                                    <TableCell>{item.minDeposit}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                     <CardFooter>
                        <Button style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                            Open a CD <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
