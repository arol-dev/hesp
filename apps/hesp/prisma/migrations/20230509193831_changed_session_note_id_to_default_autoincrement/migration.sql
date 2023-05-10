/*
  Warnings:

  - The `id` column on the `SessionNotes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "SessionNotes_id_key";

-- AlterTable
ALTER TABLE "SessionNotes" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SessionNotes_pkey" PRIMARY KEY ("id");
