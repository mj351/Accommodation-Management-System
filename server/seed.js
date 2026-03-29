const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");
const Student = require("./models/Student");
const Room = require("./models/Room");
const Booking = require("./models/Booking");
const Database = require("./database");

const seed = async () => {
  await Database();

  console.log("Clearing existing data...");
  await User.deleteMany({});
  await Student.deleteMany({});
  await Room.deleteMany({});
  await Booking.deleteMany({});

  // Create users
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("password123", salt);

  const users = await User.insertMany([
    { username: "admin", password: hashedPassword, role: "admin" },
    { username: "staff", password: hashedPassword, role: "staff" },
  ]);
  console.log(`Created ${users.length} users`);

  // Create rooms
  const rooms = await Room.insertMany([
    { roomNumber: "101", capacity: 2, type: "Single", description: "Single room on first floor" },
    { roomNumber: "102", capacity: 2, type: "Single", description: "Single room on first floor" },
    { roomNumber: "201", capacity: 3, type: "Double", description: "Double room on second floor" },
    { roomNumber: "202", capacity: 3, type: "Double", description: "Double room on second floor" },
    { roomNumber: "301", capacity: 4, type: "Suite", description: "Suite on third floor" },
  ]);
  console.log(`Created ${rooms.length} rooms`);

  // Create students
  const students = await Student.insertMany([
    { firstName: "John", lastName: "Doe", studentId: "STU001" },
    { firstName: "Jane", lastName: "Smith", studentId: "STU002" },
    { firstName: "Alice", lastName: "Johnson", studentId: "STU003" },
    { firstName: "Bob", lastName: "Williams", studentId: "STU004" },
    { firstName: "Charlie", lastName: "Brown", studentId: "STU005" },
    { firstName: "Diana", lastName: "Davis", studentId: "STU006" },
  ]);
  console.log(`Created ${students.length} students`);

  // Create bookings
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const twoMonths = new Date(now.getFullYear(), now.getMonth() + 2, 1);
  const threeMonths = new Date(now.getFullYear(), now.getMonth() + 3, 1);

  const bookings = await Booking.insertMany([
    {
      student: students[0]._id,
      room: rooms[0]._id,
      startDate: nextMonth,
      endDate: twoMonths,
      status: "booked",
    },
    {
      student: students[1]._id,
      room: rooms[2]._id,
      startDate: nextMonth,
      endDate: threeMonths,
      status: "booked",
    },
    {
      student: students[2]._id,
      room: rooms[4]._id,
      startDate: nextMonth,
      endDate: twoMonths,
      status: "booked",
    },
  ]);

  // Update rooms with booking references
  for (const booking of bookings) {
    await Room.findByIdAndUpdate(booking.room, {
      $push: { currentbookings: booking._id },
    });
  }

  console.log(`Created ${bookings.length} bookings`);
  console.log("\nSeed completed successfully!");
  console.log("Login credentials:");
  console.log("  Admin: admin / password123");
  console.log("  Staff: staff / password123");

  await mongoose.connection.close();
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
