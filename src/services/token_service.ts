import jwt from "jsonwebtoken";
import { IUserSchema, UserPayload } from "../utils/interface";

let JWT_SECRET = String(process.env.SECRET_KEY);

class TokenService {
  static generateAcessToken(config: Partial<IUserSchema>): string {
    const token = jwt.sign(config, JWT_SECRET, { expiresIn: "5h" });

    return token;
  }

  static verifyToken(token: string) {
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);

      return decodedToken;
    } catch (error) {
      return error;
    }
  }

  static decodedTokenService(jwtToken: string): UserPayload {
    const decodedToken = jwt.decode(jwtToken) as UserPayload;

    if (decodedToken) {
      const {
        name,
        username,
        role,
        idCompany,
        id,
        idDepartment,
        department,
        ramal,
        email,
      } = decodedToken;

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

export default TokenService;
