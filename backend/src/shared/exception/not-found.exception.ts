import { StatusCodes } from 'http-status-codes';
import { AppException } from './app.exception';

export class NotFoundException extends AppException {
  constructor(resource: string, id?: string | number) {
    const message = id
      ? `${resource} with id ${id} not found`
      : `${resource} not found`;
    super(message, StatusCodes.NOT_FOUND, 'NOT_FOUND');
  }
}
