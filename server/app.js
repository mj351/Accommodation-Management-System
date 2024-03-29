const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import the route files
const userRoutes = require('./routes/users');
const studentRoutes = require('./routes/students');
const roomRoutes = require('./routes/rooms');
const bookingRoutes = require('./routes/bookings');

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

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

Database();

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes)

// Error handling middleware
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// Start the Serve - https://stackoverflow.com/questions/4840879/nodejs-how-to-get-the-servers-port
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`app listening on port ${port}`));

// Docker container exit handler - https://github.com/nodejs/node/issues/4182
process.on('SIGINT', function () { process.exit() })

module.exports = app; // Export the app instance