import express from "express";
import { createUser } from "../controllers/user.js";

const router = express.Router();

// CREATE USER

router.post("/register", createUser);

export default router;
