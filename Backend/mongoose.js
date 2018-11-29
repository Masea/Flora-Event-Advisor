var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/Flora', { useNewUrlParser: true, useCreateIndex: true, });
module.exports = {mongoose};