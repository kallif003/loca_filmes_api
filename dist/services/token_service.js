"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let JWT_SECRET = String(process.env.SECRET_KEY);
class TokenService {
    static generateAcessToken(config) {
        const token = jsonwebtoken_1.default.sign(config, JWT_SECRET, { expiresIn: "5h" });
        return token;
    }
    static verifyToken(token) {
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            return decodedToken;
        }
        catch (error) {
            return error;
        }
    }
    static decodedTokenService(jwtToken) {
        const decodedToken = jsonwebtoken_1.default.decode(jwtToken);
        if (decodedToken) {
            const { name, username, role, idCompany, id, idDepartment, department, ramal, email, } = decodedToken;
            return {
                name,
                username,
                permission: role,
                idCompany,
                userId: id,
                idDepartment,
                department,
                ramal,
                email,
            };
        }
        return null;
    }
}
exports.default = TokenService;
//# sourceMappingURL=token_service.js.map