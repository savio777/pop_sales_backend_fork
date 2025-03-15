-- CreateTable
CREATE TABLE "Rotation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "assignedToId" TEXT NOT NULL,

    CONSTRAINT "Rotation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RotationStop" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "rotationId" TEXT NOT NULL,

    CONSTRAINT "RotationStop_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rotation" ADD CONSTRAINT "Rotation_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rotation" ADD CONSTRAINT "Rotation_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RotationStop" ADD CONSTRAINT "RotationStop_rotationId_fkey" FOREIGN KEY ("rotationId") REFERENCES "Rotation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
