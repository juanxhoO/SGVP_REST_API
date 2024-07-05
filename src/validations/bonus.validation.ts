import Joi from 'joi';
import { password } from './custom.validation';

const createBonus = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        brand: Joi.string().required(),
        type: Joi.string().required(),
        mileage: Joi.number(),
        dangerousness: Joi.string(),
    })
};

const getBonuses = {
    query: Joi.object().keys({
        name: Joi.string(),
        role: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer()
    })
};

const getBonus = {
    params: Joi.object().keys({
        bonusId: Joi.string()
    })
};

const updateBonus = {
    params: Joi.object().keys({
        bonusId: Joi.string()
    }),
    body: Joi.object()
        .keys({
            name: Joi.string(),
            brand: Joi.string(),
            dangerousness: Joi.string(),
            mileage: Joi.string(),
            type: Joi.string(),
        })
        .min(1)
};

const deleteBonus = {
    params: Joi.object().keys({
        bonusId: Joi.string()
    })
};

export default {
    createBonus,
    getBonus,
    getBonuses,
    updateBonus,
    deleteBonus
};
