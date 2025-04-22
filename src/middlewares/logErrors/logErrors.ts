import { NextFunction, Request, Response } from 'express';

export const logErrors = (error: Error, _request: Request, _response: Response, next: NextFunction) => {
  if (process.env['NODE_ENV'] === 'development') {
    // Log full stack trace in development
    console.error(error);
  } else {
    // TODO: Log error to external service in production
  }

  next(error); // Pass the error to the next middleware
};