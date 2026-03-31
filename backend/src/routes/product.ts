import { Router } from 'express';
import { getProduct, createProduct } from '../controllers/product';
import sanitizeOrderMiddleware from '../middlewares/sanitize-order';
import validateProduct from '../middlewares/validate-product';
import validateProductResponse from '../middlewares/validate-product-response';

const productRouter = Router();

productRouter.get('/', getProduct);
productRouter.post('/', validateProduct, sanitizeOrderMiddleware, validateProductResponse, createProduct);

export default productRouter;
