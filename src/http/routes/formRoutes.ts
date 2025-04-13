import { FastifyInstance } from "fastify"
import { CreateFormController } from "../controller/form/createFormController"
import { CreateFormEntryController } from "../controller/form/createFormEntryController"
import { DeleteFormController } from "../controller/form/deleteFormController"
import { GetFormByIdController } from "../controller/form/getFormByIdController"
import { GetFormResponseBtIdController } from "../controller/form/getFormResponseByIdController"
import { Auth } from "../middleware/auth"
import { RBAC } from "../middleware/rbac"

const createFormController = new CreateFormController()
const createFormEntryController = new CreateFormEntryController()
const deleteFormController = new DeleteFormController()
const getFormByIdController = new GetFormByIdController()
const getFormResponseBtIdController = new GetFormResponseBtIdController()

export function FormRoutes(app: FastifyInstance) {
  app.post(
    '/', 
    {preHandler: [Auth, RBAC(["create.form"])]},
    createFormController.handle
  );
  app.post(
    '/entry', 
    {preHandler: [Auth, RBAC(["create.form.entry"])]},
    createFormEntryController.handle
  );
  app.delete(
    '/:formId', 
    {preHandler: [Auth, RBAC(["delete.form"])]},
    deleteFormController.handle
  );
  app.get('/:formId', 
    {preHandler: [Auth, RBAC(["get.form"])]},
    getFormByIdController.handle
  );
  app.get(
    '/response/:formResponseId', 
    {preHandler: [Auth, RBAC(["get.form.response"])]},
    getFormResponseBtIdController.handle
  );
}