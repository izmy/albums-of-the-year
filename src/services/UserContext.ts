import * as React from "react";
import { UserContextType } from "../models/user.types";

export const UserContext = React.createContext<UserContextType>({
  userData: null,
  setUserData: () => null,
});
