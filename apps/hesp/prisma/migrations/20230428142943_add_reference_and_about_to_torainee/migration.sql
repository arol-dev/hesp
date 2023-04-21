/*
  Warnings:

  - You are about to drop the column `About` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Reference` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Trainee" ADD COLUMN     "About" TEXT,
ADD COLUMN     "Reference" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "About",
DROP COLUMN "Reference";
