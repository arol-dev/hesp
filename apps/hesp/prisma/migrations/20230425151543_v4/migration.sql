-- DropForeignKey
ALTER TABLE "PDCcheckpoint" DROP CONSTRAINT "PDCcheckpoint_noteId_fkey";

-- AlterTable
ALTER TABLE "SessionNotes" ADD COLUMN     "checkpointId" INTEGER;

-- AddForeignKey
ALTER TABLE "SessionNotes" ADD CONSTRAINT "SessionNotes_checkpointId_fkey" FOREIGN KEY ("checkpointId") REFERENCES "PDCcheckpoint"("id") ON DELETE SET NULL ON UPDATE CASCADE;
