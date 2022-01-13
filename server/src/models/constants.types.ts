import mongoose from "mongoose";

const constantsSchema = new mongoose.Schema({
  voting: { type: String, required: true },
});

export default mongoose.model("constants", constantsSchema);
