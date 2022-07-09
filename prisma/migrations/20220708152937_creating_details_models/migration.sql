/*
  Warnings:

  - You are about to drop the column `detail` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `order_status` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the `Refund` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sales` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `saleId` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "saleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "detail",
DROP COLUMN "order_status";

-- DropTable
DROP TABLE "Refund";

-- DropTable
DROP TABLE "Sales";

-- DropEnum
DROP TYPE "Order_status";

-- CreateTable
CREATE TABLE "DetailPurchase" (
    "id" SERIAL NOT NULL,
    "aamount" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "state" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "productId" INTEGER NOT NULL,
    "providerId" INTEGER NOT NULL,
    "purchaseId" INTEGER NOT NULL,

    CONSTRAINT "DetailPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailSales" (
    "id" SERIAL NOT NULL,
    "aamount" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "state" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "productId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "saledId" INTEGER NOT NULL,

    CONSTRAINT "DetailSales_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DetailPurchase" ADD CONSTRAINT "DetailPurchase_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailPurchase" ADD CONSTRAINT "DetailPurchase_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailPurchase" ADD CONSTRAINT "DetailPurchase_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailSales" ADD CONSTRAINT "DetailSales_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailSales" ADD CONSTRAINT "DetailSales_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailSales" ADD CONSTRAINT "DetailSales_saledId_fkey" FOREIGN KEY ("saledId") REFERENCES "Sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;
