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
  type: string,
  mileage: number,
  images?: string,
  engine_cc?: number,
  engine?: string,
  carringcapacity?: number,
  passengers?: number,
  userId?:string
): Promise<Vehicle> => {
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
const queryVehicles = async <Key extends keyof Vehicle>(
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = ['id', 'name', 
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
    'passengers', 'createdAt', 'updatedAt'] as Key[]
): Promise<Pick<Vehicle, Key>[]> => {
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
  return vehicles as Pick<Vehicle, Key>[];
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Vehicle, Key> | null>}
 */
const getVehicleById = async <Key extends keyof Vehicle>(
  id: string,
  keys: Key[] = ['id', 'name', 'images', 'chasis', 'model', 'brand', 'plate',  'engine_cc', 'engine', 'type', 'carringcapacity','passengers', 'mileage', 'createdAt', 'updatedAt','userId','orders'] as Key[]
): Promise<Pick<Vehicle, Key> | null> => {
  return prisma.vehicle.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<Vehicle, Key> | null>;
};

/**
 * Update user by id
 * @param {ObjectId} vehicleId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateVehicleById = async <Key extends keyof Vehicle>(
  vehicleId: string,
  updateBody: Prisma.VehicleUpdateInput,
  keys: Key[] = ['id', 'name'] as Key[]
): Promise<Pick<Vehicle, Key> | null> => {
  const vehicle = await getVehicleById(vehicleId, ['id', 'name']);
  if (!vehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  //   if (updateBody.email && (await getUserByEmail(updateBody.email as string))) {
  //     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  //   }
  const updatedUser = await prisma.vehicle.update({
    where: { id: vehicle.id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  });
  return updatedUser as Pick<Vehicle, Key> | null;
};

/**
 * Delete user by id
 * @param {ObjectId} vehicleId
 * @returns {Promise<Vehicle>}
 */
const deleteVehicleById = async (vehicleId: string): Promise<Vehicle> => {
  const vehicle = await getVehicleById(vehicleId);
  if (!vehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await prisma.vehicle.delete({ where: { id: vehicle.id } });
  return vehicle;
};

export default {
  createVehicle,
  queryVehicles,
  getVehicleById,
  updateVehicleById,
  deleteVehicleById
};
