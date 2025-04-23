import { AppError } from "@/utils/errors/AppError.js";

export class NotFoundError extends AppError {
  constructor(message = 'Unknown endpoint') {
    super(message, 404);
  }
}