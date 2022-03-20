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

describe('Users API Route', () => {

    describe('GET /Users', () => {
        it('should return a statement', async () => {
            await request(app)
            .get('/api/v1/users/')
            .expect(200)
            .expect('Content-Type', /text/)
            .expect('users api route: Authentication Logic')
        });
    });

    describe('POST /register', () => {

        it('should fail to post data to db ', async () => {
            const reqBodies = [
                {firstName: 'Salsa'},
                {lastName: 'Verde'},
                {email: 'sal-verde@gmail.com'},
                {password: 'Salsa'},
            ];

            for (let field of reqBodies) {
                await request(app)
                .post('/api/v1/users/register')
                .send(field)
                .expect(400)
                .expect('Content-Type', /json/)
                .then(response => {
                    expect(response.statusCode).toBe(400);
                    expect(response.body).toHaveProperty('requiredError');
                    expect(response.body.requiredError).toBe('All Field is required');
                })
                .catch(err => {throw err});
            };
        });

        it('should reject invalid mail', async () => {
            await request(app)
            .post('/api/v1/users/register')
            .send({
                firstName: 'Salsa',
                lastName: 'Verde',
                email: 'salVerde@email.c',
                password: 'localoca'
            })
            .expect(400)
            .expect('Content-Type', /json/)

            .then( response => {
                expect(response.statusCode).toBe(400);
                expect(response.body).toHaveProperty('validationError');
                expect(response.body.validationError).toBe('Email must be in email format; xxx@yy.zz');
            })
            .catch(err => {throw err});
        });

        it('should successfully post data to db', async () => {
            const data = {
                firstName: 'Salsa',
                lastName: 'Verde',
                email: 'salVerde@email.com',
                password: 'localoca'
            };

            await request(app)
            .post('/api/v1/users/register')
            .send(data)
            .expect(201)
            .expect('Content-Type', /json/)

            .then( response => {
                expect(response.body).toHaveProperty('user');
                expect(response.body.user).toBeTruthy();
                expect(response.body).toHaveProperty('wallet');
                expect(response.body.wallet).toBeTruthy();

                expect(response.body.user.passwordhash).toBeTruthy();
                expect(response.body.user.firstName).toBe(data.firstName);
                expect(response.body.user.lastName).toBe(data.lastName);
                expect(response.body.user.email).toBe(data.email);

                expect(response.body.wallet.walletId.toString()).toHaveLength(8);
                expect(response.body.wallet.amount).toBe(0.00);
                expect(response.body.wallet.user_id).toBe(response.body.user.id);
            })
            .catch(err => {throw err});
        });

        it('should reject duplicate data', async () => {

            await request(app)
            .post('/api/v1/users/register')
            .send({
                firstName: 'Salsa',
                lastName: 'Verde',
                email: 'salVerde@email.com',
                password: 'localoca'
            })
            .expect(400)
            .expect('Content-Type', /json/)
            
            .then( response => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.stringContaining('ServerError'),
                        expect.objectContaining({
                            statusCode: expect.any(Number),
                            errMsg: expect.objectContaining({
                                code: expect.any(String),
                                errno: expect.any(Number),
                            }),
                        }),
                    ]),
                );
                expect(response.body[1].statusCode).toBe(400);
                expect(response.body[1].errMsg.code).toBe('ER_DUP_ENTRY');
                expect(response.body[1].errMsg.errno).toBe(1062);
            })
            .catch(err => {throw err});
        });
    });

    describe('POST /login', () => {

        it('should reject invalid params: type 1', async () => {
            const reqBodies = [
                {email: 'sal-verde@gmail.com'},
                {password: 'Salsa'},
            ];
    
            for (let field of reqBodies) {
                await request(app)
                .post('/api/v1/users/login')
                .send(field)
                .expect(400)
                .expect('Content-Type', /json/)
                .then(response => {
                    expect(response.statusCode).toBe(400);
                    expect(response.body).toHaveProperty('requiredError');
                    expect(response.body.requiredError).toBe('Email and Password Field is required');
                })
                .catch(err => {throw err});
            };
        });
        
        it('should reject invalid params: type 2', async () => {
            const reqBodies = [
                {
                    email: 'sansaVerde@email.com',
                    password: 'localoca'
                },
                {
                    email: 'salVerde@email.com',
                    password: 'localocal'
                },
            ];

            for (let field of reqBodies) {
                await request(app)
                .post('/api/v1/users/login')
                .send(field)
                .expect(401)
                .expect('Content-Type', /json/)
                .then(response => {
                    expect(response.body).toHaveProperty('statusCode');
                    expect(response.body).toHaveProperty('errMsg');
                    expect(response.body.errMsg).toMatch(/Incorrect Email or Password/);
                })
                .catch(err => {throw err});
            };
        });
    });

});