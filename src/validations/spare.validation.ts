import { Role } from '@prisma/client';
import Joi from 'joi';

const createSpare = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    role: Joi.string().required().valid(Role.USER, Role.ADMIN)
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
    vehicleId: Joi.number().integer()
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
    userId: Joi.number().integer()
  })
};

export default {
  createSpare,
  getSpare,
  getSpares,
  updateSpare,
  deleteSpare
};
