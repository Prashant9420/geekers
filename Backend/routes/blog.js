import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
  getRecentBlogs,
} from "../controllers/blog.js";

const router = express.Router();

//  CREATE
router.post("/", createBlog);
//GET ALL
router.get("/", getBlogs);
// GET RECENT BLOGS
router.get("/recentBlogs", getRecentBlogs);
//UPDATE
router.put("/:id", updateBlog);
//DELETE
router.delete("/:id", deleteBlog);
//GET
router.get("/:id", getBlog);

export default router;
