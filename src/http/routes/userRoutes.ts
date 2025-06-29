import { FastifyInstance } from "fastify";
import { Auth } from "../middleware/auth";
import { GetMyUserController } from "../controller/user/getMyUserController";
import { UpdateUserController } from "../controller/user/updateUserController";
import { RBAC } from "../middleware/rbac";
import { ListUserByCompanyIdController } from "../controller/user/listUserByCompanyIdController";
import { DeleteUserController } from "../controller/user/deleteUserController";
import { ListAllUsersController } from "../controller/user/listAllUsersController";

const getMyUserController = new GetMyUserController();
const updateUserController = new UpdateUserController();
const listUserByCompanyIdController = new ListUserByCompanyIdController();
const listAllUsersController = new ListAllUsersController();
const deleteUserController = new DeleteUserController();

export function UserRoutes(app: FastifyInstance) {
  app.get("/", { preHandler: [Auth] }, getMyUserController.handle);

  app.get(
    "/all",
    { preHandler: [Auth, RBAC(["delete.user", "list.user.by.company.id"])] },
    listAllUsersController.handler
  );

  app.patch(
    "/:userId",
    { preHandler: [Auth, RBAC(["update.user"])] },
    updateUserController.handle
  );

  app.get(
    "/company/:companyId",
    { preHandler: [Auth, RBAC(["list.user.by.company.id"])] },
    listUserByCompanyIdController.handler
  );

  app.delete(
    "/:userId",
    { preHandler: [Auth, RBAC(["delete.user"])] },
    deleteUserController.handler
  );
}
