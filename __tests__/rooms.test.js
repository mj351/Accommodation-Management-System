const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Room = require('../server/models/Room');
const roomsRouter = require('../server/routes/rooms');

const app = express();
app.use(express.json());
app.use('/rooms', roomsRouter);

const testRoom = {
  roomNumber: '101',
  capacity: 30,
};

// Set up a test database connection
beforeAll(async () => {
  const MONGO_TEST_URI = 'mongodb+srv://marwan:xxq6ilScsLlMM8cZ@cluster0.avzd0kp.mongodb.net/accommodation?retryWrites=true&w=majority';
  await mongoose.connect(MONGO_TEST_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
});

// Clean up the test database after each test
afterEach(async () => {
  await Room.deleteMany();
});

// Close the test database connection after all tests are finished
afterAll(async () => {
  await mongoose.connection.close();
});

// Test: Get all rooms
describe('GET /rooms', () => {
  it('should return an empty array when there are no rooms', async () => {
    const res = await request(app).get('/rooms');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });
});

// Test: Add a new room
describe('POST /rooms', () => {
  it('should create a new room and return it', async () => {
    const res = await request(app).post('/rooms').send(testRoom);
    expect(res.statusCode).toEqual(200);
    expect(res.body.roomNumber).toEqual(testRoom.roomNumber);
    expect(res.body.capacity).toEqual(testRoom.capacity);
  });
});

// Add more tests for PUT and DELETE routes similarly
