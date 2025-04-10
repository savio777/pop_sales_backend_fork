-- CreateTable
CREATE TABLE "ServiceAssessment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "ratingStars" INTEGER,
    "companyId" TEXT,
    "userId" TEXT,
    "clientId" TEXT,

    CONSTRAINT "ServiceAssessment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ServiceAssessment" ADD CONSTRAINT "ServiceAssessment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceAssessment" ADD CONSTRAINT "ServiceAssessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceAssessment" ADD CONSTRAINT "ServiceAssessment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
