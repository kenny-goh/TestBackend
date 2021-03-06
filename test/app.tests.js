const supertest = require('supertest');
const app = require('../src/app');
const config = require('../src/config');

describe('GET /', () => {
  it('it should has status code 200', (done) => {
    supertest(app)
      .get(`${config.contextPath}/`)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
});

describe('GET /management/metrics', () => {
  it('it should has status code 200', (done) => {
    supertest(app)
      .get(`${config.contextPath}/management/metrics`)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
});

describe('GET /management/health', () => {
  it('it should has status code 200 and the expected body response', (done) => {
    supertest(app)
      .get(`${config.contextPath}/management/health`)
      .expect('Content-Type', /json/)
      .expect({ status: 'UP' })
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
});
