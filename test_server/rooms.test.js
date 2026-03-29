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

describe('Rooms API', () => {
  let roomId;
  const uniqueSuffix = Date.now();

  test('POST /api/rooms - create a new room', async () => {
    const newRoom = {
      roomNumber: `R_${uniqueSuffix}`,
      capacity: 2,
      type: 'Double',
      description: 'Double bed room close to campus',
    };

    const res = await request(app)
      .post('/api/rooms')
      .set('x-auth-token', adminToken)
      .send(newRoom);

    expect(res.status).toBe(201);
    expect(res.body.roomNumber).toBe(newRoom.roomNumber);
    expect(res.body.capacity).toBe(newRoom.capacity);
    expect(res.body.type).toBe(newRoom.type);
    expect(res.body.description).toBe(newRoom.description);
    roomId = res.body._id;
  });

  test('POST /api/rooms - 401 without token', async () => {
    const res = await request(app)
      .post('/api/rooms')
      .send({
        roomNumber: `NoAuth_${uniqueSuffix}`,
        capacity: 1,
        type: 'Single',
      });

    expect(res.status).toBe(401);
  });

  test('GET /api/rooms - get all rooms', async () => {
    const res = await request(app)
      .get('/api/rooms')
      .set('x-auth-token', adminToken);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test('PUT /api/rooms/:id - update a room', async () => {
    const updatedRoom = {
      roomNumber: `R_${uniqueSuffix}`,
      capacity: 3,
      type: 'Triple',
      description: 'Updated description',
    };

    const res = await request(app)
      .put(`/api/rooms/${roomId}`)
      .set('x-auth-token', adminToken)
      .send(updatedRoom);

    expect(res.status).toBe(200);
    expect(res.body.capacity).toBe(3);
    expect(res.body.type).toBe('Triple');
    expect(res.body.description).toBe('Updated description');
  });

  test('DELETE /api/rooms/:id - 403 when staff tries to delete', async () => {
    const res = await request(app)
      .delete(`/api/rooms/${roomId}`)
      .set('x-auth-token', staffToken);

    expect(res.status).toBe(403);
    expect(res.body.msg).toBe('Access denied: insufficient permissions');
  });

  test('DELETE /api/rooms/:id - admin can delete a room', async () => {
    const res = await request(app)
      .delete(`/api/rooms/${roomId}`)
      .set('x-auth-token', adminToken);

    expect(res.status).toBe(200);
    expect(res.body.msg).toBe('Room removed');
  });
});
