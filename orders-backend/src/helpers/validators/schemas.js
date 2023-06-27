import Joi from 'joi';

const schemas = {
  user: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(8).required(),
  }),
  dishe: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().positive().required(),
    description: Joi.string().required(),
    avatar_url: Joi.string().required(),
    category: Joi.string().required(),
  }),
  order: Joi.object().keys({
    tableNumber: Joi.number().positive().required(),
    disheId: Joi.number().required(),
    quantity: Joi.number().positive().required(),
    observation: Joi.string()
  }),
  startFinishOrder: Joi.object().keys({
    id: Joi.number().positive().required()
  })
};

export default schemas;