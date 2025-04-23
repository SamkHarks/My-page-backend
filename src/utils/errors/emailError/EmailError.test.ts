import { EmailError } from '@/utils/errors/emailError/EmailError.js';
import * as utils from '@/utils/utils.js';

jest.mock('@/utils/utils.js', () => ({
  ...jest.requireActual('@/utils/utils.js'), // Preserve other exports
  isDevelopment: jest.fn(() => false), // Mock isDevelopment
}));

 
describe(EmailError.name, () => {
  it('should add debug information in development environment', () => {
    (utils.isDevelopment as jest.Mock).mockReturnValue(true);
    const error = new EmailError('EAUTH', 'Custom message which should not be used in json');
    const json = error.toJson();
    expect(json).toEqual({
      message: 'Email service is currently unavailable. Please try again later.',
      debug: {
        code: 'EAUTH',
        type: 'EmailError',
        isOperational: true,
        suggestion: 'Check SMTP configuration or recipient addresses'
      }
    });
  });

  it('should not include debug information in production environment', () => {
    (utils.isDevelopment as jest.Mock).mockReturnValue(false);
    const error = new EmailError('EAUTH', 'Custom message which should not be used in json');
    const json = error.toJson();
    expect(json).toEqual({
      message: 'Email service is currently unavailable. Please try again later.',
    });
  });

  it('should transform the message for EAUTH error code', () => {
    const error = new EmailError('EAUTH', 'Custom message which should not be used in json');
    const json = error.toJson();

    expect(json.message).toMatchInlineSnapshot(`"Email service is currently unavailable. Please try again later."`);
    expect(error.code).toMatchInlineSnapshot(`"EAUTH"`);
    expect(error.statusCode).toBe(503);
  });

  it('should transform the message for ECONNECTION error code', () => {
    const error = new EmailError('ECONNECTION');
    const json = error.toJson();

    expect(json.message).toMatchInlineSnapshot(`"Email service is currently unavailable. Please try again later."`);
    expect(error.code).toMatchInlineSnapshot(`"ECONNECTION"`);
    expect(error.statusCode).toBe(503);
  });

  it('should transform the message for EDNS error code', () => {
    const error = new EmailError('EDNS', 'Custom message which should not be used in json');
    const json = error.toJson();

    expect(json.message).toMatchInlineSnapshot(`"Email service is currently unavailable. Please try again later."`);
    expect(error.code).toMatchInlineSnapshot(`"EDNS"`);
    expect(error.statusCode).toBe(503);
  });

  it('should transform the message for EENVELOPE error code', () => {
    const error = new EmailError('EENVELOPE', 'Custom message which should not be used in json');
    const json = error.toJson();

    expect(json.message).toMatchInlineSnapshot(`"Please check the email address and try again."`);
    expect(error.code).toMatchInlineSnapshot(`"EENVELOPE"`);
    expect(error.statusCode).toBe(400);
  });

  it('should transform the message for EMESSAGE error code', () => {
    const error = new EmailError('EMESSAGE', 'Custom message which should not be used in json');
    const json = error.toJson();

    expect(json.message).toMatchInlineSnapshot(`"The message could not be processed. Please check the content."`);
    expect(error.code).toMatchInlineSnapshot(`"EMESSAGE"`);
    expect(error.statusCode).toBe(422);
  });

  it('should transform the message for EPARSE error code', () => {
    const error = new EmailError('EPARSE', 'Custom message which should not be used in json');
    const json = error.toJson();

    expect(json.message).toMatchInlineSnapshot(`"The message could not be processed. Please check the content."`);
    expect(error.code).toMatchInlineSnapshot(`"EPARSE"`);
    expect(error.statusCode).toBe(422);
  });

  it('should transform the message for ETIMEDOUT error code', () => {
    const error = new EmailError('ETIMEDOUT', 'Custom message which should not be used in json');
    const json = error.toJson();

    expect(json.message).toMatchInlineSnapshot(`"The request timed out. Please try again."`);
    expect(error.code).toMatchInlineSnapshot(`"ETIMEDOUT"`);
    expect(error.statusCode).toBe(408);
  });

  it('should transform the message for EALREADYCLOSED error code', () => {
    const error = new EmailError('EALREADYCLOSED', 'Custom message which should not be used in json');
    const json = error.toJson();

    expect(json.message).toMatchInlineSnapshot(`"The request timed out. Please try again."`);
    expect(error.code).toMatchInlineSnapshot(`"EALREADYCLOSED"`);
    expect(error.statusCode).toBe(408);
  });

  it('should transform the message for EALREADYSENT error code', () => {
    const error = new EmailError('EALREADYSENT', 'Custom message which should not be used in json');
    const json = error.toJson();

    expect(json.message).toMatchInlineSnapshot(`"This message has already been sent."`);
    expect(error.code).toMatchInlineSnapshot(`"EALREADYSENT"`);
    expect(error.statusCode).toBe(409);
  });

  it('should handle unknown error codes gracefully', () => {
    const error = new EmailError('UNKNOWN_CODE', 'Custom message which should not be used in json');
    const json = error.toJson();

    expect(json.message).toMatchInlineSnapshot(`"Failed to send email. Please try again later."`);
    expect(error.code).toMatchInlineSnapshot(`"UNKNOWN_CODE"`);
    expect(error.statusCode).toBe(500);
  });
});