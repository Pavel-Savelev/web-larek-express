import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().min(2).max(30).required(),
  description: Joi.string().max(900).required(),
  category: Joi.string().required(),
  price: Joi.number().positive().allow(null),
  image: Joi.object({
    fileName: Joi.string().required(),
    originalName: Joi.string().required(),
    _id: Joi.string().required(),
  }).required(),
});

function validateProductResponse(_req: Request, res: Response, next: NextFunction) {
  const originalJson = res.json;

  res.json = function (data) {
    const { error } = schema.validate(data);

    if (error) {
      console.error('Ошибка ответа:', error.details);
    }

    return originalJson.call(this, data);
  };

  next();
}

export default validateProductResponse;
