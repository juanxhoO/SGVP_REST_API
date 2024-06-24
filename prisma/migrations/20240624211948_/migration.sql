/*
  Warnings:

  - Added the required column `maintenanceDay` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "maintenanceDay" TIMESTAMP(3) NOT NULL;
