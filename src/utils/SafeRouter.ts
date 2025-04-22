import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import { z } from 'zod';
import { ValidationError } from '@/utils/errors.js'


type Handler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

// TODO: Add more HTTP methods when/if needed, e.g. put, delete, patch, etc.
export class SafeRouter {
  private router: Router;
  constructor() {
    this.router = Router();
  }

  private wrap(handler: Handler): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      handler(req, res, next).catch(error => {
        error instanceof z.ZodError
        ? next(new ValidationError(error.issues, error.message, error.stack))
        : next(error);
      });
    };
  }

  // Override HTTP methods
  get(path: string, handler: Handler) {
    this.router.get(path, this.wrap(handler));
  }

  post(path: string, handler: Handler) {
    this.router.post(path, this.wrap(handler));
  }

  // Override 'use' method to accept a path and middlewares
  use(path: string, ...middlewares: RequestHandler[]): this;
  use(...middlewares: RequestHandler[]): this;
  use(...args: any[]): this {
    this.router.use(...args)
    return this;
  }

  getRouter() {
    return this.router;
  }
}
