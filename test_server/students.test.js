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

describe('Students API', () => {
  let studentId;
  const uniqueSuffix = Date.now();

  test('POST /api/students - create a new student', async () => {
    const res = await request(app)
      .post('/api/students')
      .set('x-auth-token', adminToken)
      .send({
        firstName: 'Adam',
        lastName: 'Omer',
        studentId: `AO_${uniqueSuffix}`,
      });

    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe('Adam');
    expect(res.body.lastName).toBe('Omer');
    expect(res.body.studentId).toBe(`AO_${uniqueSuffix}`);
    studentId = res.body._id;
  });

  test('POST /api/students - 401 without token', async () => {
    const res = await request(app)
      .post('/api/students')
      .send({
        firstName: 'No',
        lastName: 'Token',
        studentId: `NT_${uniqueSuffix}`,
      });

    expect(res.status).toBe(401);
  });

  test('GET /api/students - get all students', async () => {
    const res = await request(app)
      .get('/api/students')
      .set('x-auth-token', adminToken);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test('PUT /api/students/:id - update a student', async () => {
    const res = await request(app)
      .put(`/api/students/${studentId}`)
      .set('x-auth-token', adminToken)
      .send({
        firstName: 'Adam',
        lastName: 'Ali',
        studentId: `AO_${uniqueSuffix}`,
      });

    expect(res.status).toBe(200);
    expect(res.body.lastName).toBe('Ali');
  });

  test('DELETE /api/students/:id - 403 when staff tries to delete', async () => {
    const res = await request(app)
      .delete(`/api/students/${studentId}`)
      .set('x-auth-token', staffToken);

    expect(res.status).toBe(403);
    expect(res.body.msg).toBe('Access denied: insufficient permissions');
  });

  test('DELETE /api/students/:id - admin can delete a student', async () => {
    const res = await request(app)
      .delete(`/api/students/${studentId}`)
      .set('x-auth-token', adminToken);

    expect(res.status).toBe(200);
    expect(res.body.msg).toBe('Student removed');
  });
});
