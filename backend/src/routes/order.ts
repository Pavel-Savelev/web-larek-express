import { Router } from 'express';
import sanitizeOrderMiddleware from '../middlewares/sanitize-order';
import validateOrder from '../middlewares/validate-order';
import createOrder from '../controllers/order';

const orderRouter = Router();

orderRouter.post('/order', validateOrder, sanitizeOrderMiddleware, createOrder);

export default orderRouter;
