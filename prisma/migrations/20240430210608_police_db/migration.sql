-- AlterTable
ALTER TABLE "Vehicle" ALTER COLUMN "images" DROP NOT NULL,
ALTER COLUMN "engine_cc" DROP NOT NULL,
ALTER COLUMN "engine" DROP NOT NULL,
ALTER COLUMN "carringcapacity" DROP NOT NULL,
ALTER COLUMN "passengers" DROP NOT NULL;