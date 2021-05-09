const supertest = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/app');

describe('GET /', () => {
  let mongoServer;
  const opts = { useNewUrlParser: true, useUnifiedTopology: true };
  before(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri('test');
    await mongoose.connect(mongoUri, opts);
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });
  it('it should has status code 200', (done) => {
    supertest(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
});
