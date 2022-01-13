import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import StravaRoutes from "./routes/strava.routes";
import SpotifyRoutes from "./routes/spotify.routes";

import LoginRoutes from "./routes/login.routes";
import UsersRoutes from "./routes/users.routes";
import VotesRoutes from "./routes/votes.routes";
import NominatedAlbumsRoutes from "./routes/nominated-albums.routes";
import ResultsRoutes from "./routes/results.routes";
import ConstantsRoutes from "./routes/constants.routes";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/strava", StravaRoutes);
app.use("/api/v1/spotify", SpotifyRoutes);

app.use("/api/v1/login", LoginRoutes);
app.use("/api/v1/users", UsersRoutes);
app.use("/api/v1/votes", VotesRoutes);
app.use("/api/v1/nominated-albums", NominatedAlbumsRoutes);
app.use("/api/v1/results", ResultsRoutes);
app.use("/api/v1/constants", ConstantsRoutes);

export default app;
