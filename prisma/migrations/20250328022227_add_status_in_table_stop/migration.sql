-- CreateEnum
CREATE TYPE "StatusStop" AS ENUM ('PENDING', 'COMPLETED');

-- AlterTable
ALTER TABLE "Stop" ADD COLUMN     "status" "StatusStop" NOT NULL DEFAULT 'PENDING';
