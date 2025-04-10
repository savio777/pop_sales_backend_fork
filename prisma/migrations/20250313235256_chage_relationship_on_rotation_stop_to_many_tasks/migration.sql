/*
  Warnings:

  - You are about to drop the column `rotationId` on the `Task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_rotationId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "rotationId",
ADD COLUMN     "rotationStopId" TEXT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_rotationStopId_fkey" FOREIGN KEY ("rotationStopId") REFERENCES "RotationStop"("id") ON DELETE SET NULL ON UPDATE CASCADE;
