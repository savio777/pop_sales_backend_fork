import { ForbiddenError } from "@/error/forbiddenError.error";
import { FastifyReply, FastifyRequest } from "fastify";

export function RBAC(roles: string[]) {
  return async (req: FastifyRequest, _res: FastifyReply) => {
    if (!req.userAuth?.Permission) {
      throw new ForbiddenError("You do not have permission to access this endpoint.");
    }

    const hasPermission = req.userAuth.Permission.some((perm) =>
      roles.some((role) => perm.permissions.includes(role))
    );

    if (!hasPermission) {
      throw new ForbiddenError("Access denied. Insufficient permission.");
    }
  };
}
