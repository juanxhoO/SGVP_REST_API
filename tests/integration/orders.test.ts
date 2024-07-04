import request from 'supertest';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import httpMocks from 'node-mocks-http';
import moment from 'moment';
import app from '../../src/app';
import config from '../../src/config/config';
import auth from '../../src/middlewares/auth';
import ApiError from '../../src/utils/ApiError';
import setupTestDB from '../utils/setupTestDb';
import { describe, beforeEach, test, expect, jest } from '@jest/globals';
import { userOne, admin, insertUsers } from '../fixtures/user.fixture';
import { Role, TokenType, User } from '@prisma/client';
import prisma from '../../src/client';


setupTestDB();
describe('Order routes', () => {

    describe('POST', () => {
        let newOrder: { email: string; password: string };
        beforeEach(() => {
            newOrder = {
                email: faker.internet.email().toLowerCase(),
                password: 'password1'
            };
        });


        test('should return 201 and successfully register user if request data is ok', async () => {
            const res = await request(app)
                .post('/v1/auth/register')
                .send(newOrder)
                .expect(httpStatus.CREATED);

            expect(res.body.user).not.toHaveProperty('password');
            expect(res.body.user).toEqual({
                id: expect.anything(),
                name: null,
                email: newOrder.email,
                role: Role.USER,
                isEmailVerified: false
            });

            const dbUser = await prisma.user.findUnique({ where: { id: res.body.user.id } });
            expect(dbUser).toBeDefined();
            expect(dbUser?.password).not.toBe(newOrder.password);
            expect(dbUser).toMatchObject({
                name: null,
                email: newOrder.email,
                role: Role.USER,
                isEmailVerified: false
            });

            expect(res.body.tokens).toEqual({
                access: { token: expect.anything(), expires: expect.anything() },
                refresh: { token: expect.anything(), expires: expect.anything() }
            });
        });
    })


})


