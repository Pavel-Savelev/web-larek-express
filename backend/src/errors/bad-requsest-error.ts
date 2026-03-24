import BaseError from './default-error';

class BadRequestError extends BaseError {
  constructor(message: 'Ошибка валидации данных при создании товара') {
    super(message, 400);
  }
}

export default BadRequestError;
