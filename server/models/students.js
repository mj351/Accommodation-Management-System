const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: {
        type: "string",
        required: true
    },
    email: {
        type: "string",
        required: true,
        unique: true
    },
    password: {
        type: "string",
        required: true,
        minlength: 6
    },
    admin: {
        type: "Boolean",
        required: true
    },
});

module.exports = mongoose.model("students", studentSchema);