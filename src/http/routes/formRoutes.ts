import { FastifyInstance } from "fastify"
import { CreateFormController } from "../controller/form/createFormController"
import { CreateFormEntryController } from "../controller/form/createFormEntryController"
import { DeleteFormController } from "../controller/form/deleteFormController"
import { GetFormByIdController } from "../controller/form/getFormByIdController"
import { GetFormEntryByIdController } from "../controller/form/getFormEntryByIdController"
import { Auth } from "../middleware/auth"
import { RBAC } from "../middleware/rbac"
import { ListFormByCompanyIdController } from "../controller/form/listFormByCompanyIdController"
import { ListFormEntryByUserIdController } from "../controller/form/ListFormEntryByUserIdController"
import { ListEntryByFormIdController } from "../controller/form/listEntryByFormIdController"
import { UpdateFormController } from "../controller/form/updateFormController"

const createFormController = new CreateFormController()
const createFormEntryController = new CreateFormEntryController()
const deleteFormController = new DeleteFormController()
const getFormByIdController = new GetFormByIdController()
const getFormEntryByIdController = new GetFormEntryByIdController()
const listFormByCompanyIdController = new ListFormByCompanyIdController()
const listEntryByFormIdController = new ListEntryByFormIdController()
const listFormEntryByUserIdController = new ListFormEntryByUserIdController()
const updateFormController = new UpdateFormController()

export function FormRoutes(app: FastifyInstance) {
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

  app.get(
    '/entries/user/:userId', 
    {preHandler: [Auth, RBAC(["list.form.entry.user"])]},
    listFormEntryByUserIdController.handle
  );

  //atualizar formulário
  app.put( 
    '/:formId/company/:companyId', 
    {preHandler: [Auth, RBAC(["update.form"])]},
    updateFormController.handle
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

  //deleta formulário
  app.delete(
    '/:formId', 
    {preHandler: [Auth, RBAC(["delete.form"])]},
    deleteFormController.handle
  );

  //cria formulário
  app.post( 
    '/', 
    {preHandler: [Auth, RBAC(["create.form"])]},
    createFormController.handle
  );  
}