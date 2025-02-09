/*
  Warnings:

  - The values [PENDING] on the enum `status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `companyId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "roles" AS ENUM ('ADMINISTRATOR', 'MANAGER', 'USER');

-- AlterEnum
BEGIN;
CREATE TYPE "status_new" AS ENUM ('BLOCKED', 'ASSIGNED', 'UNASSIGNED', 'TAKED', 'COMPLETED', 'FINISHED');
ALTER TABLE "Ticket" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Ticket" ALTER COLUMN "status" TYPE "status_new" USING ("status"::text::"status_new");
ALTER TYPE "status" RENAME TO "status_old";
ALTER TYPE "status_new" RENAME TO "status";
DROP TYPE "status_old";
ALTER TABLE "Ticket" ALTER COLUMN "status" SET DEFAULT 'BLOCKED';
COMMIT;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "companyId" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'BLOCKED';

-- CreateTable
CREATE TABLE "Company" (
    "company_id" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "acces_key" TEXT NOT NULL,
    "company_authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" SERIAL NOT NULL,
    "role" "roles" NOT NULL DEFAULT 'USER',
    "userId" INTEGER NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_company_authorId_key" ON "Company"("company_authorId");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_userId_companyId_key" ON "UserRole"("userId", "companyId");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_company_authorId_fkey" FOREIGN KEY ("company_authorId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;
