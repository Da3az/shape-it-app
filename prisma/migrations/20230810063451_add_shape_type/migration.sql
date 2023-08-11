/*
  Warnings:

  - Changed the type of `type` on the `Shape` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `size` on the `Shape` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ShapeSizeEnum" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- CreateEnum
CREATE TYPE "ShapeTypeEnum" AS ENUM ('STAR', 'CIRCLE', 'RECTANGLE');

-- AlterTable
ALTER TABLE "Shape" DROP COLUMN "type",
ADD COLUMN     "type" "ShapeTypeEnum" NOT NULL,
DROP COLUMN "size",
ADD COLUMN     "size" "ShapeSizeEnum" NOT NULL;

-- DropEnum
DROP TYPE "ShapeSize";
