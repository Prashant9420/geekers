import mongoose from "mongoose";
import Blog from "../models/Blog.js";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // createdBlogs Schema
    createdBlogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    savedBlogs:[
      {
        title: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        imgUrl: {
          type: String,
          required: true,
        },
        categories: {
          type: [String],
          required: true,
        },
        username: {
          type: String,
          required: true,
        }
      }
    ],
    // savedCode Schema
    savedCodes: [
      {
        fileName: {
          type: String,
        },
        language: {
          type: String,
        },
        code: {
          type: String,
        },
        email: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
