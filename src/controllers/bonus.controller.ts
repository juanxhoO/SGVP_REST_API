import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { bonusService } from '../services';

const createBonus = catchAsync(async (req, res) => {
    const {
        name,
        brand,
        type,
        mileage,
        dangerousness
    } = req.body;
    const vehicle = await bonusService.createBonus(
        name,
        brand,
        type,
        mileage,
        dangerousness
    );
    res.status(httpStatus.CREATED).send(vehicle);
});

const getBonuses = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await bonusService.queryBonuses(filter, options);
    res.send(result);
});

const getBonus = catchAsync(async (req, res) => {
    const vehicle = await bonusService.getBonusById(req.params.bonusId);
    if (!vehicle) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle not found');
    }
    res.send(vehicle);
});

const updateBonus = catchAsync(async (req, res) => {
    const vehicle = await bonusService.updateBonusById(req.params.bonusId, req.body);
    res.send(vehicle);
});

const deleteBonus = catchAsync(async (req, res) => {
    await bonusService.deleteBonusById(req.params.bonusId);
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createBonus,
    getBonus,
    getBonuses,
    updateBonus,
    deleteBonus
};
