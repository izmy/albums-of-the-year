import axios from "axios";
import { UserData } from "../../models/user.types";

export const loginUser = async (login: string, password: string) => {
  const user = await axios.post<UserData>(
    `${process.env.REACT_APP_BACKEND_API_URL}/v1/login`,
    {
      login,
      password,
    }
  );

  return user.data;
};
