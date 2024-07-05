/*
  Warnings:

  - You are about to drop the column `brand` on the `Bonus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bonus" DROP COLUMN "brand",
ADD COLUMN     "brands" TEXT[];
