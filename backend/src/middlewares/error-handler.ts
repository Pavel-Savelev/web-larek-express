import { isCelebrateError } from 'celebrate';
import { Request, Response, NextFunction } from 'express';

export default function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  // Celebrate/Joi ошибки
  if (isCelebrateError(err)) {
    const bodyError = err.details.get('body');
    const detail = bodyError?.details?.[0];
    const message = detail?.message || 'Ошибка валидации';
    const key = detail?.context?.key;

    if (key === 'title') {
      if (message.includes('is not allowed to be empty')) {
        return res.status(409).json({ message });
      }
      if (message.includes('length must be at least')) {
        return res.status(400).json({ message });
      }
      // Можно добавить другие условия для title
    }

    // Для других полей по умолчанию 400
    return res.status(400).json({ message });
  }

  // MongoDB дубликаты
  if (err?.code === 11000) {
    return res.status(409).json({ message: 'Обнаружены существующие данные' });
  }

  console.error(err);
  return res.status(500).json({ message: 'Ошибка сервера' });
}
