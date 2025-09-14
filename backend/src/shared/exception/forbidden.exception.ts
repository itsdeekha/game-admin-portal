import { StatusCodes } from 'http-status-codes';
import { AppException } from './app.exception';

export class ForbiddenException extends AppException {
  constructor(message: string = 'Forbidden') {
    super(message, StatusCodes.FORBIDDEN, 'FORBIDDEN');
  }
}
