-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'STAFF', 'TRAINEE');

-- CreateEnum
CREATE TYPE "WorkingSituation" AS ENUM ('WORKING', 'NOT_WORKING');

-- CreateEnum
CREATE TYPE "HousingSituation" AS ENUM ('HOMELESS', 'HOUSE', 'APARTMENT', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'STAFF',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "relatedUser" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WOLcheckpoint" (
    "id" SERIAL NOT NULL,
    "health" INTEGER NOT NULL,
    "work" INTEGER NOT NULL,
    "finances" INTEGER NOT NULL,
    "environment" INTEGER NOT NULL,
    "love" INTEGER NOT NULL,
    "familyFriends" INTEGER NOT NULL,
    "personalDevelopment" INTEGER NOT NULL,
    "fun" INTEGER NOT NULL,
    "relatedUser" INTEGER NOT NULL,

    CONSTRAINT "WOLcheckpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PDCcheckpoint" (
    "id" TEXT NOT NULL,
    "trust" INTEGER NOT NULL,
    "willFollow" INTEGER NOT NULL,
    "retention" INTEGER NOT NULL,
    "commitment" INTEGER NOT NULL,
    "cv" INTEGER NOT NULL,
    "readyForInterviews" INTEGER NOT NULL,
    "advancement" INTEGER NOT NULL,
    "userId" SERIAL NOT NULL,

    CONSTRAINT "PDCcheckpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trainee" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "registerNumber" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'TRAINEE',

    CONSTRAINT "Trainee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TraineeMetaData" (
    "traineeId" SERIAL NOT NULL,
    "workingSituation" "WorkingSituation" NOT NULL,
    "housingSituation" "HousingSituation" NOT NULL,
    "needWork" BOOLEAN NOT NULL,
    "needTraining" BOOLEAN NOT NULL,
    "needHousing" BOOLEAN NOT NULL,
    "needCommunication" BOOLEAN NOT NULL,
    "needLegal" BOOLEAN NOT NULL,
    "needTransportation" BOOLEAN NOT NULL,
    "needBasicAssistance" BOOLEAN NOT NULL,
    "needSOS" BOOLEAN NOT NULL,
    "helpCandidate" BOOLEAN NOT NULL,
    "filledForms" BOOLEAN NOT NULL,
    "helpAccepted" BOOLEAN NOT NULL,

    CONSTRAINT "TraineeMetaData_pkey" PRIMARY KEY ("traineeId")
);

-- CreateTable
CREATE TABLE "ProvidedSoloutions" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "ProvidedSoloutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Soloutions" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Soloutions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_relatedUser_fkey" FOREIGN KEY ("relatedUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WOLcheckpoint" ADD CONSTRAINT "WOLcheckpoint_relatedUser_fkey" FOREIGN KEY ("relatedUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WOLcheckpoint" ADD CONSTRAINT "WOLcheckpoint_id_fkey" FOREIGN KEY ("id") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PDCcheckpoint" ADD CONSTRAINT "PDCcheckpoint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trainee" ADD CONSTRAINT "Trainee_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TraineeMetaData" ADD CONSTRAINT "TraineeMetaData_traineeId_fkey" FOREIGN KEY ("traineeId") REFERENCES "Trainee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProvidedSoloutions" ADD CONSTRAINT "ProvidedSoloutions_id_fkey" FOREIGN KEY ("id") REFERENCES "Trainee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Soloutions" ADD CONSTRAINT "Soloutions_id_fkey" FOREIGN KEY ("id") REFERENCES "ProvidedSoloutions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
