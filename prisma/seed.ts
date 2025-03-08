import {db} from "../src/lib/prisma"

async function main() {
  // Criando permissões básicas
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
        "list.user.module"
      ]
    },
    // { 
    //   name: 'DeliveryPerson',
    //   permissions: [
    //     'get:routes:view',
    //     'post:deliveries:create'
    //   ]
    // },
    // { 
    //   name: 'Salesperson', 
    //   permissions: [
    //     'post:sales:create', 
    //     'get:customers:view'
    //   ]
    // },
    // { 
    //   name: 'Promoter', 
    //   permissions: [
    //     'get:products:view',
    //     'post:brands:promote'
    //   ]
    // },
  ];  
  
  for (const perm of permissions) {
    await db.permission.create({
      data: perm
    });
  }

  const modules = [
    {name: "Promotor"}, 
    {name: "Vendedor"}, 
    {name: "Entregador"}, 
    {name: "Cobrandor"}
  ]

  for (const module of modules) {
    await db.module.create({
      data: module
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
