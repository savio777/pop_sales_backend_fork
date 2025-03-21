/*
  Warnings:

  - You are about to drop the column `companyId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `UserTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_companyId_fkey";

-- DropForeignKey
ALTER TABLE "UserTask" DROP CONSTRAINT "UserTask_taskId_fkey";

-- DropForeignKey
ALTER TABLE "UserTask" DROP CONSTRAINT "UserTask_userId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "companyId",
ADD COLUMN     "stopId" TEXT;

-- DropTable
DROP TABLE "UserTask";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_stopId_fkey" FOREIGN KEY ("stopId") REFERENCES "Stop"("id") ON DELETE SET NULL ON UPDATE CASCADE;
