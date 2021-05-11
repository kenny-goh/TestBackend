const mongoose = require('mongoose');
const config = require('../config');

async function connect() {
  const uri = config.db.url;
  console.log(`db uri: ${uri}`);
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect(uri, mongooseOpts);
}
connect();
module.exports = mongoose.connection;
