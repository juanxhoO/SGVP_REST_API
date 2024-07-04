import Joi from 'joi';

const createContract = {
  body: Joi.object().keys({
    name: Joi.string(),
    mecanicId: Joi.string(),
    type: Joi.string(),
    details: Joi.string()
  })
};

const getContracts = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getContract = {
  params: Joi.object().keys({
    contractId: Joi.string()
  })
};

const updateContract = {
  params: Joi.object().keys({
    contractId: Joi.string()
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

const deleteContract = {
  params: Joi.object().keys({
    contractId: Joi.string()
  })
};

export default {
  createContract,
  getContracts,
  getContract,
  updateContract,
  deleteContract
};
