/*
  Warnings:

  - Added the required column `price` to the `Bonus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bonus" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
