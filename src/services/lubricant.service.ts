import { Lubricant, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';

/**
 * Create a user
 * @param {Object} spareBody
 * @returns {Promise<Lubricant>}
 */
const createLubricant = async (
    brand: string,
    expireDate: Date,
    name: string,
    price: number,
    provider: string,
    quantity: number,
    stock: number,
    type: string,
    viscosity: string,
    userId: string,
): Promise<Lubricant> => {
    return prisma.lubricant.create({
        data: {
            brand,
            expireDate,
            name,
            price,
            provider,
            quantity,
            stock,
            type,
            viscosity,
            userId,
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
const queryLubricants = async <Key extends keyof Lubricant>(
    filter: object,
    options: {
        limit?: number;
        page?: number;
        sortBy?: string;
        sortType?: 'asc' | 'desc';
    },
    keys: Key[] = [
        'id',
        'brand',
        'expireDate',
        'name',
        'price',
        'provider',
        'quantity',
        'stock',
        'type',
        'viscosity',
        'user',
        'createdAt',
        'updatedAt'
    ] as Key[]
): Promise<Pick<Lubricant, Key>[]> => {
    const page = options.page ?? 0;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy;
    const sortType = options.sortType ?? 'desc';
    const users = await prisma.lubricant.findMany({
        where: filter,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        skip: page * limit,
        take: limit,
        orderBy: sortBy ? { [sortBy]: sortType } : undefined
    });
    return users as Pick<Lubricant, Key>[];
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Spare, Key> | null>}
 */
const getLubricantById = async <Key extends keyof Lubricant>(
    id: string,
    keys: Key[] = [
        'id',
        'brand',
        'expireDate',
        'name',
        'price',
        'provider',
        'quantity',
        'stock',
        'type',
        'viscosity',
        'user',
        'createdAt',
        'updatedAt'
    ] as Key[]
): Promise<Pick<Lubricant, Key> | null> => {
    return prisma.lubricant.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    }) as Promise<Pick<Lubricant, Key> | null>;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateLubricantById = async <Key extends keyof Lubricant>(
    userId: string,
    updateBody: Prisma.LubricantUpdateInput,
    keys: Key[] = ['id',
        'brand',
        'expireDate',
        'name',
        'price',
        'provider',
        'quantity',
        'stock',
        'type',
        'viscosity',
        'user',] as Key[]
): Promise<Pick<Lubricant, Key> | null> => {
    const spare = await getLubricantById(userId, ['id', 'name']);
    if (!spare) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    const updatedUser = await prisma.lubricant.update({
        where: { id: spare.id },
        data: updateBody,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    });
    return updatedUser as Pick<Lubricant, Key> | null;
};

/**
 * Delete user by id
 * @param {ObjectId} spareId
 * @returns {Promise<Spare>}
 */
const deleteLubricantById = async (spareId: string): Promise<Lubricant> => {
    const spare = await getLubricantById(spareId);
    if (!spare) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Spare not found');
    }
    await prisma.lubricant.delete({ where: { id: spare.id } });
    return spare;
};

export default {
    createLubricant,
    queryLubricants,
    getLubricantById,
    updateLubricantById,
    deleteLubricantById
};
