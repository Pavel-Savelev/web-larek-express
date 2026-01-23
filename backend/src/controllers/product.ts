import { Response, Request } from 'express';
import Product from '../models/product';

export const getProduct = (_req: Request, res: Response) => Product.find({})
  .then((product) => res.status(200).send({ items: product, total: product.length }))
  .catch(() => res.status(500).send({ message: 'error' }));

export const createProduct = (req: Request, res: Response) => {
  const {
    title, description, image, category, price,
  } = req.body;

  // const products = Product.find({});

  if (!title || !description || !category || !price || !image) {
    return res.status(400).send({ message: 'Ошибка валидации данных при создании товара' });
  }
  // TODO Понять как проверять данные при получении, что title единственный в свое роде
  // if(products.find(item => item.title === title)) {
  //   return res.status(409).send({ message: 'Ошибка валидации данных при создании товара' })
  // }

  return Product.create({
    title, description, image, category, price,
  })
    .then((product) => res.status(201).send({
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
      image: product.image,
    }))
    .catch(() => res.status(500).send({ message: 'error' }));
};
