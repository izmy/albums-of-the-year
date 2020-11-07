const redis = require("redis");

const client = redis.createClient({
  url: process.env.REDISTOGO_URL || process.env.REDIS_URL,
});
client.on("error", (err) => {});

module.exports = client;
