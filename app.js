const dotenv = require("dotenv");
const express = require("express");

const port = process.env.PORT || 5000;

const albumsRoutes = require("./routes/albums-routes");
const stravaRoutes = require("./routes/strava-routes");
const spotifyRoutes = require("./routes/spotify-routes");

const app = express();

app.get("/", (req, res, next) => {
  res.json({ result: "all works" });
});

app.use("/api/v1/strava", stravaRoutes);
app.use("/api/v1/spotify", spotifyRoutes);

app.use("/api/albums", albumsRoutes);

dotenv.config();
app.listen(port, () => {
  console.log("App is running on port " + port);
});
