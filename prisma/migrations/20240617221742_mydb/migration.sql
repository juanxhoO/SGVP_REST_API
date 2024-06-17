/*
  Warnings:

  - You are about to drop the column `name` on the `Order` table. All the data in the column will be lost.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('ACCEPTED', 'CANCELLED', 'PENDANT');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "name",
ADD COLUMN     "observations" TEXT,
ADD COLUMN     "status" "OrderStatus" NOT NULL,
ADD COLUMN     "vehicleId" TEXT NOT NULL,
ALTER COLUMN "mecanicId" DROP NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
