import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlog,
  updateBlog,
  getRecentBlogs,
  countAllBlogs,
  getAllCategories,
} from "../controllers/blog.js";

const router = express.Router();

//  CREATE
router.post("/", createBlog);
//COUTN ALL BLOGS
router.get("/countAllBlogs", countAllBlogs);
// GET RECENT BLOGS
router.get("/recentBlogs", getRecentBlogs);
// GET ALL CATEGORIES
router.get("/getAllCategories", getAllCategories);
//UPDATE
router.put("/:id", updateBlog);
//DELETE
router.delete("/:id", deleteBlog);
//GET
router.get("/:id", getBlog);

export default router;
