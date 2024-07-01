import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { orderService } from '../services';

const createOrder = catchAsync(async (req, res) => {
  const { userId,
    vehicleId,
    status,
    maintenanceDay,
    maintenanceId,
    selectedTime,
    observations } = req.body;
  const order = await orderService.createOrder(
    userId,
    vehicleId,
    status,
    maintenanceDay,
    maintenanceId,
    selectedTime,
    observations
  );
  res.status(httpStatus.CREATED).send(order);
});

const getOrders = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await orderService.queryOrders(filter, options);
  res.send(result);
});

const getOrder = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.params.orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  res.send(order);
});

const updateOrder = catchAsync(async (req, res) => {
  const user = await orderService.updateOrderById(req.params.userId, req.body);
  res.send(user);
});

const deleteOrder = catchAsync(async (req, res) => {
  await orderService.deleteOrderById(req.params.orderId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder
};
