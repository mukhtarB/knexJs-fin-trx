const app = require('../../app');
const request = require('supertest');

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

    });

});