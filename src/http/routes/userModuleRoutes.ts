import { FastifyInstance } from "fastify";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";
import { CreateUserModuleController } from "../controller/userModule/createUserModuleController";

const createUserModuleController = new CreateUserModuleController()

export function UserModuleRoutes(app: FastifyInstance){
  app.post(
    "/",
    {preHandler: [Auth, RBAC(["create.user.module"])]},
    createUserModuleController.handle
  )
}