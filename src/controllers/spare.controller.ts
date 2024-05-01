import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { spareService } from '../services';

const createSpare = catchAsync(async (req, res) => {
  const { name, sku, stock, price, condition, brand, model } = req.body;
  const user = await spareService.createSpare(name, sku, stock, price, condition, brand, model);
  res.status(httpStatus.CREATED).send(user);
});

const getSpares = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await spareService.querySpares(filter, options);
  res.send(result);
});

const getSpare = catchAsync(async (req, res) => {
  const user = await spareService.getSpareById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateSpare = catchAsync(async (req, res) => {
  const user = await spareService.updateSpareById(req.params.userId, req.body);
  res.send(user);
});

const deleteSpare = catchAsync(async (req, res) => {
  await spareService.deleteSpareById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createSpare,
  getSpares,
  getSpare,
  updateSpare,
  deleteSpare
};
