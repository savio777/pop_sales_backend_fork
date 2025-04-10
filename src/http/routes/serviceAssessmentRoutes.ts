import { FastifyInstance } from "fastify";
import { Auth } from "../middleware/auth";
import { CreateServiceAssessmentController } from "../controller/serviceAssessment/createServiceAssessmentController";
import { ListByUserServiceAssessmentController } from "../controller/serviceAssessment/listByUserServiceAssessmentController";
import { ListByClientServiceAssessmentController } from "../controller/serviceAssessment/listByClientServiceAssessmentController";
import { ListByCompanyServiceAssessmentController } from "../controller/serviceAssessment/listByCompanyServiceAssessmentController";
import { GetByIdServiceAssessmentController } from "../controller/serviceAssessment/getByIdServiceAssessmentController";
import { RBAC } from "../middleware/rbac";

const createServiceAssessmentController = new CreateServiceAssessmentController()
const listByUserServiceAssessmentController = new ListByUserServiceAssessmentController()
const listByClientServiceAssessmentControllerr = new ListByClientServiceAssessmentController()
const listByCompanyServiceAssessmentController = new ListByCompanyServiceAssessmentController()
const getByIdServiceAssessmentController = new GetByIdServiceAssessmentController()

export async function ServiceAssessmentRoutes(app: FastifyInstance) {
  app.post( // rota publica
    "/", createServiceAssessmentController.handle
  );
  app.get(
    "/user/:userId", 
    {preHandler: [Auth, RBAC(["list.service.assessment.user"])]}, 
    listByUserServiceAssessmentController.handle
  );
  app.get(
    "/client/:clientId", 
    {preHandler: [Auth, RBAC(["list.service.assessment.client"])]}, 
    listByClientServiceAssessmentControllerr.handle
  );
  app.get(
    "/company/:companyId", 
    {preHandler: [Auth, RBAC(["list.service.assessment.company"])]}, 
    listByCompanyServiceAssessmentController.handle
  );
  app.get(
    "/:assessmentId", 
    {preHandler: [Auth, RBAC(["get.service.assessment"])]}, 
    getByIdServiceAssessmentController.handle
  )
}