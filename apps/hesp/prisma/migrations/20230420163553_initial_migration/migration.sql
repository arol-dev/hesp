/*
  Warnings:

  - You are about to drop the column `traineeId` on the `ProvidedSoloutions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProvidedSoloutions" DROP CONSTRAINT "ProvidedSoloutions_traineeId_fkey";

-- AlterTable
ALTER TABLE "ProvidedSoloutions" DROP COLUMN "traineeId";

-- AddForeignKey
ALTER TABLE "ProvidedSoloutions" ADD CONSTRAINT "ProvidedSoloutions_id_fkey" FOREIGN KEY ("id") REFERENCES "Trainee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
