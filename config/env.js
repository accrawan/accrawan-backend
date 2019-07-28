module.exports = {
  database: {
    url: process.env.MONGODB_URI,
    options: {
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      useNewUrlParser: true
    }
  }
};
