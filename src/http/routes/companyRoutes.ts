import { FastifyInstance } from "fastify";
import { CreateCompanyController } from "../controller/company/createCompanyController";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";
import { ListCompaniesController } from "../controller/company/listCompaniesController";
import { UpdateCompanyController } from "../controller/company/updateCompanyController";

const createCompanyController = new CreateCompanyController()
const listCompaniesController = new ListCompaniesController()
const updateCompanyController = new UpdateCompanyController()

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
  ),
  app.patch(
    "/:companyId",
    {preHandler: [Auth, RBAC(["update.company"])]},
    updateCompanyController.handle
  )
}