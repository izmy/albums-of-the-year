import axios from "axios";
import { Constants } from "../../models/constants.types";

export const getConstants = async () => {
  const token = localStorage.getItem("auth-token");

  const constants = await axios.get<Constants>(
    `${process.env.REACT_APP_BACKEND_API_URL}/v1/constants`,
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );

  return constants.data;
};
