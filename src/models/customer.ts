import mongoose, { Schema } from "mongoose";
import { ICustomerSchema } from "../utils/interface";

const customerSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
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
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  cep: {
    type: String,
    required: true,
    trim: true,
  },
  street: {
    type: String,
    required: true,
    trim: true,
  },
  district: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
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

const Customer = mongoose.model<ICustomerSchema>("Customer", customerSchema);

export default Customer;
