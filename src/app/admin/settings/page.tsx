
'use client';

import * as React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAdminBanners } from '@/hooks/use-admin-banners';
import { useAdminTestimonials } from '@/hooks/use-admin-testimonials';
import { type Banner, type Testimonial } from '@/types';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

// Zod schemas for form validation
const bannerSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  imageUrl: z.string().url('Must be a valid URL'),
  linkUrl: z.string().url('Must be a valid URL'),
  serviceType: z.string().min(2, 'Service type is required'),
});

const testimonialSchema = z.object({
  customerName: z.string().min(2, 'Customer name is required'),
  testimonialText: z.string().min(10, 'Testimonial text is required'),
  imageURL: z.string().url('Must be a valid URL'),
});

export default function SettingsPage() {
  const { toast } = useToast();

  const { banners, addBanner, deleteBanner, isLoading: isLoadingBanners } = useAdminBanners();
  const { testimonials, addTestimonial, deleteTestimonial, isLoading: isLoadingTestimonials } = useAdminTestimonials();

  const bannerForm = useForm<z.infer<typeof bannerSchema>>({ resolver: zodResolver(bannerSchema) });
  const testimonialForm = useForm<z.infer<typeof testimonialSchema>>({ resolver: zodResolver(testimonialSchema) });

  const onBannerSubmit: SubmitHandler<z.infer<typeof bannerSchema>> = async (data) => {
    try {
      await addBanner(data);
      toast({ title: 'Success', description: 'Banner added successfully.' });
      bannerForm.reset();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to add banner.' });
    }
  };

  const onTestimonialSubmit: SubmitHandler<z.infer<typeof testimonialSchema>> = async (data) => {
    try {
      await addTestimonial(data);
      toast({ title: 'Success', description: 'Testimonial added successfully.' });
      testimonialForm.reset();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to add testimonial.' });
    }
  };
  
  const handleBannerDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this banner?')) {
        await deleteBanner(id);
        toast({ title: 'Success', description: 'Banner deleted.' });
    }
  }

  const handleTestimonialDelete = async (id: string) => {
     if (confirm('Are you sure you want to delete this testimonial?')) {
        await deleteTestimonial(id);
        toast({ title: 'Success', description: 'Testimonial deleted.' });
    }
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold">Content Management</h1>

      {/* Banners Section */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Banners</CardTitle>
          <CardDescription>Add, view, and remove promotional banners from your site.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...bannerForm}>
            <form onSubmit={bannerForm.handleSubmit(onBannerSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end mb-8 p-4 border rounded-lg">
                <FormField control={bannerForm.control} name="title" render={({ field }) => (
                    <FormItem className="lg:col-span-1"><FormLabel>Title</FormLabel><FormControl><Input placeholder="e.g., Summer Savings" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={bannerForm.control} name="imageUrl" render={({ field }) => (
                    <FormItem className="lg:col-span-1"><FormLabel>Image URL</FormLabel><FormControl><Input placeholder="https://example.com/image.png" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={bannerForm.control} name="linkUrl" render={({ field }) => (
                    <FormItem className="lg:col-span-1"><FormLabel>Link URL</FormLabel><FormControl><Input placeholder="/deposits" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField control={bannerForm.control} name="serviceType" render={({ field }) => (
                    <FormItem className="lg:col-span-1"><FormLabel>Service Type</FormLabel><FormControl><Input placeholder="e.g., Loan Services" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full lg:w-auto lg:col-span-1"><PlusCircle className="mr-2 h-4 w-4" /> Add Banner</Button>
            </form>
          </Form>
          
          <Table>
            <TableHeader>
              <TableRow><TableHead>Title</TableHead><TableHead>Image</TableHead><TableHead>Link</TableHead><TableHead>Actions</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingBanners ? (
                <TableRow><TableCell colSpan={4} className="text-center"><Skeleton className="h-10 w-full" /></TableCell></TableRow>
              ) : banners.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell className="font-medium">{banner.title}</TableCell>
                  <TableCell><Image src={banner.imageUrl} alt={banner.title} width={100} height={50} className="rounded object-cover" /></TableCell>
                  <TableCell><a href={banner.linkUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{banner.linkUrl}</a></TableCell>
                  <TableCell><Button variant="destructive" size="icon" onClick={() => handleBannerDelete(banner.id)}><Trash2 className="h-4 w-4" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Testimonials Section */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Testimonials</CardTitle>
          <CardDescription>Add, view, and remove customer testimonials.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...testimonialForm}>
            <form onSubmit={testimonialForm.handleSubmit(onTestimonialSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-8 p-4 border rounded-lg">
                <FormField control={testimonialForm.control} name="customerName" render={({ field }) => (
                    <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Jane Doe" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={testimonialForm.control} name="imageURL" render={({ field }) => (
                    <FormItem><FormLabel>Image URL</FormLabel><FormControl><Input placeholder="https://example.com/customer.png" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={testimonialForm.control} name="testimonialText" render={({ field }) => (
                    <FormItem className="lg:col-span-2"><FormLabel>Testimonial</FormLabel><FormControl><Textarea placeholder="Their service was amazing..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full mt-auto"><PlusCircle className="mr-2 h-4 w-4" /> Add Testimonial</Button>
            </form>
          </Form>

          <Table>
            <TableHeader>
              <TableRow><TableHead>Name</TableHead><TableHead>Image</TableHead><TableHead>Testimonial</TableHead><TableHead>Actions</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingTestimonials ? (
                <TableRow><TableCell colSpan={4} className="text-center"><Skeleton className="h-10 w-full" /></TableCell></TableRow>
              ) : testimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell className="font-medium">{testimonial.customerName}</TableCell>
                   <TableCell><Image src={testimonial.imageURL} alt={testimonial.customerName} width={50} height={50} className="rounded-full object-cover" /></TableCell>
                  <TableCell className="max-w-sm truncate">{testimonial.testimonialText}</TableCell>
                  <TableCell><Button variant="destructive" size="icon" onClick={() => handleTestimonialDelete(testimonial.id)}><Trash2 className="h-4 w-4" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
