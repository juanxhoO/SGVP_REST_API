import Joi from 'joi';

const createCity = {
  body: Joi.object().keys({
    name: Joi.string()
  })
};

const getCities = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getCity = {
  params: Joi.object().keys({
    cityId: Joi.string()
  })
};

const updateCity = {
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

const deleteCity = {
  params: Joi.object().keys({
    circuitId: Joi.string()
  })
};

export default {
  createCity,
  getCities,
  getCity,
  updateCity,
  deleteCity
};
