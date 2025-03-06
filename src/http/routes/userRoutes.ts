import { FastifyInstance } from "fastify";
import { Auth } from "../middleware/auth";
import { GetMyUserController } from "../controller/user/getMyUserController";

const getMyUserController = new GetMyUserController()

export function UserRoutes(app: FastifyInstance){
  app.get("/", {preHandler: [Auth]}, getMyUserController.handle)
}