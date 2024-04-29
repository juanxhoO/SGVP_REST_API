
import { Prisma, Vehicle } from '@prisma/client';
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
    model: string,
    plate: string,
    chasis: string,
    engine_cc: number,
    mileage: number,
    images: string,
    engine_type: string,
    charge_capacity: number,
    occupants: number,
): Promise<Vehicle> => {
    return prisma.vehicle.create({
        data: {
            name,
            model,
            plate,
            chasis,
            engine_cc,
            mileage,
            images,
            engine_type,
            charge_capacity,
            occupants
        }
    })
}

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Vehicle, Key> | null>}
 */
const getVehicleById = async <Key extends keyof Vehicle>(
    id: number,
    keys: Key[] = [
        'id',
        'name',

        'createdAt',
        'updatedAt'
    ] as Key[]
): Promise<Pick<Vehicle, Key> | null> => {
    return prisma.vehicle.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    }) as Promise<Pick<Vehicle, Key> | null>;
};