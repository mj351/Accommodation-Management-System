const request = require('supertest');
const app = require('../server/app');
const mongoose = require('mongoose');
const Database = require('../server/database');

beforeAll(async () => {
  await Database();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Student API Endpoints', () => {
  let studentId;

  test('Create a new student', async () => {
    const response = await request(app)
      .post('/api/students')
      .send({
        firstName: 'Adam',
        lastName: 'Omer',
        studentId: 'AO1234',
      });

    expect(response.status).toBe(200);
    expect(response.body.firstName).toBe('Adam');
    expect(response.body.lastName).toBe('Omer');
    expect(response.body.studentId).toBe('AO1234');
    studentId = response.body._id;
  });

  test('Get all students', async () => {
    const response = await request(app).get('/api/students');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('Update a student', async () => {
    const response = await request(app)
      .put(`/api/students/${studentId}`)
      .send({
        firstName: 'Adam',
        lastName: 'Ali',
        studentId: 'AO1234',
      });

    expect(response.status).toBe(200);
    expect(response.body.firstName).toBe('Adam');
    expect(response.body.lastName).toBe('Ali');
    expect(response.body.studentId).toBe('AO1234');
  });

  test('Delete a student', async () => {
    const response = await request(app).delete(`/api/students/${studentId}`);
    expect(response.status).toBe(200);
  });
});
