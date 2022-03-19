const app = require('../app');
const request = require('supertest');

process.env.NODE_ENV = 'test';


describe('Users API Route', () => {

    describe('GET /Users', () => {
        it('should return a statement', async () => {
            const response = await request(app)
            .get('/api/v1/users/')
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8')

            expect(response.text).toBe('users api route: Authentication Logic')
        });
    });

});