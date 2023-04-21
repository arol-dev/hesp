/*
  Warnings:

  - A unique constraint covering the columns `[commentID]` on the table `WOLcheckpoint` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "WOLcheckpoint" DROP CONSTRAINT "WOLcheckpoint_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "WOLcheckpoint_commentID_key" ON "WOLcheckpoint"("commentID");

-- AddForeignKey
ALTER TABLE "WOLcheckpoint" ADD CONSTRAINT "WOLcheckpoint_commentID_fkey" FOREIGN KEY ("commentID") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
