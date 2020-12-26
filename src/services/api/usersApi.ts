import axios from "axios";
import { UserListItem } from "../../models/user.types";

export const loginUser = async (userInfo) => {
  const user = await axios.post(
    `${process.env.REACT_APP_BACKEND_API_URL}/v1/login`,
    {
      accessToken: userInfo.accessToken,
      userID: userInfo.userID,
      email: userInfo.email,
    }
  );

  return user.data;
};

export const getUser = async () => {
  const token = localStorage.getItem("auth-token");
  const user = await axios.get(
    `${process.env.REACT_APP_BACKEND_API_URL}/v1/users`,
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );

  return user.data;
};

export const authorize = async (token: string) => {
  const tokenResponse = await axios.get(
    `${process.env.REACT_APP_BACKEND_API_URL}/v1/users/authorize`,
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );

  return tokenResponse.data;
};

export const getAllUsers = async () => {
  const token = localStorage.getItem("auth-token");

  return axios.get<UserListItem[]>(
    `${process.env.REACT_APP_BACKEND_API_URL}/v1/users/all`,
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
};
