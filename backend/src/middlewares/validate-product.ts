import { celebrate, Joi, Segments } from 'celebrate';

const validateProduct = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(2).max(30).required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().positive().required(),
    image: Joi.object({
      fileName: Joi.string().required(),
      originalName: Joi.string().required(),
    }).required(),
  }),
});

export default validateProduct;

// import { Request, Response, NextFunction } from 'express';
// import BadRequestError from '../errors/bad-requsest-error';

// export default function validateProduct(req: Request, _res: Response, next: NextFunction) {
//   const {
//     title, description, image, category, price,
//   } = req.body;

//   if (!title || !description || !category || !price || !image) {
//     return next(new BadRequestError('Ошибка валидации данных при создании товара'));
//   }

//   return next();
// }
