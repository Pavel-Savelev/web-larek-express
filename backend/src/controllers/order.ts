import { NextFunction, Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import Order from '../models/order';

async function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      payment, email, phone, address, items, total,
    } = req.body;

    const order = await Order.create({
      payment, email, phone, address, items, total,
    });

    return res
      .status(201)
      .json({
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
