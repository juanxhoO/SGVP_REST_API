import Joi from 'joi';

const createSpare = {
  body: Joi.object().keys({
    name: Joi.string(),
    sku: Joi.string(),
    stock:Joi.number(),
    price:Joi.number(),
    condition:Joi.string(),
    brand:Joi.string(),
    model:Joi.string()
  })
};

const getSpares = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getSpare = {
  params: Joi.object().keys({
    spareId: Joi.string()
  })
};

const updateSpare = {
  params: Joi.object().keys({
    userId: Joi.number().integer()
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      name: Joi.string()
    })
    .min(1)
};

const deleteSpare = {
  params: Joi.object().keys({
    spareId: Joi.string()
  })
};

export default {
  createSpare,
  getSpare,
  getSpares,
  updateSpare,
  deleteSpare
};
