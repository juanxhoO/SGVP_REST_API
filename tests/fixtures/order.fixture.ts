import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import prisma from '../../src/client';
import { Prisma, Role } from '@prisma/client';

const password = 'password1';
const salt = bcrypt.genSaltSync(8);

export const userOne = {
  name: faker.person.fullName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: Role.USER,
  isEmailVerified: false
};

export const vehicleOne = {
  name: faker.string.alphanumeric(),
  images: faker.string.alphanumeric(),
  chasis: faker.string.alphanumeric(),
  model: 'CX-3',
  type: 'AUTOMOVIL',
  brand: faker.vehicle.manufacturer(),
  plate: faker.string.alphanumeric(),
  engine_cc: 2000,
  engine: 'wew323',
  carringcapacity: 12332,
  passengers: 5,
  mileage: 233322
};

export const maintenanceOne = {
  name: faker.string.alphanumeric(),
  price: 123.92,
  details: faker.string.alphanumeric()
};

export const insertUsers = async (users: Prisma.UserCreateManyInput[]) => {
  await prisma.user.createMany({
    data: users.map((user) => ({ ...user, password: bcrypt.hashSync(user.password, salt) }))
  });
};

export const insertVehicles = async (vehicles: Prisma.VehicleCreateManyInput[]) => {
  await prisma.vehicle.createMany({
    data: vehicles.map((vehicle) => ({ ...vehicle }))
  });
};

export const insertMaintenances = async (maintenances: Prisma.MaintenanceCreateManyInput[]) => {
  await prisma.maintenance.createMany({
    data: maintenances.map((maintenance) => ({ ...maintenance }))
  });
};
