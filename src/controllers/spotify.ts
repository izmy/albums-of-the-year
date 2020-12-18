import axios from "axios";
import qs from "qs";

export const getSpotifyAccessToken = () => {
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
