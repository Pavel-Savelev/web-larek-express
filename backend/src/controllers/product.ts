import { Response, Request, NextFunction } from 'express';
import Product from '../models/product';
import ConflictError from '../errors/conflict-error';

export function getProduct(_req: Request, res: Response, next: NextFunction) {
  Product.find({})
    .then((product) => res.status(200).send({ items: product, total: product.length }))
    .catch((err) => next(err));
}

export function createProduct(req: Request, res: Response, next: NextFunction) {
  const {
    title, description, image, category, price,
  } = req.body;

  if (!title || title.length < 2) {
    return res.status(400).send({ message: 'Поле title обязательно и минимум 2 символа' });
  }
  if (!category) {
    return res.status(400).send({ message: 'Поле category обязательно' });
  }
  if (!image || !image.fileName || !image.originalName) {
    return res.status(400).send({ message: 'Поле image обязательно и должно содержать fileName и originalName' });
  }

  return Product.create({
    description,
    image: {
      fileName: image.fileName,
      originalName: image.originalName,
    },
    title,
    category,
    price,
  })
    .then((product) => res.status(201).send({
      id: product._id,
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
      image: product.image,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Обнаружены существующие данные'));
      }
      return next(err);
    });
}
