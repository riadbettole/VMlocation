/*
  Warnings:

  - Added the required column `priceid` to the `car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `car` ADD COLUMN `priceid` VARCHAR(191) NOT NULL;
