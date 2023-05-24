/*
  Warnings:

  - Made the column `traineeId` on table `PDCcheckpoint` required. This step will fail if there are existing NULL values in that column.
  - Made the column `traineeId` on table `WOLcheckpoint` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PDCcheckpoint" DROP CONSTRAINT "PDCcheckpoint_traineeId_fkey";

-- DropForeignKey
ALTER TABLE "WOLcheckpoint" DROP CONSTRAINT "WOLcheckpoint_traineeId_fkey";

-- AlterTable
ALTER TABLE "PDCcheckpoint" ALTER COLUMN "traineeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "WOLcheckpoint" ALTER COLUMN "traineeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "WOLcheckpoint" ADD CONSTRAINT "WOLcheckpoint_traineeId_fkey" FOREIGN KEY ("traineeId") REFERENCES "Trainee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PDCcheckpoint" ADD CONSTRAINT "PDCcheckpoint_traineeId_fkey" FOREIGN KEY ("traineeId") REFERENCES "Trainee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
