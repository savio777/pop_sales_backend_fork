-- AlterTable
ALTER TABLE "Rotation" ADD COLUMN     "companyId" TEXT;

-- AddForeignKey
ALTER TABLE "Rotation" ADD CONSTRAINT "Rotation_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
