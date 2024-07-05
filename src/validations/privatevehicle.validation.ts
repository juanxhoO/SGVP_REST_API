import Joi from 'joi';

const createPrivateVehicle = {
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

const getPrivateVehicles = {
    query: Joi.object().keys({
        name: Joi.string(),
        role: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer()
    })
};

const getPrivateVehicle = {
    params: Joi.object().keys({
        privatevehicleId: Joi.string()
        })
};

const updatePrivateVehicle = {
    params: Joi.object().keys({
        privatevehicleId: Joi.string()
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

const deletePrivateVehicle = {
    params: Joi.object().keys({
        privatevehicleId: Joi.string()
    })
};

export default {
    createPrivateVehicle,
    getPrivateVehicles,
    getPrivateVehicle,
    updatePrivateVehicle,
    deletePrivateVehicle
};
