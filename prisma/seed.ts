import { db } from "../src/lib/prisma";
import bcrypt from "bcrypt";
import "dotenv/config";

async function main() {
  // PERMISSIONS
  const permissions = [
    {
      name: "Admin",
      permissions: [
        "create.company",
        "list.company",
        "update.company",
        "set.user.company",
        "list.user.company",
        "update.user",
        "create.rotation",
        "list.rotations.assigned.to.me",
        "list.rotations.created.by.me",
        "delete.rotation",
        "create.task",
        "delete.task",
        "get.task.by.id",
        "update.task",
        "list.task",
        "create.rotation.stop",
        "update.rotation",
        "list.rotation.stop",
        "list.task.by.rotation.stop.id",
        "create.client",
        "create.check.in",
        "get.client",
        "create.check.out",
        "list.client.service",
        "list.service.assessment.user",
        "list.service.assessment.client",
        "list.service.assessment.company",
        "get.service.assessment",
        "get.form.response",
        "get.form",
        "delete.form",
        "create.form.entry",
        "create.form",
        "list.form.company",
        "list.form.entry.company",
        "list.form.entry.user",
        "create.occurrence",
        "get.occurrence",
        "list.occurrence",
        "update.client",
        "delete.client",
        "list.user.by.company.id",
        "delete.user",
      ],
    },
    {
      name: "Manager", // Gestor
      permissions: [
        "list.rotations.created.by.me",
        "update.user",
        "delete.rotation",
        "create.task",
        "delete.task",
        "get.task.by.id",
        "update.task",
        "list.task",
        "create.rotation.stop",
        "update.rotation",
        "list.rotation.stop",
        "list.task.by.rotation.stop.id",
        "create.client",
        "create.check.in",
        "create.check.out",
        "list.occurrence",
        "get.occurrence",
        "create.occurrence",
        "update.client",
        "delete.client",
        "list.user.by.company.id",
        "delete.user",
        "create.form",
        "list.form.company",
        "delete.form",
        "get.form",
        "get.form.response",
        "create.client",
        "update.client",
        "get.client",
        "list.client.service",
        "get.client",
        "delete.client",
        "list.form.entry.company",
        "list.form.entry.user",
      ],
    },
    {
      name: "Employee", // Empregado
      permissions: [
        "list.rotations.assigned.to.me",
        "create.check.in",
        "create.check.out",
        "create.occurrence",
      ],
    },
  ];

  let permissionAdminId: string;

  for (const perm of permissions) {
    const existingPermission = await db.permission.findUnique({
      where: { name: perm.name },
    });

    if (!existingPermission) {
      const permissionCreated = await db.permission.create({
        data: {
          name: perm.name,
          permissions: perm.permissions,
        },
      });

      if (perm.name === "Admin") {
        permissionAdminId = permissionCreated.id;
      }
    }
  }
  //----------
  // USER
  const USER_ROOT_PASSWORD = process.env.USER_ROOT_PASSWORD;
  const USER_ROOT_NAME = process.env.USER_ROOT_NAME;
  const USER_ROOT_EMAIL = process.env.USER_ROOT_EMAIL;

  if (!USER_ROOT_PASSWORD || !USER_ROOT_NAME || !USER_ROOT_EMAIL) {
    throw new Error("please set credentials user root in .env");
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(USER_ROOT_PASSWORD, saltRounds);

  const user = await db.user.create({
    data: {
      name: USER_ROOT_NAME,
      email: USER_ROOT_EMAIL,
      password: passwordHash,
      type: "ADMIN",
    },
  });

  //----

  // USER PERMISSIONS
  await db.userPermission.create({
    data: {
      userId: user.id,
      permissionId: permissionAdminId!,
    },
  });

  // COMPANY
  const company = await db.company.create({
    data: {
      name: "POP SALES",
    },
  });

  // USER COMPANY
  await db.userCompany.create({
    data: {
      companyId: company.id,
      userId: user.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
