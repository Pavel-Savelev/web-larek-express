import { isCelebrateError } from 'celebrate';
import { Request, Response, NextFunction } from 'express';
import BaseError from '../errors/default-error';

function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (isCelebrateError(err)) {
    const bodyError = err.details.get('body');

    const message = bodyError?.details?.[0]?.message || 'Ошибка валидации';
    const key = bodyError?.details?.[0]?.context?.key;

    // Если ключ title, возвращаем 409, иначе 400
    if (key === 'title') {
      return res.status(409).json({ message });
    }

    return res.status(400).json({ message });
  }

  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // MongoDB дубликаты
  if (err?.code === 11000) {
    return res.status(409).json({ message: 'Обнаружены существующие данные' });
  }

  console.error(err);
  return res.status(500).json({ message: 'Ошибка сервера' });
}

export default errorHandler;
