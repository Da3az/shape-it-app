-- AlterTable
ALTER TABLE "Shape" ADD COLUMN     "drawId" TEXT;

-- CreateTable
CREATE TABLE "Draw" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Draw_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Shape" ADD CONSTRAINT "Shape_drawId_fkey" FOREIGN KEY ("drawId") REFERENCES "Draw"("id") ON DELETE SET NULL ON UPDATE CASCADE;
