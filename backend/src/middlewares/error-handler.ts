// middlewares/error-handler.ts
import { Request, Response, NextFunction } from 'express';
import BaseError from '../errors/default-error';

function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({ message: 'Ошибка сервера' });
}

export default errorHandler;
