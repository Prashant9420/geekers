import express from "express";
import {
  forgotPassword,
  login,
  registerUser,
  resetPassword,
} from "../controllers/user.js";
import passport from "passport";
import { createError } from "../utils/error.js";

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

router.get("/googleLogin/success", (req, res, next) => {
  try {
    if (req) {
      res.status(200).json({ user: req.user });
    } else {
      res.status(401).send("Failed to login");
    }
  } catch (err) {
    createError(500, "Internal Server Error");
    next(err);
  }
});

router.get("/googleLogout", (req, res, next) => {
  try {
    req.logout(() => {
      console.log("Logged out");
    });
    res.clearCookie("connect.sid");
    res.redirect("/");
  } catch (err) {
    console.log("Error: ", err);
    createError(500, "Internal Server Error");
    next(err);
  }
});

router.get(
  "/googleLogin",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/googleLogin/callback",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    successRedirect: "https://geekers.vercel.app/",
    // successRedirect: "http://localhost:3000/",
    failureRedirect: "https://geekers.vercel.app/signin",
    // failureRedirect: "http://localhost:3000//signin",
  })
);

router.get("/profile", function (req, res) {
  res.cookie("accessToken", req.session.passport.user.accessToken);
  res.cookie("refreshToken", req.session.passport.user.refreshToken);
  res.json({ user: req.user });
});

export default router;
