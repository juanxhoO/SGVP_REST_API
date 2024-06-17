import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { orderService } from '../services';

const createOrder = catchAsync(async (req, res) => {
  const { userId,vehicleId,status,observations} = req.body;
  const user = await orderService.createOrder(userId,vehicleId,status,observations);
  res.status(httpStatus.CREATED).send(user);
});

const getOrders = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await orderService.queryOrders(filter, options);
  res.send(result);
});

const getOrder = catchAsync(async (req, res) => {
  const user = await orderService.getOrderById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateOrder = catchAsync(async (req, res) => {
  const user = await orderService.updateOrderById(req.params.userId, req.body);
  res.send(user);
});

const deleteOrder = catchAsync(async (req, res) => {
  await orderService.deleteOrderById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder
};
