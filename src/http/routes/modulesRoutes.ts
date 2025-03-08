import { FastifyInstance } from "fastify";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";
import { ListModuleController } from "../controller/module/listModuleController";

const listModuleController = new ListModuleController()

export function ModulesRoutes(app: FastifyInstance){
  app.get(
    "/", 
    {preHandler: [Auth, RBAC(["list.modules"])]},
    listModuleController.handle
  )
}