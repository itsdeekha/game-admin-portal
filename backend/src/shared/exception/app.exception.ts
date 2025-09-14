import { StatusCodes } from 'http-status-codes';

export class AppException extends Error {
  public statusCode: number;
  public code: string;

  constructor(
    message: string,
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    code?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code || 'INTERNAL_ERROR';

    Error.captureStackTrace(this, this.constructor);
  }
}
