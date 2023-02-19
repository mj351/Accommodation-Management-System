const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({

    roomNumber: {
        type: String,
        require: true
    },
    floor: {
        type: Number,
        require: true
    },
    bedNumber: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    capacity: {
        type: Number,
        require: true
    },
    occupied: {
        type: Boolean,
        require: true
    },
    rentperweek: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    imageurls: [],
    currentbookings: []

}, {
    timestamps: true,
})

const roomModel = mongoose.model('rooms', roomSchema)

module.exports = roomModel
