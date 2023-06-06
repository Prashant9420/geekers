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
  getUserBlogs,
  saveMyBlog
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

// GET USER BLOGS

router.post("/getUserBlogs", getUserBlogs);

// SAVE MY BLOG

router.post("/saveMyBlog", saveMyBlog);

export default router;
