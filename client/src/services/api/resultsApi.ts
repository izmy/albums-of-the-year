import axios from "axios";
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