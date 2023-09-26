/*
  Warnings:

  - Made the column `endAt` on table `campaigns` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "campaigns" ALTER COLUMN "endAt" SET NOT NULL;
