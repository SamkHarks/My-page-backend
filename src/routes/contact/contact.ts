import express, { Request, Response } from 'express';
import { contactSchema } from './types.js';
import { z } from 'zod';
//import { sendEmail } from '../services/emailService';

const router = express.Router();

router.post('/', /*async*/ (req: Request, res: Response) => {
  try {
    contactSchema.parse(req.body);
    //const { name, email, message } = validatedData;
    //throw new Error('Test error'); // Simulate an error for testing purposes
    // await sendEmail(name, email, message);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    }
  }

});


export default router;