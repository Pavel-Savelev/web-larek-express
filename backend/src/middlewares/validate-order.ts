import { celebrate, Joi, Segments } from 'celebrate';

const validateOrder = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    payment: Joi.string().valid('card', 'online').required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    total: Joi.number().positive().default(1),
    items: Joi.array()
      .items(
        Joi.string()
          .length(24)
          .hex()
          .default('000000000000000000000000'),
      )
      .min(1)
      .default(['000000000000000000000000']),
  }),
});

export default validateOrder;
