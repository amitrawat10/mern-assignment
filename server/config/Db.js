import mongoose from "mongoose";

const connectToDB = (DB_URI) => {
  mongoose
    .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((data) => {
      console.log(`MongoDB connected to server ${data.connection.host}`);
    })
    .catch((e) => console.log(e));
};

export default connectToDB;
