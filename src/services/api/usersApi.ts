import axios from "axios";

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
