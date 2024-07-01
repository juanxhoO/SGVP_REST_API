import Joi from 'joi';

const createVehicle = {
  body: Joi.object().keys({
    name: Joi.string(),
    chasis: Joi.string(),
    images: Joi.string(),
    type: Joi.string(),
    brand: Joi.string(),
    model: Joi.string(),
    plate: Joi.string(),
    engine_cc: Joi.number().integer(),
    userId: Joi.string(),
    vehicleType: Joi.string(),
    engine: Joi.string(),
    carringcapacity: Joi.number().integer(),
    passengers: Joi.number().integer(),
    mileage: Joi.number()
  })
};

const getVehicles = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    chasis: Joi.string(),
    images: Joi.string(),
    type: Joi.string(),
    brand: Joi.string(),
    model: Joi.string(),
    plate: Joi.string(),
    engine_cc: Joi.number().integer(),
    engine: Joi.string(),
    carringcapacity: Joi.number().integer(),
    passengers: Joi.number().integer(),
    mileage: Joi.number()
  })
};

const getVehicle = {
  params: Joi.object().keys({
    vehicleId: Joi.string()
  })
};

const updateVehicle = {
  params: Joi.object().keys({
    vehicleId: Joi.string()
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      chasis: Joi.string(),
      images: Joi.string(),
      type: Joi.string(),
      brand: Joi.string(),
      model: Joi.string(),
      plate: Joi.string(),
      engine_cc: Joi.number().integer(),
      userId: Joi.string(),
      vehicleType: Joi.string(),
      engine: Joi.string(),
      carringcapacity: Joi.number().integer(),
      passengers: Joi.number().integer(),
      mileage: Joi.number()
    })
    .min(1)
};

const deleteVehicle = {
  params: Joi.object().keys({
    vehicleId: Joi.string()
  })
};

export default {
  createVehicle,
  getVehicle,
  getVehicles,
  updateVehicle,
  deleteVehicle
};
