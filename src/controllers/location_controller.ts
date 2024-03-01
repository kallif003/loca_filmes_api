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

  async getAllLocation(req: Request, res: Response) {
    try {
      const { page } = req.body;
      const itemsPerPage = 10;

      const skip = (parseInt(page) - 1) * itemsPerPage;

      const location = await LocationService.getAllLocationService(
        itemsPerPage,
        skip
      );

      return res.status(200).json(location);
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

  async returnMovie(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const location = await LocationService.returnMovieService(id);

      return res.status(200).json(location);
    } catch (error) {
      return res.status(500).send({
        message: {
          title: Messages.TITLE_ERROR,
          subTitle: Messages.SUBTITLE_ERROR,
        },
      });
    }
  }

  async getLocationByFilter(req: Request, res: Response) {
    try {
      const { customer, createdAt, status, page } = req.body;

      const locationFilter = {
        customer,
        createdAt,
        status,
      };

      const itemsPerPage = 10;

      const skip = (parseInt(page) - 1) * itemsPerPage;

      const location = await LocationService.getLocationByFilterService(
        locationFilter,
        itemsPerPage,
        skip
      );

      return res.status(200).json(location);
    } catch (error) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).json({
          message: {
            title: Messages.TITLE_THERE_ARE_NO_RECORDS,
            subTitle: Messages.SUBTITLE_THERE_ARE_NO_RECORDS,
          },
        });
      }

      return res.status(500).json({
        message: {
          title: Messages.TITLE_ERROR,
          subTitle: Messages.SUBTITLE_ERROR,
        },
      });
    }
  }
}

export default LocationController;
