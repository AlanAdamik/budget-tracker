/*
  Warnings:

  - You are about to drop the column `monthlyBudget` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "monthlyBudget";

-- CreateTable
CREATE TABLE "Budget" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryBudget" (
    "amount" DOUBLE PRECISION NOT NULL,
    "categoryId" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,

    CONSTRAINT "CategoryBudget_pkey" PRIMARY KEY ("categoryId","budgetId")
);

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryBudget" ADD CONSTRAINT "CategoryBudget_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryBudget" ADD CONSTRAINT "CategoryBudget_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;
