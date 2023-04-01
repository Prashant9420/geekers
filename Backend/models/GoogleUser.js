import mongoose from "mongoose";

const GoogleUserSchema = new mongoose.Schema({
  googleId: {
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
});

export default mongoose.model("GoogleUser", GoogleUserSchema);
