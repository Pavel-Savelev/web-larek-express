import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';

const createOrder = (req: Request, res: Response) => {
  try {
    const {
      payment, email, phone, address, total, items,
    } = req.body;
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).send({ message: 'Ошибка валидации данных при создании товара' });
    }
    if (!payment || !['card', 'online'].includes(payment)) {
      return res.status(400).send({ message: 'Ошибка валидации данных при создании товара' });
    }
    if (!phone || !address) {
      return res.status(400).send({ message: 'Ошибка валидации данных при создании товара' });
    }
    if (!payment || !['card', 'online'].includes(payment)) {
      return res.status(400).send({ message: 'Ошибка валидации данных при создании товара' });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).send({ message: 'Ошибка валидации данных при создании товара' });
    }
    // не понял как реализовывать и нужно ли?(передоем сюда Product?)
    if (!total) {
      return res.status(400).send({ message: 'Ошибка валидации данных при создании товара' });
    }

    return res.status(201).send({ id: faker.string.uuid(), totalCount: faker.number.int() });
  } catch (err) {
    return res.status(500).send({ message: 'Ошибка сервера', error: err });
  }
};

export default createOrder;
