/*
  Warnings:

  - Added the required column `traineeId` to the `ProvidedSoloutions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProvidedSoloutions" DROP CONSTRAINT "ProvidedSoloutions_id_fkey";

-- AlterTable
ALTER TABLE "ProvidedSoloutions" ADD COLUMN     "traineeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ProvidedSoloutions" ADD CONSTRAINT "ProvidedSoloutions_traineeId_fkey" FOREIGN KEY ("traineeId") REFERENCES "Trainee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
