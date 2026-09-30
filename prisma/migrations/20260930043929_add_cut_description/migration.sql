-- AlterTable
ALTER TABLE "CutName" ADD COLUMN     "description" TEXT,
ADD COLUMN     "normalizedDescription" TEXT;

-- CreateIndex
CREATE INDEX "CutName_languageCode_normalizedDescription_idx" ON "CutName"("languageCode", "normalizedDescription");
