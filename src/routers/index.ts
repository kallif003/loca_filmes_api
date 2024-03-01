import express, { Request, Response, Express } from "express";
import {
  verifyToken,
  cacheControlMiddleware,
  verifyPermission,
} from "../middleware";
import cors from "cors";
import user_route from "./user_route";
import login_route from "./login_route";
import customer_route from "./customer_route";
import location_route from "./location_route";

const router = (app: Express) => {
  app.route("/").get((req: Request, res: Response) => {
    res.status(200).send("Loca Filmes Backend Ativo");
  });

  app.use(
    express.json(),
    cors(),
    user_route,
    login_route,
    verifyToken,
    customer_route,
    location_route
  );
};

export default router;
