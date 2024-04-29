/*
  Warnings:

  - You are about to drop the column `type` on the `Circuito` table. All the data in the column will be lost.
  - You are about to drop the `Ordenes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Provincia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reportes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subcircuito` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `informe` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdAt` to the `Circuito` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Circuito` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_card` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `charge_capacity` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chasis` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `engine_cc` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `engine_type` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `images` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mileage` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occupants` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plate` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Circuito" DROP COLUMN "type",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthdate" TIMESTAMP(3),
ADD COLUMN     "bloodType" TEXT,
ADD COLUMN     "id_card" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT,
ADD COLUMN     "phone" TEXT;

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "charge_capacity" INTEGER NOT NULL,
ADD COLUMN     "chasis" TEXT NOT NULL,
ADD COLUMN     "engine_cc" INTEGER NOT NULL,
ADD COLUMN     "engine_type" TEXT NOT NULL,
ADD COLUMN     "images" TEXT NOT NULL,
ADD COLUMN     "mileage" INTEGER NOT NULL,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "occupants" INTEGER NOT NULL,
ADD COLUMN     "plate" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Ordenes";

-- DropTable
DROP TABLE "Provincia";

-- DropTable
DROP TABLE "Reportes";

-- DropTable
DROP TABLE "Subcircuito";

-- DropTable
DROP TABLE "informe";

-- CreateTable
CREATE TABLE "Range" (
    "id" TEXT NOT NULL,
    "range" TEXT NOT NULL,

    CONSTRAINT "Range_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "files" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mecanica" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Mecanica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parroquia" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Parroquia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repuesto" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "condition" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,

    CONSTRAINT "Repuesto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
