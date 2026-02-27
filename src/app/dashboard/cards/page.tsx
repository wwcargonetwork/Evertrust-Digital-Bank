
'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserCards, type UserCard } from '@/hooks/use-user-cards';
import { CreditCard, Plus, ShoppingCart, ShieldCheck, BadgeCheck, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const availableCards = [
    { type: 'virtual', name: 'Global Virtual Stealth', brand: 'visa', price: 15, description: 'Instant virtual card for secure online shopping.' },
    { type: 'debit', name: 'Global Classic Debit', brand: 'mastercard', price: 25, description: 'Physical debit card for everyday use.' },
    { type: 'credit', name: 'Global Elite Credit', brand: 'amex', price: 99, description: 'Premium credit card with global travel perks.' },
];

const addCardSchema = z.object({
    nameOnCard: z.string().min(2, "Name is required"),
    cardNumber: z.string().regex(/^\d{16}$/, "Must be 16 digits"),
    expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format MM/YY"),
    brand: z.enum(['visa', 'mastercard', 'amex']),
    type: z.enum(['debit', 'credit', 'virtual']),
});

type AddCardValues = z.infer<typeof addCardSchema>;

export default function CardsPage() {
    const { cards, isLoading, purchaseCard, addOwnCard } = useUserCards();
    const { toast } = useToast();
    
    const form = useForm<AddCardValues>({
        resolver: zodResolver(addCardSchema),
        defaultValues: {
            brand: 'visa',
            type: 'debit',
        }
    });

    const handlePurchase = async (item: typeof availableCards[0]) => {
        try {
            await purchaseCard({
                type: item.type as any,
                nameOnCard: item.name,
                cardNumber: '**** **** **** ' + Math.floor(1000 + Math.random() * 9000),
                expiryDate: '12/28',
                brand: item.brand as any,
                price: item.price
            });
            toast({ title: "Purchase Initiated", description: "Your card request is being processed." });
        } catch (err: any) {
            toast({ variant: "destructive", title: "Error", description: err.message });
        }
    }

    const onAddOwnSubmit = async (values: AddCardValues) => {
        try {
            // Mask the number for storage safety in this prototype
            const maskedNumber = '**** **** **** ' + values.cardNumber.slice(-4);
            await addOwnCard({
                ...values,
                cardNumber: maskedNumber,
            });
            toast({ title: "Success", description: "Your card has been added to your wallet." });
            form.reset();
        } catch (err: any) {
            toast({ variant: "destructive", title: "Error", description: err.message });
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Cards & Wallet</h1>
            <Tabs defaultValue="my-cards" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                    <TabsTrigger value="my-cards">My Cards</TabsTrigger>
                    <TabsTrigger value="get-card">Get a Card</TabsTrigger>
                    <TabsTrigger value="add-own">Add Own Card</TabsTrigger>
                </TabsList>

                {/* My Cards Tab */}
                <TabsContent value="my-cards" className="mt-6">
                    {isLoading ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {Array.from({length: 3}).map((_, i) => <Skeleton key={i} className="h-48 w-full rounded-xl" />)}
                        </div>
                    ) : cards?.length === 0 ? (
                        <div className="text-center py-12 border rounded-lg bg-muted/20">
                            <CreditCard className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold">No cards found</h3>
                            <p className="text-muted-foreground">Purchase a new card or add your existing one to get started.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {cards?.map((card) => (
                                <Card key={card.id} className="relative overflow-hidden bg-primary text-primary-foreground">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <div className="font-bold tracking-widest text-lg uppercase">{card.brand}</div>
                                        <CreditCard className="h-6 w-6 opacity-50" />
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        <div className="text-xl font-mono mb-4">{card.cardNumber}</div>
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-[10px] uppercase opacity-70">Card Holder</p>
                                                <p className="font-semibold text-sm">{card.nameOnCard}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase opacity-70">Expires</p>
                                                <p className="font-semibold text-sm">{card.expiryDate}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <div className="absolute top-0 right-0 p-2">
                                        <div className={`text-[10px] px-2 py-0.5 rounded-full capitalize ${card.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                                            {card.status}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>

                {/* Get a Card Tab */}
                <TabsContent value="get-card" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {availableCards.map((item) => (
                            <Card key={item.name} className="flex flex-col">
                                <CardHeader>
                                    <div className="flex justify-between items-center mb-2">
                                        <BadgeCheck className="text-accent h-8 w-8" />
                                        <span className="text-2xl font-bold">${item.price}</span>
                                    </div>
                                    <CardTitle>{item.name}</CardTitle>
                                    <CardDescription className="capitalize">{item.type} Card • {item.brand}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                    <ul className="mt-4 space-y-2 text-xs">
                                        <li className="flex items-center gap-2"><ShieldCheck className="h-3 w-3" /> Secure PIN Protection</li>
                                        <li className="flex items-center gap-2"><Lock className="h-3 w-3" /> Fraud Monitoring</li>
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full" onClick={() => handlePurchase(item)}>
                                        <ShoppingCart className="mr-2 h-4 w-4" /> Purchase Now
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Add Own Card Tab */}
                <TabsContent value="add-own" className="mt-6">
                    <Card className="max-w-xl mx-auto">
                        <CardHeader>
                            <CardTitle>Link Your Card</CardTitle>
                            <CardDescription>Add an existing card from another institution to your Global Trusera wallet.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onAddOwnSubmit)} className="space-y-4">
                                    <FormField control={form.control} name="nameOnCard" render={({ field }) => (
                                        <FormItem><FormLabel>Name on Card</FormLabel><FormControl><Input placeholder="J. DOE" {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                    <FormField control={form.control} name="cardNumber" render={({ field }) => (
                                        <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="1234567812345678" maxLength={16} {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField control={form.control} name="expiryDate" render={({ field }) => (
                                            <FormItem><FormLabel>Expiry Date</FormLabel><FormControl><Input placeholder="MM/YY" maxLength={5} {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField control={form.control} name="brand" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Brand</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="visa">Visa</SelectItem>
                                                        <SelectItem value="mastercard">Mastercard</SelectItem>
                                                        <SelectItem value="amex">Amex</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                    <FormField control={form.control} name="type" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Card Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                                <SelectContent>
                                                    <SelectItem value="debit">Debit Card</SelectItem>
                                                    <SelectItem value="credit">Credit Card</SelectItem>
                                                    <SelectItem value="virtual">Virtual Card</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <Button type="submit" className="w-full"><Plus className="mr-2 h-4 w-4" /> Add to Wallet</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
