import { z } from "zod";
import { isDevelopment } from "@/utils/utils.js";


interface HttpError extends Error {
  statusCode: number;
  isOpertional?: boolean;
  issues?: z.ZodIssue[]; // For Zod validation errors
  code?: string; // For custom error codes
}

export class AppError extends Error implements HttpError {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  toJson() {
    const baseResponse = {
      message: this.message,
      statusCode: this.statusCode,
    }

    if (isDevelopment()) {
      return {
        ...baseResponse,
        debug: {
          type: this.constructor.name,
          suggestion: 'Check the server logs for more details'
        }
      };
    }

    return baseResponse;
  }
}
