import { Router } from 'express';
import createOrder from '../controllers/order';
import validateOrder from '../middlewares/validate-order';

const orderRouter = Router();

orderRouter.post('/order', validateOrder, createOrder);

export default orderRouter;
