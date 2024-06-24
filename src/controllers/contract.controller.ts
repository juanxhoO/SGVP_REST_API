import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { contractService } from '../services';

const createUser = catchAsync(async (req, res) => {
    const { name, mecanicId, type } = req.body;
    const user = await contractService.createContract(name, mecanicId, type);
    res.status(httpStatus.CREATED).send(user);
});

const getContracts = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await contractService.queryContract(filter, options);
    res.send(result);
});

const getContract = catchAsync(async (req, res) => {
    const user = await contractService.getContractById(req.params.userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(user);
});

const updateContract = catchAsync(async (req, res) => {
    const user = await contractService.updateContractById(req.params.userId, req.body);
    res.send(user);
});

const deleteContract = catchAsync(async (req, res) => {
    await contractService.deleteContractById(req.params.userId);
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createUser,
    getContract,
    getContracts,
    updateContract,
    deleteContract
};
