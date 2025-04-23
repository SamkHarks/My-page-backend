import app from '@/app.js';
import supertest from 'supertest';
import { sendEmail } from '@/services/emailService.js';

jest.mock('@/services/emailService.js', () => ({
  sendEmail: jest.fn(),
}));

const api = supertest(app);

describe('POST /api/contact', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('should send an email successfully', async () => {
    const newContact = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      message: 'Hello, this is a test message.',
    };

    (sendEmail as jest.Mock).mockResolvedValueOnce(undefined);

    await api
      .post('/api/contact')
      .send(newContact)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect((res) => {
        expect(res.body).toHaveProperty('message', 'Email sent successfully!');
      });

    expect(sendEmail).toHaveBeenCalledTimes(1);
    expect(sendEmail).toHaveBeenCalledWith({
      to: newContact.email,
      subject: `New message from ${newContact.name}`,
      text: `Name: ${newContact.name}\nEmail: ${newContact.email}\nMessage: ${newContact.message}`,
    });
  });

  it('should return 400 if validation fails', async () => {
    const invalidContact = {
      name: '',
      email: 'mail@example.com',
      message: 'Hello, this is a test message.',
    };

    await api
      .post('/api/contact')
      .send(invalidContact)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect((res) => {
        expect(res.body).toHaveProperty('issues');
      });

    expect(sendEmail).not.toHaveBeenCalled();
  });
});
