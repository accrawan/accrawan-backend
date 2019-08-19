module.exports = {
  database: {
    url: process.env.MONGODB_URI,
    options: {
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  },
  jwt: {
    secret: process.env.JWT_KEY,
    key: process.env.JWT_KEY,
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE
  },
  mqtt: {
    url: process.env.CLOUDMQTT_URL,
    options: {}
  }
};
