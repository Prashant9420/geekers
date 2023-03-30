import mongoose from "mongoose";

const BlogCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
});

export default mongoose.model("BlogCategory", BlogCategorySchema);
