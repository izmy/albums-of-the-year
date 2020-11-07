const axios = require("axios");
const express = require("express");
const qs = require("qs");
const cors = require("cors");
const redisClient = require("../db/redis");

const router = express.Router();

const getSpotifyAccessToken = () => {
  return axios
    .post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({
        grant_type: "client_credentials",
      }),
      {
        headers: {
          Authorization: process.env.SPOTIFY_AUTHORIZATION,
        },
      }
    )
    .then((result) => result.data)
    .catch((err) => console.log(err));
};

router.get("/", cors(), (req, res, next) => {
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

module.exports = router;
