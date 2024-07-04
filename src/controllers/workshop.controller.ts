import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { workshopService } from '../services';

const createWorkshop = catchAsync(async (req, res) => {
  const {
    name,
    email,
    address,
    phone
  } = req.body;
  const vehicle = await workshopService.createWorkshop(
    name,
    email,
    address,
    phone
  );
  res.status(httpStatus.CREATED).send(vehicle);
});

const getWorkshops = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await workshopService.queryWorkshops(filter, options);
  res.send(result);
});

const getWorkshop = catchAsync(async (req, res) => {
  const vehicle = await workshopService.getWorkshopById(req.params.vehicleId);
  if (!vehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle not found');
  }
  res.send(vehicle);
});

const updateWorkshop = catchAsync(async (req, res) => {
  const vehicle = await workshopService.updateWorkshopById(req.params.vehicleId, req.body);
  res.send(vehicle);
});

const deleteWorkshop = catchAsync(async (req, res) => {
  await workshopService.deleteWorkshopById(req.params.vehicleId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createWorkshop,
  getWorkshops,
  getWorkshop,
  updateWorkshop,
  deleteWorkshop
};
