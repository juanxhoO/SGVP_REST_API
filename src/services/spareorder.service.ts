import { SparesOrders, Prisma, Lubricant } from '@prisma/client';
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

const createSpareOrder = async (
    userId: string,
    vehicleId: string,
    orderId?: string,
    spareId?: string,
    lubricantId?: string,
): Promise<SparesOrders> => {
    return prisma.sparesOrders.create({
        data: {
            userId,
            vehicleId,
            orderId,
            spareId,
            lubricantId,
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
const querySpareOrders = async <Key extends keyof SparesOrders>(
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
        'spare',
        'lubricant',
        'vehicle',
        'createdAt',
        'updatedAt'
    ] as Key[]
): Promise<Pick<SparesOrders, Key>[]> => {
    const page = options.page ?? 0;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy;
    const sortType = options.sortType ?? 'desc';
    const users = await prisma.sparesOrders.findMany({
        where: filter,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        skip: page * limit,
        take: limit,
        orderBy: sortBy ? { [sortBy]: sortType } : undefined
    });
    return users as Pick<SparesOrders, Key>[];
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Order, Key> | null>}
 */
const getOrderById = async <Key extends keyof SparesOrders>(
    id: string,
    keys: Key[] = [
        'id',
        'user',
        'spare',
        'lubricant',
        'vehicle',
        'createdAt',
        'updatedAt'
    ] as Key[]
): Promise<Pick<SparesOrders, Key> | null> => {
    return prisma.sparesOrders.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    }) as Promise<Pick<SparesOrders, Key> | null>;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<Order>}
 */
const updateOrderById = async <Key extends keyof SparesOrders>(
    userId: string,
    updateBody: Prisma.UserUpdateInput,
    keys: Key[] = ['id'] as Key[]
): Promise<Pick<SparesOrders, Key> | null> => {
    const user = await getOrderById(userId, ['id']);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: updateBody,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    });
    return updatedUser as Pick<SparesOrders, Key> | null;
};

/**
 * Delete user by id
 * @param {ObjectId} orderId
 * @returns {Promise<Order>}
 */
const deleteOrderById = async (orderId: string): Promise<SparesOrders> => {
    const user = await getOrderById(orderId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }
    await prisma.sparesOrders.delete({ where: { id: user.id } });
    return user;
};

export default {
    createSpareOrder,
    querySpareOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById
};
