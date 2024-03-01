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
const auth_service_1 = __importDefault(require("../services/auth_service"));
const handleError_1 = __importDefault(require("../utils/errors/handleError"));
class LoginController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authService = new auth_service_1.default();
                const authHeader = req.headers.authorization;
                const credentials = authService.parseCredentials(authHeader);
                if (!credentials) {
                    return res.status(401).send({ message: "Credenciais inválidas" });
                }
                const { email, password } = credentials;
                const user = yield authService.findUserByUsername(email);
                if (!user) {
                    throw new handleError_1.default("Usuário não encontrado", 403);
                }
                const passwordMatch = yield authService.comparePasswords(password, user.password);
                if (!passwordMatch) {
                    throw new handleError_1.default("Senha incorreta", 404);
                }
                const token = yield authService.generateTokens(user);
                res.status(200).json({ token, permission: user.role });
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).json({ error: error.message });
                }
                return res.status(500).json({ error: "Tivemos um erro inesperado" });
            }
        });
    }
}
exports.default = LoginController;
//# sourceMappingURL=login_controllers.js.map