/*
  Warnings:

  - The primary key for the `PDCcheckpoint` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `PDCcheckpoint` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PDCcheckpoint" DROP CONSTRAINT "PDCcheckpoint_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "PDCcheckpoint_pkey" PRIMARY KEY ("id");
