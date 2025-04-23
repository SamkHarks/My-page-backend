import { NotFoundError } from "@/utils/errors/notFoundError/NotFoundError.js";
import * as utils from '@/utils/utils.js';

jest.mock('@/utils/utils.js', () => ({
  ...jest.requireActual('@/utils/utils.js'), // Preserve other exports
  isDevelopment: jest.fn(() => false), // Mock isDevelopment
}));

describe(NotFoundError.name, () => {

    it('should return a JSON representation of the error without debug information', () => {
      const error = new NotFoundError();
  
      const json = error.toJson();
      expect(json).toEqual({
        message: 'Unknown endpoint',
      });
    });
  
    it('should include debug information in development environment', () => {
      (utils.isDevelopment as jest.Mock).mockReturnValue(true);
      const error = new NotFoundError('Development error');
      const json = error.toJson();
      expect(json).toEqual({
        message: 'Development error',
        debug: {
          type: 'NotFoundError',
          isOperational: true,
          suggestion: 'Check the server logs for more details',
        },
      });
    });

  it('should create a NotFoundError with default message and status code', () => {
    const error = new NotFoundError();

    expect(error.message).toMatchInlineSnapshot(`"Unknown endpoint"`);
    expect(error.statusCode).toBe(404);
    expect(error.isOperational).toBe(true);
  });

  it('should create a NotFoundError with a custom message', () => {
    const error = new NotFoundError('Custom not found message');

    expect(error.message).toMatchInlineSnapshot(`"Custom not found message"`);
    expect(error.statusCode).toBe(404);
  });
});