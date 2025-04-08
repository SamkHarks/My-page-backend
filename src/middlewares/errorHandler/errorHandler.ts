import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';


export const errorHandler = (error: Error, _request: Request, response: Response, _next: NextFunction) => {

  if (error instanceof z.ZodError) {
    // Handle Zod validation errors
    response.status(400).json({
      error: 'Validation error',
      issues: error.issues,
    });
    return;
  }

  response.status(500).json({ error: error.message || 'Internal server error' });
};