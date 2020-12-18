import redis from "redis";

const redisClient = redis.createClient({
  url: process.env.REDISTOGO_URL || process.env.REDIS_URL,
});
redisClient.on("error", (err) => {});

export default redisClient;
