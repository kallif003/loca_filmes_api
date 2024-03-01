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
const user_service_1 = __importDefault(require("../services/user_service"));
const handleError_1 = __importDefault(require("../utils/errors/handleError"));
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userForm, permissions } = req.body;
                const user = yield user_service_1.default.createUserService(userForm, permissions);
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
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { itemsPerPage, page, permissions } = req.body;
                const skip = (parseInt(page) - 1) * parseInt(itemsPerPage);
                const users = yield user_service_1.default.getAllUsersService(itemsPerPage, skip, permissions);
                return res.status(200).json(users);
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
    getAllUserNames(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { permissions } = req.body;
                const names = yield user_service_1.default.getAllUserNamesService(permissions);
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
                const { permissions } = req.body;
                const docNumbers = yield user_service_1.default.getAllDocNumService(permissions);
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
    getUsersByNameOrDocNum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, docNum } = req.body;
                const user = yield user_service_1.default.getUsersByNameOrDocNumService(name, docNum);
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
    updateUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, password, email, docNum } = req.body;
                const { id } = req.params;
                const user = yield user_service_1.default.updateUserService([
                    {
                        name,
                        password,
                        email,
                        docNum,
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
                yield user_service_1.default.deleteUserService(id);
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
exports.default = UserController;
//# sourceMappingURL=user_controller.js.map