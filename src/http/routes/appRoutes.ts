import { FastifyInstance } from "fastify";
import { AuthRoutes } from "./authRoute";
import { CompanyRoutes } from "./companyRoutes";
import { UserCompanyRoutes } from "./userCompanyRoutes";
import { UserRoutes } from "./userRoutes";
import { RotationRoutes } from "./rotatationRoutes";
import { TaskRoutes } from "./taskRoutes";
import { StopRoutes } from "./stopRoutes";
import { ClientRoutes } from "./clientRoutes";
import { CheckInRoutes } from "./checkInRoutes";
import { CheckOutRoutes } from "./checkOutRoutes";
import { UserRotationRoutes } from "./userRotationRoutes";
import { MetricsRoutes } from "./metricsRoutes";
import { ServiceAssessmentRoutes } from "./serviceAssessmentRoutes";

export function AppRoutes(app: FastifyInstance){
  app.register(AuthRoutes, {prefix: "/auth"})
  app.register(CompanyRoutes, {prefix: "/company"})
  app.register(UserRoutes, {prefix: "/user"})
  app.register(UserCompanyRoutes, {prefix: "/user-company"})
  app.register(RotationRoutes, {prefix: "/rotation"})
  app.register(TaskRoutes, {prefix: "/task"})
  app.register(StopRoutes, {prefix: "/stop"})
  app.register(ClientRoutes, {prefix: "/client"})
  app.register(CheckInRoutes, {prefix: "/check-in"})
  app.register(CheckOutRoutes, {prefix: "/check-out"})
  app.register(UserRotationRoutes, {prefix: "/user-rotation"})
  app.register(MetricsRoutes, {prefix: "/metrics"})
  app.register(ServiceAssessmentRoutes, {prefix: "/service-assessment"})
}