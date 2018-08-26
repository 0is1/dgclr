const mongoose = require('mongoose');

const connectToMongo = async () => {
  await mongoose.connect(
    'mongodb://localhost/dgclr-dev',
    { useNewUrlParser: true },
  );
  mongoose.connection.on('connected', () => console.log('Mongoose default connection open'));
};

export default connectToMongo;
