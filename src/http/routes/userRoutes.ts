import { FastifyInstance } from "fastify";
import { Auth } from "../middleware/auth";
import { GetMyUserController } from "../controller/user/getMyUserController";
import { UpdateUserController } from "../controller/user/updateUserController";
import { RBAC } from "../middleware/rbac";

const getMyUserController = new GetMyUserController()
const updateUserController = new UpdateUserController()

export function UserRoutes(app: FastifyInstance){
  app.get("/", {preHandler: [Auth]}, getMyUserController.handle)
  app.patch("/:userId", {preHandler: [Auth, RBAC(["update.user"])]}, updateUserController.handle)
}