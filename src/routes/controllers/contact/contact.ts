import { Request, Response } from 'express';
import { contactSchema } from '@/routes/controllers/contact/types.js';
import { EmailOptions, sendEmail } from '@/services/emailService.js';
import { SafeRouter } from '@/utils/safeRouter/SafeRouter.js';


const safeRouter = new SafeRouter();


safeRouter.post('/', async (req: Request, res: Response) => {
  const validatedData = contactSchema.parse(req.body);
  const { name, email, message } = validatedData;
  const emailOptions: EmailOptions = {
    to: email,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };
  await sendEmail(emailOptions);
  res.status(200).json({ message: 'Email sent successfully!' });
});


export default safeRouter.getRouter();
