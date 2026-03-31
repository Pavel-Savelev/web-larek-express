import { celebrate, Joi, Segments } from 'celebrate';

const validateProduct = celebrate({
  [Segments.BODY]: Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required().min(2).max(30),
    description: Joi.string().max(900).required(),
    category: Joi.string().required(),
    price: Joi.number().positive().optional().allow(null),
    image: Joi.object({
      fileName: Joi.string().required(),
      originalName: Joi.string().required(),
    }).required(),
  }),
});

export const validateProductQuery = celebrate({
  [Segments.QUERY]: Joi.object({
    name: Joi.string(),
    price: Joi.number(),
  }),
});

export default validateProduct;
