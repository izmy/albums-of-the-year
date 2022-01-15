import axios from "axios";
import { NominatedAlbum } from "../../models/nominatedAlbums.types";
import { Results } from "../../models/results.types";

export const getResults = () => {
  const token = localStorage.getItem("auth-token");

  return axios.get<Results[]>(
    `${process.env.REACT_APP_BACKEND_API_URL}/v1/results`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    }
  );
};

export const getResultsWithParams = (params: {
  type: string;
  limit: number;
  includeFirst: boolean;
}) => {
  const token = localStorage.getItem("auth-token");

  return axios.get<NominatedAlbum[]>(
    `${process.env.REACT_APP_BACKEND_API_URL}/v1/results/params`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      params,
    }
  );
};

export const getUsersVotesCount = () => {
  const token = localStorage.getItem("auth-token");

  return axios.get<any[]>(
    `${process.env.REACT_APP_BACKEND_API_URL}/v1/results/users-votes-count`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    }
  );
};

export const getUsersVotes = () => {
  const token = localStorage.getItem("auth-token");

  return axios.get<any[]>(
    `${process.env.REACT_APP_BACKEND_API_URL}/v1/results/users-votes`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    }
  );
};
