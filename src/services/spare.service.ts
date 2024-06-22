import { Spare, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';

/**
 * Create a user
 * @param {Object} spareBody
 * @returns {Promise<Spare>}
 */
const createSpare = async (
  name: string,
  sku: string,
  stock: number,
  price: number,
  condition: string,
  brand: string,
  model: string
): Promise<Spare> => {
  return prisma.spare.create({
    data: {
      name,
      sku,
      stock,
      price,
      condition,
      brand,
      model
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
const querySpares = async <Key extends keyof Spare>(
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = [
    'id',
    'name', 'sku','stock','price','condition','brand','model',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Spare, Key>[]> => {
  const page = options.page ?? 0;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  const users = await prisma.spare.findMany({
    where: filter,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return users as Pick<Spare, Key>[];
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Spare, Key> | null>}
 */
const getSpareById = async <Key extends keyof Spare>(
  id: string,
  keys: Key[] = ['id', 'name','sku','stock','price','condition','brand','model','createdAt', 'updatedAt'] as Key[]
): Promise<Pick<Spare, Key> | null> => {
  return prisma.spare.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<Spare, Key> | null>;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateSpareById = async <Key extends keyof Spare>(
  userId: string,
  updateBody: Prisma.SpareUpdateInput,
  keys: Key[] = ['id', 'name','sku','stock','price','condition','brand','model'] as Key[]
): Promise<Pick<Spare, Key> | null> => {
  const spare = await getSpareById(userId, ['id', 'name']);
  if (!spare) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const updatedUser = await prisma.spare.update({
    where: { id: spare.id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  });
  return updatedUser as Pick<Spare, Key> | null;
};

/**
 * Delete user by id
 * @param {ObjectId} spareId
 * @returns {Promise<Spare>}
 */
const deleteSpareById = async (spareId: string): Promise<Spare> => {
  const spare = await getSpareById(spareId);
  if (!spare) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Spare not found');
  }
  await prisma.spare.delete({ where: { id: spare.id } });
  return spare;
};

export default {
  createSpare,
  querySpares,
  getSpareById,
  updateSpareById,
  deleteSpareById
};
