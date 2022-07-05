-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Order_status" AS ENUM ('PENDING', 'CLOMPETE', 'FAILED');

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "cellphone" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "role" "Role" NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "enterprise_name" TEXT NOT NULL,
    "cellphone" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT false,
    "employeeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provider" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "enterprise_name" TEXT NOT NULL,
    "cellphone" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT false,
    "providerId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT false,
    "order_status" "Order_status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "detail" JSONB NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Refund" (
    "id" SERIAL NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT false,
    "order_status" "Order_status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "detail" JSONB NOT NULL,

    CONSTRAINT "Refund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sales" (
    "id" SERIAL NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT false,
    "order_status" "Order_status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "detail" JSONB NOT NULL,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_employeeId_key" ON "Client"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_providerId_key" ON "Product"("providerId");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
