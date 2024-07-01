import { SubCircuit, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';

/**
 * Create a user
 * @param {Object} subCircuitBody
 * @returns {Promise<SubCircuit>}
 */
const createSubCircuit = async (
  name: string,
  image: string,
  code: string,
  circuitId: string
): Promise<SubCircuit> => {
  return prisma.subCircuit.create({
    data: {
      name,
      image,
      code,
      circuitId
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
const querySubCircuit = async <Key extends keyof SubCircuit>(
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = ['id', 'name', 'image', 'code', 'createdAt', 'updatedAt'] as Key[]
): Promise<Pick<SubCircuit, Key>[]> => {
  const page = options.page ?? 0;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  const users = await prisma.subCircuit.findMany({
    where: filter,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return users as Pick<SubCircuit, Key>[];
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<SubCircuit, Key> | null>}
 */
const getSubCircuitById = async <Key extends keyof SubCircuit>(
  id: string,
  keys: Key[] = ['id', 'name', 'image', 'code', 'createdAt', 'updatedAt'] as Key[]
): Promise<Pick<SubCircuit, Key> | null> => {
  return prisma.subCircuit.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<SubCircuit, Key> | null>;
};

/**
 * Update user by id
 * @param {ObjectId} circuitId
 * @param {Object} updateBody
 * @returns {Promise<SubCircuit>}
 */
const updateSubCircuitById = async <Key extends keyof SubCircuit>(
  circuitId: string,
  updateBody: Prisma.SubCircuitUpdateInput,
  keys: Key[] = ['id', 'name', 'image', 'code'] as Key[]
): Promise<Pick<SubCircuit, Key> | null> => {
  const user = await getSubCircuitById(circuitId, ['id', 'name']);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  //   if (updateBody.email && (await getUserByEmail(updateBody.email as string))) {
  //     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  //   }
  const updatedCircuit = await prisma.subCircuit.update({
    where: { id: user.id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  });
  return updatedCircuit as Pick<SubCircuit, Key> | null;
};

/**
 * Delete user by id
 * @param {ObjectId} circuitId
 * @returns {Promise<SubCircuit>}
 */
const deleteSubCircuitById = async (circuitId: string): Promise<SubCircuit> => {
  const user = await getSubCircuitById(circuitId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await prisma.subCircuit.delete({ where: { id: user.id } });
  return user;
};

export default {
  createSubCircuit,
  querySubCircuit,
  getSubCircuitById,
  updateSubCircuitById,
  deleteSubCircuitById
};
