
import { AppError } from "@/utils/errors/AppError.js";
import { EmailErrorCode } from "@/utils/errors/emailError/types.js";
import { isTypeofEmailError } from "@/utils/errors/emailError/utils.js";
import { isDevelopment } from "@/utils/utils.js";


export class EmailError extends AppError {
  code: string;

  constructor(code: string, message = 'Sending email failed') {
    super(message, EmailError.getStatusCodeForError(code));
    this.code = code;
  }

  toJson() {
    const baseResponse = {
      message: this.transformMessage()
    };
  
    if (isDevelopment()) {
      return {
        ...baseResponse,
        debug: {
          code: this.code,
          type: this.constructor.name,
          isOperational: this.isOperational,
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

  private static getStatusCodeForError(code: string): number {
    switch (code) {
      case 'EAUTH':
      case 'ECONNECTION':
      case 'ESOCKET':
      case 'EDNS':
        return 503; // Service Unavailable
      case 'EENVELOPE':
        return 400; // Bad Request
      case 'EMESSAGE':
      case 'EPARSE':
        return 422; // Unprocessable Entity
      case 'ETIMEDOUT':
      case 'EALREADYCLOSED':
        return 408; // Request Timeout
      case 'EALREADYSENT':
        return 409; // Conflict
      case 'ESTREAM':
        return 500; // Internal Server Error (stream-related issues)
      default:
        return 500; // Internal Server Error for unknown errors
    }
  }
}