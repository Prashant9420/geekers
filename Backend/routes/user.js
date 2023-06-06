import express from "express";
import {
  forgotPassword,
  login,
  registerUser,
  resetPassword,
  googleLogin,
  saveCode,
  getSavedCodes,
  deleteSavedCode,
  saveBlog,
  deleteBlog,
  getSavedBlogs,
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

// DELETE SAVED CODES

router.post("/deleteSavedCode", deleteSavedCode);

// SAVE BLOG

router.post("/saveBlog", saveBlog);

// GET SAVED BLOGS

router.post("/getSavedBlogs", getSavedBlogs);

// DELETE BLOG

router.post("/deleteBlog", deleteBlog);

export default router;
