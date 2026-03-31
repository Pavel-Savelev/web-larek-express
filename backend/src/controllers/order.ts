import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import Order from '../models/order';
import Product from '../models/product'; // импорт модели товара

async function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      payment, email, phone, address, items: rawItems, total: rawTotal,
    } = req.body;

    const total = rawTotal || 1;
    const items = Array.isArray(rawItems) && rawItems.length
      ? rawItems.map((i: string) => i || '000000000000000000000000')
      : ['000000000000000000000000'];

    // проверка, что все товары существуют
    const objectIds = items.map((i) => new mongoose.Types.ObjectId(i));
    const existingProducts = await Product.find({ _id: { $in: objectIds } });

    if (existingProducts.length !== objectIds.length) {
      return res.status(400).json({ message: 'Один или несколько товаров не существуют' });
    }

    const order = await Order.create({
      payment, email, phone, address, items, total,
    });

    return res.status(201).json({
      id: faker.string.uuid(),
      payment: order.payment,
      email: order.email,
      phone: order.phone,
      address: order.address,
      totalCount: order.total,
    });
  } catch (err) {
    return next(err);
  }
}

export default createOrder;
