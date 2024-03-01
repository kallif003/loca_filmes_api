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
const location_service_1 = __importDefault(require("../services/location_service"));
const handleError_1 = __importDefault(require("../utils/errors/handleError"));
class LocationController {
    createLocation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { docNum, customer, movie } = req.body;
                const location = yield location_service_1.default.createLocationService(docNum, customer, movie);
                const message = {
                    title: "Sucesso",
                    subTitle: "Esse filme foi alugado com sucesso",
                };
                const response = res.status(201).json({
                    location,
                    message,
                });
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
    validateRentalPermission(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { docNum } = req.body;
                const customer = yield location_service_1.default.validateRentalPermissionService(docNum);
                return res.status(200).json(customer);
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).json({
                        message: {
                            title: enum_1.Messages.TITLE_EXISTING_LOCATION,
                            subTitle: error.message,
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
}
exports.default = LocationController;
//# sourceMappingURL=location_controller.js.map