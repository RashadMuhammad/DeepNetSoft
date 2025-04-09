import mongoose, { type Schema } from "mongoose"
import type { IMenuItem } from "../types"

const menuItemSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    menuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model<IMenuItem>("MenuItem", menuItemSchema)