const config = {
  // dev, stage, prod
  environment: process.env.environment || 'dev',
  db: {
    url: process.env.DATABASE_URL,
  },
};

module.exports = config;
