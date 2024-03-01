import mongoose, { Schema } from "mongoose";
import { ILocationSchema } from "../utils/interface";

const locationSchema: Schema = new mongoose.Schema({
  movie: {
    type: String,
    required: true,
    trim: true,
  },
  customer: {
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

const Location = mongoose.model<ILocationSchema>("location", locationSchema);

export default Location;
