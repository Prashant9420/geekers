import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import blogRoutes from "./routes/blog.js";
import userRoutes from "./routes/user.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import { connectPassport } from "./controllers/user.js";

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
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  session({
    secret: "process.env.JWT ",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "none",
      secure: false,
      domain: "geekers.vercel.app",
    },
  })
);

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
connectPassport();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(
  cors({
    origin: ["http://localhost:3000", "https://geekers.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

//all urls
app.use("/api/blog", blogRoutes);
app.use("/api/user", userRoutes);

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
