import axios from "axios";
import { SpotifySearch, SpotifySearchType } from "../../models/spotify.types";

const ACCESS_TOKEN =
  "BQCKTMmZyemcEKp3A7_QDLJvfy3jGDYWcr3IPoyjkgxqfXJOX3Bd30IzVueGdRSAaEPrgedWiMv0HRHr3tM";

axios.interceptors.request.use(
  (request) => {
    request.headers["Authorization"] = `Bearer ${ACCESS_TOKEN}`;

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
