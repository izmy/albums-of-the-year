import mongoose from "mongoose";

export enum Role {
  ADMIN = "ADMIN",
  VOTER = "VOTER",
  EDITOR = "EDITOR",
}

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: Role[];
  picture: string;
  showVotes: boolean;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  picture: { type: String, required: false },
  password: { type: String, required: false },
  role: { type: [String], required: false },
  showVotes: { type: Boolean, required: false },
});

export default mongoose.model<User>("users", userSchema);
