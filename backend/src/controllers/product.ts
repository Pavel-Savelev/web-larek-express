import { Response, Request, NextFunction } from 'express';
import Product from '../models/product';

export function getProduct(_req: Request, res: Response, next: NextFunction) {
  Product.find({})
    .then((product) => res.status(200).send({ items: product, total: product.length }))
    .catch((err) => next(err));
}

export function createProduct(req: Request, res: Response, next: NextFunction) {
  const {
    title,
    description,
    image,
    category,
    price,
  } = req.body;
  console.log('CREATE PRODUCT WORKS');

  if (!title) {
    return res.status(400).send({ message: 'Поле title обязательно и должно существовать' });
  }

  if (title.trim().length < 2) {
    return res.status(400).send({
      message: 'Поле title обязательно и должно быть не менее 2 символов',
    });
  }

  if (title.trim().length > 30) {
    return res.status(400).send({
      message: 'Поле title обязательно и должно быть менее 30 символов',
    });
  }

  if (!category) {
    return res.status(400).send({ message: 'Поле category обязательно' });
  }
  if (!image || !image.fileName || !image.originalName) {
    return res.status(400).send({
      message:
        'Поле image обязательно и должно содержать fileName и originalName',
    });
  }

  return Product.create({
    description,
    image: {
      fileName: image.fileName as string,
      originalName: image.originalName as string,
    },
    title,
    category,
    price: price || null,
  })
    .then((product) => res.status(201).send({
      id: product._id,
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price || null,
      image: product.image,
    }))
    .catch((err) => {
      console.error('CREATE ERROR FULL:', JSON.stringify(err, null, 2));
      if (err.code === 11000) {
        return res.status(409).json({ message: 'Обнаружены существующие данные' });
      }
      return next(err);
    });
}
