import { FastifyInstance } from "fastify";
import { CreateRotationController } from "../controller/rotation/createRotationController";
import { Auth } from "../middleware/auth";
import { RBAC } from "../middleware/rbac";
import { ListRotationsByUserIdController } from "../controller/rotation/listRotationsUserController";
import { DeleteRotationController } from "../controller/rotation/deleteRotationController";
import { UpdateRotationController } from "../controller/rotation/updateRotationController";
import { ListRotationsByCompanyIdController } from "../controller/rotation/listRotationsCompanyController";

const createRotationController = new CreateRotationController();
const listRotationsByUserIdController = new ListRotationsByUserIdController();
const deleteRotationController = new DeleteRotationController();
const updateRotationController = new UpdateRotationController();
const listRotationsCompanyController = new ListRotationsByCompanyIdController();

export function RotationRoutes(app: FastifyInstance) {
  app.post(
    "/",
    { preHandler: [Auth, RBAC(["create.rotation"])] },
    createRotationController.handle
  );
  app.get(
    "/user/:userId",
    { preHandler: [Auth, RBAC(["list.rotations.assigned.to.me"])] },
    listRotationsByUserIdController.handle
  );

  app.get(
    "/company/:companyId",
    { preHandler: [Auth, RBAC(["list.rotations.company"])] },
    listRotationsCompanyController.handle
  );

  app.delete(
    "/:rotationId",
    { preHandler: [Auth, RBAC(["delete.rotation"])] },
    deleteRotationController.handle
  );
  app.patch(
    "/:rotationId",
    { preHandler: [Auth, RBAC(["update.rotation"])] },
    updateRotationController.handle
  );
}
