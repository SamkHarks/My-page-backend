import { isTypeofEmailError } from "@/services/utils.js";
import { EmailErrorCode } from "@/services/types.js";
import { z } from "zod";


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

    if (process.env['NODE_ENV'] === 'development') {
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

export class NotFoundError extends AppError {
  constructor(message = 'Unknown endpoint') {
    super(message, 404);
  }
}

export class ValidationError extends AppError {
  issues: z.ZodIssue[];

  constructor(issues: z.ZodIssue[], message = 'Validation failed', originalStack?: string) {
    super(message, 400);
    this.issues = issues;

    if (originalStack) {
      this.stack = originalStack;
    }
  }

  toJson() {
    const baseResponse = {
      message: this.message,
      statusCode: this.statusCode,
      issues: this.issues,
    };

    if (process.env['NODE_ENV'] === 'development') {
      return {
        ...baseResponse,
        debug: {
          type: this.constructor.name,
          suggestion: 'Check the validation rules'
        }
      };
    }
  
    return baseResponse;
  }
}

export class EmailError extends AppError {
  code: string;

  constructor(code: string, message = 'Sending email failed', statusCode = 500) {
    super(message, statusCode);
    this.code = code;
  }

  toJson() {
    const baseResponse = {
      message: this.transformMessage(),
      statusCode: this.statusCode,
    };
  
    if (process.env['NODE_ENV'] === 'development') {
      return {
        ...baseResponse,
        debug: {
          code: this.code,
          type: this.constructor.name,
          suggestion: 'Check SMTP configuration or recipient addresses'
        }
      };
    }
  
    return baseResponse;
  }

  private getErrorCode(): EmailErrorCode {
    return isTypeofEmailError(this.code) ? this.code : 'EUNKNOWN';
  }

  private transformMessage(): string {
    switch (this.getErrorCode()) {
      case 'EAUTH':
      case 'ECONNECTION':
      case 'ESOCKET':
      case 'EDNS':
        return 'Email service is currently unavailable. Please try again later.';
      case 'EENVELOPE':
        return 'Please check the email address and try again.';
      case 'EMESSAGE':
      case 'EPARSE':
        return 'The message could not be processed. Please check the content.';
      case 'ETIMEDOUT':
      case 'EALREADYCLOSED':
        return 'The request timed out. Please try again.';
      case 'EALREADYSENT':
        return 'This message has already been sent.';
      default:
        return 'Failed to send email. Please try again later.';
    }
  }
}
