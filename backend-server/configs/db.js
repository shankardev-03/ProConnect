import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined");
    }

    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect(`${process.env.MONGODB_URL}/proconnect`);

    console.log("✅ Database connected:", mongoose.connection.name);
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    throw error; // VERY IMPORTANT for debugging
  }
};

export default connectDB;