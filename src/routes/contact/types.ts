import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'), // Ensure name is a non-empty string
  email: z.string().email('Invalid email address'), // Ensure email is a valid email
  message: z.string().min(1, 'Message is required'), // Ensure message is a non-empty string
}).strict(); // Disallow additional properties
