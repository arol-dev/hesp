/*
  Warnings:

  - You are about to drop the column `relatedUser` on the `WOLcheckpoint` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "WOLcheckpoint" DROP CONSTRAINT "WOLcheckpoint_relatedUser_fkey";

-- AlterTable
ALTER TABLE "WOLcheckpoint" DROP COLUMN "relatedUser",
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "WOLcheckpoint" ADD CONSTRAINT "WOLcheckpoint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
