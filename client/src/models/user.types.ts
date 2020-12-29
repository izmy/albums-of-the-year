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

export type UserListItem = Pick<User, "_id" | "name" | "email">;
export type UserList = { [key: string]: UserListItem };

export type UserContextType = {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
};
