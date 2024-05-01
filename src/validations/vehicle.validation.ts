import { Role } from '@prisma/client';
import Joi from 'joi';

const createVehicle = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    role: Joi.string().required().valid(Role.USER, Role.ADMIN)
  })
};

const getVehicles = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getVehicle = {
  params: Joi.object().keys({
    vehicleId: Joi.number().integer()
  })
};

const updateVehicle = {
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

const deleteVehicle = {
  params: Joi.object().keys({
    userId: Joi.number().integer()
  })
};

export default {
  createVehicle,
  getVehicle,
  getVehicles,
  updateVehicle,
  deleteVehicle
};
