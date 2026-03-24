import { Request, Response, NextFunction } from 'express';

const notFoundMiddleware = (
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.status(404).json({ error: 'Страница не найдена' });
};

export default notFoundMiddleware;
