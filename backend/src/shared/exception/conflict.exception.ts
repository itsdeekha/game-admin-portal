import { StatusCodes } from 'http-status-codes';
import { AppException } from './app.exception';

export class ConflictException extends AppException {
  constructor(message: string) {
    super(message, StatusCodes.CONFLICT, 'CONFLICT');
  }
}
