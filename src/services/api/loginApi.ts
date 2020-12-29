import axios from "axios";
import { ReactFacebookLoginInfo } from "react-facebook-login";
import { UserData } from "../../models/user.types";

export const loginUser = async (email: string, password: string) => {
  const user = await axios.post<UserData>(
    `${process.env.REACT_APP_BACKEND_API_URL}/v1/login`,
    {
      email,
      password,
    }
  );

  return user.data;
};

export const loginUserFacebook = async (userInfo: ReactFacebookLoginInfo) => {
  const user = await axios.post<UserData>(
    `${process.env.REACT_APP_BACKEND_API_URL}/v1/login/facebook`,
    {
      accessToken: userInfo.accessToken,
      userID: userInfo.id,
      email: userInfo.email,
    }
  );

  return user.data;
};
