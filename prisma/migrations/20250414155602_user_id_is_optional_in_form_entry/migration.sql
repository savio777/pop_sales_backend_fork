-- DropForeignKey
ALTER TABLE "FormEntry" DROP CONSTRAINT "FormEntry_userId_fkey";

-- AlterTable
ALTER TABLE "FormEntry" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "FormEntry" ADD CONSTRAINT "FormEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
