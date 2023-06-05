import express from "express";
import {
  forgotPassword,
  login,
  registerUser,
  resetPassword,
  googleLogin,
  saveCode,
  getSavedCodes,
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

// SAVE CODE

router.post("/saveCode", saveCode);

// GET SAVED CODES

router.post("/getSavedCodes", getSavedCodes);

export default router;
