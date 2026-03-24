import BaseError from './default-error';

class ConflictError extends BaseError {
  constructor(message: 'Обнаружены существующие данные') {
    super(message, 409);
  }
}

export default ConflictError;
