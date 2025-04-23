import { z } from "zod";
import { AppError } from "@/utils/errors/AppError.js";
import { isDevelopment } from "@/utils/utils.js";


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
      issues: this.issues,
    };

    if (isDevelopment()) {
      return {
        ...baseResponse,
        debug: {
          type: this.constructor.name,
          isOperational: this.isOperational,
          suggestion: 'Check the validation rules'
        }
      };
    }
  
    return baseResponse;
  }
}
