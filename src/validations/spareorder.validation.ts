import Joi, { string } from 'joi';

const createSpareOrder = {
  body: Joi.object().keys({
    userId: Joi.string(),
    vehicleId: Joi.string(),
    orderId: Joi.string(),
    spareId: Joi.string(),
    lubricantId: Joi.string()
  })
};

const getSpareOrders = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getSpareOrder = {
  params: Joi.object().keys({
    spareOrderId: Joi.string()
  })
};

// const updateSpareOrder = {
//   params: Joi.object().keys({
//     userId: Joi.string()
//   }),
//   body: Joi.object()
//     .keys({
//       email: Joi.string().email(),
//       lastname: Joi.string(),
//       phone: Joi.string(),
//       name: Joi.string(),
//       id_card: Joi.string()
//     })
//     .min(1)
// };

const deleteSpareOrder = {
  params: Joi.object().keys({
    spareOrderId: Joi.string()
  })
};

export default {
  createSpareOrder,
  getSpareOrder,
  getSpareOrders,
  deleteSpareOrder
};
