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
const mongoose_1 = __importDefault(require("mongoose"));
const handleError_1 = __importDefault(require("../utils/errors/handleError"));
const enum_1 = require("../utils/enum");
const customer_1 = __importDefault(require("../models/customer"));
class CustomerService {
    static createCustomerService(clientForm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = yield mongoose_1.default.startSession();
                session.startTransaction();
                clientForm.role = [enum_1.Permissions.CLIENT];
                const newCustomer = new customer_1.default(Object.assign({}, clientForm));
                const customer = yield newCustomer.save({ session });
                yield session.commitTransaction();
                session.endSession();
                return customer;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getAllCustomerService(itemsPerPage, skip) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let role = enum_1.Permissions.CLIENT;
                const customer = yield customer_1.default.find({
                    role: { $in: [role] },
                })
                    .skip(skip)
                    .limit(itemsPerPage);
                if (customer.length == 0) {
                    throw new handleError_1.default("Não há registros para essa busca", 404);
                }
                const totalCustomer = yield customer_1.default.find({
                    role: { $in: [role] },
                }).count();
                const totalPages = Math.ceil(totalCustomer / itemsPerPage);
                return { customer, totalPages };
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error(error.message);
            }
        });
    }
    static getAllCustomerNamesService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const role = enum_1.Permissions.CLIENT;
                const customerNames = yield customer_1.default.find({ role: { $in: [role] } });
                if (customerNames.length === 0) {
                    throw new handleError_1.default("Não há registros de clientes", 404);
                }
                return customerNames.map((customer) => customer.name);
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error(error.message);
            }
        });
    }
    static getAllDocNumService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const role = enum_1.Permissions.CLIENT;
                const docNum = yield customer_1.default.find({ role: { $in: [role] } });
                if (docNum.length === 0) {
                    throw new handleError_1.default("Não há registros de usuários", 404);
                }
                return docNum.map((customer) => customer.docNum);
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error(error.message);
            }
        });
    }
    static getCustomerByNameOrDocNumOrStatusService(name, docNum, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = {};
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
                const customer = yield customer_1.default.find(query);
                if (customer.length === 0) {
                    throw new handleError_1.default("Não há registros de clientes", 404);
                }
                return customer;
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error(error.message);
            }
        });
    }
    static updateCustomerService(updatedData, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = yield mongoose_1.default.startSession();
                session.startTransaction();
                let customer = (yield customer_1.default.findById(id));
                for (const key in updatedData[0]) {
                    const value = updatedData[0][key];
                    if (value) {
                        customer[key] = value;
                    }
                }
                const updatedCustomer = yield customer.save();
                yield session.commitTransaction();
                session.endSession();
                return updatedCustomer;
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error("Usuário não encontrado");
            }
        });
    }
    static deleteCustomerService(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentDate = new Date();
                const user = yield customer_1.default.findByIdAndUpdate(userId, {
                    deleted: true,
                    deletedAt: currentDate,
                }, { new: true });
                return user;
            }
            catch (error) {
                throw new Error("Cliente não encontrado");
            }
        });
    }
}
exports.default = CustomerService;
//# sourceMappingURL=customer_service.js.map