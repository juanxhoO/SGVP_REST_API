import { Order, User, Vehicle, Prisma, OrderStatus } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';

/**
 * Create a user
 * @param {string} userId - The ID of the user.
 * @param {string} vehicleId - The ID of the vehicle.
 * @param {string} observations - Additional observations for the order.
 * @param {string} status - The status of the order.
 * @returns {Promise<Order>}
 */

const createOrder = async (userId: string, vehicleId: string, status: OrderStatus, maintenanceDay:Date , observations?: string): Promise<Order> => {
  return prisma.order.create({
    data: {
      userId,
      vehicleId,
      status,
      maintenanceDay,
      observations
    }
  });
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryOrders = async <Key extends keyof Order>(
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = [
    'id',
    'user',
    'vehicle',
    'status',
    'maintenanceDay',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Order, Key>[]> => {
  const page = options.page ?? 0;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  const users = await prisma.order.findMany({
    where: filter,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return users as Pick<Order, Key>[];
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Order, Key> | null>}
 */
const getOrderById = async <Key extends keyof Order>(
  id: string,
  keys: Key[] = [
    'id',
    'userId',
    'vehicleId',
    'status',
    'observations',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Order, Key> | null> => {
  return prisma.order.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<Order, Key> | null>;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateOrderById = async <Key extends keyof Order>(
  userId: string,
  updateBody: Prisma.UserUpdateInput,
  keys: Key[] = ['id'] as Key[]
): Promise<Pick<Order, Key> | null> => {
  const user = await getOrderById(userId, ['id']);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  });
  return updatedUser as Pick<Order, Key> | null;
};

/**
 * Delete user by id
 * @param {ObjectId} orderId
 * @returns {Promise<Order>}
 */
const deleteOrderById = async (orderId: string): Promise<Order> => {
  const user = await getOrderById(orderId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  await prisma.user.delete({ where: { id: user.id } });
  return user;
};

export default {
  createOrder,
  queryOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById
};
