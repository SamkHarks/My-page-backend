import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport/index.js';

// Define email options interface
export type EmailOptions = {
  to: string;       // Visitor's email (for reply-to)
  subject: string;  // Email subject
  text: string;     // Plain text message
  //html: string;     // HTML formatted message
}


// SendGrid SMTP configuration
const transporter = nodemailer.createTransport({
  host: process.env['SMTP_HOST'],
  port: Number(process.env['SMTP_PORT']),
  secure: process.env['SMTP_PORT'] === '465', // true for 465, false for other ports
  auth: {
    user: process.env['SMTP_USER'],
    pass: process.env['SMTP_PASSWORD'],
  },
  tls: {
    rejectUnauthorized: process.env['SMTP_REJECT_UNAUTHORIZED'] === 'true' || process.env['NODE_ENV'] !== 'development', // Accept self-signed certificates in development for now 
  },
});

// Function to send emails
export const sendEmail = (options: EmailOptions): Promise<SMTPTransport.SentMessageInfo> => {
  return transporter.sendMail({
    from: `"Portfolio Contact" <${process.env['FROM_EMAIL']}>`,
    to: process.env['TO_EMAIL'], 
    subject: options.subject,
    text: options.text,
    replyTo: options.to,
    //html: options.html,
  });
};