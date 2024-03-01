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
const handleError_1 = __importDefault(require("../utils/errors/handleError"));
const location_1 = __importDefault(require("../models/location"));
const customer_1 = __importDefault(require("../models/customer"));
const mongoose_1 = __importDefault(require("mongoose"));
class LocationService {
    static createLocationService(docNum, customer, movie) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = yield mongoose_1.default.startSession();
                session.startTransaction();
                const newLocation = new location_1.default({
                    docNum,
                    customer,
                    movie,
                });
                const location = yield newLocation.save({ session });
                yield session.commitTransaction();
                session.endSession();
                return location;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static validateRentalPermissionService(docNum) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield customer_1.default.findOne({ docNum, deleted: false });
                const location = yield location_1.default.find({ docNum, deleted: false });
                if (location.length == 0 && customer) {
                    return customer;
                }
                else if (!customer) {
                    throw new handleError_1.default("Cliente não encontrado", 404);
                }
                else {
                    throw new handleError_1.default("Esse cliente possui filmes alugados", 409);
                }
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error(error.message);
            }
        });
    }
}
exports.default = LocationService;
//# sourceMappingURL=location_service.js.map