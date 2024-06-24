/*
  Warnings:

  - A unique constraint covering the columns `[cityId]` on the table `Circuit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cityId` to the `Circuit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Circuit" ADD COLUMN     "cityId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "City" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "SubCircuit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "circuitId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubCircuit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubCircuit_circuitId_key" ON "SubCircuit"("circuitId");

-- CreateIndex
CREATE UNIQUE INDEX "Circuit_cityId_key" ON "Circuit"("cityId");

-- AddForeignKey
ALTER TABLE "Circuit" ADD CONSTRAINT "Circuit_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCircuit" ADD CONSTRAINT "SubCircuit_circuitId_fkey" FOREIGN KEY ("circuitId") REFERENCES "Circuit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
