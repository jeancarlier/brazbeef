-- CreateTable
CREATE TABLE "Language" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Region" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Cut" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cut_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CutName" (
    "id" TEXT NOT NULL,
    "cutId" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "regionCode" TEXT,
    "name" TEXT NOT NULL,
    "normalizedName" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT true,
    "approximate" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CutName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hotspot" (
    "id" TEXT NOT NULL,
    "cutId" TEXT NOT NULL,
    "shape" TEXT NOT NULL DEFAULT 'rect',
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Hotspot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cut_slug_key" ON "Cut"("slug");

-- CreateIndex
CREATE INDEX "CutName_languageCode_normalizedName_idx" ON "CutName"("languageCode", "normalizedName");

-- CreateIndex
CREATE UNIQUE INDEX "CutName_cutId_languageCode_regionCode_name_key" ON "CutName"("cutId", "languageCode", "regionCode", "name");

-- CreateIndex
CREATE INDEX "Hotspot_cutId_idx" ON "Hotspot"("cutId");

-- AddForeignKey
ALTER TABLE "CutName" ADD CONSTRAINT "CutName_cutId_fkey" FOREIGN KEY ("cutId") REFERENCES "Cut"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CutName" ADD CONSTRAINT "CutName_languageCode_fkey" FOREIGN KEY ("languageCode") REFERENCES "Language"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CutName" ADD CONSTRAINT "CutName_regionCode_fkey" FOREIGN KEY ("regionCode") REFERENCES "Region"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hotspot" ADD CONSTRAINT "Hotspot_cutId_fkey" FOREIGN KEY ("cutId") REFERENCES "Cut"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
