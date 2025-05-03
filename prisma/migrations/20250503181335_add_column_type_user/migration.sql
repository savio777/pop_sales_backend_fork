-- CreateEnum
CREATE TYPE "TypeUser" AS ENUM ('ADMIN', 'EMPLOYEE', 'MANAGER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "TypeUser" NOT NULL DEFAULT 'EMPLOYEE';
