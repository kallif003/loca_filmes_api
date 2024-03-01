import bcrypt from "bcrypt";
import User from "../models/users";
import mongoose from "mongoose";
import { IUser, IUserSchema } from "../utils/interface";
import PermissionMapper from "../utils/mapPermission";
import HandleError from "../utils/errors/handleError";
import { Permissions } from "../utils/enum";

class UserService {
  static async createUserService(
    userData: Pick<
      IUserSchema,
      "name" | "password" | "email" | "role" | "status"
    >,
    permission: string[]
  ) {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      const saltRounds = 8;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      userData.password = hashedPassword;

      userData.role = PermissionMapper.getCreatablePermission(permission[0]);

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

  static async getAllUsersService(
    itemsPerPage: number,
    skip: number,
    permission: string[]
  ) {
    try {
      let role: string;

      if (permission[0] == Permissions.ADMIN) {
        role = Permissions.COLLABORATOR;
      } else {
        role = Permissions.CLIENT;
      }

      const users = await User.find({
        role: { $in: [role] },
      })
        .select("-password")
        .skip(skip)
        .limit(itemsPerPage);

      if (users.length == 0) {
        throw new HandleError("Não há registros para essa busca", 404);
      }

      const totalUsers = await User.find({
        role: { $in: [role] },
      }).count();

      const totalPages = Math.ceil(totalUsers / itemsPerPage);

      return { users, totalPages };
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }

  static async getAllUserNamesService(permission: string[]) {
    try {
      let role: string;

      if (permission[0] == Permissions.ADMIN) {
        role = Permissions.COLLABORATOR;
      } else {
        role = Permissions.CLIENT;
      }

      const userNames = await User.find({ role: { $in: [role] } });

      if (userNames.length === 0) {
        throw new HandleError("Não há registros de usuários", 404);
      }

      return userNames.map((user) => user.name);
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }
      throw new Error(error.message);
    }
  }

  static async getAllDocNumService(permission: string[]) {
    try {
      let role: string;

      if (permission[0] == Permissions.ADMIN) {
        role = Permissions.COLLABORATOR;
      } else {
        role = Permissions.CLIENT;
      }

      const docNum = await User.find({ role: { $in: [role] } });

      if (docNum.length === 0) {
        throw new HandleError("Não há registros de usuários", 404);
      }

      return docNum.map((user) => user.docNum);
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }
      throw new Error(error.message);
    }
  }

  static async getUsersByNameOrDocNumService(name: string, docNum: string) {
    try {
      const query: any = {};

      if (name) {
        query["name"] = name;
      }
      if (docNum) {
        query["docNum"] = docNum;
      }

      const users = await User.find(query);

      if (users.length === 0) {
        throw new HandleError(
          "Não há registros de usuários com os critérios fornecidos",
          404
        );
      }

      return users;
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }
      throw new Error(error.message);
    }
  }

  static async updateUserService(updatedData: IUser[], id: string) {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      let user = (await User.findById(id)) as any;

      for (const key in updatedData[0]) {
        const value = updatedData[0][key as keyof IUser];

        if (value) {
          user[key] = value;
        }
      }

      const updatedUser = await user!.save();

      await session.commitTransaction();
      session.endSession();

      return updatedUser;
    } catch (error: any) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error("Usuário não encontrado");
    }
  }

  static async deleteUserService(userId: string) {
    try {
      const currentDate = new Date();

      const user = await User.findByIdAndUpdate(
        userId,
        {
          deleted: true,
          deletedAt: currentDate,
        },
        { new: true }
      );

      return user;
    } catch (error: any) {
      throw new Error("Usuário não encontrado");
    }
  }
}

export default UserService;
