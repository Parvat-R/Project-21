/*
  Warnings:

  - You are about to drop the column `imageData` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "imageData",
ADD COLUMN     "imageUrl" TEXT;
