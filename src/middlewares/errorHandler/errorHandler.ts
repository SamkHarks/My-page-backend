import { Request, Response, NextFunction } from 'express';


export const errorHandler = (error: Error, _request: Request, response: Response, _next: NextFunction) => {
  response.status(500).json({ error: error.message || 'Internal server error' });
};