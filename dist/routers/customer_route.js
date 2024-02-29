"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enum_1 = require("../utils/enum");
const customer_controller_1 = __importDefault(require("../controllers/customer_controller"));
const middleware_1 = require("../middleware");
const customer_route = express_1.default.Router();
const customer_controller = new customer_controller_1.default();
customer_route
    .get(enum_1.Routes.GET_ALL_CUSTOMER_NAMES, (0, middleware_1.verifyPermission)([enum_1.Permissions.ADMIN, enum_1.Permissions.COLLABORATOR]), customer_controller.getAllCustomerNames)
    .get(enum_1.Routes.GET_ALL_CUSTOMER_DOCNUMBERS, (0, middleware_1.verifyPermission)([enum_1.Permissions.ADMIN, enum_1.Permissions.COLLABORATOR]), customer_controller.getAllDocNum)
    .post(enum_1.Routes.GET_CUSTOMER_BY_NAME_OR_DOCNUM_OR_STATUS, (0, middleware_1.verifyPermission)([enum_1.Permissions.ADMIN, enum_1.Permissions.COLLABORATOR]), customer_controller.getCustomerByNameOrDocNumOrStatus)
    .post(enum_1.Routes.SAVE_CUSTOMER, (0, middleware_1.verifyPermission)([enum_1.Permissions.ADMIN, enum_1.Permissions.COLLABORATOR]), customer_controller.createCustomer)
    .post(enum_1.Routes.GET_ALL_CUSTOMER, (0, middleware_1.verifyPermission)([enum_1.Permissions.ADMIN, enum_1.Permissions.COLLABORATOR]), customer_controller.getAllCustomer)
    .put(enum_1.Routes.UPDATE_CUSTOMER, (0, middleware_1.verifyPermission)([enum_1.Permissions.ADMIN, enum_1.Permissions.COLLABORATOR]), customer_controller.updateCustomer)
    .put(enum_1.Routes.DELETE_CUSTOMER, (0, middleware_1.verifyPermission)([enum_1.Permissions.ADMIN, enum_1.Permissions.COLLABORATOR]), customer_controller.deleteUsers);
exports.default = customer_route;
//# sourceMappingURL=customer_route.js.map