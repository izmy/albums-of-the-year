import axios from "axios";
import { Role, User, UserData } from "../../models/user.types";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const user = await axios.post<UserData>(
    `${process.env.REACT_APP_BACKEND_API_URL}/v1/users`,
    {
      name,
      email,
      password,
    }
  );

  return user.data;
};

export const getUser = async () => {
  const token = localStorage.getItem("auth-token");
  const user = await axios.get<User>(
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
  const tokenResponse = await axios.get<boolean>(
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

  return axios.get<User[]>(
    `${process.env.REACT_APP_BACKEND_API_URL}/v1/users/all`,
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
};

export const updateUserRole = async (userId: string, newRole: Role[]) => {
  const token = localStorage.getItem("auth-token");

  return axios.patch<User[]>(
    `${process.env.REACT_APP_BACKEND_API_URL}/v1/users/${userId}`,
    {
      role: newRole,
    },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
};

export const updateUserShowVotes = async (
  userId: string,
  showVotes: boolean
) => {
  const token = localStorage.getItem("auth-token");

  return axios.patch<User[]>(
    `${process.env.REACT_APP_BACKEND_API_URL}/v1/users/${userId}`,
    {
      showVotes,
    },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
};
