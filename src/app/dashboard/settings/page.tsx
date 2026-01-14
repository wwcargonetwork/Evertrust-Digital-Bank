'use client';

import { useTheme } from "next-themes";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Settings</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize the look and feel of your dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Label htmlFor="theme">Theme</Label>
                        <RadioGroup
                            id="theme"
                            value={theme}
                            onValueChange={setTheme}
                            className="flex space-x-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="light" id="light" />
                                <Label htmlFor="light">Light</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="dark" id="dark" />
                                <Label htmlFor="dark">Dark</Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <RadioGroupItem value="system" id="system" />
                                <Label htmlFor="system">System</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
