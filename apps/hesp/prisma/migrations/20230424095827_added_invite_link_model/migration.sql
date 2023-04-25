-- CreateTable
CREATE TABLE "InviteLink" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InviteLink_pkey" PRIMARY KEY ("id")
);
