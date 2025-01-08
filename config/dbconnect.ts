import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const MONGO_URI = process.env.MONGO_URI || "";

    if (!MONGO_URI) {
      throw new Error("MongoDB connection string is not defined in the environment variables.");
    }

    await mongoose.connect(MONGO_URI);

    console.log("Connected to MongoDB successfully");
  } catch (error) {
    // Use type assertion to access properties safely
    if (error instanceof Error) {
      console.error("Failed to connect to MongoDB:", error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }

    process.exit(1); // Exit process with failure code
  }
};

export default connectDB;
