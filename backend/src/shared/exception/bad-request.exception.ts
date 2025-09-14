import { StatusCodes } from 'http-status-codes';
import { AppException } from './app.exception';

export class BadRequestException extends AppException {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST, 'BAD_REQUEST');
  }
}
