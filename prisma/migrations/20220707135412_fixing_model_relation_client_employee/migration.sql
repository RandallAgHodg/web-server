/*
  Warnings:

  - You are about to drop the column `skeree` on the `Client` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Client_employeeId_key";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "skeree";
