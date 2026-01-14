
'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { User, Mail, Phone, Home, Calendar, Landmark, Globe } from "lucide-react";
import { useUser, useDoc, useMemoFirebase, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { format, isValid } from 'date-fns';

interface UserProfileData {
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    phone: string;
    birthDate: string; // Stored as 'yyyy-MM-dd'
    gender: string;
    homeAddress: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    accountType: string;
    preferredCurrency: string;
}

function ProfileItem({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string | null }) {
    return (
        <div className="flex items-start space-x-4">
            <div className="text-muted-foreground mt-1">{icon}</div>
            <div>
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                <p className="text-md font-semibold">{value || 'Not provided'}</p>
            </div>
        </div>
    );
}

function ProfileSkeleton() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold mb-6"><Skeleton className="h-9 w-48" /></h1>
            <Card>
                <CardHeader>
                    <CardTitle><Skeleton className="h-7 w-1/2" /></CardTitle>
                    <CardDescription><Skeleton className="h-4 w-3/4" /></CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default function ProfilePage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();

    const userDocRef = useMemoFirebase(() => {
        if (!user) return null;
        return doc(firestore, 'users', user.uid);
    }, [firestore, user]);

    const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfileData>(userDocRef);
    
    if (isUserLoading || isProfileLoading || !user) {
        return <ProfileSkeleton />;
    }

    if (!userProfile) {
        return (
             <div className="text-center text-muted-foreground py-12">
                <User className="mx-auto h-12 w-12 mb-4" />
                <p className="text-lg">Could not load your profile.</p>
                <p>Please contact support if this issue persists.</p>
            </div>
        )
    }

    const birthDateObj = new Date(userProfile.birthDate);
    const formattedBirthDate = isValid(birthDateObj) ? format(birthDateObj, 'PPP') : 'Invalid Date';

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Details about you.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <ProfileItem icon={<User className="h-5 w-5" />} label="Full Name" value={userProfile.displayName} />
                            <ProfileItem icon={<Mail className="h-5 w-5" />} label="Email Address" value={userProfile.email} />
                            <ProfileItem icon={<Phone className="h-5 w-5" />} label="Phone Number" value={userProfile.phone} />
                            <ProfileItem icon={<Calendar className="h-5 w-5" />} label="Date of Birth" value={formattedBirthDate} />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Account Details</CardTitle>
                        <CardDescription>Your banking preferences.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <ProfileItem icon={<Landmark className="h-5 w-5" />} label="Account Type" value={userProfile.accountType.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} />
                        <ProfileItem icon={<Globe className="h-5 w-5" />} label="Preferred Currency" value={userProfile.preferredCurrency.toUpperCase()} />
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Address</CardTitle>
                    <CardDescription>Your primary residential address.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ProfileItem icon={<Home className="h-5 w-5" />} label="Street Address" value={userProfile.homeAddress} />
                        <ProfileItem icon={<Home className="h-5 w-5" />} label="City" value={userProfile.city} />
                        <ProfileItem icon={<Home className="h-5 w-5" />} label="State / Province" value={userProfile.state} />
                        <ProfileItem icon={<Home className="h-5 w-5" />} label="Zip / Postal Code" value={userProfile.zipcode} />
                        <ProfileItem icon={<Home className="h-5 w-5" />} label="Country" value={userProfile.country} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
