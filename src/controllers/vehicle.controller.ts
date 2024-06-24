import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { vehicleService } from '../services';

const createVehicle = catchAsync(async (req, res) => {
  const {  name,
    chasis,
    model,
    brand,
    plate,
    type,
    mileage,
    images,
    engine_cc,
    engine,
    carringcapacity,
    passengers,userId } = req.body;
  const vehicle = await vehicleService.createVehicle( name,
    chasis,
    model,
    brand,
    plate,
    type,
    mileage,
    images,
    engine_cc,
    engine,
    carringcapacity,
    passengers,userId
  );
  res.status(httpStatus.CREATED).send(vehicle);
});

const getVehicles = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await vehicleService.queryVehicles(filter, options);
  res.send(result);
});

const getVehicle = catchAsync(async (req, res) => {
  const vehicle = await vehicleService.getVehicleById(req.params.vehicleId);
  if (!vehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle not found');
  }
  res.send(vehicle);
});

const updateVehicle = catchAsync(async (req, res) => {
  const vehicle = await vehicleService.updateVehicleById(req.params.vehicleId, req.body);
  res.send(vehicle);
});

const deleteVehicle = catchAsync(async (req, res) => {
  await vehicleService.deleteVehicleById(req.params.vehicleId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createVehicle,
  getVehicles,
  getVehicle,
  updateVehicle,
  deleteVehicle
};
