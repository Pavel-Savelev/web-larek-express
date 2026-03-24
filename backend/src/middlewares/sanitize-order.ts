import { Request, Response, NextFunction } from 'express';
import sanitizeOrder from '../utils/sanitizeOrder';

function sanitizeItem(item: any) {
  return typeof item === 'string' ? sanitizeOrder(item) : item;
}

function sanitizeOrderMiddleware(req: Request, _res: Response, next: NextFunction) {
  if (req.body.address && typeof req.body.address === 'string') {
    req.body.address = sanitizeOrder(req.body.address);
  }

  if (req.body.items && Array.isArray(req.body.items)) {
    req.body.items = req.body.items.map(sanitizeItem);
  }

  next();
}

export default sanitizeOrderMiddleware;
