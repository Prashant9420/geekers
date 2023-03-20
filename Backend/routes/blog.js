import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlog,
  updateBlog,
  getRecentBlogs,
  countAllBlogs,
} from "../controllers/blog.js";

const router = express.Router();

//  CREATE
router.post("/", createBlog);
//Count all blogs
router.get("/countAllBlogs", countAllBlogs);
// GET RECENT BLOGS
router.get("/recentBlogs", getRecentBlogs);
//UPDATE
router.put("/:id", updateBlog);
//DELETE
router.delete("/:id", deleteBlog);
//GET
router.get("/:id", getBlog);

export default router;
