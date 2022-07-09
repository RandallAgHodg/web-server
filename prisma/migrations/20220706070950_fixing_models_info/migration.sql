/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "state" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "state" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "stock" SET DEFAULT 0,
ALTER COLUMN "state" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Provider" ALTER COLUMN "state" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "state" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Refund" ALTER COLUMN "state" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Sales" ALTER COLUMN "state" SET DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");
