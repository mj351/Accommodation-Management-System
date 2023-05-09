const request = require("supertest");
const app = require("../server/app");
const mongoose = require("mongoose");
const Database = require("../server/database");

beforeAll(async () => {
  await Database();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Bookings API", () => {
  let bookingId;

  // Add a new booking
  test('POST /api/bookings - create a new booking', async () => {
    const newBooking = {
      roomId: '5f9d4b0b0f1b3e1b1c9f0b1b',
      studentId: '5f9d4b0b0f1b3e1b1c9f0b1b',
      startDate: '2020-11-01',
      endDate: '2020-11-03',
    };

    const response = await request(app)
      .post('/api/bookings')
      .send(newBooking);

      console.log(response.body);
      
    bookingId = response.body._id;

    expect(response.status).toBe(201);
    expect(response.body.roomId).toBe(newBooking.roomId);
    expect(response.body.guestId).toBe(newBooking.guestId);
    expect(response.body.checkInDate).toBe(newBooking.checkInDate);
    expect(response.body.checkOutDate).toBe(newBooking.checkOutDate);
    expect(response.body.totalAmount).toBe(newBooking.totalAmount);
    expect(response.body.status).toBe(newBooking.status);
  });

  // Get all bookings
  test('GET /api/bookings - get all bookings', async () => {
    const response = await request(app).get('/api/bookings');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });


  // Get a booking by id 

  

  // Add a new booking
  

  // Update a booking
  

  // Delete a booking
  

  // Cancel a booking


});