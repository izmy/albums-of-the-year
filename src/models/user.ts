import mongoose from "mongoose";

export type Role = "ADMIN" | "VOTER" | "EDITOR";

export interface User extends mongoose.Document {
  name: string;
  email: string;
  accessToken: string;
  password: string;
  role: Role[];
  picture: string;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  picture: { type: String, required: false },
  accessToken: { type: String, required: false },
  password: { type: String, required: false },
  role: { type: [String], required: false },
});

export default mongoose.model<User>("users", userSchema);
