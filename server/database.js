const mongoose = require('mongoose');

const Database = (module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose.set('strictQuery', false);
  try {
    mongoose.connect(
      'mongodb+srv://marwan:xxq6ilScsLlMM8cZ@cluster0.avzd0kp.mongodb.net/accommodation?retryWrites=true&w=majority',
      connectionParams
    );
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.log(error);
    console.log('Error connecting to MongoDB');
  }
});

Database();