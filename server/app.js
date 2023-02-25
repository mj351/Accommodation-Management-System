const express = require('express')
const app = express()
const port = 8000
const mongoose = require("mongoose");

const usersRoute = require('./routes/users-routes')
const roomsRoute = require('./routes/rooms-routes')
const studentsRoute = require('./routes/students-routes')

app.use(express.json())

app.use('/api/users', usersRoute)
app.use('/api/rooms', roomsRoute)
app.use('/api/students', studentsRoute)

// Database
const Database = (module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  mongoose.set('strictQuery', false);
  try {
    mongoose.connect(
      "mongodb+srv://marwan:xxq6ilScsLlMM8cZ@cluster0.avzd0kp.mongodb.net/accommodation?retryWrites=true&w=majority",
      connectionParams
    );
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log(error);
    console.log("Error connecting to MongoDB");
  }
});

TextDecoderStream

Database();


// Serve - https://stackoverflow.com/questions/4840879/nodejs-how-to-get-the-servers-port
app.listen(port, () => {
  console.log(`app listening on port 8000 ${port}`)
});

// Docker container exit handler - https://github.com/nodejs/node/issues/4182
process.on('SIGINT', function () { process.exit() })