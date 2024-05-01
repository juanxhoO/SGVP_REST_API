import { Vehicle, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<Vehicle>}
 */
const createVehicle = async (
  name: string,
  chasis: string,
  model: string,
  brand: string,
  plate: string,
  mileage: number
): Promise<Vehicle> => {
  return prisma.vehicle.create({
    data: {
      name,
      chasis,
      model,
      brand,
      plate,
      mileage
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
const queryVehicles = async <Key extends keyof Vehicle>(
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = ['id', 'name', 'createdAt', 'updatedAt'] as Key[]
): Promise<Pick<Vehicle, Key>[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  const vehicles = await prisma.vehicle.findMany({
    where: filter,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return vehicles as Pick<Vehicle, Key>[];
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Vehicle, Key> | null>}
 */
const getVehicleById = async <Key extends keyof Vehicle>(
  id: number,
  keys: Key[] = ['id', 'name', 'createdAt', 'updatedAt'] as Key[]
): Promise<Pick<Vehicle, Key> | null> => {
  return prisma.vehicle.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<Vehicle, Key> | null>;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateVehicleById = async <Key extends keyof Vehicle>(
  userId: number,
  updateBody: Prisma.UserUpdateInput,
  keys: Key[] = ['id', 'email', 'name', 'role'] as Key[]
): Promise<Pick<Vehicle, Key> | null> => {
  const user = await getVehicleById(userId, ['id', 'name']);
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
  return updatedUser as Pick<Vehicle, Key> | null;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteVehicleById = async (userId: number): Promise<Vehicle> => {
  const user = await deleteVehicleById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await prisma.user.delete({ where: { id: user.id } });
  return user;
};

export default {
  createVehicle,
  queryVehicles,
  getVehicleById,
  updateVehicleById,
  deleteVehicleById
};
