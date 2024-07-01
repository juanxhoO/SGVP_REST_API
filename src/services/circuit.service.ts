import { Circuit, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';

/**
 * Create a user
 * @param {Object} circuitBody
 * @returns {Promise<Circuit>}
 */
const createCircuit = async (
  name: string,
  image: string,
  code: string,
  cityId: string
): Promise<Circuit> => {
  return prisma.circuit.create({
    data: {
      name,
      image,
      code,
      cityId
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
const queryCircuit = async <Key extends keyof Circuit>(
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = ['id', 'name', 'image', 'code', 'createdAt', 'updatedAt'] as Key[]
): Promise<Pick<Circuit, Key>[]> => {
  const page = options.page ?? 0;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  const users = await prisma.circuit.findMany({
    where: filter,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return users as Pick<Circuit, Key>[];
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Circuit, Key> | null>}
 */
const getCircuitById = async <Key extends keyof Circuit>(
  id: string,
  keys: Key[] = ['id', 'name', 'image', 'code', 'subcircuits', 'createdAt', 'updatedAt'] as Key[]
): Promise<Pick<Circuit, Key> | null> => {
  return prisma.circuit.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<Circuit, Key> | null>;
};

/**
 * Update user by id
 * @param {ObjectId} circuitId
 * @param {Object} updateBody
 * @returns {Promise<Circuit>}
 */
const updateCircuitById = async <Key extends keyof Circuit>(
  circuitId: string,
  updateBody: Prisma.CircuitUpdateInput,
  keys: Key[] = ['id', 'name', 'image', 'code'] as Key[]
): Promise<Pick<Circuit, Key> | null> => {
  const user = await getCircuitById(circuitId, ['id', 'name']);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  //   if (updateBody.email && (await getUserByEmail(updateBody.email as string))) {
  //     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  //   }
  const updatedCircuit = await prisma.circuit.update({
    where: { id: user.id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  });
  return updatedCircuit as Pick<Circuit, Key> | null;
};

/**
 * Delete user by id
 * @param {ObjectId} circuitId
 * @returns {Promise<User>}
 */
const deleteCircuitById = async (circuitId: string): Promise<Circuit> => {
  const user = await getCircuitById(circuitId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await prisma.circuit.delete({ where: { id: user.id } });
  return user;
};

export default {
  createCircuit,
  queryCircuit,
  getCircuitById,
  updateCircuitById,
  deleteCircuitById
};
