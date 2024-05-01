/*
  Warnings:

  - You are about to drop the `Mecanica` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Spare" ALTER COLUMN "image" DROP NOT NULL;

-- DropTable
DROP TABLE "Mecanica";

-- CreateTable
CREATE TABLE "Workshop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Workshop_pkey" PRIMARY KEY ("id")
);
