import { FastifyInstance } from "fastify";
import { SetUserCompanyController } from "../controller/userCompany/SetUserCompanyController";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";

const setUserCompanyController= new SetUserCompanyController()

export function UserCompanyRoutes(app: FastifyInstance){
  app.post("/:method", {preHandler: [Auth, RBAC(["set.user.company"])]}, setUserCompanyController.handle)
}