import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { cityService } from '../services';

const createCity = catchAsync(async (req, res) => {
    const { name } = req.body;
    const user = await cityService.createCity(name);
    res.status(httpStatus.CREATED).send(user);
});

const getCities = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await cityService.queryCities(filter, options);
    res.send(result);
});

const getCity = catchAsync(async (req, res) => {
    const user = await cityService.getCityById(req.params.cityId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(user);
});

const updateCity = catchAsync(async (req, res) => {
    const user = await cityService.updateCityById(req.params.cityId, req.body);
    res.send(user);
});

const deleteCity = catchAsync(async (req, res) => {
    await cityService.deleteCityById(req.params.cityId);
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createCity,
    getCities,
    getCity,
    updateCity,
    deleteCity
};
