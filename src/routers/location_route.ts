import express from "express";
import { Permissions, Routes } from "../utils/enum";
import LocationController from "../controllers/location_controller";
import { verifyPermission } from "../middleware";

const location_route = express.Router();
const location_controller = new LocationController();

location_route
  .post(
    Routes.GET_ALL_LOCATION,
    verifyPermission([Permissions.ADMIN, Permissions.COLLABORATOR]),
    location_controller.getAllLocation
  )
  .post(
    Routes.GET_LOCATION_BY_FILTER,
    verifyPermission([Permissions.ADMIN, Permissions.COLLABORATOR]),
    location_controller.getLocationByFilter
  )
  .post(
    Routes.VALIDATE_RENTAL_PERMISSION,
    verifyPermission([Permissions.ADMIN, Permissions.COLLABORATOR]),
    location_controller.validateRentalPermission
  )
  .post(
    Routes.SAVE_LOCATION,
    verifyPermission([Permissions.ADMIN, Permissions.COLLABORATOR]),
    location_controller.createLocation
  )
  .put(
    Routes.RETURN_MOVIE,
    verifyPermission([Permissions.ADMIN, Permissions.COLLABORATOR]),
    location_controller.returnMovie
  );

export default location_route;
