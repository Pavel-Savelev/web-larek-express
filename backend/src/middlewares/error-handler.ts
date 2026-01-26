import { Request, Response, NextFunction } from 'express';
import BadRequestError from '../errors/bad-requsest-error';
import DefaultError from '../errors/default-error';
import ConflictError from '../errors/conflict-error';
import notFoundError from '../errors/not-found-error';

function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ConflictError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof notFoundError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err);
  const defaultError = err.statusCode ? err : new DefaultError('Ошибка сервера');
  return res.status(defaultError.statusCode).json({ message: defaultError.message });
}

export default errorHandler;
