import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { spareOrderService } from '../services';

const createSpareOrder = catchAsync(async (req, res) => {
    const { userId,
        vehicleId,
        orderId,
        spareId,
        lubricantId, } = req.body;
    const order = await spareOrderService.createSpareOrder(
        userId,
        vehicleId,
        orderId,
        spareId,
        lubricantId,
    );
    res.status(httpStatus.CREATED).send(order);
});

const getSpareOrders = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await spareOrderService.querySpareOrders(filter, options);
    res.send(result);
});

const getSpareOrder = catchAsync(async (req, res) => {
    const order = await spareOrderService.getOrderById(req.params.spareOrderId);
    if (!order) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }
    res.send(order);
});

// const updateOrder = catchAsync(async (req, res) => {
//   const user = await spareOrderService.updateOrderById(req.params.userId, req.body);
//   res.send(user);
// });

const deleteSpareOrder = catchAsync(async (req, res) => {
    await spareOrderService.deleteOrderById(req.params.orderId);
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createSpareOrder,
    getSpareOrders,
    getSpareOrder,
    deleteSpareOrder
};
