'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Landmark, ArrowRight, ArrowLeft, Eye, EyeOff, CalendarIcon } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useAuth, useFirebase } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';


const formSchema = z.object({
  // Step 1: Authentication
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  confirmPassword: z.string(),
  pin: z.string().length(4, { message: 'PIN must be 4 digits.' }).regex(/^\d{4}$/, { message: 'PIN must be numeric.' }),
  confirmPin: z.string(),

  // Step 2: Personal Info
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  birthDate: z.date({ required_error: 'A date of birth is required.' }),
  gender: z.string().min(1, { message: 'Please select a gender.' }),
  religion: z.string().min(1, { message: 'Please select a religion.' }),

  // Step 3: Address
  homeAddress: z.string().min(5, { message: 'Please enter a valid address.' }),
  state: z.string().min(2, { message: 'Please enter a valid state.' }),
  city: z.string().min(2, { message: 'Please enter a valid city.' }),
  country: z.string().min(2, { message: 'Please enter a valid country.' }),
  zipcode: z.string().min(4, { message: 'Please enter a valid zipcode.' }),

  // Step 4: Next Of Kin
  kinFirstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  kinLastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  kinRelationship: z.string().min(2, { message: 'Please specify the relationship.' }),
  kinAddress: z.string().min(5, { message: 'Please enter a valid address.' }),

  // Step 5: Bank System Info
  preferredCurrency: z.string().min(1, { message: 'Please select a currency.' }),
  accountType: z.string().min(1, { message: 'Please select an account type.' }),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})
.refine((data) => data.pin === data.confirmPin, {
    message: "PINs don't match",
    path: ['confirmPin'],
});

type FormValues = z.infer<typeof formSchema>;

const steps = [
    { id: 'Step 1', title: 'Authentication', fields: ['email', 'password', 'confirmPassword', 'pin', 'confirmPin'] },
    { id: 'Step 2', title: 'Personal Info', fields: ['firstName', 'lastName', 'phone', 'birthDate', 'gender', 'religion'] },
    { id: 'Step 3', title: 'Address', fields: ['homeAddress', 'state', 'city', 'country', 'zipcode'] },
    { id: 'Step 4', title: 'Next Of Kin', fields: ['kinFirstName', 'kinLastName', 'kinRelationship', 'kinAddress'] },
    { id: 'Step 5', title: 'Bank System Info', fields: ['preferredCurrency', 'accountType'] },
];

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const auth = useAuth();
  const { firestore } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: '',
        password: '',
        confirmPassword: '',
        pin: '',
        confirmPin: '',
        firstName: '',
        lastName: '',
        phone: '',
        gender: '',
        religion: '',
        homeAddress: '',
        state: '',
        city: '',
        country: '',
        zipcode: '',
        kinFirstName: '',
        kinLastName: '',
        kinRelationship: '',
        kinAddress: '',
        preferredCurrency: '',
        accountType: '',
    },
  });

  async function processForm(values: FormValues) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;

        // Don't store sensitive info like password or PIN in Firestore
        const { password, confirmPassword, pin, confirmPin, ...userProfileData } = values;

        const userProfile = {
            ...userProfileData,
            displayName: `${values.firstName} ${values.lastName}`,
            birthDate: format(userProfileData.birthDate, 'yyyy-MM-dd'),
            createdAt: serverTimestamp(),
            status: 'active',
            accountBalance: 0, // Initialize balance to 0
        };

        const userDocRef = doc(firestore, 'users', user.uid);
        setDocumentNonBlocking(userDocRef, userProfile, { merge: true });

        toast({
            title: 'Signup Successful!',
            description: 'Your account has been created.',
        });

        router.push('/dashboard');

    } catch (error: any) {
        console.error('Signup Error:', error);
        toast({
            variant: 'destructive',
            title: 'Signup Failed',
            description: error.message || 'An unexpected error occurred.',
        });
    }
  }

  type FieldName = keyof FormValues;

  const next = async () => {
    const fields = steps[currentStep].fields as FieldName[];
    const output = await form.trigger(fields, { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep(step => step + 1);
    } else {
        await form.handleSubmit(processForm)();
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(step => step - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  
  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-2xl shadow-2xl">
          <CardHeader>
             <Link href="/" className="flex items-center justify-center space-x-2 mb-2">
                <Landmark className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold font-headline text-primary">Global Trusera</span>
              </Link>
            <CardTitle className="text-center font-headline text-3xl">{steps[currentStep].title}</CardTitle>
            <CardDescription className="text-center">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
            </CardDescription>
            <Progress value={progress} className="w-full mt-4" />
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(processForm)} className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {currentStep === 0 && <AuthenticationStep form={form} />}
                    {currentStep === 1 && <PersonalInfoStep form={form} />}
                    {currentStep === 2 && <AddressStep form={form} />}
                    {currentStep === 3 && <NextOfKinStep form={form} />}
                    {currentStep === 4 && <BankInfoStep form={form} />}
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-between pt-4">
                  <Button type="button" onClick={prev} disabled={currentStep === 0} variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                  <Button type="button" onClick={next} style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} disabled={form.formState.isSubmitting}>
                    {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
             <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/signin" className="font-semibold text-accent hover:underline">
                  Sign In
                </Link>
              </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

// Step 1: Authentication Component
const AuthenticationStep = ({ form }: { form: UseFormReturn<FormValues> }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    return (
        <div className="space-y-4">
            <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input type="email" placeholder="john.doe@example.com" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground">
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground">
                                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="pin" render={({ field }) => (
                <FormItem>
                    <FormLabel>4-Digit PIN</FormLabel>
                    <FormControl><Input type="password" maxLength={4} placeholder="••••" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="confirmPin" render={({ field }) => (
                <FormItem>
                    <FormLabel>Confirm PIN</FormLabel>
                    <FormControl><Input type="password" maxLength={4} placeholder="••••" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
        </div>
    )
}

// Step 2: Personal Info Component
const PersonalInfoStep = ({ form }: { form: UseFormReturn<FormValues> }) => {
    return (
        <div className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="firstName" render={({ field }) => (
                    <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl><Input placeholder="John" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="lastName" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl><Input placeholder="Doe" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl><Input placeholder="+1 (555) 123-4567" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
             <FormField control={form.control} name="birthDate" render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                >
                                {field.value ? (
                                    format(field.value, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
             )} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="gender" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                                <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="religion" render={({ field }) => (
                     <FormItem>
                        <FormLabel>Religion</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select religion" /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="christianity">Christianity</SelectItem>
                                <SelectItem value="islam">Islam</SelectItem>
                                <SelectItem value="hinduism">Hinduism</SelectItem>
                                <SelectItem value="buddhism">Buddhism</SelectItem>
                                <SelectItem value="judaism">Judaism</SelectItem>
                                <SelectItem value="sikhism">Sikhism</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
        </div>
    )
}

// Step 3: Address Component
const AddressStep = ({ form }: { form: UseFormReturn<FormValues> }) => {
    return (
        <div className="space-y-4">
             <FormField control={form.control} name="homeAddress" render={({ field }) => (
                <FormItem>
                    <FormLabel>Home Address</FormLabel>
                    <FormControl><Input placeholder="123 Main Street" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl><Input placeholder="New York" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="state" render={({ field }) => (
                    <FormItem>
                        <FormLabel>State / Province</FormLabel>
                        <FormControl><Input placeholder="NY" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField control={form.control} name="zipcode" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Zip / Postal Code</FormLabel>
                        <FormControl><Input placeholder="10001" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="country" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl><Input placeholder="United States" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
        </div>
    )
}


// Step 4: Next of Kin Component
const NextOfKinStep = ({ form }: { form: UseFormReturn<FormValues> }) => {
    return (
        <div className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="kinFirstName" render={({ field }) => (
                    <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl><Input placeholder="Jane" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="kinLastName" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl><Input placeholder="Doe" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
             <FormField control={form.control} name="kinRelationship" render={({ field }) => (
                <FormItem>
                    <FormLabel>Relationship</FormLabel>
                    <FormControl><Input placeholder="Spouse" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
             <FormField control={form.control} name="kinAddress" render={({ field }) => (
                <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl><Input placeholder="123 Main Street, New York, NY 10001" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
        </div>
    )
}

// Step 5: Bank Info Component
const BankInfoStep = ({ form }: { form: UseFormReturn<FormValues> }) => {
    return (
         <div className="space-y-4">
             <FormField control={form.control} name="preferredCurrency" render={({ field }) => (
                <FormItem>
                    <FormLabel>Preferred Currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select currency" /></SelectTrigger></FormControl>
                        <SelectContent>
                            <SelectItem value="usd">USD - United States Dollar</SelectItem>
                            <SelectItem value="eur">EUR - Euro</SelectItem>
                            <SelectItem value="gbp">GBP - British Pound</SelectItem>
                            <SelectItem value="jpy">JPY - Japanese Yen</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )} />
             <FormField control={form.control} name="accountType" render={({ field }) => (
                 <FormItem>
                    <FormLabel>Account Type</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select account type" /></SelectTrigger></FormControl>
                        <SelectContent>
                            <SelectItem value="savings">Savings Account</SelectItem>
                            <SelectItem value="checking">Checking Account</SelectItem>
                            <SelectItem value="joint">Joint Account</SelectItem>
                            <SelectItem value="full_refund">Full Refund Account</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )} />
        </div>
    )
}
