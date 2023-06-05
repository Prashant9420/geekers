import mongoose from "mongoose";

const GoogleUserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  // createdBlogs Schema
  createdBlogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
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
});

export default mongoose.model("GoogleUser", GoogleUserSchema);
