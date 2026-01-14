
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { User, Mail, Phone, Home, Calendar, Landmark, Globe, Edit, Save } from "lucide-react";
import { useUser, useDoc, useMemoFirebase, useFirestore, updateDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { format, isValid, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';


const profileSchema = z.object({
    displayName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
    phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
    homeAddress: z.string().min(5, { message: 'Please enter a valid address.' }),
    city: z.string().min(2, { message: 'Please enter a valid city.' }),
    state: z.string().min(2, { message: 'Please enter a valid state.' }),
    country: z.string().min(2, { message: 'Please enter a valid country.' }),
    zipcode: z.string().min(4, { message: 'Please enter a valid zipcode.' }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

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
    const { toast } = useToast();
    const [isEditing, setIsEditing] = React.useState(false);

    const userDocRef = useMemoFirebase(() => {
        if (!user) return null;
        return doc(firestore, 'users', user.uid);
    }, [firestore, user]);

    const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfileData>(userDocRef);
    
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
    });

    React.useEffect(() => {
        if (userProfile) {
            form.reset({
                displayName: userProfile.displayName,
                phone: userProfile.phone,
                homeAddress: userProfile.homeAddress,
                city: userProfile.city,
                state: userProfile.state,
                country: userProfile.country,
                zipcode: userProfile.zipcode,
            });
        }
    }, [userProfile, form]);
    
    const onSubmit = (values: ProfileFormValues) => {
        if (!userDocRef) return;
        updateDocumentNonBlocking(userDocRef, values);
        toast({
            title: "Profile Updated",
            description: "Your changes have been saved successfully.",
        });
        setIsEditing(false);
    };

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

    // The backend stores date as a 'yyyy-MM-dd' string.
    // We need to add time information to it to prevent timezone shifts when creating a Date object.
    const birthDateObj = userProfile.birthDate ? new Date(userProfile.birthDate + 'T00:00:00') : null;
    const formattedBirthDate = birthDateObj && isValid(birthDateObj) ? format(birthDateObj, 'PPP') : 'Invalid Date';

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Your Profile</h1>
                    {!isEditing ? (
                        <Button type="button" onClick={() => setIsEditing(true)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit Profile
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button type="button" variant="outline" onClick={() => { setIsEditing(false); form.reset(); }}>Cancel</Button>
                            <Button type="submit">
                                <Save className="mr-2 h-4 w-4" /> Save Changes
                            </Button>
                        </div>
                    )}
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Details about you.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {isEditing ? (
                                    <FormField control={form.control} name="displayName" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                ) : (
                                    <ProfileItem icon={<User className="h-5 w-5" />} label="Full Name" value={userProfile.displayName} />
                                )}
                                <ProfileItem icon={<Mail className="h-5 w-5" />} label="Email Address" value={userProfile.email} />
                                {isEditing ? (
                                     <FormField control={form.control} name="phone" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                ) : (
                                    <ProfileItem icon={<Phone className="h-5 w-5" />} label="Phone Number" value={userProfile.phone} />
                                )}
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
                             {isEditing ? (
                                <FormField control={form.control} name="homeAddress" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Street Address</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                             ) : (
                                <ProfileItem icon={<Home className="h-5 w-5" />} label="Street Address" value={userProfile.homeAddress} />
                             )}
                              {isEditing ? (
                                <FormField control={form.control} name="city" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                             ) : (
                                <ProfileItem icon={<Home className="h-5 w-5" />} label="City" value={userProfile.city} />
                             )}
                              {isEditing ? (
                                <FormField control={form.control} name="state" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>State / Province</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                             ) : (
                                <ProfileItem icon={<Home className="h-5 w-5" />} label="State / Province" value={userProfile.state} />
                             )}
                              {isEditing ? (
                                <FormField control={form.control} name="zipcode" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Zip / Postal Code</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                             ) : (
                                <ProfileItem icon={<Home className="h-5 w-5" />} label="Zip / Postal Code" value={userProfile.zipcode} />
                             )}
                              {isEditing ? (
                                <FormField control={form.control} name="country" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                             ) : (
                                <ProfileItem icon={<Home className="h-5 w-5" />} label="Country" value={userProfile.country} />
                             )}
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}

    