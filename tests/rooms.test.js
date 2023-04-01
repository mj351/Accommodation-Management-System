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

describe('Rooms API', () => {
  let roomId;

  test('POST /api/rooms - create a new room', async () => {
    const newRoom = {
      roomNumber: '14',
      capacity: 2,
      type: 'Double',
      description: '',
    };

    const response = await request(app)
      .post('/api/rooms')
      .send(newRoom);

    roomId = response.body._id;

    expect(response.status).toBe(200);
    expect(response.body.roomNumber).toBe(newRoom.roomNumber);
    expect(response.body.capacity).toBe(newRoom.capacity);
    expect(response.body.type).toBe(newRoom.type);
    expect(response.body.description).toBe(newRoom.description);
  });

  test('GET /api/rooms - get all rooms', async () => {
    const response = await request(app).get('/api/rooms');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  test('GET /api/rooms/:id - get a room by id', async () => {
    const response = await request(app).get(`/api/rooms/${roomId}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(roomId);
  });

  test('PUT /api/rooms/:id - update a room by id', async () => {
    const updatedRoom = {
      roomNumber: '14',
      capacity: 2,
      type: 'Double',
      description: '',
    };

    const response = await request(app)
      .put(`/api/rooms/${roomId}`)
      .send(updatedRoom);

    expect(response.status).toBe(200);
    expect(response.body.roomNumber).toBe(updatedRoom.roomNumber);
    expect(response.body.capacity).toBe(updatedRoom.capacity);
    expect(response.body.type).toBe(updatedRoom.type);
    expect(response.body.description).toBe(updatedRoom.description);
  });

  test('DELETE /api/rooms/:id - delete a room by id', async () => {
    const response = await request(app).delete(`/api/rooms/${roomId}`);

    expect(response.status).toBe(200);
    expect(response.body.msg).toBe('Room removed');
  });
});