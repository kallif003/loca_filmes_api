import express from "express";
import { Permissions, Routes } from "../utils/enum";
import CustomerController from "../controllers/customer_controller";
import { verifyPermission } from "../middleware";

const customer_route = express.Router();
const customer_controller = new CustomerController();

customer_route
  .get(
    Routes.GET_ALL_CUSTOMER_NAMES,
    verifyPermission([Permissions.ADMIN, Permissions.COLLABORATOR]),
    customer_controller.getAllCustomerNames
  )
  .get(
    Routes.GET_ALL_CUSTOMER_DOCNUMBERS,
    verifyPermission([Permissions.ADMIN, Permissions.COLLABORATOR]),
    customer_controller.getAllDocNum
  )
  .post(
    Routes.GET_CUSTOMER_BY_NAME_OR_DOCNUM_OR_STATUS,
    verifyPermission([Permissions.ADMIN, Permissions.COLLABORATOR]),
    customer_controller.getCustomerByNameOrDocNumOrStatus
  )
  .post(
    Routes.SAVE_CUSTOMER,
    verifyPermission([Permissions.ADMIN, Permissions.COLLABORATOR]),
    customer_controller.createCustomer
  )
  .post(
    Routes.GET_ALL_CUSTOMER,
    verifyPermission([Permissions.ADMIN, Permissions.COLLABORATOR]),
    customer_controller.getAllCustomer
  )
  .put(
    Routes.UPDATE_CUSTOMER,
    verifyPermission([Permissions.ADMIN, Permissions.COLLABORATOR]),
    customer_controller.updateCustomer
  )
  .put(
    Routes.DELETE_CUSTOMER,
    verifyPermission([Permissions.ADMIN, Permissions.COLLABORATOR]),
    customer_controller.deleteUsers
  );

export default customer_route;
