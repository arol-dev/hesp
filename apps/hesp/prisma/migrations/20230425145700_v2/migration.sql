/*
  Warnings:

  - A unique constraint covering the columns `[noteId]` on the table `PDCcheckpoint` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PDCcheckpoint" ADD COLUMN     "noteId" INTEGER;

-- CreateTable
CREATE TABLE "SessionNotes" (
    "id" INTEGER NOT NULL,
    "topic" TEXT NOT NULL,
    "objective" TEXT NOT NULL,
    "actions" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "results" TEXT NOT NULL,
    "evaluation" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SessionNotes_id_key" ON "SessionNotes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PDCcheckpoint_noteId_key" ON "PDCcheckpoint"("noteId");

-- AddForeignKey
ALTER TABLE "PDCcheckpoint" ADD CONSTRAINT "PDCcheckpoint_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "SessionNotes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
