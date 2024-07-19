import prisma from '../../src/client';
import { beforeAll, beforeEach, afterAll } from '@jest/globals';

const setupTestDB = () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.order.deleteMany();
    await prisma.vehicle.deleteMany();
    await prisma.maintenance.deleteMany();
    await prisma.token.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.token.deleteMany();
    await prisma.order.deleteMany();
    await prisma.vehicle.deleteMany();
    await prisma.maintenance.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });
};

export default setupTestDB;
