import { Maintenance, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';

/**
 * Create a maintenance
 * @param {Object} maintenanceBody
 * @returns {Promise<Maintenance>}
 */
const createMaintenance = async (
  name: string,
  price: number,
  details: string
): Promise<Maintenance> => {
  return prisma.maintenance.create({
    data: {
      name,
      price,
      details
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
const queryMaintenances = async <Key extends keyof Maintenance>(
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = ['id', 'name', 'price', 'details', 'createdAt', 'updatedAt'] as Key[]
): Promise<Pick<Maintenance, Key>[]> => {
  const page = options.page ?? 0;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  const users = await prisma.maintenance.findMany({
    where: filter,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return users as Pick<Maintenance, Key>[];
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Maintenance, Key> | null>}
 */
const getMaintenanceById = async <Key extends keyof Maintenance>(
  id: string,
  keys: Key[] = ['id', 'name', 'createdAt', 'updatedAt'] as Key[]
): Promise<Pick<Maintenance, Key> | null> => {
  return prisma.maintenance.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<Maintenance, Key> | null>;
};

/**
 * Update user by id
 * @param {ObjectId} maintenanceId
 * @param {Object} updateBody
 * @returns {Promise<Maintenance>}
 */
const updateMaintenanceById = async <Key extends keyof Maintenance>(
  maintenanceId: string,
  updateBody: Prisma.MaintenanceUpdateInput,
  keys: Key[] = ['id', 'name'] as Key[]
): Promise<Pick<Maintenance, Key> | null> => {
  const maintenance = await getMaintenanceById(maintenanceId, ['id', 'name']);
  if (!maintenance) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  //   if (updateBody.email && (await getUserByEmail(updateBody.email as string))) {
  //     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  //   }
  const updatedUser = await prisma.maintenance.update({
    where: { id: maintenance.id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  });
  return updatedUser as Pick<Maintenance, Key> | null;
};

/**
 * Delete user by id
 * @param {ObjectId} maintenanceId
 * @returns {Promise<Maintenance  >}
 */
const deleteMaintenanceById = async (maintenanceId: string): Promise<Maintenance> => {
  const user = await getMaintenanceById(maintenanceId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await prisma.maintenance.delete({ where: { id: user.id } });
  return user;
};

export default {
  createMaintenance,
  queryMaintenances,
  getMaintenanceById,
  updateMaintenanceById,
  deleteMaintenanceById
};
