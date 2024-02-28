import { Request, Response } from "express";
import { Messages } from "../utils/enum";
import { IUserSchema } from "../utils/interface";
import UserService from "../services/user_service";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const userData: Pick<
        IUserSchema,
        "name" | "password" | "email" | "role" | "status"
      > = req.body;

      const user = await UserService.createUser(userData);

      const message = {
        title: Messages.TITLE_REGISTER,
        subTitle: Messages.SUBTITLE_REGISTER,
      };

      const response = res.status(201).json({
        user,
        message,
      });

      return response;
    } catch (error) {
      return res.status(500).send({
        message: {
          title: Messages.TITLE_ERROR,
          subTitle: Messages.SUBTITLE_ERROR,
        },
      });
    }
  }
}

export default UserController;
