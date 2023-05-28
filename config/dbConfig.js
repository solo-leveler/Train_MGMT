const mongoose = require('mongoose');
require('dotenv').config();

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`Connected to Mongo! Database name: "${mongoose.connection.name}"`);
    return mongoose;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
};
