import express from "express";
import {
  forgotPassword,
  login,
  registerUser,
  resetPassword,
  googleLogin,
} from "../controllers/user.js";

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

router.post("/googleLogin", googleLogin);

export default router;
