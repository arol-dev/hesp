/*
  Warnings:

  - You are about to drop the column `commentID` on the `WOLcheckpoint` table. All the data in the column will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `environmentFeel` to the `WOLcheckpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `environmentImprove` to the `WOLcheckpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `familyFriendsFeel` to the `WOLcheckpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `familyFriendsImprove` to the `WOLcheckpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `financesthFeel` to the `WOLcheckpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `financesthImprove` to the `WOLcheckpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `funFeel` to the `WOLcheckpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `funImprove` to the `WOLcheckpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healthFeel` to the `WOLcheckpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healthImprove` to the `WOLcheckpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loveFeel` to the `WOLcheckpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loveImprove` to the `WOLcheckpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalDevelopmentFeel` to the `WOLcheckpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalDevelopmentImprove` to the `WOLcheckpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workFeel` to the `WOLcheckpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workImprove` to the `WOLcheckpoint` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_relatedUser_fkey";

-- DropForeignKey
ALTER TABLE "WOLcheckpoint" DROP CONSTRAINT "WOLcheckpoint_commentID_fkey";

-- DropIndex
DROP INDEX "WOLcheckpoint_commentID_key";

-- AlterTable
ALTER TABLE "WOLcheckpoint" DROP COLUMN "commentID",
ADD COLUMN     "environmentFeel" TEXT NOT NULL,
ADD COLUMN     "environmentImprove" TEXT NOT NULL,
ADD COLUMN     "familyFriendsFeel" TEXT NOT NULL,
ADD COLUMN     "familyFriendsImprove" TEXT NOT NULL,
ADD COLUMN     "financesthFeel" TEXT NOT NULL,
ADD COLUMN     "financesthImprove" TEXT NOT NULL,
ADD COLUMN     "funFeel" TEXT NOT NULL,
ADD COLUMN     "funImprove" TEXT NOT NULL,
ADD COLUMN     "healthFeel" TEXT NOT NULL,
ADD COLUMN     "healthImprove" TEXT NOT NULL,
ADD COLUMN     "loveFeel" TEXT NOT NULL,
ADD COLUMN     "loveImprove" TEXT NOT NULL,
ADD COLUMN     "personalDevelopmentFeel" TEXT NOT NULL,
ADD COLUMN     "personalDevelopmentImprove" TEXT NOT NULL,
ADD COLUMN     "workFeel" TEXT NOT NULL,
ADD COLUMN     "workImprove" TEXT NOT NULL;

-- DropTable
DROP TABLE "Comment";
