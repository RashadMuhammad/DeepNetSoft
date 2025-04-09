import type { Document } from "mongoose"
import type mongoose from "mongoose"

export interface IMenu extends Document {
  name: string
  description: string
  slug: string
  createdAt: Date
  updatedAt: Date
}

export interface IMenuItem extends Document {
  name: string
  description: string
  price: number
  menuId: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}