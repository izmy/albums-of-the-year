import * as React from "react";

export enum Role {
  ADMIN = "ADMIN",
  VOTER = "VOTER",
  EDITOR = "EDITOR",
}

export type User = {
  _id: string;
  name: string;
  email: string;
  role: Role[];
  picture?: string;
};

export type UserData = {
  user?: User;
  token?: string;
};

export type UserList = { [key: string]: User };

export type UserContextType = {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
};
