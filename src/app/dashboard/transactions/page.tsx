'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { List } from "lucide-react";

export default function TransactionsPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Transactions</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Your Transactions</CardTitle>
                    <CardDescription>A list of your recent transactions.</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="text-center text-muted-foreground py-12">
                        <List className="mx-auto h-12 w-12 mb-4" />
                        <p className="text-lg">Transaction history will be displayed here.</p>
                        <p>This feature is currently under construction.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
