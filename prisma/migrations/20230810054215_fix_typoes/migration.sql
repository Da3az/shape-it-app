/*
  Warnings:

  - You are about to drop the column `coloe` on the `Shape` table. All the data in the column will be lost.
  - Added the required column `color` to the `Shape` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shape" DROP COLUMN "coloe",
ADD COLUMN     "color" TEXT NOT NULL;
