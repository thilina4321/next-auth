import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect to the database");
  } catch (error) {
    throw new Error(error.message);
  }
};
