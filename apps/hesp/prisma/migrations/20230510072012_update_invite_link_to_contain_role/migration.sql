/*
  Warnings:

  - The primary key for the `InviteLink` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `code` on the `InviteLink` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InviteLink" DROP CONSTRAINT "InviteLink_pkey",
DROP COLUMN "code",
ADD COLUMN     "role" "UserRole",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "InviteLink_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "InviteLink_id_seq";
