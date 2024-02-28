import bcrypt from "bcrypt";
import User from "../models/users";
import mongoose from "mongoose";
import { IUserSchema } from "../utils/interface";
import PermissionMapper from "../utils/mapPermission";

class UserService {
  static async createUser(
    userData: Pick<
      IUserSchema,
      "name" | "password" | "email" | "role" | "status"
    >
  ) {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      const saltRounds = 8;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      userData.password = hashedPassword;

      userData.role = PermissionMapper.getCreatablePermission(userData.role[0]);

      userData.status = "Ativo";

      const newUser = new User({
        ...userData,
      });

      const user = await newUser.save({ session });

      await session.commitTransaction();
      session.endSession();

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default UserService;
