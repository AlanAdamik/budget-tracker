-- AlterTable
ALTER TABLE "BankAccountLine" ADD COLUMN     "payeeId" TEXT;

-- AddForeignKey
ALTER TABLE "BankAccountLine" ADD CONSTRAINT "BankAccountLine_payeeId_fkey" FOREIGN KEY ("payeeId") REFERENCES "Payee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
