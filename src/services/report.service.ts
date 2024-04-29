import { Report, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<Vehicle>}
 */
const createReport = async (
    email: string,
    name?: string

): Promise<Report> => {
    // if (await getUserByEmail(email)) {
    //     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    // }
    return prisma.vehicle.create({
        data: {
         name   ,
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
const queryReports = async <Key extends keyof Report>(
    filter: object,
    options: {
        limit?: number;
        page?: number;
        sortBy?: string;
        sortType?: 'asc' | 'desc';
    },
    keys: Key[] = [
        'id',
        'email',
        'name',
        'password',
        'role',
        'isEmailVerified',
        'createdAt',
        'updatedAt'
    ] as Key[]
): Promise<Pick<Report, Key>[]> => {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy;
    const sortType = options.sortType ?? 'desc';
    const users = await prisma.user.findMany({
        where: filter,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        skip: page * limit,
        take: limit,
        orderBy: sortBy ? { [sortBy]: sortType } : undefined
    });
    return users as Pick<Report, Key>[];
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<User, Key> | null>}
 */
const getReportById = async <Key extends keyof Report>(
    id: number,
    keys: Key[] = [
        'id',
        'email',
        'name',
        'password',
        'role',
        'isEmailVerified',
        'createdAt',
        'updatedAt'
    ] as Key[]
): Promise<Pick<Report, Key> | null> => {
    return prisma.user.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    }) as Promise<Pick<Report, Key> | null>;
};


/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateReportById = async <Key extends keyof Report>(
    userId: number,
    updateBody: Prisma.UserUpdateInput,
    keys: Key[] = ['id', 'email', 'name', 'role'] as Key[]
): Promise<Pick<Report, Key> | null> => {
    const user = await getVehicleById(userId, ['id', 'email', 'name']);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    //   if (updateBody.email && (await getUserByEmail(updateBody.email as string))) {
    //     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    //   }
    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: updateBody,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    });
    return updatedUser as Pick<Report, Key> | null;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteReportById = async (userId: number): Promise<Report> => {
    const user = await getReportById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await prisma.user.delete({ where: { id: user.id } });
    return user;
};

export default {
    createReport,
    queryReports,
    getReportById,
    updateReportById,
    deleteReportById
};
