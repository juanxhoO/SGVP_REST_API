import { Role } from '@prisma/client';
import Joi from 'joi';
import { password } from './custom.validation';

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid(Role.USER, Role.ADMIN),
    rank: Joi.string(),
    lastname: Joi.string(),
    phone: Joi.string(),
    id_card: Joi.string(),
    birthdate: Joi.date(),
    birthplace: Joi.string(),
    bloodType: Joi.string(),
    city: Joi.string()
  })
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string()
  })
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string()
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      role: Joi.string().valid(Role.USER, Role.ADMIN),
      lastname: Joi.string(),
      password: Joi.string(),
      birthdate: Joi.date(),
      phone: Joi.string(),
      city: Joi.string(),
      rank: Joi.string(),
      subcircuitId: Joi.string(),
      bloodType: Joi.string(),
      name: Joi.string(),
      id_card: Joi.string()
    })
    .min(1)
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string()
  })
};

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
