const request = require('supertest');
const app = require('../server/app');

describe('GET /', () => {
  it('responds with a 404 status', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(404);
  });
});

describe('GET /api/students', () => {
  it('responds with a 200 status and JSON content type', async () => {
    const response = await request(app).get('/api/students');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });
});