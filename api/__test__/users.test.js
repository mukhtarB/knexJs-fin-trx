const app = require('../../app');
const request = require('supertest');

process.env.NODE_ENV = 'test';


describe('Users API Route', () => {

    describe('GET /Users', () => {
        it('should return a statement', async () => {
            await request(app)
            .get('/api/v1/users/')
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect('users api route: Authentication Logic')
        });
    });

    describe('POST /register', () => {
        it('should post data to db', async () => {
            await request(app)
            .post('api/v1/users/register')
            .send
        });
    });

});