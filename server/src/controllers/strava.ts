import axios from "axios";

export const getStravaAccessToken = () => {
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
