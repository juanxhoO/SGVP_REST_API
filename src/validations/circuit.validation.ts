import Joi from 'joi';

const createCircuit = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    image: Joi.string().required(),
    code: Joi.string().required(),
    cityId: Joi.string().required()
  })
};

const getCircuits = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getCircuit = {
  params: Joi.object().keys({
    circuitId: Joi.string()
  })
};

const updateCircuit = {
  params: Joi.object().keys({
    userId: Joi.string()
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      lastname: Joi.string(),
      phone: Joi.string(),
      name: Joi.string(),
      id_card: Joi.string()
    })
    .min(1)
};

const deleteCircuit = {
  params: Joi.object().keys({
    circuitId: Joi.string()
  })
};

export default {
  createCircuit,
  getCircuit,
  getCircuits,
  updateCircuit,
  deleteCircuit
};
