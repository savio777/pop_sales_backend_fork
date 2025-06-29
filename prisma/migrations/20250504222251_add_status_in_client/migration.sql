-- CreateEnum
CREATE TYPE "StatusClient" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "status" "StatusClient" NOT NULL DEFAULT 'ACTIVE';
