import axios from "axios";
import { NominatedAlbums } from "../../models/nominatedAlbums.types";

export const getNominatedAlbums = (types: string[]) => {
  const token = localStorage.getItem("auth-token");

  return axios.get<NominatedAlbums[]>(
    `${process.env.REACT_APP_BACKEND_API_URL}/v1/nominated-albums`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      params: { types: types.join() },
    }
  );
};
