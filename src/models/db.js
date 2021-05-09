const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const config = require('../config');

async function connect() {
  const uri = config.db.url;
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect(uri, mongooseOpts);
}
connect();

module.exports = mongoose.connection;
