/*
  Warnings:

  - You are about to drop the column `userId` on the `PDCcheckpoint` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Trainee` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `WOLcheckpoint` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PDCcheckpoint" DROP CONSTRAINT "PDCcheckpoint_userId_fkey";

-- DropForeignKey
ALTER TABLE "Trainee" DROP CONSTRAINT "Trainee_userId_fkey";

-- DropForeignKey
ALTER TABLE "WOLcheckpoint" DROP CONSTRAINT "WOLcheckpoint_userId_fkey";

-- AlterTable
ALTER TABLE "PDCcheckpoint" DROP COLUMN "userId",
ADD COLUMN     "traineeId" INTEGER;

-- AlterTable
ALTER TABLE "Trainee" DROP COLUMN "userId",
ADD COLUMN     "coachId" INTEGER;

-- AlterTable
ALTER TABLE "WOLcheckpoint" DROP COLUMN "userId",
ADD COLUMN     "traineeId" INTEGER;

-- AddForeignKey
ALTER TABLE "WOLcheckpoint" ADD CONSTRAINT "WOLcheckpoint_traineeId_fkey" FOREIGN KEY ("traineeId") REFERENCES "Trainee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PDCcheckpoint" ADD CONSTRAINT "PDCcheckpoint_traineeId_fkey" FOREIGN KEY ("traineeId") REFERENCES "Trainee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trainee" ADD CONSTRAINT "Trainee_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
