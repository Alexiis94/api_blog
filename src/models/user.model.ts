import mongoose, { Schema } from "mongoose"

import { User } from "src/interfaces/user.interface"

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
)
export const userModel = mongoose.model<User>("User", userSchema, "users")
