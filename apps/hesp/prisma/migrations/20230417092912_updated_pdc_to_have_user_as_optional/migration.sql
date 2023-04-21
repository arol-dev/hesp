-- DropForeignKey
ALTER TABLE "PDCcheckpoint" DROP CONSTRAINT "PDCcheckpoint_userId_fkey";

-- AlterTable
ALTER TABLE "PDCcheckpoint" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PDCcheckpoint" ADD CONSTRAINT "PDCcheckpoint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
