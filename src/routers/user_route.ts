import express from "express";
import { Permissions, Routes } from "../utils/enum";
import UserController from "../controllers/user_controller";
import { verifyToken, verifyPermission } from "../middleware";

const user_route = express.Router();
const user_controller = new UserController();

user_route
  .post(
    Routes.GET_ALL_NAMES,
    verifyToken,
    verifyPermission([Permissions.ADMIN]),
    user_controller.getAllUserNames
  )
  .post(
    Routes.GET_ALL_DOCNUMBERS,
    verifyToken,
    verifyPermission([Permissions.ADMIN]),
    user_controller.getAllDocNum
  )
  .post(
    Routes.GET_USER_BY_NAME_OR_DOCNUM,
    verifyToken,
    verifyPermission([Permissions.ADMIN]),
    user_controller.getUsersByNameOrDocNum
  )
  .post(Routes.SAVE_ADMIN, user_controller.createUser)
  .post(
    Routes.SAVE_USER,
    verifyToken,
    verifyPermission([Permissions.ADMIN]),
    user_controller.createUser
  )
  .post(
    Routes.GET_ALL_USERS,
    verifyToken,
    verifyPermission([Permissions.ADMIN]),
    user_controller.getAllUsers
  )
  .put(
    Routes.UPDATE_USER,
    verifyToken,
    verifyPermission([Permissions.ADMIN]),
    user_controller.updateUsers
  )
  .put(
    Routes.DELETE_USER,
    verifyToken,
    verifyPermission([Permissions.ADMIN]),
    user_controller.deleteUsers
  );

export default user_route;
