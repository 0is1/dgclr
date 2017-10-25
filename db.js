const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dgclr-dev', {useMongoClient: true});
mongoose.connection.on('connected', () => console.log('Mongoose default connection open'));
mongoose.Promise = global.Promise;
