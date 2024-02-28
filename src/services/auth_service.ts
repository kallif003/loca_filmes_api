import bcrypt from "bcrypt";
import { ITokenResponse, IUserSchema } from "../utils/interface";
import HandleError from "../utils/errors/handleError";
import TokenService from "../services/token_service";
import User from "../models/users";
import { Permissions } from "../utils/enum";

abstract class IAuthService {
  abstract findUserByUsername(username: string): Promise<IUserSchema | null>;

  abstract comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean>;

  abstract generateTokens(user: IUserSchema): Promise<string>;
}

class AuthService implements IAuthService {
  async findUserByUsername(email: string): Promise<IUserSchema> {
    try {
      const user = await User.findOne({ email, deleted: false });

      return user;
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }

  async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async generateTokens(user: IUserSchema): Promise<string> {
    try {
      let config: Partial<IUserSchema> = {
        role: user.role,
        name: user.name,
        id: user.id,
        email: user.email,
      };

      const token = TokenService.generateAcessToken(config);

      return token;
    } catch (error) {
      return error;
    }
  }

  parseCredentials(
    authHeader: string
  ): { email: string; password: string } | null {
    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return null;
    }

    const base64Credentials = authHeader.slice(6);

    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "utf-8"
    );

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

export default AuthService;
