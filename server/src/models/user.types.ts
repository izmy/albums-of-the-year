import mongoose from "mongoose";

export enum Role {
  ADMIN = "ADMIN",
  VOTER = "VOTER",
  EDITOR = "EDITOR",
}

export interface User extends mongoose.Document {
  login: string;
  password: string;
  name: string;
  email: string;
  role: Role[];
  picture: string;
  showVotes: boolean;
}

const userSchema = new mongoose.Schema({
  login: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  picture: { type: String, required: false },
  password: { type: String, required: false },
  role: { type: [String], required: false },
  showVotes: { type: Boolean, required: false },
});

export default mongoose.model<User>("users", userSchema);
