/*
  Warnings:

  - You are about to drop the column `vehicletype` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "vehicletype",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
