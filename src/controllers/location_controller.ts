import { Request, Response } from "express";
import { Messages } from "../utils/enum";
import LocationService from "../services/location_service";
import HandleError from "../utils/errors/handleError";

class LocationController {
  async createLocation(req: Request, res: Response) {
    try {
      const { docNum, customer, movie } = req.body;

      const location = await LocationService.createLocationService(
        docNum,
        customer,
        movie
      );
      const message = {
        title: "Sucesso",
        subTitle: "Esse filme foi alugado com sucesso",
      };

      const response = res.status(201).json({
        location,
        message,
      });
    } catch (error) {
      return res.status(500).send({
        message: {
          title: Messages.TITLE_ERROR,
          subTitle: Messages.SUBTITLE_ERROR,
        },
      });
    }
  }

  async validateRentalPermission(req: Request, res: Response) {
    try {
      const { docNum } = req.body;

      const customer = await LocationService.validateRentalPermissionService(
        docNum
      );

      return res.status(200).json(customer);
    } catch (error) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).json({
          message: {
            title: Messages.TITLE_EXISTING_LOCATION,
            subTitle: error.message,
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
}

export default LocationController;
