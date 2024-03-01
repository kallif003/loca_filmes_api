"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enum_1 = require("../utils/enum");
const location_controller_1 = __importDefault(require("../controllers/location_controller"));
const middleware_1 = require("../middleware");
const location_route = express_1.default.Router();
const location_controller = new location_controller_1.default();
location_route
    .post(enum_1.Routes.VALIDATE_RENTAL_PERMISSION, (0, middleware_1.verifyPermission)([enum_1.Permissions.ADMIN, enum_1.Permissions.COLLABORATOR]), location_controller.validateRentalPermission)
    .post(enum_1.Routes.SAVE_LOCATION, (0, middleware_1.verifyPermission)([enum_1.Permissions.ADMIN, enum_1.Permissions.COLLABORATOR]), location_controller.createLocation);
exports.default = location_route;
//# sourceMappingURL=location_route.js.map