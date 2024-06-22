import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { maintenanceService } from '../services';

const createMaintenance = catchAsync(async (req, res) => {
    const { name, price, details } = req.body;
    const maintenance = await maintenanceService.createMaintenance(name, price, details);
    res.status(httpStatus.CREATED).send(maintenance);
});

const getMaintenances = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await maintenanceService.queryMaintenances(filter, options);
    res.send(result);
});

const getMaintenance = catchAsync(async (req, res) => {
    const user = await maintenanceService.getMaintenanceById(req.params.userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(user);
});

const updateMaintenance = catchAsync(async (req, res) => {
    const user = await maintenanceService.updateMaintenanceById(req.params.userId, req.body);
    res.send(user);
});

const deleteMaintenance = catchAsync(async (req, res) => {
    await maintenanceService.deleteMaintenanceById(req.params.userId);
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createMaintenance,
    getMaintenances,
    getMaintenance,
    updateMaintenance,
    deleteMaintenance
};
