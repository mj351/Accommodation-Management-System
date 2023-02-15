const express = require("express")
const router = express.Router();

const Room = reqire('..models/room')

router.get("/rooms", async(req, res) => {

    try {
        const rooms = await Room.find({})
        res.send(rooms)
        } catch (error) {
            return res.status(400).json({ messge: error });
        }
});

module.exports = router;