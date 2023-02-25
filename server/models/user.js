const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
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
    }
},{
    timestamps : true,
});

const userModel = mongoose.model('users', userSchema)

module.exports = userModel
