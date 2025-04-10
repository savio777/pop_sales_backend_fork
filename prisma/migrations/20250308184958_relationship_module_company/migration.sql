-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "companyId" TEXT;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
