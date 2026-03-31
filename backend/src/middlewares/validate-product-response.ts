import { celebrate, Joi, Segments } from 'celebrate';

const validateProductResponse = celebrate({
  [Segments.BODY]: Joi.object({
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
  }),
});

export default validateProductResponse;
