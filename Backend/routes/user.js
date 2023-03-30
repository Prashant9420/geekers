import express from "express";
import {
  forgotPassword,
  login,
  registerUser,
  resetPassword,
} from "../controllers/user.js";
import passport from "passport";

const router = express.Router();

// CREATE USER

router.post("/register", registerUser);

// LOGIN

router.post("/login", login);

// FORGOT PASSWORD

router.post("/forgotPassword", forgotPassword);

// RESET PASSWORD

router.post("/resetPassword", resetPassword);

// GOOGLE LOGIN

router.get(
  "/googleLogin",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

export default router;
