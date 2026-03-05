import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: String,
    name: String,
    email: { type: String, unique: true },
    avatar: String,
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
