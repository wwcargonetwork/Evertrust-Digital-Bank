'use server'

import { z } from 'zod'

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
})

type State = {
    errors?: {
        name?: string[];
        email?: string[];
        message?: string[];
    };
    message?: string;
}

export async function submitContactForm(prevState: State, formData: FormData) {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors below and try again.',
    }
  }

  // In a real application, you would process the data, e.g., send an email or save to a database.
  // For this demo, we'll just log it and simulate a successful submission.
  console.log('Contact form submitted successfully:');
  console.log(validatedFields.data);

  return { 
      message: 'Thank you! Your message has been received.' 
  }
}
