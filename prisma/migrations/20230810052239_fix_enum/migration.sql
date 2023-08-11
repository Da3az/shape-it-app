/*
  Warnings:

  - Changed the type of `size` on the `Shape` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ShapeSize" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- AlterTable
ALTER TABLE "Shape" DROP COLUMN "size",
ADD COLUMN     "size" "ShapeSize" NOT NULL;

-- DropEnum
DROP TYPE "Size";
