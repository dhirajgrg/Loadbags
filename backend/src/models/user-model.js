import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: String,
    fullName: String,
    email: { type: String, unique: true },
    password: {
      type: String,
      select: false,
    },
    avatar: String,
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
