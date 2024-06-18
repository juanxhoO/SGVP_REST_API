import Joi from 'joi';

const createUser = {
    body: Joi.object().keys({
        userId: Joi.string(),
        vehicleId: Joi.string(),
        status: Joi.string(),
        observations: Joi.string()
    })
};

const getUsers = {
    query: Joi.object().keys({
        name: Joi.string(),
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
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteOrder
};
