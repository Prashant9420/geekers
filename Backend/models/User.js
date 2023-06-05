import mongoose from "mongoose";

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
