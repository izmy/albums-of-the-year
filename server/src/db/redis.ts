import redis from "redis";
import * as url from "url";

let redisClient: redis.RedisClient;

if (process.env.REDISTOGO_URL) {
  const rtg = url.parse(process.env.REDISTOGO_URL);
  redisClient = redis.createClient({ url: process.env.REDISTOGO_URL });
  if (rtg.auth !== null) {
    redisClient.auth(rtg.auth.split(":")[1]);
  }
} else {
  redisClient = redis.createClient();
}

redisClient.on("error", (err) => {
  console.log("REDIS URL", process.env.REDISTOGO_URL, process.env.REDIS_URL);
  console.log("REDIS_AUTH_PASS", process.env.REDIS_AUTH_PASS);
  console.log("REDIS ERROR", err);
});

export default redisClient;
