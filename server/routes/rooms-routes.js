const express = require("express")
const router = express.Router();

const Room = reqire('..models/rooms')

router.get("/rooms", async (req, res) => {

  try {
    const rooms = await Room.find({})
    res.send(rooms)
  } catch (error) {
    return res.status(400).json({ messge: error });
  }
});

/*
app.get('/rooms', async (req, res) => {
  const rooms = await Room.find();
  res.send(rooms);
});

app.get('/rooms/:id', async (req, res) => {
  const room = await Room.findById(req.params.id);
  if (!room) return res.status(404).send('Room not found');
  res.send(room);
});

app.post('/rooms', async (req, res) => {
  const room = new Room({
    roomNumber: req.body.roomNumber,
    type: req.body.type,
    available: req.body.available
  });
  await room.save();
  res.send(room);
});

app.put('/rooms/:id', async (req, res) => {
  const room = await Room.findByIdAndUpdate(req.params.id, {
    roomNumber: req.body.roomNumber,
    type: req.body.type,
    available: req.body.available
  }, { new: true });
  if (!room) return res.status(404).send('Room not found');
  res.send(room);
});

app.delete('/rooms/:id', async (req, res) => {
  const room = await Room.findByIdAndRemove(req.params.id);
  if (!room) return res.status(404).send('Room not found');
  res.send(room);
});

app.get('/reservations', async (req, res) => {
  const reservations = await Reservation.find().populate('user').populate('room');
  res.send(reservations);
});

app.get('/reservations/:id', async (req, res) => {
  const reservation = await Reservation.findById(req.params.id).populate('user').populate('room');
  if (!reservation) return res.status(404).send('Reservation not found');
  res.send(reservation);
});

app.post('/reservations', async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send('Invalid user');
  const room = await Room.findById(req.body.roomId);
  if (!room) return res.status(400).send('Invalid room');
  const reservation = new Reservation({
    user: user._id,
    room: room._id,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });
  await reservation.save();
  res.send(reservation);
});

app.put('/reservations/:id', async (req, res) => {
  const reservation = await Reservation.findByIdAndUpdate(req.params.id, {
    user: req.body.userId,
    room: req.body.roomId,
    startDate: req.body.
    startDate: req.body.startDate,
    endDate: req.body.endDate
  }, { new: true }).populate('user').populate('room');
  if (!reservation) return res.status(404).send('Reservation not found');
  res.send(reservation);
});

app.delete('/reservations/:id', async (req, res) => {
  const reservation = await Reservation.findByIdAndRemove(req.params.id);
  if (!reservation) return res.status(404).send('Reservation not found');
  res.send(reservation);
});*/

module.exports = router;