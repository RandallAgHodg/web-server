/*
  Warnings:

  - You are about to drop the column `clientId` on the `DetailSales` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clientId]` on the table `Sale` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[employeeId]` on the table `Sale` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clientId` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DetailSales" DROP CONSTRAINT "DetailSales_clientId_fkey";

-- AlterTable
ALTER TABLE "DetailSales" DROP COLUMN "clientId";

-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "clientId" INTEGER NOT NULL,
ADD COLUMN     "employeeId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Sale_clientId_key" ON "Sale"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_employeeId_key" ON "Sale"("employeeId");

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
