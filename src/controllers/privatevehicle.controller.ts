import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { privatevehicleService } from '../services';

const createPrivateVehicle = catchAsync(async (req, res) => {
  const {
    name,
    chasis,
    model,
    brand,
    plate,
    type,
    mileage,
    images,
    engine_cc,
    engine,
    userId
  } = req.body;
  const vehicle = await privatevehicleService.createPrivateVehicle(
    name,
    chasis,
    model,
    brand,
    plate,
    type,
    mileage,
    images,
    engine_cc,
    engine,
    userId
  );
  res.status(httpStatus.CREATED).send(vehicle);
});

const getPrivateVehicles = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await privatevehicleService.queryPrivateVehicles(filter, options);
  res.send(result);
});

const getPrivateVehicle = catchAsync(async (req, res) => {
  const vehicle = await privatevehicleService.getPrivateVehicleById(req.params.privatevehicleId);
  if (!vehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle not found');
  }
  res.send(vehicle);
});

const updatePrivateVehicle = catchAsync(async (req, res) => {
  const vehicle = await privatevehicleService.updatePrivateVehicleById(req.params.privatevehicleId, req.body);
  res.send(vehicle);
});

const deletePrivateVehicle = catchAsync(async (req, res) => {
  await privatevehicleService.deletePrivateVehicleById(req.params.privatevehicleId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createPrivateVehicle,
  getPrivateVehicle,
  getPrivateVehicles,
  updatePrivateVehicle,
  deletePrivateVehicle
};
