import { FastifyInstance } from "fastify";
import { CreateOccurrenceController } from "../controller/occurrence/createOccurrenceController";
import { GetOccurrenceByIdController } from "../controller/occurrence/getOccurrenceByIdController";
import { ListOccurrenceByCompanyIdController } from "../controller/occurrence/listOccurrenceByCompanyIdController";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";

const createOccurrenceController = new CreateOccurrenceController();
const getOccurrenceByIdController = new GetOccurrenceByIdController();
const listOccurrenceByCompanyIdController =
  new ListOccurrenceByCompanyIdController();

export function OccurrenceRoutes(app: FastifyInstance) {
  app.post(
    "/",
    { preHandler: [Auth, RBAC(["create.occurrence"])] },
    createOccurrenceController.handler
  );
  app.get(
    "/:id",
    { preHandler: [Auth, RBAC(["get.occurrence"])] },
    getOccurrenceByIdController.handler
  );
  app.get(
    "/company/:companyId",
    { preHandler: [Auth, RBAC(["list.occurrence"])] },
    listOccurrenceByCompanyIdController.handler
  );
}
