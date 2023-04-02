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

describe('Bookings API', () => {
  let bookingId;
  let roomId;
  let studentId;
  let userId;

  beforeAll(async () => {

    // Create a room, student, and user for testing purposes
    const roomResponse = await request(app).post('/api/rooms').send({
      roomNumber: '102',
      capacity: 2,
      type: 'Double',
      descripation: 'A nice double room near LUK',
    });

    roomId = roomResponse.body._id;

    const studentResponse = await request(app).post('/api/students').send({
      firstName: 'Maf',
      lastName: 'Kris',
      studentId: '123',
    });

    studentId = studentResponse.body._id;

    const userResponse = await request(app).post('/api/users').send({
      username: 'testuser',
      password: 'testpassword',
    });

    userId = userResponse.body._id;
  });

  test('POST /api/bookings - create a new booking', async () => {
    const newBooking = {
      student: studentId,
      room: roomId,
      user: userId,
      checkInDate: '2023-04-01',
      checkOutDate: '2023-05-01',
    };

    const response = await request(app)
      .post('/api/bookings')
      .send(newBooking);

    bookingId = response.body._id;

    expect(response.status).toBe(201);
    expect(response.body.student).toBe(newBooking.student);
    expect(response.body.room).toBe(newBooking.room);
  });

  test('GET /api/bookings - get all bookings', async () => {
    const response = await request(app).get('/api/bookings');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  test('GET /api/bookings/:id - get a booking by id', async () => {
    const response = await request(app).get(`/api/bookings/${bookingId}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(bookingId);
  });

  test('PUT /api/bookings/:id - update a booking by id', async () => {
    const updatedBooking = {
      checkInDate: '2023-04-10',
      checkOutDate: '2023-05-10',
    };

    const response = await request(app)
      .put(`/api/bookings/${bookingId}`)
      .send(updatedBooking);

    expect(response.status).toBe(200);
    expect(new Date(response.body.checkInDate)).toEqual(new Date(updatedBooking.checkInDate));
    expect(new Date(response.body.checkOutDate)).toEqual(new Date(updatedBooking.checkOutDate));
  });

  test('DELETE /api/bookings/:id - delete a booking by id', async () => {
    const response = await request(app).delete(`/api/bookings/${bookingId}`);

    expect(response.status).toBe(200);
    expect(response.body.msg).toBe('Booking removed');
  });
});
