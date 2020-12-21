import axios from "axios";
import { Vote } from "../../models/votes.types";

export const getAllVotes = () => {
  return axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/v1/votes`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getVotes = (userId: string) => {
  return axios.get(
    `${process.env.REACT_APP_BACKEND_API_URL}/v1/votes/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const saveVotes = (votes: Vote[]) => {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_API_URL}/v1/votes`,
    votes,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
};
