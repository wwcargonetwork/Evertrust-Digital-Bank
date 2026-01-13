'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { User } from "lucide-react";

export default function ProfilePage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Profile</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Your Profile</CardTitle>
                    <CardDescription>View and manage your personal information.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-muted-foreground py-12">
                        <User className="mx-auto h-12 w-12 mb-4" />
                        <p className="text-lg">Profile information will be displayed here.</p>
                        <p>This feature is currently under construction.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
