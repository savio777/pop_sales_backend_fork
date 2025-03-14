-- DropForeignKey
ALTER TABLE "RotationStop" DROP CONSTRAINT "RotationStop_rotationId_fkey";

-- AlterTable
ALTER TABLE "RotationStop" ALTER COLUMN "rotationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "RotationStop" ADD CONSTRAINT "RotationStop_rotationId_fkey" FOREIGN KEY ("rotationId") REFERENCES "Rotation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
