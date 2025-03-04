import {db} from "../src/lib/prisma"

async function main() {
  // Criando permissões básicas
  const permissions = [
    { name: 'Admin', permissions: ['all:all:all'] },
    { name: 'DeliveryPerson', permissions: ['get:routes:view', 'post:deliveries:create'] },
    { name: 'Salesperson', permissions: ['post:sales:create', 'get:customers:view'] },
    { name: 'Promoter', permissions: ['get:products:view', 'post:brands:promote'] },
  ];  
  
  for (const perm of permissions) {
    await db.permission.create({
      data: perm
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
