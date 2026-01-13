'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your notification, security, and theme preferences.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-muted-foreground py-12">
                        <Settings className="mx-auto h-12 w-12 mb-4" />
                        <p className="text-lg">Settings options will be available here.</p>
                        <p>This feature is currently under construction.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
