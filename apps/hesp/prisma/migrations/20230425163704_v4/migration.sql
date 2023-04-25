/*
  Warnings:

  - You are about to drop the column `noteId` on the `PDCcheckpoint` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "PDCcheckpoint_noteId_key";

-- AlterTable
ALTER TABLE "PDCcheckpoint" DROP COLUMN "noteId";
