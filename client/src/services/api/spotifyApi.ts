import axios, { AxiosRequestConfig } from "axios";
import {
  SpotifyAuthorization,
  SpotifySearch,
  SpotifySearchType,
} from "../../models/spotify.types";

let SPOTIFY_AUTH: SpotifyAuthorization;

const setAuthorization = (request: AxiosRequestConfig) => {
  request.headers["Authorization"] = `Bearer ${SPOTIFY_AUTH.access_token}`;
  return request;
};

const reauthorizeSpotify = () => {
  return axios
    .get<SpotifyAuthorization>(
      `${process.env.REACT_APP_BACKEND_API_URL}/v1/spotify`
    )
    .then((result) => {
      SPOTIFY_AUTH = result.data;
    });
};

axios.interceptors.request.use(
  (request) => {
    if (request.url?.includes("api.spotify.com")) {
      if (SPOTIFY_AUTH === undefined) {
        return reauthorizeSpotify().then(() => {
          return setAuthorization(request);
        });
      }
      if (new Date(SPOTIFY_AUTH.expires_at) <= new Date()) {
        return reauthorizeSpotify().then(() => {
          return setAuthorization(request);
        });
      }
      return setAuthorization(request);
    }
    return request;
  },
  (error) => {
    console.error("axios.interceptors.request", error);
  }
);

export const searchByType = (query: string, type: SpotifySearchType[]) => {
  return axios
    .get<SpotifySearch>("https://api.spotify.com/v1/search", {
      params: {
        q: query,
        type: type.toString(),
      },
    })
    .then((result) => result.data);
};
