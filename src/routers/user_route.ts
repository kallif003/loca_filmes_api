import express from "express";
import { Routes } from "../utils/enum";
import UserController from "../controllers/user_controller";

const user_route = express.Router();
const user_controller = new UserController();

user_route.post(Routes.SAVE_USER, user_controller.createUser);

export default user_route;
