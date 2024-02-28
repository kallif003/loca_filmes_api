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
  createdAt: Date;
  deletedAt?: Date;
  updatedAt?: Date;
  deleted: boolean;
}

export interface ITokenResponse {
  token: string;
}
