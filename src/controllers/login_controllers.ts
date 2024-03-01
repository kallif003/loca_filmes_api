import { Request, Response } from "express";
import AuthService from "../services/auth_service";
import HandleError from "../utils/errors/handleError";

class LoginController {
  async login(req: Request, res: Response) {
    try {
      const authService = new AuthService();

      const authHeader = req.headers.authorization;

      const credentials = authService.parseCredentials(authHeader);

      if (!credentials) {
        return res.status(401).send({ message: "Credenciais inválidas" });
      }

      const { email, password } = credentials;

      const user = await authService.findUserByUsername(email);

      if (!user) {
        throw new HandleError("Usuário não encontrado", 403);
      }

      const passwordMatch = await authService.comparePasswords(
        password,
        user.password
      );

      if (!passwordMatch) {
        throw new HandleError("Senha incorreta", 404);
      }

      const token = await authService.generateTokens(user);

      res.status(200).json({ token, permission: user.role });
    } catch (error) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).json({ error: error.message });
      }

      return res.status(500).json({ error: "Tivemos um erro inesperado" });
    }
  }
}

export default LoginController;
