/*
  Warnings:

  - You are about to drop the column `name` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the `Domain` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSkill` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[skillName]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `domainName` to the `Skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillName` to the `Skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserSkill" DROP CONSTRAINT "UserSkill_domainId_fkey";

-- DropForeignKey
ALTER TABLE "UserSkill" DROP CONSTRAINT "UserSkill_id_fkey";

-- DropForeignKey
ALTER TABLE "UserSkill" DROP CONSTRAINT "UserSkill_skillId_fkey";

-- DropIndex
DROP INDEX "Skill_name_key";

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "name",
ADD COLUMN     "domainName" TEXT NOT NULL,
ADD COLUMN     "skillName" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Domain";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserSkill";

-- DropEnum
DROP TYPE "LEVEL_OF_EXPERIENCE";

-- CreateIndex
CREATE UNIQUE INDEX "Skill_skillName_key" ON "Skill"("skillName");
