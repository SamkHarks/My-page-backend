import { NotFoundError } from "@/utils/errors/notFoundError/NotFoundError.js";


describe(NotFoundError.name, () => {
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