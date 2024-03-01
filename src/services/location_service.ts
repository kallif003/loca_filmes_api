import HandleError from "../utils/errors/handleError";
import Location from "../models/location";
import Customer from "../models/customer";
import mongoose from "mongoose";
import { ILocationFilter } from "../utils/interface";

class LocationService {
  static async createLocationService(
    docNum: string,
    customer: string,
    movie: string
  ) {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      const newLocation = new Location({
        docNum,
        customer,
        movie,
      });

      const location = await newLocation.save({ session });

      await session.commitTransaction();
      session.endSession();

      return location;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async validateRentalPermissionService(docNum: string) {
    try {
      const customer = await Customer.findOne({ docNum, deleted: false });

      const location = await Location.find({ docNum, deleted: false });

      if (location.length == 0 && customer) {
        return customer;
      } else if (!customer) {
        throw new HandleError("Cliente não encontrado", 404);
      } else {
        throw new HandleError("Esse cliente possui filmes alugados", 409);
      }
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }

  static async getAllLocationService(itemsPerPage: number, skip: number) {
    try {
      const locations = await Location.find().skip(skip).limit(itemsPerPage);

      if (locations.length == 0) {
        throw new HandleError("Não há registros para essa busca", 404);
      }

      const totalLocations = await Location.find().count();

      const totalPages = Math.ceil(totalLocations / itemsPerPage);

      return { locations, totalPages };
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }

  static async returnMovieService(id: string) {
    try {
      const currentDate = new Date();

      const user = await Location.findByIdAndUpdate(
        id,
        {
          deleted: true,
          deletedAt: currentDate,
        },
        { new: true }
      );

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getLocationByFilterService(
    locationFilter: ILocationFilter,
    itemsPerPage: number,
    skip: number
  ) {
    try {
      let query: any = {};

      const { createdAt, customer, status } = locationFilter;

      if (createdAt) {
        const startDate = new Date(createdAt);

        const endDate = new Date(
          new Date(createdAt).setDate(startDate.getDate() + 1)
        );

        query["createdAt"] = {
          $gte: startDate,
          $lt: endDate,
        };
      }

      if (customer) {
        query["customer"] = customer;
      }

      if (status == "Entregue") {
        query["deleted"] = true;
      } else if (status == "Alugado") {
        query["deleted"] = false;
      }

      const locations = await Location.find({ ...query })
        .skip(skip)
        .limit(itemsPerPage);

      if (locations.length == 0) {
        throw new HandleError("Não há registros para essa busca", 404);
      }

      let totalLocation = await Location.find(query).count();

      const totalPages = Math.ceil(totalLocation / itemsPerPage);

      return { locations, totalPages };
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }
}

export default LocationService;
