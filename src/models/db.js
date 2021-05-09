const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const config = require('../config');

async function connect() {
  let uri = config.db.url;
  if (config.environment === 'dev') {
    const mongod = new MongoMemoryServer();
    uri = await mongod.getUri();
  }
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect(uri, mongooseOpts);
}
connect();
module.exports = mongoose.connection;
