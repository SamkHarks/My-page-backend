import { AppError } from '@/utils/errors/AppError.js';
import * as utils from '@/utils/utils.js';

jest.mock('@/utils/utils.js', () => ({
  ...jest.requireActual('@/utils/utils.js'), // Preserve other exports
  isDevelopment: jest.fn(() => false), // Mock isDevelopment
}));


describe(AppError.name, () => {

  beforeEach(() => {
    jest.clearAllMocks();
    (utils.isDevelopment as jest.Mock).mockReturnValue(false);
  })

  it('should include debug information in development environment', () => {
    (utils.isDevelopment as jest.Mock).mockReturnValue(true);
    const error = new AppError('Development error', 400);
    const json = error.toJson();
    expect(json).toEqual({
      message: 'Development error',
      statusCode: 400,
      debug: {
        type: 'AppError',
        suggestion: 'Check the server logs for more details',
      },
    });
  });

  it('should create an AppError with a custom message and status code and not include debug information', () => {
    const error = new AppError('Custom error message', 500);

    expect(error.message).toMatchInlineSnapshot(`"Custom error message"`);
    expect(error.statusCode).toBe(500);
    expect(error.isOperational).toBe(true);
  });

  it('should return a JSON representation of the error', () => {
    const error = new AppError('Custom error message', 503);

    const json = error.toJson();
    expect(json).toEqual({
      message: 'Custom error message',
      statusCode: 503,
    });
  });
});

it('should set the prototype chain correctly', () => {
  const error = new AppError('Prototype error', 400);
  expect(error).toBeInstanceOf(AppError);
  expect(error).toBeInstanceOf(Error);
});

it('should default isOperational to true if not provided', () => {
  const error = new AppError('Default operational error', 400);
  expect(error.isOperational).toBe(true);
});

it('should call Error.captureStackTrace', () => {
  const spy = jest.spyOn(Error, 'captureStackTrace');
  new AppError('Stack trace error', 400);
  expect(spy).toHaveBeenCalled();
  spy.mockRestore();
});

