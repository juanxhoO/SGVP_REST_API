import Joi from 'joi';

const createOrder = {
  body: Joi.object().keys({
    userId: Joi.string(),
    vehicleId: Joi.string(),
    status: Joi.string(),
    observations: Joi.string(),
    selectedTime: Joi.string(),
    maintenanceId: Joi.string(),
    maintenanceDay: Joi.date()
  })
};

const getOrders = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getOrder = {
  params: Joi.object().keys({
    orderId: Joi.string()
  })
};

const updateOrder = {
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

const deleteOrder = {
  params: Joi.object().keys({
    orderId: Joi.string()
  })
};

export default {
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
  deleteOrder
};
