/*
  Warnings:

  - Added the required column `coloe` to the `Shape` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shape" ADD COLUMN     "coloe" TEXT NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;
