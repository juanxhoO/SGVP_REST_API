import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { lubricantService } from '../services';
import { create } from 'domain';

const createLubricant = catchAsync(async (req, res) => {
    const { brand,
        expireDate,
        name,
        price,
        provider,
        quantity,
        stock,
        type,
        viscosity,
        userId, } = req.body;
    const spare = await lubricantService.createLubricant(brand,
        expireDate,
        name,
        price,
        provider,
        quantity,
        stock,
        type,
        viscosity,
        userId,);
    res.status(httpStatus.CREATED).send(spare);
});

const getLubricants = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await lubricantService.queryLubricants(filter, options);
    res.send(result);
});

const getLubricant = catchAsync(async (req, res) => {
    const user = await lubricantService.getLubricantById(req.params.lubricantId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Spare not found');
    }
    res.send(user);
});

const updateLubricant = catchAsync(async (req, res) => {
    const user = await lubricantService.updateLubricantById(req.params.lubricantId, req.body);
    res.send(user);
});

const deleteLubricant = catchAsync(async (req, res) => {
    await lubricantService.deleteLubricantById(req.params.lubricantId);
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createLubricant,
    getLubricants,
    getLubricant,
    updateLubricant,
    deleteLubricant
};
