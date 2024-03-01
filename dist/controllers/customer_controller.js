"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../utils/enum");
const customer_service_1 = __importDefault(require("../services/customer_service"));
const handleError_1 = __importDefault(require("../utils/errors/handleError"));
class CustomerController {
    createCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { clientForm } = req.body;
                const user = yield customer_service_1.default.createCustomerService(clientForm);
                const message = {
                    title: enum_1.Messages.TITLE_REGISTER,
                    subTitle: enum_1.Messages.SUBTITLE_REGISTER,
                };
                const response = res.status(201).json({
                    user,
                    message,
                });
                return response;
            }
            catch (error) {
                return res.status(500).send({
                    message: {
                        title: enum_1.Messages.TITLE_ERROR,
                        subTitle: enum_1.Messages.SUBTITLE_ERROR,
                    },
                });
            }
        });
    }
    getAllCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { itemsPerPage, page } = req.body;
                const skip = (parseInt(page) - 1) * parseInt(itemsPerPage);
                const customer = yield customer_service_1.default.getAllCustomerService(itemsPerPage, skip);
                return res.status(200).json(customer);
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).json({
                        message: {
                            title: enum_1.Messages.TITLE_THERE_ARE_NO_RECORDS,
                            subTitle: enum_1.Messages.SUBTITLE_THERE_ARE_NO_RECORDS,
                        },
                    });
                }
                return res.status(500).send({
                    message: {
                        title: enum_1.Messages.TITLE_ERROR,
                        subTitle: enum_1.Messages.SUBTITLE_ERROR,
                    },
                });
            }
        });
    }
    getAllCustomerNames(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const names = yield customer_service_1.default.getAllCustomerNamesService();
                return res.status(200).json(names);
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).json({
                        message: {
                            title: enum_1.Messages.TITLE_THERE_ARE_NO_RECORDS,
                            subTitle: enum_1.Messages.SUBTITLE_THERE_ARE_NO_RECORDS,
                        },
                    });
                }
                return res.status(500).send({
                    message: {
                        title: enum_1.Messages.TITLE_ERROR,
                        subTitle: enum_1.Messages.SUBTITLE_ERROR,
                    },
                });
            }
        });
    }
    getAllDocNum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docNumbers = yield customer_service_1.default.getAllDocNumService();
                return res.status(200).json(docNumbers);
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).json({
                        message: {
                            title: enum_1.Messages.TITLE_THERE_ARE_NO_RECORDS,
                            subTitle: enum_1.Messages.SUBTITLE_THERE_ARE_NO_RECORDS,
                        },
                    });
                }
                return res.status(500).send({
                    message: {
                        title: enum_1.Messages.TITLE_ERROR,
                        subTitle: enum_1.Messages.SUBTITLE_ERROR,
                    },
                });
            }
        });
    }
    getCustomerByNameOrDocNumOrStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, docNum, status } = req.body;
                const user = yield customer_service_1.default.getCustomerByNameOrDocNumOrStatusService(name, docNum, status);
                return res.status(200).json(user);
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).json({
                        message: {
                            title: enum_1.Messages.TITLE_THERE_ARE_NO_RECORDS,
                            subTitle: enum_1.Messages.SUBTITLE_THERE_ARE_NO_RECORDS,
                        },
                    });
                }
                return res.status(500).send({
                    message: {
                        title: enum_1.Messages.TITLE_ERROR,
                        subTitle: enum_1.Messages.SUBTITLE_ERROR,
                    },
                });
            }
        });
    }
    updateCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, docNum, phone, cep, city, district, state, street, } = req.body;
                const { id } = req.params;
                const user = yield customer_service_1.default.updateCustomerService([
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
                ], id);
                const message = {
                    title: enum_1.Messages.TITLE_UPDATE_REGISTER,
                    subTitle: enum_1.Messages.SUBTITLE_UPDATE_REGISTER,
                };
                const response = res.status(200).json({
                    user,
                    message,
                });
                return response;
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).send({
                        message: {
                            title: enum_1.Messages.TITLE_EXISTING_USER,
                            subTitle: enum_1.Messages.SUBTITLE_EXISTING_USER,
                        },
                    });
                }
                return res.status(404).send({
                    message: {
                        title: enum_1.Messages.TITLE_ERROR_UPDATE_REGISTER,
                        subTitle: enum_1.Messages.SUBTITLE_ERROR_UPDATE_REGISTER,
                    },
                });
            }
        });
    }
    deleteUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield customer_service_1.default.deleteCustomerService(id);
                const message = {
                    title: enum_1.Messages.TITLE_DELETE_REGISTER,
                    subTitle: enum_1.Messages.SUBTITLE_DELETE_REGISTER,
                };
                const response = res.status(200).json({
                    message,
                });
                return response;
            }
            catch (error) {
                return res.status(404).send({
                    message: {
                        title: enum_1.Messages.TITLE_ERROR_DELETE_REGISTER,
                        subTitle: enum_1.Messages.SUBTITLE_ERROR_DELETE_REGISTER,
                    },
                });
            }
        });
    }
}
exports.default = CustomerController;
//# sourceMappingURL=customer_controller.js.map