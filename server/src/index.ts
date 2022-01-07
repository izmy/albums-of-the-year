import mongoose from "mongoose";
import app from "./server";

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

const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`App is running on port ${port}`));
