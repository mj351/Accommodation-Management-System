const request = require('supertest');
const app = require('../server/app');
const mongoose = require('mongoose');
const Database = require('../server/database');
const { getAdminToken, getStaffToken } = require('./helpers');

let adminToken;
let staffToken;

beforeAll(async () => {
  await Database();
  adminToken = await getAdminToken(app);
  staffToken = await getStaffToken(app);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Users API', () => {
  let userId;
  const uniqueSuffix = Date.now();

  test('POST /api/users/register - register returns a JWT token', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        username: `registertest_${uniqueSuffix}`,
        password: 'password123',
        role: 'staff',
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
  });

  test('POST /api/users/register - reject duplicate username', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        username: `registertest_${uniqueSuffix}`,
        password: 'password123',
        role: 'staff',
      });

    expect(res.status).toBe(400);
    expect(res.body.msg).toBe('User already exists');
  });

  test('POST /api/users/login - login with valid credentials', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        username: `registertest_${uniqueSuffix}`,
        password: 'password123',
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('userID');
    expect(res.body).toHaveProperty('role');
  });

  test('POST /api/users/login - reject invalid credentials', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        username: `registertest_${uniqueSuffix}`,
        password: 'wrongpassword',
      });

    expect(res.status).toBe(400);
  });

  test('GET /api/users/me - get current user with valid token', async () => {
    const res = await request(app)
      .get('/api/users/me')
      .set('x-auth-token', adminToken);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('username');
    expect(res.body).toHaveProperty('role');
    expect(res.body).not.toHaveProperty('password');
  });

  test('GET /api/users/me - 401 without token', async () => {
    const res = await request(app).get('/api/users/me');

    expect(res.status).toBe(401);
    expect(res.body.msg).toBe('No token, authorization denied');
  });

  test('GET /api/users - admin can list all users', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('x-auth-token', adminToken);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    userId = res.body[0]._id;
  });

  test('GET /api/users - 403 when staff tries to list users', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('x-auth-token', staffToken);

    expect(res.status).toBe(403);
    expect(res.body.msg).toBe('Access denied: insufficient permissions');
  });

  test('GET /api/users/:id - get user by ID', async () => {
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .set('x-auth-token', adminToken);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(userId);
  });

  test('PUT /api/users/:id - update a user', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .set('x-auth-token', adminToken)
      .send({
        username: `updated_user_${uniqueSuffix}`,
        password: 'newpassword123',
        role: 'staff',
      });

    expect(res.status).toBe(200);
    expect(res.body.username).toBe(`updated_user_${uniqueSuffix}`);
  });

  test('DELETE /api/users/:id - 403 when staff tries to delete', async () => {
    const res = await request(app)
      .delete(`/api/users/${userId}`)
      .set('x-auth-token', staffToken);

    expect(res.status).toBe(403);
  });

  test('DELETE /api/users/:id - admin can delete a user', async () => {
    const res = await request(app)
      .delete(`/api/users/${userId}`)
      .set('x-auth-token', adminToken);

    expect(res.status).toBe(200);
    expect(res.body.msg).toBe('User deleted');
  });
});
