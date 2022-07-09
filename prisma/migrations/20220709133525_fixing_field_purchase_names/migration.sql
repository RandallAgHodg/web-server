/*
  Warnings:

  - You are about to drop the column `aamount` on the `DetailPurchase` table. All the data in the column will be lost.
  - Added the required column `amount` to the `DetailPurchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DetailPurchase" DROP COLUMN "aamount",
ADD COLUMN     "amount" INTEGER NOT NULL;
