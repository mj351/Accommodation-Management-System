const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import the route files
const userRoutes = require('./routes/users');
const studentRoutes = require('./routes/students');
const roomRoutes = require('./routes/rooms');

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
  res.status(200).send("Hello World")
})

// Database connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => console.log('Successfully connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/rooms', roomRoutes);

// Start the Serve - https://stackoverflow.com/questions/4840879/nodejs-how-to-get-the-servers-port
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`app listening on port ${port}`));

// Docker container exit handler - https://github.com/nodejs/node/issues/4182
process.on('SIGINT', function () { process.exit() })

