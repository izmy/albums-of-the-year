import express from "express";
import { getStravaAccessToken } from "../controllers/strava";
import redisClient from "../db/redis";

const router = express.Router();

router.get("/", (req, res, next) => {
  redisClient.get("stravaToken", (err, data) => {
    if (err) throw err;
    if (data !== null) {
      const parsedData = JSON.parse(data);
      const expiresAt = new Date(parsedData.expires_at * 1000);
      const now = new Date();

      if (now < expiresAt) {
        return res.json(JSON.parse(data));
      }
    }

    getStravaAccessToken().then((accessToken) => {
      redisClient.set("stravaToken", JSON.stringify(accessToken));
      return res.json(accessToken);
    });
  });
});

export default router;
