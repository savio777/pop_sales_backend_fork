import { FastifyInstance } from "fastify";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";
import { ListModuleController } from "../controller/module/listModuleController";
import { CreateModuleController } from "../controller/module/createModuleController";

const listModuleController = new ListModuleController()
const createModuleController = new CreateModuleController()

export function ModulesRoutes(app: FastifyInstance){
  app.get(
    "/:companyId", 
    {preHandler: [Auth, RBAC(["list.modules"])]},
    listModuleController.handle
  )
  app.post(
    "/", 
    {preHandler: [Auth, RBAC(["create.modules"])]},
    createModuleController.handle
  )
}