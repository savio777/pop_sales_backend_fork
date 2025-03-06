import { FastifyInstance } from "fastify";
import { SetUserCompanyController } from "../controller/userCompany/SetUserCompanyController";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";
import { ListUserCompanyController } from "../controller/userCompany/ListUserCompanyController";

const setUserCompanyController = new SetUserCompanyController()
const listUserCompanyController = new ListUserCompanyController()

export function UserCompanyRoutes(app: FastifyInstance){
  app.post(
    "/:method", 
    {preHandler: [Auth, RBAC(["set.user.company"])]}, 
    setUserCompanyController.handle
  )
  app.get(
    "/:companyId", 
    {preHandler: [Auth, RBAC(["list.user.company"])]}, 
    listUserCompanyController.handle
  )
}