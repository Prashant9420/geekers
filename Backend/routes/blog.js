import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlog,
  updateBlog,
  getRecentBlogs,
  countAllBlogs,
  getAllCategories,
  searchByCategories,
} from "../controllers/blog.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//  CREATE BLOG
router.post("/", verifyUser, createBlog);
//COUTN ALL BLOGS
router.get("/countAllBlogs", countAllBlogs);
// GET RECENT BLOGS
router.get("/recentBlogs", getRecentBlogs);
// GET ALL CATEGORIES
router.get("/getAllCategories", getAllCategories);
// SEARCH BY CATEGORIES
router.post("/searchByCategories", searchByCategories);
//UPDATE
router.put("/:id", updateBlog);
//DELETE
router.delete("/:id", deleteBlog);
//GET
router.get("/:id", getBlog);

export default router;
