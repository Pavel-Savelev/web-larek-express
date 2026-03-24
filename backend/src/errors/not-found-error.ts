import BaseError from './default-error';

class notFoundError extends BaseError {
  constructor(message: 'Страница не найдена') {
    super(message, 404);
  }
}
export default notFoundError;
