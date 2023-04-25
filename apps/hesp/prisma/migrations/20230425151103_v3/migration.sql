-- DropForeignKey
ALTER TABLE "PDCcheckpoint" DROP CONSTRAINT "PDCcheckpoint_noteId_fkey";

-- AlterTable
ALTER TABLE "PDCcheckpoint" ALTER COLUMN "noteId" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "SessionNotes" ALTER COLUMN "id" SET DATA TYPE BIGINT;

-- AddForeignKey
ALTER TABLE "PDCcheckpoint" ADD CONSTRAINT "PDCcheckpoint_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "SessionNotes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
