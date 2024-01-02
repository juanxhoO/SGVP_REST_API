-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'MECHANIC', 'TECHNIC1', 'TECHNIC2', 'ADMIN');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('BIKE');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('ACCESS', 'REFRESH', 'RESET_PASSWORD', 'VERIFY_EMAIL');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "VehicleType"[],

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reportes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Reportes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "informe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "informe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Circuito" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Circuito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subcircuito" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Subcircuito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provincia" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Provincia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ordenes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Ordenes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manteniminto" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Manteniminto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "blacklisted" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
