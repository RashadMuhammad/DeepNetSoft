import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DBURI = process.env.MONGODB_URI;

if (!DBURI) {
  throw new Error("MONGO_URI is not defined in the .env file");
}

const connectDB = async () => {  
  try {
    await mongoose.connect(DBURI);
    console.log("MongoDB Connected SuccessFully✅");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error connecting to MongoDB:", error.message);
    } else {
      console.error("Unknown error occurred during MongoDB connection");
    }

    process.exit(1);
  }
};

export default connectDB;