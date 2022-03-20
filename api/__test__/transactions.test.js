const app = require('../../app');
const request = require('supertest');
const knex = require('../../db/knex');

jest.setTimeout(300000)

beforeAll(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
});

afterAll(async () => {
    await knex.migrate.rollback();
    await knex.destroy();
});

