import request from 'supertest';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import app from '../../src/app';
import setupTestDB from '../utils/setupTestDb';
import { describe, beforeEach, test, expect } from '@jest/globals';
import prisma from '../../src/client';

setupTestDB();

describe('Vehicle routes', () => {
  describe('POST /v1/vehicles', () => {
    let newVehicle: {
      name: string;
      images: string;
      chasis: string;
      model: string;
      type: string;
      brand: string;
      plate: string;
      engine_cc: number;
      engine: string;
      carringcapacity: number;
      passengers: number;
      mileage: number;
    };

    beforeEach(() => {
      newVehicle = {
        name: 'Subaru2ds',
        images: 'dsdsd',
        chasis: '232323dsdsd23',
        model: 'CX-3',
        type: 'AUTOMOVIL',
        brand: 'Mazda',
        plate: 'PDR6788',
        engine_cc: 2000,
        engine: 'wew323',
        carringcapacity: 12332,
        passengers: 5,
        mileage: 233322
      };
    });

    test('should return 201 and successfully register vehicle if request data is ok', async () => {
      const res = await request(app)
        .post('/v1/vehicles')
        .send(newVehicle)
        .expect(httpStatus.CREATED);

      console.log(res.body); // Log the entire response body

      expect(res.body).toEqual({
        id: expect.anything(),
        name: newVehicle.name,
        images: newVehicle.images,
        chasis: newVehicle.chasis,
        model: newVehicle.model,
        brand: newVehicle.brand,
        plate: newVehicle.plate,
        engine_cc: newVehicle.engine_cc,
        type: newVehicle.type,
        engine: newVehicle.engine,
        carringcapacity: newVehicle.carringcapacity,
        passengers: newVehicle.passengers,
        mileage: newVehicle.mileage,
        userId: null,
        createdAt: expect.anything(),
        updatedAt: expect.anything()
      });

      const dbVehicle = await prisma.vehicle.findUnique({ where: { id: res.body.id } });
      expect(dbVehicle).toBeDefined();
      expect(dbVehicle).toMatchObject({
        id: res.body.id,
        name: newVehicle.name,
        images: newVehicle.images,
        chasis: newVehicle.chasis,
        model: newVehicle.model,
        brand: newVehicle.brand,
        plate: newVehicle.plate,
        engine_cc: newVehicle.engine_cc,
        type: newVehicle.type,
        engine: newVehicle.engine,
        carringcapacity: newVehicle.carringcapacity,
        passengers: newVehicle.passengers,
        mileage: newVehicle.mileage,
        userId: null,
        createdAt: dbVehicle?.createdAt,
        updatedAt: dbVehicle?.updatedAt
      });
    });
  });
});
