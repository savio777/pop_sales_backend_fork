import {db} from "../src/lib/prisma"
import bcrypt from 'bcrypt';
import "dotenv/config"

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

  let permissionAdminId: string
  
  for (const perm of permissions) {
    const permission = await db.permission.create({
      data: perm
    });

    if(perm.name === "Admin"){
      permissionAdminId = permission.id
    }
  }

  const USER_ROOT_PASSWORD = process.env.USER_ROOT_PASSWORD
  const USER_ROOT_NAME = process.env.USER_ROOT_NAME
  const USER_ROOT_EMAIL = process.env.USER_ROOT_EMAIL

  if(!USER_ROOT_PASSWORD || !USER_ROOT_NAME || !USER_ROOT_EMAIL){
    throw new Error("please set credentials user root in .env")
  }

  const saltRounds = 10; 
  const passwordHash = await bcrypt.hash(USER_ROOT_PASSWORD, saltRounds);

  // USER
  const user = await db.user.create({
    data: {
      name: USER_ROOT_NAME,
      email: USER_ROOT_EMAIL,
      password: passwordHash,
    }
  })

  // USER PERMISSIONS
  await db.user.update({
    where: {
      id: user.id
    },
    data: {
      Permission: {
        connect: {
          id: permissionAdminId!
        }
      }
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
    "Cobrandor",
    "Gestor"
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
