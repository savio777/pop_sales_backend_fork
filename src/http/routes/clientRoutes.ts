import { FastifyInstance } from "fastify";
import { CreateClientController } from "../controller/client/createClientController";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";
import { GetClientController } from "../controller/client/getClientByIdController";
import { ListClientsByCompanyController } from "../controller/client/listClientsByCompanyController";

const createClientController = new CreateClientController()
const getClientController = new GetClientController()
const listClientsByCompanyController = new ListClientsByCompanyController()

export function ClientRoutes(app: FastifyInstance) {
  app.post(
    "/", 
    {preHandler: [Auth, RBAC(["create.client"])]},
    createClientController.handle
  )
  app.get(
    "/company/:companyId", 
    {preHandler: [Auth, RBAC(["get.client"])]},
    listClientsByCompanyController.handle
  )
  app.get(
    "/:clientId", 
    {preHandler: [Auth, RBAC(["get.client"])]},
    getClientController.handle
  )
}