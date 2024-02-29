import mongoose from "mongoose";
import HandleError from "../utils/errors/handleError";
import { Permissions } from "../utils/enum";
import Customer from "../models/customer";
import { CustomerForm } from "../utils/interface";

class CustomerService {
  static async createCustomerService(clientForm: CustomerForm) {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      clientForm.role = [Permissions.CLIENT];

      const newCustomer = new Customer({
        ...clientForm,
      });

      const customer = await newCustomer.save({ session });

      await session.commitTransaction();
      session.endSession();

      return customer;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAllCustomerService(itemsPerPage: number, skip: number) {
    try {
      let role = Permissions.CLIENT;

      const customer = await Customer.find({
        role: { $in: [role] },
      })
        .skip(skip)
        .limit(itemsPerPage);

      if (customer.length == 0) {
        throw new HandleError("Não há registros para essa busca", 404);
      }

      const totalCustomer = await Customer.find({
        role: { $in: [role] },
      }).count();

      const totalPages = Math.ceil(totalCustomer / itemsPerPage);

      return { customer, totalPages };
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }

  static async getAllCustomerNamesService() {
    try {
      const role = Permissions.CLIENT;

      const customerNames = await Customer.find({ role: { $in: [role] } });

      if (customerNames.length === 0) {
        throw new HandleError("Não há registros de clientes", 404);
      }

      return customerNames.map((customer) => customer.name);
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }
      throw new Error(error.message);
    }
  }

  static async getAllDocNumService() {
    try {
      const role = Permissions.CLIENT;

      const docNum = await Customer.find({ role: { $in: [role] } });

      if (docNum.length === 0) {
        throw new HandleError("Não há registros de usuários", 404);
      }

      return docNum.map((customer) => customer.docNum);
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }
      throw new Error(error.message);
    }
  }

  static async getCustomerByNameOrDocNumOrStatusService(
    name: string,
    docNum: string,
    status: string
  ) {
    try {
      let query: any = {};

      if (name) {
        query["name"] = name;
      }

      if (docNum) {
        query["docNum"] = docNum;
      }

      if (status == "Inativo") {
        query = { deleted: true };
      }

      if (status == "Ativo") {
        query = { deleted: false };
      }

      const customer = await Customer.find(query);

      if (customer.length === 0) {
        throw new HandleError("Não há registros de clientes", 404);
      }

      return customer;
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }
      throw new Error(error.message);
    }
  }

  static async updateCustomerService(updatedData: CustomerForm[], id: string) {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      let customer = (await Customer.findById(id)) as any;

      for (const key in updatedData[0]) {
        const value = updatedData[0][key as keyof CustomerForm];

        if (value) {
          customer[key] = value;
        }
      }

      const updatedCustomer = await customer!.save();

      await session.commitTransaction();
      session.endSession();

      return updatedCustomer;
    } catch (error: any) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error("Usuário não encontrado");
    }
  }

  static async deleteCustomerService(userId: string) {
    try {
      const currentDate = new Date();

      const user = await Customer.findByIdAndUpdate(
        userId,
        {
          deleted: true,
          deletedAt: currentDate,
        },
        { new: true }
      );

      return user;
    } catch (error: any) {
      throw new Error("Cliente não encontrado");
    }
  }
}

export default CustomerService;
