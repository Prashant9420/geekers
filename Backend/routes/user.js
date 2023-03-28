import express from "express";
import { login, registerUser } from "../controllers/user.js";
import passport from "passport";

const router = express.Router();

// CREATE USER

router.post("/register", registerUser);

// LOGIN

router.post("/login", login);

// GOOGLE LOGIN

router.get(
  "/googleLogin",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

export default router;
