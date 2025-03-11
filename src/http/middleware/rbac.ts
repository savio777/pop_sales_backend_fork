import { ForbiddenError } from "@/error/forbiddenError.error";
import { FastifyReply, FastifyRequest } from "fastify";

export function RBAC(roles: string[]) {
  return async (req: FastifyRequest, _res: FastifyReply) => {
    if (!req.userAuth?.Permission) {
      throw new ForbiddenError("You do not have permission to access this endpoint.");
    }

    const allPermissions = req.userAuth.Permission.flatMap(perm => perm.permissions);

    const hasPermission = allPermissions.every(permission => 
      roles.includes(permission)
    );
    
    if (!hasPermission) {
      throw new ForbiddenError("Access denied. Insufficient permission.");
    }
  };

}
