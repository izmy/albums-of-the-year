import * as React from "react";

export type Role = "ADMIN" | "VOTER" | "EDITOR";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role[];
};

export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<null>>;
  token: boolean | null;
};
