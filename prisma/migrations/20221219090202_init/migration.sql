/*
  Warnings:

  - Added the required column `upadatedAt` to the `UserSkill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSkill" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "upadatedAt" TIMESTAMP(3) NOT NULL;
