import { FastifyInstance } from "fastify";
import { CreateClientController } from "../controller/client/createClientController";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";
import { GetClientByIdController } from "../controller/client/getClientByIdController";
import { ListClientsByCompanyController } from "../controller/client/listClientsByCompanyController";
import { ListClientServiceController } from "../controller/client/listClientServiceController";
import { UpdateClientController } from "../controller/client/updateClientController";
import { DeleteClientController } from "../controller/client/deleteClientController";

const createClientController = new CreateClientController();
const getClientByIdController = new GetClientByIdController();
const listClientsByCompanyController = new ListClientsByCompanyController();
const listClientServiceController = new ListClientServiceController();
const updateClientController = new UpdateClientController();
const deleteClientController = new DeleteClientController();

export function ClientRoutes(app: FastifyInstance) {
  app.post(
    "/",
    { preHandler: [Auth, RBAC(["create.client"])] },
    createClientController.handle
  );
  app.patch(
    "/:id",
    { preHandler: [Auth, RBAC(["update.client"])] },
    updateClientController.handle
  );
  app.get(
    "/company/:companyId",
    { preHandler: [Auth, RBAC(["get.client"])] },
    listClientsByCompanyController.handle
  );
  app.get(
    "/company-service/:companyId",
    { preHandler: [Auth, RBAC(["list.client.service"])] },
    listClientServiceController.handle
  );
  app.get(
    "/:clientId",
    { preHandler: [Auth, RBAC(["get.client"])] },
    getClientByIdController.handle
  );
  app.delete(
    "/:id",
    { preHandler: [Auth, RBAC(["delete.client"])] },
    deleteClientController.handler
  );
}
