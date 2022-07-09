/*
  Warnings:

  - You are about to drop the column `amount` on the `DetailPurchase` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `DetailSales` table. All the data in the column will be lost.
  - Added the required column `ammount` to the `DetailPurchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ammount` to the `DetailSales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DetailPurchase" DROP COLUMN "amount",
ADD COLUMN     "ammount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "DetailSales" DROP COLUMN "amount",
ADD COLUMN     "ammount" INTEGER NOT NULL;
