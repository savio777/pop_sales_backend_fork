import { FastifyInstance } from "fastify";
import { CreateCompanyController } from "../controller/company/createCompanyController";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";

const createCompanyController = new CreateCompanyController()

export function CompanyRoutes(app: FastifyInstance){
  app.post("/", {preHandler: [Auth, RBAC(["create.company"])]}, createCompanyController.handle)
}