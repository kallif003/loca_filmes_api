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
const handleError_1 = __importDefault(require("../utils/errors/handleError"));
const token_service_1 = __importDefault(require("../services/token_service"));
const users_1 = __importDefault(require("../models/users"));
class IAuthService {
}
class AuthService {
    findUserByUsername(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield users_1.default.findOne({ email, deleted: false });
                return user;
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error(error.message);
            }
        });
    }
    comparePasswords(password, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.compare(password, hashedPassword);
        });
    }
    generateTokens(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let config = {
                    role: user.role,
                    name: user.name,
                    id: user.id,
                    email: user.email,
                };
                const token = token_service_1.default.generateAcessToken(config);
                return token;
            }
            catch (error) {
                return error;
            }
        });
    }
    parseCredentials(authHeader) {
        if (!authHeader || !authHeader.startsWith("Basic ")) {
            return null;
        }
        const base64Credentials = authHeader.slice(6);
        const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
        if (!credentials) {
            return null;
        }
        const [email, password] = credentials.split(":");
        if (!email || !password) {
            return null;
        }
        return { email, password };
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth_service.js.map