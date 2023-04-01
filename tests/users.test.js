const request = require('supertest');
const app = require('../server/app');
const mongoose = require('mongoose');
const Database = require('../server/database');
const { clearDatabase } = require('mongoose-test-utils');

beforeEach(async () => {
  await clearDatabase(); // Clear the database before each test
});

beforeAll(async () => {
  await Database();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Users API', () => {
  let userId;

  test('POST /api/users/register - create a new user', async () => {
    const newUser = {
      username: 'testuser',
      password: 'testpassword',
      role: 'staff'
    };

    const response = await request(app)
      .post('/api/users/register')
      .send(newUser);

    if (response.status !== 200) {
      console.log(response.body); // Log the response body when the status is not 200
    }

    userId = response.body._id;

    expect(response.status).toBe(200);
    expect(response.body.username).toBe(newUser.username);
  });

  test('GET /api/users - get all users', async () => {
    const response = await request(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  test('GET /api/users/:id - get a user by id', async () => {
    const response = await request(app).get(`/api/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(userId);
  });

  test('PUT /api/users/:id - update a user by id', async () => {
    const updatedUser = {
      username: 'updatedtestuser',
      password: 'updatedtestpassword',
    };

    const response = await request(app)
      .put(`/api/users/${userId}`)
      .send(updatedUser);

    expect(response.status).toBe(200);
    expect(response.body.username).toBe(updatedUser.username);
  });

  test('DELETE /api/users/:id - delete a user by id', async () => {
    const response = await request(app).delete(`/api/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body.msg).toBe('User removed');
  });
});