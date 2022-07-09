/*
  Warnings:

  - You are about to drop the column `aamount` on the `DetailSales` table. All the data in the column will be lost.
  - You are about to drop the column `saledId` on the `DetailSales` table. All the data in the column will be lost.
  - Added the required column `amount` to the `DetailSales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saleId` to the `DetailSales` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DetailSales" DROP CONSTRAINT "DetailSales_saledId_fkey";

-- AlterTable
ALTER TABLE "DetailSales" DROP COLUMN "aamount",
DROP COLUMN "saledId",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "saleId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "DetailSales" ADD CONSTRAINT "DetailSales_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;
