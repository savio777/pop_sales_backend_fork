/*
  Warnings:

  - You are about to drop the column `formId` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `formType` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the `Form` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `formEntryId` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formTemplateId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_formId_fkey";

-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_userId_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "formId",
ADD COLUMN     "formEntryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "formType",
ADD COLUMN     "formTemplateId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Form";

-- CreateTable
CREATE TABLE "FormTemplate" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "formType" "FormType" NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "FormTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormEntry" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taskId" TEXT,
    "userId" TEXT NOT NULL,
    "formTemplateId" TEXT NOT NULL,
    "companyId" TEXT,

    CONSTRAINT "FormEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FormTemplate" ADD CONSTRAINT "FormTemplate_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_formTemplateId_fkey" FOREIGN KEY ("formTemplateId") REFERENCES "FormTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormEntry" ADD CONSTRAINT "FormEntry_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormEntry" ADD CONSTRAINT "FormEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormEntry" ADD CONSTRAINT "FormEntry_formTemplateId_fkey" FOREIGN KEY ("formTemplateId") REFERENCES "FormTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormEntry" ADD CONSTRAINT "FormEntry_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_formEntryId_fkey" FOREIGN KEY ("formEntryId") REFERENCES "FormEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
