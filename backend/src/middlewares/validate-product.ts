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

export const validateProductQuery = celebrate({
  [Segments.QUERY]: Joi.object({
    name: Joi.string(),
    price: Joi.number(),
  }),
});

export default validateProduct;
