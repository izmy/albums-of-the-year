import mongodb from "mongodb";
import mongoose from "mongoose";

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING || "",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

const connection = mongoose.connection;
