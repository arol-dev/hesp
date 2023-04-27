-- DropForeignKey
ALTER TABLE "WOLcheckpoint" DROP CONSTRAINT "WOLcheckpoint_relatedUser_fkey";

-- AlterTable
ALTER TABLE "WOLcheckpoint" ALTER COLUMN "relatedUser" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "WOLcheckpoint" ADD CONSTRAINT "WOLcheckpoint_relatedUser_fkey" FOREIGN KEY ("relatedUser") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
