import mongoose from "mongoose";

export interface Constants extends mongoose.Document {
  phase: "NOMINATION" | "VOTING" | "RESULTS";
  lastTokenReset: Date;
}

const constantsSchema = new mongoose.Schema({
  voting: { type: String, required: true },
});

export default mongoose.model<Constants>("constants", constantsSchema);
