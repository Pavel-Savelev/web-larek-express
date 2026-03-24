import { Router } from 'express';
import { getProduct, createProduct } from '../controllers/product';
import validateProduct from '../middlewares/validate-product';

const productRouter = Router();

productRouter.get('/', getProduct);
productRouter.post('/', validateProduct, createProduct);

export default productRouter;
