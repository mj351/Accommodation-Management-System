const express = require('express');
const Room = require('../models/Room');

const router = express.Router();

// Get all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add a new room
router.post('/', async (req, res) => {
  const { roomNumber, capacity, type, description, currentbookings } = req.body;

  try {
    const newRoom = new Room({
      roomNumber,
      capacity,
      type,
      description,
      currentbookings,
    });

    const room = await newRoom.save();
    res.status(201).json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a room
router.put('/:id', async (req, res) => {
  const { roomNumber, capacity, type, description, currentbookings } = req.body;

  const roomFields = { roomNumber, capacity, type, description, currentbookings };

  try {
    let room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ msg: 'Room not found' });
    }

    room = await Room.findByIdAndUpdate(req.params.id, { $set: roomFields }, { new: true });

    res.json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a room
router.delete('/:id', async (req, res) => {
  try {
    let room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ msg: 'Room not found' });
    }

    await Room.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Room removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;