/*
  Warnings:

  - You are about to drop the column `About` on the `Trainee` table. All the data in the column will be lost.
  - You are about to drop the column `Reference` on the `Trainee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Trainee" DROP COLUMN "About",
DROP COLUMN "Reference",
ADD COLUMN     "about" TEXT,
ADD COLUMN     "reference" TEXT;
