module.exports = {
  database: {
    url: process.env.MONGODB_URI,
    options: {
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      useNewUrlParser: true
    }
  }
};
