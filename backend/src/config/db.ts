import mongoose from "mongoose";
import config from "./config";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.dburl as string,);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;