/*
  Warnings:

  - The primary key for the `TraineeMetaData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[traineeId]` on the table `TraineeMetaData` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "TraineeMetaData" DROP CONSTRAINT "TraineeMetaData_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "traineeId" DROP DEFAULT,
ADD CONSTRAINT "TraineeMetaData_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TraineeMetaData_traineeId_seq";

-- CreateIndex
CREATE UNIQUE INDEX "TraineeMetaData_traineeId_key" ON "TraineeMetaData"("traineeId");
