import { Bonus, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<Bonus>}
 */
const createBonus = async (
    name: string,
    brands: string[],
    mileage: number,
    dangerousness: string,
    price: number
): Promise<Bonus> => {
    return prisma.bonus.create({
        data: {
            name,
            brands,
            mileage,
            dangerousness,
            price
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
const queryBonuses = async <Key extends keyof Bonus>(
    filter: object,
    options: {
        limit?: number;
        page?: number;
        sortBy?: string;
        sortType?: 'asc' | 'desc';
    },
    keys: Key[] = [
        'id',
        'name',
        'brands',
        'price',
        'dangerousness',
        'mileage',
        'createdAt',
        'updatedAt'
    ] as Key[]
): Promise<Pick<Bonus, Key>[]> => {
    const page = options.page ?? 0;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy;
    const sortType = options.sortType ?? 'desc';
    const vehicles = await prisma.bonus.findMany({
        where: filter,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        skip: page * limit,
        take: limit,
        orderBy: sortBy ? { [sortBy]: sortType } : undefined
    });
    return vehicles as Pick<Bonus, Key>[];
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Bonus, Key> | null>}
 */
const getBonusById = async <Key extends keyof Bonus>(
    id: string,
    keys: Key[] = [
        'id',
        'name',
        'brands',
        'dangerousness',
        'mileage',
        'createdAt',
        'updatedAt',
    ] as Key[]
): Promise<Pick<Bonus, Key> | null> => {
    return prisma.bonus.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    }) as Promise<Pick<Bonus, Key> | null>;
};

/**
 * Update user by id
 * @param {ObjectId} vehicleId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateBonusById = async <Key extends keyof Bonus>(
    bonusId: string,
    updateBody: Prisma.VehicleUpdateInput,
    keys: Key[] = ['id', 'name', 'brand', 'dangerousness', 'type'] as Key[]
): Promise<Pick<Bonus, Key> | null> => {
    const vehicle = await getBonusById(bonusId, ['id', 'name', 'dangerousness']);
    if (!vehicle) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    //   if (updateBody.email && (await getUserByEmail(updateBody.email as string))) {
    //     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    //   }
    const updatedUser = await prisma.bonus.update({
        where: { id: vehicle.id },
        data: updateBody,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    });
    return updatedUser as Pick<Bonus, Key> | null;
};

/**
 * Delete user by id
 * @param {ObjectId} vehicleId
 * @returns {Promise<Bonus>}
 */
const deleteBonusById = async (vehicleId: string): Promise<Bonus> => {
    const vehicle = await getBonusById(vehicleId);
    if (!vehicle) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await prisma.bonus.delete({ where: { id: vehicle.id } });
    return vehicle;
};

export default {
    createBonus,
    queryBonuses,
    getBonusById,
    updateBonusById,
    deleteBonusById
};
