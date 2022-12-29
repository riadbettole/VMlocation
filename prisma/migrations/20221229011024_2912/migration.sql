/*
  Warnings:

  - You are about to drop the column `date` on the `rendezvous` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `rendezvous` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `rendezvous` table. All the data in the column will be lost.
  - Added the required column `name` to the `rendezvous` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tel` to the `rendezvous` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rendezvous` DROP COLUMN `date`,
    DROP COLUMN `firstname`,
    DROP COLUMN `lastname`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `tel` VARCHAR(191) NOT NULL;
