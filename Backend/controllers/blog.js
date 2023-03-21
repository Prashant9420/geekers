import Blog from "../models/Blog.js";
import BlogCategories from "../models/BlogCategories.js";

export const createBlog = async (req, res, next) => {
  const newBlog = new Blog(req.body);
  try {
    const savedBlog = await newBlog.save();
    const allSavedCategories = await BlogCategories.find();

    // Check if the category already exists in the database

    for (var i = 0; i < savedBlog.categories.length; i++) {
      if (
        !allSavedCategories.find(
          (category) => category.categoryName === savedBlog.categories[i]
        )
      ) {
        const newBlogCategory = new BlogCategories({
          categoryName: savedBlog.categories[i],
        });
        await newBlogCategory.save();
      }
    }
    res.status(200).json({ savedBlog });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json("Blog has been deleted.");
  } catch (error) {
    next(error);
  }
};

export const getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};

export const countAllBlogs = async (req, res, next) => {
  try {
    const count = await Blog.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    next(error);
  }
};

export const getRecentBlogs = async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;

    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    res.status(200).json({
      blogs,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await BlogCategories.find().select("categoryName -_id");
    res.status(200).json({ categories });
  } catch (error) {
    next(error);
  }
};

export const searchByCategories = async (req, res, next) => {
  try {
    const { categories } = req.body;
    const blogs = await Blog.find({
      categories: { $in: categories },
    });
    res.status(200).json({ blogs });
  } catch (error) {
    next(error);
  }
};
