-- CreateTable
CREATE TABLE "SessionNotes" (
    "id" BIGINT NOT NULL,
    "topic" TEXT NOT NULL,
    "objective" TEXT NOT NULL,
    "actions" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "results" TEXT NOT NULL,
    "evaluation" TEXT NOT NULL,
    "checkpointId" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "SessionNotes_id_key" ON "SessionNotes"("id");

-- AddForeignKey
ALTER TABLE "SessionNotes" ADD CONSTRAINT "SessionNotes_checkpointId_fkey" FOREIGN KEY ("checkpointId") REFERENCES "PDCcheckpoint"("id") ON DELETE SET NULL ON UPDATE CASCADE;
