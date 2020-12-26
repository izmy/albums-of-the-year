import axios from "axios";
import { Vote } from "../../models/votes.types";

export const getUserVotes = (userId: string) => {
  const token = localStorage.getItem("auth-token");

  return axios.get(
    `${process.env.REACT_APP_BACKEND_API_URL}/v1/votes/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    }
  );
};

export const saveVotes = (votes: Vote[]) => {
  const token = localStorage.getItem("auth-token");

  return axios.post(
    `${process.env.REACT_APP_BACKEND_API_URL}/v1/votes`,
    votes,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": token,
      },
    }
  );
};

export const updateVote = (voteId: string, vote: Vote) => {
  const token = localStorage.getItem("auth-token");

  return axios.patch(
    `${process.env.REACT_APP_BACKEND_API_URL}/v1/votes/update/${voteId}`,
    {
      vote,
    },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
};

export const getAllVotes = () => {
  const token = localStorage.getItem("auth-token");

  return axios.get<Vote[]>(
    `${process.env.REACT_APP_BACKEND_API_URL}/v1/votes/all`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    }
  );
};
