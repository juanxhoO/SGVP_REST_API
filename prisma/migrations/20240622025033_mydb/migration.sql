/*
  Warnings:

  - Added the required column `rank` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "rank" "OfficeRank" NOT NULL;