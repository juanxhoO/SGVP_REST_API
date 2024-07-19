import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import prisma from '../../src/client';
import { Prisma, Role, OfficeRank } from '@prisma/client';

const password = 'password1';
const salt = bcrypt.genSaltSync(8);

export const userOne = {
  name: faker.person.firstName(),
  phone: '23232323',
  id_card: '23232322323',
  birthdate: new Date('1990-01-01T00:00:00Z'),
  lastname: faker.person.lastName(),
  email: faker.internet.email().toLowerCase(),
  password,
  rank: OfficeRank.CAPITAN,
  role: Role.USER,
  isEmailVerified: false
};

export const userTwo = {
  name: faker.person.firstName(),
  phone: '23232323',
  id_card: '23232322323',
  birthdate: new Date('1990-01-01T00:00:00Z'),
  lastname: faker.person.lastName(),
  email: faker.internet.email().toLowerCase(),
  password,
  rank: OfficeRank.CAPITAN,
  role: Role.USER,
  isEmailVerified: false
};

export const admin = {
  name: faker.person.firstName(),
  phone: '23232323',
  id_card: '23232322323',
  birthdate: new Date('1990-01-01T00:00:00Z'),
  lastname: faker.person.lastName(),
  rank: OfficeRank.CAPITAN,
  email: faker.internet.email().toLowerCase(),
  password,
  role: Role.ADMIN,
  isEmailVerified: false
};

export const insertUsers = async (users: Prisma.UserCreateManyInput[]) => {
  await prisma.user.createMany({
    data: users.map((user) => ({ ...user, password: bcrypt.hashSync(user.password, salt) }))
  });
};
