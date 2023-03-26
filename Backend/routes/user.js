import express from "express";
import { createUser, getAllUsers } from "../controllers/user.js";

const router = express.Router();

// CREATE USER

router.post("/register", createUser);

// GET ALL USERS

router.get("/getAllUsers", getAllUsers);

export default router;
