-- DropForeignKey
ALTER TABLE "Trainee" DROP CONSTRAINT "Trainee_id_fkey";

-- AlterTable
ALTER TABLE "Trainee" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Trainee" ADD CONSTRAINT "Trainee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
