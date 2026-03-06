import { Schema, model } from "mongoose";

const itemSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    title: {
      type: String,
      required: true,
    },
    packed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Item = model("Item", itemSchema);
export default Item;
