import Joi from 'joi';

const createReport = {
  body: Joi.object().keys({
    name: Joi.string(),
    files: Joi.string(),
    date: Joi.date(),
    images: Joi.string(),
    content: Joi.string(),
    userId: Joi.string(),
    vehicleId: Joi.string()
  })
};

const getReports = {
  query: Joi.object().keys({
    name: Joi.string(),
    files: Joi.string(),
    date: Joi.date(),
    images: Joi.string(),
    content: Joi.string(),
    userId: Joi.string(),
    vehicleId: Joi.string()
  })
};

const getReport = {
  params: Joi.object().keys({
    reportId: Joi.number().integer()
  })
};

const updateReport = {
  params: Joi.object().keys({
    reportId: Joi.string()
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

const deleteReport = {
  params: Joi.object().keys({
    userId: Joi.string()
  })
};

export default {
  createReport,
  getReport,
  getReports,
  updateReport,
  deleteReport
};
