import express from "express";
import redisClient from "../db/redis";
import { getSpotifyAccessToken } from "../controllers/spotify";

const router = express.Router();

router.get("/", (req, res, next) => {
  redisClient.get("spotifyToken", (err, data) => {
    if (err) throw err;
    if (data !== null) {
      const parsedData = JSON.parse(data);
      const expiresAt = new Date(parsedData.expires_at);
      const now = new Date();

      if (now < expiresAt) {
        return res.json(JSON.parse(data));
      }
    }

    getSpotifyAccessToken().then((accessToken) => {
      const expires_at = new Date().getTime() + accessToken.expires_in * 1000;
      accessToken = {
        ...accessToken,
        expires_at,
      };
      redisClient.set("spotifyToken", JSON.stringify(accessToken));
      return res.json(accessToken);
    });
  });
});

export default router;
