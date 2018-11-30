var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost:27017/Flora', { useNewUrlParser: true, useCreateIndex: true, });

mongoose.connect('mongodb://admin:admin123@ds053164.mlab.com:53164/flora', { useNewUrlParser: true, poolSize:100, useCreateIndex: true, },function(err, db) {
 } );

module.exports = {mongoose};