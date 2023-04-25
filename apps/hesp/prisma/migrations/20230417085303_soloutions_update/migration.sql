-- DropForeignKey
ALTER TABLE "Soloutions" DROP CONSTRAINT "Soloutions_id_fkey";

-- AlterTable
ALTER TABLE "Soloutions" ADD COLUMN     "providedID" INTEGER;

-- AddForeignKey
ALTER TABLE "Soloutions" ADD CONSTRAINT "Soloutions_providedID_fkey" FOREIGN KEY ("providedID") REFERENCES "ProvidedSoloutions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
