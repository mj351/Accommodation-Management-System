const mongoose = require('mongoose');
require('dotenv').config();

const Database = async () => {
  mongoose.set('strictQuery', false);
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = Database;