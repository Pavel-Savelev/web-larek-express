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

  return Product.create({
    title,
    description,
    image,
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
