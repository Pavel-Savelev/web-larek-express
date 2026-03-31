import { Response, Request, NextFunction } from 'express';
import Product from '../models/product';

export function getProduct(_req: Request, res: Response, next: NextFunction) {
  Product.find({})
    .then((product) => res.status(200).send({ items: product, total: product.length }))
    .catch((err) => next(err));
}

export async function createProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      title, description, image, category, price,
    } = req.body;

    const product = await Product.create({
      title,
      description,
      category,
      price: price || null,
      image: {
        fileName: image.fileName,
        originalName: image.originalName,
      },
    });

    return res.status(201).json({
      id: product._id,
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price || null,
      image: product.image,
    });
  } catch (err: any) {
    console.error('CREATE ERROR FULL:', err);

    // --- 3. Проверка на дубликат MongoDB ---
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Обнаружены существующие данные' });
    }

    return next(err); // Остальные ошибки передаем в errorHandler
  }
}
