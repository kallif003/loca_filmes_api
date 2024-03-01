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
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("../models/users"));
const mongoose_1 = __importDefault(require("mongoose"));
const mapPermission_1 = __importDefault(require("../utils/mapPermission"));
const handleError_1 = __importDefault(require("../utils/errors/handleError"));
const enum_1 = require("../utils/enum");
class UserService {
    static createUserService(userData, permission) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = yield mongoose_1.default.startSession();
                session.startTransaction();
                const saltRounds = 8;
                const hashedPassword = yield bcrypt_1.default.hash(userData.password, saltRounds);
                userData.password = hashedPassword;
                userData.role = mapPermission_1.default.getCreatablePermission(permission[0]);
                userData.status = "Ativo";
                const newUser = new users_1.default(Object.assign({}, userData));
                const user = yield newUser.save({ session });
                yield session.commitTransaction();
                session.endSession();
                return user;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getAllUsersService(itemsPerPage, skip, permission) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let role;
                if (permission[0] == enum_1.Permissions.ADMIN) {
                    role = enum_1.Permissions.COLLABORATOR;
                }
                else {
                    role = enum_1.Permissions.CLIENT;
                }
                const users = yield users_1.default.find({
                    role: { $in: [role] },
                })
                    .select("-password")
                    .skip(skip)
                    .limit(itemsPerPage);
                if (users.length == 0) {
                    throw new handleError_1.default("Não há registros para essa busca", 404);
                }
                const totalUsers = yield users_1.default.find({
                    role: { $in: [role] },
                }).count();
                const totalPages = Math.ceil(totalUsers / itemsPerPage);
                return { users, totalPages };
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error(error.message);
            }
        });
    }
    static getAllUserNamesService(permission) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let role;
                if (permission[0] == enum_1.Permissions.ADMIN) {
                    role = enum_1.Permissions.COLLABORATOR;
                }
                else {
                    role = enum_1.Permissions.CLIENT;
                }
                const userNames = yield users_1.default.find({ role: { $in: [role] } });
                if (userNames.length === 0) {
                    throw new handleError_1.default("Não há registros de usuários", 404);
                }
                return userNames.map((user) => user.name);
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error(error.message);
            }
        });
    }
    static getAllDocNumService(permission) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let role;
                if (permission[0] == enum_1.Permissions.ADMIN) {
                    role = enum_1.Permissions.COLLABORATOR;
                }
                else {
                    role = enum_1.Permissions.CLIENT;
                }
                const docNum = yield users_1.default.find({ role: { $in: [role] } });
                if (docNum.length === 0) {
                    throw new handleError_1.default("Não há registros de usuários", 404);
                }
                return docNum.map((user) => user.docNum);
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error(error.message);
            }
        });
    }
    static getUsersByNameOrDocNumService(name, docNum) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {};
                if (name) {
                    query["name"] = name;
                }
                if (docNum) {
                    query["docNum"] = docNum;
                }
                const users = yield users_1.default.find(query);
                if (users.length === 0) {
                    throw new handleError_1.default("Não há registros de usuários com os critérios fornecidos", 404);
                }
                return users;
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error(error.message);
            }
        });
    }
    static updateUserService(updatedData, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = yield mongoose_1.default.startSession();
                session.startTransaction();
                let user = (yield users_1.default.findById(id));
                for (const key in updatedData[0]) {
                    const value = updatedData[0][key];
                    if (value) {
                        user[key] = value;
                    }
                }
                const updatedUser = yield user.save();
                yield session.commitTransaction();
                session.endSession();
                return updatedUser;
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error("Usuário não encontrado");
            }
        });
    }
    static deleteUserService(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentDate = new Date();
                const user = yield users_1.default.findByIdAndUpdate(userId, {
                    deleted: true,
                    deletedAt: currentDate,
                }, { new: true });
                return user;
            }
            catch (error) {
                throw new Error("Usuário não encontrado");
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user_service.js.map