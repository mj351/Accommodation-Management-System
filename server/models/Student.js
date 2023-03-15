const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  ///check this if I needed this
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  },
});

module.exports = mongoose.model('Student', StudentSchema);
