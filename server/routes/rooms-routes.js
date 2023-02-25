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

router.post("/room/:id", async (req, res) => {

  const roomid = req.body.roomid

  try {
    const room = await Room.findByIdAndUpdate({_id : roomid})
    res.send(room)
  } catch (error) {
      return res.status(400).json({ messge: error });
  }
});

module.exports = router;