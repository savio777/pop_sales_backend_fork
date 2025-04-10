/*
  Warnings:

  - The `serviceDuration` column on the `CheckinCheckout` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CheckinCheckout" DROP COLUMN "serviceDuration",
ADD COLUMN     "serviceDuration" INTEGER;
