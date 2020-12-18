import { ObjectID } from "mongodb";
import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  rank: { type: Number, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  write: { type: Boolean, required: true },
  type: { type: String, required: true },
  userId: { type: ObjectID, required: true },
  date: { type: Date, required: false },
});

export default mongoose.model("votes", voteSchema);
