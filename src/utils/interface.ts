import { JwtPayload } from "jsonwebtoken";
import { Document } from "mongoose";

export interface UserPayload extends JwtPayload {
  name: string;
  permission: string[];
  userId: string;
}

export interface IUserSchema extends Document {
  name: string;
  status: string;
  role: string[];
  password: string;
  email: string;
  docNum: string;
  createdAt: Date;
  deletedAt?: Date;
  updatedAt?: Date;
  deleted: boolean;
}

export interface ICustomerSchema extends Document {
  name: string;
  role?: string[];
  email: string;
  docNum: string;
  phone: string;
  cep: string;
  street: string;
  district: string;
  city: string;
  state: string;
  createdAt: Date;
  deletedAt?: Date;
  updatedAt?: Date;
  deleted: boolean;
}

export type CustomerForm = Pick<
  ICustomerSchema,
  | "name"
  | "role"
  | "email"
  | "docNum"
  | "phone"
  | "cep"
  | "street"
  | "district"
  | "city"
  | "state"
>;

export type IUser = Pick<IUserSchema, "name" | "password" | "email" | "docNum">;

export interface ITokenResponse {
  token: string;
}
