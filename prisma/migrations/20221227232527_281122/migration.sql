/*
  Warnings:

  - Made the column `priceid` on table `car` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `car` MODIFY `priceid` VARCHAR(191) NOT NULL;
