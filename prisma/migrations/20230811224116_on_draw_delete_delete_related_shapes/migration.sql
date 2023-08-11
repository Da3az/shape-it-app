/*
  Warnings:

  - You are about to drop the column `userId` on the `Shape` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Shape" DROP CONSTRAINT "Shape_drawId_fkey";

-- AlterTable
ALTER TABLE "Shape" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "Shape" ADD CONSTRAINT "Shape_drawId_fkey" FOREIGN KEY ("drawId") REFERENCES "Draw"("id") ON DELETE CASCADE ON UPDATE CASCADE;
