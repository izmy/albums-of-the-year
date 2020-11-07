const axios = require("axios");
const express = require("express");
const redisClient = require("../db/redis");

const router = express.Router();

const getStravaAccessToken = () => {
  return axios
    .post("https://www.strava.com/oauth/token", {
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      grant_type: process.env.STRAVA_CLIENT_GRANT_TYPE,
      refresh_token: process.env.STRAVA_CLIENT_REFRESH_TOKEN,
    })
    .then((result) => result.data)
    .catch((err) => console.log(err));
};

router.get("/", (req, res, next) => {
  res.append("Access-Control-Allow-Origin", "*");
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

module.exports = router;
