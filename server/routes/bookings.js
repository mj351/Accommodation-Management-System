const express = require('express');
const Booking = require('../models/Booking');
const User = require('../models/User')
const Room = require('../models/Room');
const Student = require('../models/Student');
const { route } = require('express/lib/application');

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


module.exports = router;
