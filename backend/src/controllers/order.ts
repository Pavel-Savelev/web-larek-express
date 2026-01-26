import { NextFunction, Request, Response } from 'express';
import { faker } from '@faker-js/faker';

function createOrder(_req: Request, res: Response, next: NextFunction) {
  try {
    return res.status(201).send({ id: faker.string.uuid(), totalCount: faker.number.int() });
  } catch (err) {
    return next(err);
  }
}

export default createOrder;
