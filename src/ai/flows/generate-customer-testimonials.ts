'use server';

/**
 * @fileOverview Customer testimonial generator with AI-generated headshots.
 *
 * - generateCustomerTestimonial - Generates a customer testimonial with a diverse, high-quality AI-generated headshot.
 * - CustomerTestimonialInput - The input type for the generateCustomerTestimonial function.
 * - CustomerTestimonialOutput - The return type for the generateCustomerTestimonial function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const CustomerTestimonialInputSchema = z.object({
  customerProfile: z
    .string()
    .describe('A description of the customer profile, including age, gender, ethnicity, and occupation.'),
  productOrService: z.string().describe('The name of the product or service the testimonial is for.'),
  testimonialRequest: z.string().describe('The request for the customer testimonial.'),
});

export type CustomerTestimonialInput = z.infer<typeof CustomerTestimonialInputSchema>;

const CustomerTestimonialOutputSchema = z.object({
  testimonial: z.string().describe('The generated customer testimonial.'),
  headshot: z.string().describe('A data URI of an AI-generated headshot for the testimonial.'),
});

export type CustomerTestimonialOutput = z.infer<typeof CustomerTestimonialOutputSchema>;

export async function generateCustomerTestimonial(
  input: CustomerTestimonialInput
): Promise<CustomerTestimonialOutput> {
  return generateCustomerTestimonialFlow(input);
}

const testimonialPrompt = ai.definePrompt({
  name: 'testimonialPrompt',
  input: {
    schema: CustomerTestimonialInputSchema,
  },
  output: {
    schema: CustomerTestimonialOutputSchema,
  },
  prompt: `You are a marketing expert skilled at creating compelling customer testimonials.

  Based on the following customer profile and testimonial request, generate a realistic customer testimonial. Also, generate a high resolution headshot for the testimonial, that matches the customer profile.

  Customer Profile: {{{customerProfile}}}
  Product/Service: {{{productOrService}}}
  Testimonial Request: {{{testimonialRequest}}}

  The headshot should be a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'.`,
});

const generateCustomerTestimonialFlow = ai.defineFlow(
  {
    name: 'generateCustomerTestimonialFlow',
    inputSchema: CustomerTestimonialInputSchema,
    outputSchema: CustomerTestimonialOutputSchema,
  },
  async input => {
    const {output} = await testimonialPrompt(input);
    return output!;
  }
);
