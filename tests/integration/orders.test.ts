import request from 'supertest';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import app from '../../src/app';
import setupTestDB from '../utils/setupTestDb';
import { describe, beforeEach, test, expect } from '@jest/globals';
import { vehicleOne, userOne, maintenanceOne } from '../fixtures/order.fixture';
import prisma from '../../src/client';

setupTestDB();

describe('Order routes', () => {
  describe('POST /v1/orders', () => {
    let newOrder: {
      userId: string;
      vehicleId: string;
      status: string;
      maintenanceDay: Date;
      maintenanceId: string;
      observations: string;
      selectedTime: string;
    };

    beforeEach(async () => {
      // Insert user, vehicle, and maintenance records into the database
      const user = await prisma.user.create({ data: userOne });
      const vehicle = await prisma.vehicle.create({ data: vehicleOne });
      const maintenance = await prisma.maintenance.create({ data: maintenanceOne });

      newOrder = {
        userId: user.id,
        vehicleId: vehicle.id,
        status: 'PENDANT',
        maintenanceDay: faker.date.anytime(),
        maintenanceId: maintenance.id,
        observations: faker.string.alphanumeric(),
        selectedTime: '8'
      };
    });

    test('should return 201 and successfully register order if request data is ok', async () => {
      const res = await request(app).post('/v1/orders').send(newOrder).expect(httpStatus.CREATED);

      console.log(res.body); // Log the entire response body

      expect(res.body).toEqual({
        id: expect.anything(),
        userId: newOrder.userId,
        vehicleId: newOrder.vehicleId,
        status: 'PENDANT',
        mecanicId: null,
        maintenanceDay: newOrder.maintenanceDay.toISOString(), // Ensure the date is in ISO format
        maintenanceId: newOrder.maintenanceId,
        observations: newOrder.observations,
        selectedTime: newOrder.selectedTime,
        createdAt: expect.anything(),
        updatedAt: expect.anything()
      });

      const dbOrder = await prisma.order.findUnique({ where: { id: res.body.id } });
      expect(dbOrder).toBeDefined();
      expect(dbOrder).toMatchObject({
        userId: newOrder.userId,
        vehicleId: newOrder.vehicleId,
        status: 'PENDANT',
        mecanicId: null,
        maintenanceDay: newOrder.maintenanceDay,
        maintenanceId: newOrder.maintenanceId,
        observations: newOrder.observations,
        selectedTime: newOrder.selectedTime,
        createdAt: dbOrder?.createdAt,
        updatedAt: dbOrder?.updatedAt
      });
    });
  });
});
