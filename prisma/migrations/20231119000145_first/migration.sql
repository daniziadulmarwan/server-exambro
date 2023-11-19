/*
  Warnings:

  - Added the required column `mapel` to the `exams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `exams` ADD COLUMN `mapel` VARCHAR(191) NOT NULL;
