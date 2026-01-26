import { celebrate, Joi, Segments } from 'celebrate';

const validateOrder = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    payment: Joi.string().valid('card', 'online').required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    total: Joi.number().positive().required(),
    items: Joi.array().items(Joi.string().required()).min(1).required(),
  }),
});

export default validateOrder;

// import { Request, Response, NextFunction } from 'express';
// import BadRequestError from '../errors/bad-requsest-error';

// function validateOrder(
//   req: Request,
//   _res: Response,
//   next: NextFunction,
// ) {
//   const {
//     email, payment, phone, address, total, items,
//   } = req.body;

//   if (!email || !/\S+@\S+\.\S+/.test(email)) {
//     return next(new BadRequestError('Неверный email'));
//   }
//   if (!payment || !['card', 'online'].includes(payment)) {
//     return next(new BadRequestError('Неверный способ оплаты'));
//   }
//   if (!phone || !address) {
//     return next(new BadRequestError('Телефон или адрес отсутствуют'));
//   }
//   if (!items || !Array.isArray(items) || items.length === 0) {
//     return next(new BadRequestError('Нет товаров в заказе'));
//   }
//   if (!total) {
//     return next(new BadRequestError('Общая сумма не указана'));
//   }

//   return next();
// }

// export default validateOrder;
