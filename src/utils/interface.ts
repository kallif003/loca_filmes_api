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

export interface ILocationSchema extends Document {
  movie: string;
  customer: string;
  docNum: string;
  status: string;
  date_devolution: Date;
  createdAt: Date;
  deletedAt?: Date;
  updatedAt?: Date;
  deleted: boolean;
}

export interface ILocationFilter {
  customer: string;
  createdAt: any;
  status: string;
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
