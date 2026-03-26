import { Router } from 'express';
import { getProduct, createProduct } from '../controllers/product';
import sanitizeOrderMiddleware from '../middlewares/sanitize-order';
import validateProduct from '../middlewares/validate-product';
// import validateProduct, { validateProductQuery } from '../middlewares/validate-product';

const productRouter = Router();

productRouter.get('/', getProduct);
productRouter.post('/', validateProduct, sanitizeOrderMiddleware, createProduct);

export default productRouter;
