'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Banknote } from "lucide-react";

export default function AccountsPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Accounts</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Your Accounts</CardTitle>
                    <CardDescription>Manage your checking and savings accounts.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-muted-foreground py-12">
                        <Banknote className="mx-auto h-12 w-12 mb-4" />
                        <p className="text-lg">Account information will be displayed here.</p>
                        <p>This feature is currently under construction.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
