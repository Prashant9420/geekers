import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import blogRoutes from "./routes/blog.js";
import cors from "cors";
import morgan from "morgan";
const app = express();

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to mongoDb");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected");
});

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//all urls
app.use("/api/blog", blogRoutes);

//global error handling
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8000 || process.env.PORT, () => {
  connect();
  console.log("connected to backend");
});
