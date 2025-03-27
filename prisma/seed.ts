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
        "create.client"
      ]
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
        "create.client"
      ]
    },
    {
      name: "Employee", // Empregado
      permissions: [
        "list.rotations.assigned.to.me",
      ]
    },
    
  ];  

  let permissionAdminId: string
  
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

      if(perm.name === "Admin"){
        permissionAdminId = permissionCreated.id
      }
    }
  }
  //----------
  // USER
  const USER_ROOT_PASSWORD = process.env.USER_ROOT_PASSWORD
  const USER_ROOT_NAME = process.env.USER_ROOT_NAME
  const USER_ROOT_EMAIL = process.env.USER_ROOT_EMAIL

  if(!USER_ROOT_PASSWORD || !USER_ROOT_NAME || !USER_ROOT_EMAIL){
    throw new Error("please set credentials user root in .env")
  }

  const saltRounds = 10; 
  const passwordHash = await bcrypt.hash(USER_ROOT_PASSWORD, saltRounds);

 
  const user = await db.user.create({
    data: {
      name: USER_ROOT_NAME,
      email: USER_ROOT_EMAIL,
      password: passwordHash,
    }
  })
  
  //----

  // USER PERMISSIONS
  await db.userPermission.create({
    data: {
      userId: user.id,
      permissionId: permissionAdminId!
    }
  })

  // COMPANY
  const company = await db.company.create({
    data: {
      name: "POP SALES",
    }
  })

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
