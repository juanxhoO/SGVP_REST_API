import Joi from 'joi';

const createSubCircuit = {
    body: Joi.object().keys({
        name: Joi.string(),
        image: Joi.string(),
        code: Joi.string(),
        circuitId: Joi.string(),
    })
};

const getSubCircuits = {
    query: Joi.object().keys({
        name: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer()
    })
};

const getSubCircuit = {
    params: Joi.object().keys({
        circuitId: Joi.string()
    })
};

const updateSubCircuit = {
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

const deleteSubCircuit = {
    params: Joi.object().keys({
        circuitId: Joi.string()
    })
};

export default {
    createSubCircuit,
    getSubCircuit,
    getSubCircuits,
    updateSubCircuit,
    deleteSubCircuit
};
