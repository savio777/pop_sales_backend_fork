import {db} from "../src/lib/prisma"

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
        "create.user.module",
        "remove.user.module",
        "list.user.module",
        "list.modules",
        "create.modules"
      ]
    },
  ];  
  
  for (const perm of permissions) {
    await db.permission.create({
      data: perm
    });
  }

  // USER
  const user = await db.user.create({
    data: {
      name: "ADMIN",
      email: "admin@admin.com",
      password: "admin",
    }
  })

  // COMPANY
  const company = await db.company.create({
    data: {
      name: "POP SALES",
      ownerId: user.id
    }
  })

  // MODULES
  const modules = [
    "Promotor",
    "Vendedor",
    "Entregador",
    "Cobrandor"
  ]

  for (const module of modules) {
    const moduleCreate = await db.module.create({
      data: {
        name: module,
        companyId: company.id,
      },

    });

    // USER MODULES
    await db.userModule.create({
      data: {
        moduleId: moduleCreate.id,
        userId: user.id
      }
    })
      
  }

  // USER COMPANY
  await db.userCompany.create({
    data: {
      companyId: company.id,
      userId: user.id
    }
  })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
