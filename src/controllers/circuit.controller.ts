import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { circuitService } from '../services';

const createCircuit = catchAsync(async (req, res) => {
    const { name, image, code ,cityId} = req.body;
    const user = await circuitService.createCircuit(name, image, code,cityId);
    res.status(httpStatus.CREATED).send(user);
});

const getCircuits = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await circuitService.queryCircuit(filter, options);
    res.send(result);
});

const getCircuit = catchAsync(async (req, res) => {
    const user = await circuitService.getCircuitById(req.params.circuitId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(user);
});

const updateCircuit = catchAsync(async (req, res) => {
    const user = await circuitService.updateCircuitById(req.params.userId, req.body);
    res.send(user);
});

const deleteCircuit = catchAsync(async (req, res) => {
    await circuitService.deleteCircuitById(req.params.circuitId);
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createCircuit,
    getCircuit,
    getCircuits,
    updateCircuit,
    deleteCircuit
};
