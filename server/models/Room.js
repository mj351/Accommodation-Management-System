const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  type :{
    type: String,
    require: true,
  },
  descripation :{
    type: String,
    require: true,
  },
  currentbookings: [],
});

module.exports = mongoose.model('Room', RoomSchema);