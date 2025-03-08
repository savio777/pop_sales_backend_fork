import { FastifyInstance } from "fastify";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";
import { CreateUserModuleController } from "../controller/userModule/createUserModuleController";
import { RemoveUserModuleController } from "../controller/userModule/removeUserModuleController copy";
import { ListUserModuleController } from "../controller/userModule/listUserModuleController";

const createUserModuleController = new CreateUserModuleController()
const removeUserModuleController = new RemoveUserModuleController()
const listUserModuleController = new ListUserModuleController()

export function UserModuleRoutes(app: FastifyInstance){
  app.post(
    "/",
    {preHandler: [Auth, RBAC(["create.user.module"])]},
    createUserModuleController.handle
  )
  app.delete(
    "/user/:userId/module/:moduleId",
    {preHandler: [Auth, RBAC(["remove.user.module"])]},
    removeUserModuleController.handle
  )
  app.get(
    "/:userId",
    {preHandler: [Auth, RBAC(["list.user.module"])]},
    listUserModuleController.handle
  )
}