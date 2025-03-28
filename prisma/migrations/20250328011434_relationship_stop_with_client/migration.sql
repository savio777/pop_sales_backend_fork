/*
  Warnings:

  - You are about to drop the column `address` on the `Stop` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `Stop` table. All the data in the column will be lost.
  - You are about to drop the column `lon` on the `Stop` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Stop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stop" DROP COLUMN "address",
DROP COLUMN "lat",
DROP COLUMN "lon",
ADD COLUMN     "clientId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Stop" ADD CONSTRAINT "Stop_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
