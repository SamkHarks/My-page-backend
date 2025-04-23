import { AppError } from '@/utils/errors/AppError.js';
import { Request, Response, NextFunction } from 'express';


export const errorHandler = (error: Error, _request: Request, response: Response, _next: NextFunction) => {
  if (error instanceof AppError) {
    // Handle all custom AppErrors
    response.status(error.statusCode).json(error.toJson());
    return;
  }

  response.status(500).json({ error: 'Internal server error' });
};