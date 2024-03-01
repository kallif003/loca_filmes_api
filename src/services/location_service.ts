import HandleError from "../utils/errors/handleError";
import Location from "../models/location";
import Customer from "../models/customer";
import mongoose from "mongoose";

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
}

export default LocationService;
