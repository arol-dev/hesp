-- DropForeignKey
ALTER TABLE "ProvidedSoloutions" DROP CONSTRAINT "ProvidedSoloutions_id_fkey";

-- AlterTable
ALTER TABLE "ProvidedSoloutions" ADD COLUMN     "traineeId" INTEGER;

-- AddForeignKey
ALTER TABLE "ProvidedSoloutions" ADD CONSTRAINT "ProvidedSoloutions_traineeId_fkey" FOREIGN KEY ("traineeId") REFERENCES "Trainee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
