/*
  Warnings:

  - Added the required column `locataireId` to the `location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voitureId` to the `location` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `location` DROP FOREIGN KEY `location_id_fkey`;

-- DropForeignKey
ALTER TABLE `location` DROP FOREIGN KEY `voiture`;

-- AlterTable
ALTER TABLE `location` ADD COLUMN `locataireId` VARCHAR(191) NOT NULL,
    ADD COLUMN `voitureId` VARCHAR(191) NOT NULL;
