import * as React from "react";
import { UserContextType } from "../models/user.types";

export const UserContext = React.createContext<UserContextType>({
  user: null,
  setUser: () => null,
  token: null,
});
