const app = require('../app');
const request = require('supertest');

process.env.NODE_ENV = 'test';


describe('Users API Route', () => {

    describe('GET /Users', () => {
        it('should return a statement', () => {
            request(app)
            .get('/api/v1/users/')
            .expect(200)
        });
    });

});