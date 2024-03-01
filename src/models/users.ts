import mongoose, { Schema } from "mongoose";
import { IUserSchema } from "../utils/interface";

const userSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: [
    {
      type: String,
      required: false,
    },
  ],
  email: {
    type: String,
    trim: true,
    require: false,
    lowercase: true,
    validate: {
      validator(value: string) {
        return value.includes("@");
      },
      message: "Email inválido",
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  docNum: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
  },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
});

const User = mongoose.model<IUserSchema>("User", userSchema);

export default User;
