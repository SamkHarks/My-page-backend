import { ValidationError } from "@/utils/errors/validationError/ValidationError.js";
import { type ZodIssue } from "zod";
import * as utils from '@/utils/utils.js';

jest.mock('@/utils/utils.js', () => ({
  ...jest.requireActual('@/utils/utils.js'), // Preserve other exports
  isDevelopment: jest.fn(() => false), // Mock isDevelopment
}));


describe(ValidationError.name, () => {
  it('should include debug information in development environment', () => {
    (utils.isDevelopment as jest.Mock).mockReturnValue(true);
    const issues = [{ path: ['name'], message: 'Name is required' }] as ZodIssue[];
    const error = new ValidationError(issues, 'Validation failed', 'original stack trace');
    const json = error.toJson();
    expect(json).toEqual({
      message: 'Validation failed',
      issues,
      debug: {
        type: 'ValidationError',
        isOperational: true,
        suggestion: 'Check the validation rules',
      },
    });
  });

  it('should return a JSON representation of the error and not include debug information in production environment', () => {
    (utils.isDevelopment as jest.Mock).mockReturnValue(false);
    const issues = [{ path: ['name'], message: 'Name is required' }] as ZodIssue[];
    const error = new ValidationError(issues);

    const json = error.toJson();
    expect(json).toEqual({
      message: 'Validation failed',
      issues,
    });
  });

  it('should create a ValidationError with issues and a stack trace', () => {
    const issues = [{ path: ['name'], message: 'Name is required' }] as ZodIssue[];
    const error = new ValidationError(issues, 'Validation failed', 'original stack trace');

    expect(error.message).toBe('Validation failed');
    expect(error.statusCode).toBe(400);
    expect(error.issues).toEqual(issues);
    expect(error.stack).toBe('original stack trace');
  });


});