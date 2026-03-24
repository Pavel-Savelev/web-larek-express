import { Request, Response, NextFunction } from 'express';

const timeLog = (req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

export default timeLog;
