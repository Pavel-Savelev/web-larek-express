import { Request, Response, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';
import BaseError from '../errors/default-error';

function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  // Celebrate / Joi ошибка
  if (isCelebrateError(err)) {
    const bodyError = err.details.get('body');
    return res.status(400).json({
      message: bodyError?.details[0].message || 'Ошибка валидации',
    });
  }

  // твои кастомные ошибки
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // все остальные ошибки
  console.error(err);
  return res.status(500).json({ message: 'Ошибка сервера' });
}

export default errorHandler;
