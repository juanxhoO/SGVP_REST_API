import { PrivateVehicle, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<PrivateVehicle>}
 */
const createPrivateVehicle = async (
  name: string,
  chasis: string,
  model: string,
  brand: string,
  plate: string,
  type: string,
  mileage: number,
  images?: string,
  engine_cc?: number,
  engine?: string,
  carringcapacity?: number,
  passengers?: number,
  userId?: string
): Promise<PrivateVehicle> => {
  return prisma.vehicle.create({
    data: {
      name,
      chasis,
      model,
      brand,
      plate,
      type,
      mileage,
      images,
      engine_cc,
      engine,
      carringcapacity,
      passengers,
      userId
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
const queryPrivateVehicles = async <Key extends keyof PrivateVehicle>(
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
    'chasis',
    'model',
    'brand',
    'plate',
    'type',
    'mileage',
    'images',
    'engine_cc',
    'engine',
    'carringcapacity',
    'passengers',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<PrivateVehicle, Key>[]> => {
  const page = options.page ?? 0;
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
  return vehicles as Pick<PrivateVehicle, Key>[];
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Vehicle, Key> | null>}
 */
const getPrivateVehicleById = async <Key extends keyof PrivateVehicle>(
  id: string,
  keys: Key[] = [
    'id',
    'name',
    'images',
    'chasis',
    'model',
    'brand',
    'plate',
    'engine_cc',
    'engine',
    'type',
    'carringcapacity',
    'passengers',
    'mileage',
    'createdAt',
    'updatedAt',
    'user',
    'orders'
  ] as Key[]
): Promise<Pick<PrivateVehicle, Key> | null> => {
  return prisma.vehicle.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<PrivateVehicle, Key> | null>;
};

/**
 * Update user by id
 * @param {ObjectId} vehicleId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updatePrivateVehicleById = async <Key extends keyof PrivateVehicle>(
  vehicleId: string,
  updateBody: Prisma.VehicleUpdateInput,
  keys: Key[] = ['id',
    'name',
    'chasis',
    'model',
    'brand',
    'plate',
    'type',
    'mileage',
    'images',
    'engine_cc',
    'engine',
    'carringcapacity',
    'passengers',] as Key[]
): Promise<Pick<PrivateVehicle, Key> | null> => {
  const vehicle = await getPrivateVehicleById(vehicleId, ['id', 'name']);
  if (!vehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const updatedUser = await prisma.vehicle.update({
    where: { id: vehicle.id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  });
  return updatedUser as Pick<PrivateVehicle, Key> | null;
};

/**
 * Delete user by id
 * @param {ObjectId} vehicleId
 * @returns {Promise<Vehicle>}
 */
const deletePrivateVehicleById = async (vehicleId: string): Promise<PrivateVehicle> => {
  const vehicle = await getPrivateVehicleById(vehicleId);
  if (!vehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await prisma.vehicle.delete({ where: { id: vehicle.id } });
  return vehicle;
};

export default {
  createPrivateVehicle,
  queryPrivateVehicles,
  getPrivateVehicleById,
  updatePrivateVehicleById,
  deletePrivateVehicleById
};
