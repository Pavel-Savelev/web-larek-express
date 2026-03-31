import { isCelebrateError } from 'celebrate';
import { Request, Response, NextFunction } from 'express';
import BaseError from '../errors/default-error';

function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (isCelebrateError(err)) {
    const bodyError = err.details.get('body');
    const detail = bodyError?.details?.[0];
    const message = detail?.message || 'Ошибка валидации';
    const key = detail?.context?.key;

    if (key === 'title') {
      // Здесь можно выбрать статус в зависимости от сообщения или типа ошибки
      if (message.includes('Поле title обязательно и должно существовать')) {
        return res.status(409).json({ message });
      }
      if (message.includes('Обнаружены существующие данные')) {
        return res.status(409).json({ message });
      }
      return res.status(400).json({ message });
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
