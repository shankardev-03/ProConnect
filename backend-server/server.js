import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { inngest, functions } from "./inngest/index.js";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// ✅ Connect DB safely for serverless
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Database connection failed");
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("✅ Server is running");
});

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

export default app;