import { Request, Response } from "express";
import { Messages } from "../utils/enum";
import { IUser, IUserSchema } from "../utils/interface";
import UserService from "../services/user_service";
import HandleError from "../utils/errors/handleError";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { userForm, permissions } = req.body;

      const user = await UserService.createUserService(userForm, permissions);

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

  async getAllUsers(req: Request, res: Response) {
    try {
      const { itemsPerPage, page, permissions } = req.body;

      const skip = (parseInt(page) - 1) * parseInt(itemsPerPage);

      const users = await UserService.getAllUsersService(
        itemsPerPage,
        skip,
        permissions
      );

      return res.status(200).json(users);
    } catch (error) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).json({
          message: {
            title: Messages.TITLE_THERE_ARE_NO_RECORDS,
            subTitle: Messages.SUBTITLE_THERE_ARE_NO_RECORDS,
          },
        });
      }

      return res.status(500).send({
        message: {
          title: Messages.TITLE_ERROR,
          subTitle: Messages.SUBTITLE_ERROR,
        },
      });
    }
  }

  async getAllUserNames(req: Request, res: Response) {
    try {
      const { permissions } = req.body;

      const names = await UserService.getAllUserNamesService(permissions);

      return res.status(200).json(names);
    } catch (error) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).json({
          message: {
            title: Messages.TITLE_THERE_ARE_NO_RECORDS,
            subTitle: Messages.SUBTITLE_THERE_ARE_NO_RECORDS,
          },
        });
      }

      return res.status(500).send({
        message: {
          title: Messages.TITLE_ERROR,
          subTitle: Messages.SUBTITLE_ERROR,
        },
      });
    }
  }

  async getAllDocNum(req: Request, res: Response) {
    try {
      const { permissions } = req.body;

      const docNumbers = await UserService.getAllDocNumService(permissions);

      return res.status(200).json(docNumbers);
    } catch (error) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).json({
          message: {
            title: Messages.TITLE_THERE_ARE_NO_RECORDS,
            subTitle: Messages.SUBTITLE_THERE_ARE_NO_RECORDS,
          },
        });
      }

      return res.status(500).send({
        message: {
          title: Messages.TITLE_ERROR,
          subTitle: Messages.SUBTITLE_ERROR,
        },
      });
    }
  }

  async getUsersByNameOrDocNum(req: Request, res: Response) {
    try {
      const { name, docNum } = req.body;

      const user = await UserService.getUsersByNameOrDocNumService(
        name,
        docNum
      );

      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).json({
          message: {
            title: Messages.TITLE_THERE_ARE_NO_RECORDS,
            subTitle: Messages.SUBTITLE_THERE_ARE_NO_RECORDS,
          },
        });
      }

      return res.status(500).send({
        message: {
          title: Messages.TITLE_ERROR,
          subTitle: Messages.SUBTITLE_ERROR,
        },
      });
    }
  }

  async updateUsers(req: Request, res: Response) {
    try {
      const { name, password, email, docNum }: IUser = req.body;

      const { id } = req.params;

      const user = await UserService.updateUserService(
        [
          {
            name,
            password,
            email,
            docNum,
          },
        ],
        id
      );

      const message = {
        title: Messages.TITLE_UPDATE_REGISTER,
        subTitle: Messages.SUBTITLE_UPDATE_REGISTER,
      };

      const response = res.status(200).json({
        user,
        message,
      });

      return response;
    } catch (error: any) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).send({
          message: {
            title: Messages.TITLE_EXISTING_USER,
            subTitle: Messages.SUBTITLE_EXISTING_USER,
          },
        });
      }

      return res.status(404).send({
        message: {
          title: Messages.TITLE_ERROR_UPDATE_REGISTER,
          subTitle: Messages.SUBTITLE_ERROR_UPDATE_REGISTER,
        },
      });
    }
  }

  async deleteUsers(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await UserService.deleteUserService(id);

      const message = {
        title: Messages.TITLE_DELETE_REGISTER,
        subTitle: Messages.SUBTITLE_DELETE_REGISTER,
      };

      const response = res.status(200).json({
        message,
      });

      return response;
    } catch (error: any) {
      return res.status(404).send({
        message: {
          title: Messages.TITLE_ERROR_DELETE_REGISTER,
          subTitle: Messages.SUBTITLE_ERROR_DELETE_REGISTER,
        },
      });
    }
  }
}

export default UserController;
