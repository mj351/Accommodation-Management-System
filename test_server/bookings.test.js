const request = require('supertest');
const app = require('../server/app');
const mongoose = require('mongoose');
const Database = require('../server/database');
const { getAdminToken } = require('./helpers');

let adminToken;
let studentId;
let roomId;
let bookingId;

const uniqueSuffix = Date.now();

beforeAll(async () => {
  await Database();
  adminToken = await getAdminToken(app);

  // Create a student for booking tests
  const studentRes = await request(app)
    .post('/api/students')
    .set('x-auth-token', adminToken)
    .send({
      firstName: 'Booking',
      lastName: 'Student',
      studentId: `BS_${uniqueSuffix}`,
    });
  studentId = studentRes.body._id;

  // Create a room for booking tests
  const roomRes = await request(app)
    .post('/api/rooms')
    .set('x-auth-token', adminToken)
    .send({
      roomNumber: `BR_${uniqueSuffix}`,
      capacity: 2,
      type: 'Double',
      description: 'Room for booking tests',
    });
  roomId = roomRes.body._id;
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Bookings API', () => {
  test('POST /api/bookings - create a new booking', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .set('x-auth-token', adminToken)
      .send({
        studentId,
        roomId,
        startDate: '2025-09-01',
        endDate: '2025-12-15',
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.student._id).toBe(studentId);
    expect(res.body.room._id).toBe(roomId);
    expect(res.body.status).toBe('booked');
    bookingId = res.body._id;
  });

  test('POST /api/bookings - 401 without token', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({
        studentId,
        roomId,
        startDate: '2026-01-01',
        endDate: '2026-06-01',
      });

    expect(res.status).toBe(401);
  });

  test('POST /api/bookings - 400 with invalid student ID', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .set('x-auth-token', adminToken)
      .send({
        studentId: '000000000000000000000000',
        roomId,
        startDate: '2026-01-01',
        endDate: '2026-06-01',
      });

    expect(res.status).toBe(400);
    expect(res.body.msg).toBe('Invalid student ID');
  });

  test('GET /api/bookings - get all bookings', async () => {
    const res = await request(app)
      .get('/api/bookings')
      .set('x-auth-token', adminToken);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test('PUT /api/bookings/:id - update a booking', async () => {
    const res = await request(app)
      .put(`/api/bookings/${bookingId}`)
      .set('x-auth-token', adminToken)
      .send({
        studentId,
        roomId,
        startDate: '2025-09-15',
        endDate: '2025-12-20',
        status: 'booked',
      });

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(bookingId);
  });

  test('PUT /api/bookings/cancel/:id - cancel a booking', async () => {
    const res = await request(app)
      .put(`/api/bookings/cancel/${bookingId}`)
      .set('x-auth-token', adminToken);

    expect(res.status).toBe(200);
    expect(res.body.msg).toBe('Booking cancelled');
    expect(res.body.data.status).toBe('cancelled');
  });

  test('DELETE /api/bookings/:id - delete a booking', async () => {
    const res = await request(app)
      .delete(`/api/bookings/${bookingId}`)
      .set('x-auth-token', adminToken);

    expect(res.status).toBe(200);
    expect(res.body.msg).toBe('Booking removed');
  });

  test('DELETE /api/bookings/:id - 404 for already deleted booking', async () => {
    const res = await request(app)
      .delete(`/api/bookings/${bookingId}`)
      .set('x-auth-token', adminToken);

    expect(res.status).toBe(404);
    expect(res.body.msg).toBe('Booking not found');
  });
});
