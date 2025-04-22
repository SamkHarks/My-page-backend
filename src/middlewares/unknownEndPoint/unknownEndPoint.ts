import { NotFoundError } from '@/utils/errors.js';
import { NextFunction, Request, Response } from 'express';

export const unknownEndpoint = (_request: Request, _response: Response, next: NextFunction) => {
  next(new NotFoundError());
}