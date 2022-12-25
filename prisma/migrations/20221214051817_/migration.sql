/*
  Warnings:

  - Added the required column `mdp` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `mdp` VARCHAR(191) NOT NULL;
