import express, { Request, Response } from 'express';
import { contactSchema } from '@/routes/controllers/contact/types.js';
import { z } from 'zod';
import { EmailOptions, sendEmail } from '@/services/emailService.js';


const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const validatedData = contactSchema.parse(req.body);
    const { name, email, message } = validatedData;

    const emailOptions: EmailOptions = {
      to: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };
    await sendEmail(emailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    }
    else if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});


export default router;