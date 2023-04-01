const express = require('express');
const Booking = require('../models/Booking');
const User = require('../models/User')
const Room = require('../models/Room');
const Student = require('../models/Student');

const router = express.Router();

// Get all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user')
            .populate('student')
            .populate('room');
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add a new booking
router.post('/', async (req, res) => {
    const { userId, studentId, roomId, startDate, endDate } = req.body;

    try {
        const user = await User.findById(userId);
        const student = await Student.findById(studentId);
        const room = await Room.findById(roomId);

        if (!user || !student || !room) {
            return res.status(400).json({ msg: 'Invalid user, student, or room' });
        }

        const newBooking = new Booking({
            user: userId,
            student: studentId,
            room: roomId,
            startDate,
            endDate,
        });

        const booking = await newBooking.save();

        // Add the booking to the room's currentbookings array
        room.currentbookings.push(booking);
        await room.save();

        res.json(booking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update a booking
router.put('/:id', async (req, res) => {
    const { userId, studentId, roomId, startDate, endDate, status } = req.body;

    const bookingFields = {
        user: userId,
        student: studentId,
        room: roomId,
        startDate,
        endDate,
        status,
    };

    try {
        let booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }

        booking = await Booking.findByIdAndUpdate(req.params.id, { $set: bookingFields }, { new: true });

        res.json(booking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete a booking
router.delete('/:id', async (req, res) => {
    try {
        let booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }

        // Remove the booking from the room's currentbookings array
        const room = await Room.findById(booking.room);
        room.currentbookings = room.currentbookings.filter(
            (currentBooking) => currentBooking._id.toString() !== req.params.id
        );
        await room.save();

        await Booking.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Booking removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
