-- CreateEnum
CREATE TYPE "StatusCompany" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "status" "StatusCompany" NOT NULL DEFAULT 'ACTIVE';
