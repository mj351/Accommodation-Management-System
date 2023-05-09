const express = require("express");
const Booking = require("../models/Booking");
const User = require("../models/User");
const Room = require("../models/Room");
const Student = require("../models/Student");
const { route } = require("express/lib/application");

const router = express.Router();

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("student")
      .populate("room")
      .sort({ createdAt: -1 });
    //   .populate("user")
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Add a new booking
router.post("/", async (req, res) => {
  const {
    studentId,
    roomId,
    startDate,
    endDate,
  } = req.body;

  //   console.log("Request body:", req.body);

  try {

    const student = await Student.findById(studentId);
    const room = await Room.findById(roomId);
    // console.log(room.currentbookings);
    
    if (!student) {
      return res.status(400).json({ msg: "Invalid student ID" });
    }
    if (!room) {
      return res.status(400).json({ msg: "Invalid room ID" });
    }

    let checkBookings = await Booking.find({
      room: roomId,
      status: { $ne: "cancelled" },
    });
    console.log(checkBookings.length);
    // console.log(
    //   !(
    //     new Date(checkBookings[0].endDate).getTime() <
    //     new Date(startDate).getTime()
    //   )
    // );
    checkBookings = checkBookings.filter(
      (booking) =>
        !(new Date(booking.endDate).getTime() < new Date(startDate).getTime())
    );

    checkBookings = checkBookings.filter(
      (booking) =>
        !(new Date(booking.startDate).getTime() > new Date(endDate).getTime())
    );
    console.log("checkBookings", checkBookings.length, room.capacity);
    if (checkBookings.length >= room.capacity) {
      return res.status(400).json({ msg: "Room is full" });
    }

    const newBooking = new Booking({
      student: studentId,
      room: roomId,
      startDate,
      endDate,
    });

    const booking = await newBooking.save();

    // Add the booking to the room's currentbookings array
    room.currentbookings.push(booking);
    await room.save();

    const newCreatedBooking = await Booking.findById(booking._id)
      .populate("student")
      .populate("room");

    res.json(newCreatedBooking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update a booking
router.put("/:id", async (req, res) => {
  const { studentId, roomId, startDate, endDate, status } = req.body;

  const bookingFields = {
    student: studentId,
    room: roomId,
    startDate,
    endDate,
    status,
  };

  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: bookingFields },
      { new: true }
    );

    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete a booking
router.delete("/:id", async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    // Remove the booking from the room's currentbookings array
    const room = await Room.findById(booking.room);
    room.currentbookings = room.currentbookings.filter(
      (currentBooking) => currentBooking._id.toString() !== req.params.id
    );
    await room.save();

    await Booking.findByIdAndRemove(req.params.id);

    res.json({ msg: "Booking removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/cancel/:id", async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    // Remove the booking from the room's currentbookings array

    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: req.params.id },
      { status: "cancelled" },
      { new: true }
    );

    res.json({ msg: "Booking cancelled", data: updatedBooking });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;