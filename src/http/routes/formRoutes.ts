import { FastifyInstance } from "fastify"
import { CreateFormController } from "../controller/form/createFormController"
import { CreateFormEntryController } from "../controller/form/createFormEntryController"
import { DeleteFormController } from "../controller/form/deleteFormController"
import { GetFormByIdController } from "../controller/form/getFormByIdController"
import { GetFormEntryByIdController } from "../controller/form/getFormEntryByIdController"
import { Auth } from "../middleware/auth"
import { RBAC } from "../middleware/rbac"
import { ListFormByCompanyIdController } from "../controller/form/listFormByCompanyIdController"
import { ListEntryByFormIdController } from "../controller/form/ListEntryByFormIdController"

const createFormController = new CreateFormController()
const createFormEntryController = new CreateFormEntryController()
const deleteFormController = new DeleteFormController()
const getFormByIdController = new GetFormByIdController()
const getFormEntryByIdController = new GetFormEntryByIdController()
const listFormByCompanyIdController = new ListFormByCompanyIdController()
const listEntryByFormIdController = new ListEntryByFormIdController()

export function FormRoutes(app: FastifyInstance) {
  //cria formulário
  app.post( 
    '/', 
    {preHandler: [Auth, RBAC(["create.form"])]},
    createFormController.handle
  );

  //cria resposta ao formulário
  app.post( 
    '/entry', 
    {preHandler: [Auth, RBAC(["create.form.entry"])]},
    createFormEntryController.handle
  );

  // pega formulário
  app.get('/:formId', 
    {preHandler: [Auth, RBAC(["get.form"])]},
    getFormByIdController.handle
  );

  //pega resposta ao formulário completa (perguntas e respostas)
  app.get(
    '/entry/:entryId', 
    {preHandler: [Auth, RBAC(["get.form.response"])]},
    getFormEntryByIdController.handle
  );

  //lista formulários de uma empresa
  app.get(
    '/company/:companyId', 
    {preHandler: [Auth, RBAC(["list.form.company"])]},
    listFormByCompanyIdController.handle
  );

  //lista respostas de um formulários
  app.get(
    '/entries/:formId', 
    {preHandler: [Auth, RBAC(["list.form.entry.company"])]},
    listEntryByFormIdController.handle
  );

  //deleta formulário
  app.delete(
    '/:formId', 
    {preHandler: [Auth, RBAC(["delete.form"])]},
    deleteFormController.handle
  );
}