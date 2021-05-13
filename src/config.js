const config = {
  contextPath: process.env.CONTEXT_PATH || '/test-backend',
  // dev, stage, prod
  environment: process.env.ENVIRONMENT || 'dev',
  db: {
    url: process.env.DATABASE_URL || 'mongodb://localhost:27017/test',
  },
};

module.exports = config;
