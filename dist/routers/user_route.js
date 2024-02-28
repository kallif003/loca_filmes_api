"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enum_1 = require("../utils/enum");
const user_controller_1 = __importDefault(require("../controllers/user_controller"));
const user_route = express_1.default.Router();
const user_controller = new user_controller_1.default();
user_route.post(enum_1.Routes.SAVE_USER, user_controller.createUser);
exports.default = user_route;
//# sourceMappingURL=user_route.js.map