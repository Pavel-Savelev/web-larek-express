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
