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
    age:{
        type: Number,
        require: true
    },
},{
    timestamps : true,
});

module.exports = mongoose.model("students", studentSchema);