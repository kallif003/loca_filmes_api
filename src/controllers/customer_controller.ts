import { Request, Response } from "express";
import { Messages } from "../utils/enum";
import { CustomerForm } from "../utils/interface";
import CustomerService from "../services/customer_service";
import HandleError from "../utils/errors/handleError";

class CustomerController {
  async createCustomer(req: Request, res: Response) {
    try {
      const { clientForm } = req.body;

      const user = await CustomerService.createCustomerService(clientForm);

      const message = {
        title: Messages.TITLE_REGISTER,
        subTitle: Messages.SUBTITLE_REGISTER,
      };

      const response = res.status(201).json({
        user,
        message,
      });

      return response;
    } catch (error) {
      return res.status(500).send({
        message: {
          title: Messages.TITLE_ERROR,
          subTitle: Messages.SUBTITLE_ERROR,
        },
      });
    }
  }

  async getAllCustomer(req: Request, res: Response) {
    try {
      const { itemsPerPage, page } = req.body;

      const skip = (parseInt(page) - 1) * parseInt(itemsPerPage);

      const customer = await CustomerService.getAllCustomerService(
        itemsPerPage,
        skip
      );

      return res.status(200).json(customer);
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

  async getAllCustomerNames(req: Request, res: Response) {
    try {
      const names = await CustomerService.getAllCustomerNamesService();

      return res.status(200).json(names);
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

  async getAllDocNum(req: Request, res: Response) {
    try {
      const docNumbers = await CustomerService.getAllDocNumService();

      return res.status(200).json(docNumbers);
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

  async getCustomerByNameOrDocNumOrStatus(req: Request, res: Response) {
    try {
      const { name, docNum, status } = req.body;

      const user =
        await CustomerService.getCustomerByNameOrDocNumOrStatusService(
          name,
          docNum,
          status
        );

      return res.status(200).json(user);
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

  async updateCustomer(req: Request, res: Response) {
    try {
      const {
        name,
        email,
        docNum,
        phone,
        cep,
        city,
        district,
        state,
        street,
      }: CustomerForm = req.body;

      const { id } = req.params;

      const user = await CustomerService.updateCustomerService(
        [
          {
            name,
            email,
            docNum,
            phone,
            cep,
            city,
            district,
            state,
            street,
          },
        ],
        id
      );

      const message = {
        title: Messages.TITLE_UPDATE_REGISTER,
        subTitle: Messages.SUBTITLE_UPDATE_REGISTER,
      };

      const response = res.status(200).json({
        user,
        message,
      });

      return response;
    } catch (error: any) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).send({
          message: {
            title: Messages.TITLE_EXISTING_USER,
            subTitle: Messages.SUBTITLE_EXISTING_USER,
          },
        });
      }

      return res.status(404).send({
        message: {
          title: Messages.TITLE_ERROR_UPDATE_REGISTER,
          subTitle: Messages.SUBTITLE_ERROR_UPDATE_REGISTER,
        },
      });
    }
  }

  async deleteUsers(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await CustomerService.deleteCustomerService(id);

      const message = {
        title: Messages.TITLE_DELETE_REGISTER,
        subTitle: Messages.SUBTITLE_DELETE_REGISTER,
      };

      const response = res.status(200).json({
        message,
      });

      return response;
    } catch (error: any) {
      return res.status(404).send({
        message: {
          title: Messages.TITLE_ERROR_DELETE_REGISTER,
          subTitle: Messages.SUBTITLE_ERROR_DELETE_REGISTER,
        },
      });
    }
  }
}

export default CustomerController;
