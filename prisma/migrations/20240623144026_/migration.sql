/*
  Warnings:

  - A unique constraint covering the columns `[mecanicId]` on the table `Contract` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Contract_mecanicId_key" ON "Contract"("mecanicId");

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_mecanicId_fkey" FOREIGN KEY ("mecanicId") REFERENCES "Workshop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
