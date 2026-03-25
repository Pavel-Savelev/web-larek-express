import { Request, Response, NextFunction } from 'express';
import csrf from 'csurf';

const csrfProtection = csrf({ cookie: true });

export default function csrfRoute(
  handler: (req: Request & { csrfToken: () => string }, res: Response) => void,
) {
  return [csrfProtection, (req: Request, res: Response, _next: NextFunction) => {
    const reqWithCsrf = req as Request & { csrfToken: () => string };
    handler(reqWithCsrf, res);
  }];
}
