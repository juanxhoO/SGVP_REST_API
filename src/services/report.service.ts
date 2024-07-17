import { Report, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';

/**
 * Create a user
 * @param {Object} reportBody
 * @returns {Promise<Report>}
 */
const createReport = async (
  name: string,
  files: string,
  images: string,
  content: string,
  userId: string,
  vehicleId?: string
): Promise<Report> => {
  // if (await getUserByEmail(email)) {
  //     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  return prisma.report.create({
    data: {
      name,
      files,
      images,
      content,
      userId,
      vehicleId
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
  keys: Key[] = ['id', 'createdAt', 'updatedAt'] as Key[]
): Promise<Pick<Report, Key>[]> => {
  const page = options.page ?? 0;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  const users = await prisma.report.findMany({
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
 * @returns {Promise<Pick<Report, Key> | null>}
 */
const getReportById = async <Key extends keyof Report>(
  id: string,
  keys: Key[] = ['id', 'name', 'createdAt', 'updatedAt'] as Key[]
): Promise<Pick<Report, Key> | null> => {
  return prisma.report.findUnique({
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
  reportId: string,
  updateBody: Prisma.UserUpdateInput,
  keys: Key[] = ['id', 'name'] as Key[]
): Promise<Pick<Report, Key> | null> => {
  const user = await getReportById(reportId, ['id', 'name']);
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
 * @param {ObjectId} reportId
 * @returns {Promise<Report>}
 */
const deleteReportById = async (reportId: string): Promise<Report> => {
  const user = await getReportById(reportId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Report not found');
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
