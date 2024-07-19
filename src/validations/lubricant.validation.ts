import Joi from 'joi';

const createLubricant = {
    body: Joi.object().keys({
        brand: Joi.string(),
        expireDate: Joi.date(),
        name: Joi.string(),
        price: Joi.number(),
        provider: Joi.string(),
        quantity: Joi.number(),
        stock: Joi.number(),
        type: Joi.string(),
        viscosity: Joi.string(),
        userId: Joi.string(),
    })
};

const getLubricants = {
    query: Joi.object().keys({
        name: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer()
    })
};

const getLubricant = {
    params: Joi.object().keys({
        lubricantId: Joi.string()
    })
};

const updateLubricant = {
    params: Joi.object().keys({
        lubricantId: Joi.string()
    }),
    body: Joi.object()
        .keys({
            brand: Joi.string(),
            expireDate: Joi.date(),
            name: Joi.string(),
            price: Joi.number(),
            provider: Joi.string(),
            quantity: Joi.string(),
            stock: Joi.number(),
            type: Joi.string(),
            viscosity: Joi.string(),
            userId: Joi.string(),
        })
        .min(1)
};

const deleteLubricant = {
    params: Joi.object().keys({
        lubricantId: Joi.string()
    })
};

export default {
    createLubricant,
    getLubricant,
    getLubricants,
    updateLubricant,
    deleteLubricant
};
