import { FastifyInstance } from "fastify";
import { CreateCompanyController } from "../controller/company/createCompanyController";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";
import { ListCompaniesController } from "../controller/company/listCompaniesController";

const createCompanyController = new CreateCompanyController()
const listCompaniesController = new ListCompaniesController()
export function CompanyRoutes(app: FastifyInstance){
  app.post(
    "/", 
    {preHandler: [Auth, RBAC(["create.company"])]},
    createCompanyController.handle
  ),
  app.get(
    "/",
    {preHandler: [Auth, RBAC(["list.company"])]},
    listCompaniesController.handle
  )
}