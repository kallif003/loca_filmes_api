"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enum_1 = require("../utils/enum");
const user_controller_1 = __importDefault(require("../controllers/user_controller"));
const middleware_1 = require("../middleware");
const user_route = express_1.default.Router();
const user_controller = new user_controller_1.default();
user_route
    .post(enum_1.Routes.GET_ALL_NAMES, middleware_1.verifyToken, (0, middleware_1.verifyPermission)([enum_1.Permissions.ADMIN]), user_controller.getAllUserNames)
    .post(enum_1.Routes.GET_ALL_DOCNUMBERS, middleware_1.verifyToken, (0, middleware_1.verifyPermission)([enum_1.Permissions.ADMIN]), user_controller.getAllDocNum)
    .post(enum_1.Routes.GET_USER_BY_NAME_OR_DOCNUM, middleware_1.verifyToken, (0, middleware_1.verifyPermission)([enum_1.Permissions.ADMIN]), user_controller.getUsersByNameOrDocNum)
    .post(enum_1.Routes.SAVE_ADMIN, user_controller.createUser)
    .post(enum_1.Routes.SAVE_USER, middleware_1.verifyToken, (0, middleware_1.verifyPermission)([enum_1.Permissions.ADMIN]), user_controller.createUser)
    .post(enum_1.Routes.GET_ALL_USERS, middleware_1.verifyToken, (0, middleware_1.verifyPermission)([enum_1.Permissions.ADMIN]), user_controller.getAllUsers)
    .put(enum_1.Routes.UPDATE_USER, middleware_1.verifyToken, (0, middleware_1.verifyPermission)([enum_1.Permissions.ADMIN]), user_controller.updateUsers)
    .put(enum_1.Routes.DELETE_USER, middleware_1.verifyToken, (0, middleware_1.verifyPermission)([enum_1.Permissions.ADMIN]), user_controller.deleteUsers);
exports.default = user_route;
//# sourceMappingURL=user_route.js.map