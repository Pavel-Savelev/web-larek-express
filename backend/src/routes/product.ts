import { Router } from 'express';
import { getProduct, createProduct } from '../controllers/product';

const router = Router();

router.get('/', getProduct);
router.post('/', createProduct);

export default router;
