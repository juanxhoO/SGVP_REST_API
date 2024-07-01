import Joi from 'joi';

const createMaintenance = {
  body: Joi.object().keys({
    name: Joi.string(),
    price: Joi.number(),
    details: Joi.string()
  })
};

const getMaintenances = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getMaintenance = {
  params: Joi.object().keys({
    maintenanceId: Joi.string()
  })
};

const updateMaintenance = {
  params: Joi.object().keys({
    spareId: Joi.string()
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      sku: Joi.string(),
      stock: Joi.number(),
      price: Joi.number(),
      condition: Joi.string(),
      brand: Joi.string(),
      model: Joi.string()
    })
    .min(1)
};

const deleteMaintenance = {
  params: Joi.object().keys({
    maintenanceId: Joi.string()
  })
};

export default {
  createMaintenance,
  getMaintenance,
  getMaintenances,
  updateMaintenance,
  deleteMaintenance
};
