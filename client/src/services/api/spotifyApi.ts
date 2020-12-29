import axios, { AxiosRequestConfig } from "axios";
import {
  SpotifyAuthorization,
  SpotifySearch,
  SpotifySearchType,
} from "../../models/spotify.types";

let ACCESS_TOKEN: string | undefined;

const setAuthorization = (request: AxiosRequestConfig) => {
  request.headers["Authorization"] = `Bearer ${ACCESS_TOKEN}`;
  return request;
};

const reauthorizeSpotify = () => {
  return axios
    .get<SpotifyAuthorization>(
      `${process.env.REACT_APP_BACKEND_API_URL}/v1/spotify`
    )
    .then((result) => (ACCESS_TOKEN = result.data.access_token));
};

axios.interceptors.request.use(
  (request) => {
    if (request.url?.includes("api.spotify.com")) {
      if (ACCESS_TOKEN === undefined) {
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
