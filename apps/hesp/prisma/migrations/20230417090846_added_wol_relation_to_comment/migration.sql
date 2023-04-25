/*
  Warnings:

  - Added the required column `commentID` to the `WOLcheckpoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WOLcheckpoint" ADD COLUMN     "commentID" INTEGER NOT NULL;
