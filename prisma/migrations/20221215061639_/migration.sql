-- CreateTable
CREATE TABLE `location` (
    `id` VARCHAR(191) NOT NULL,
    `dateDu` VARCHAR(191) NOT NULL,
    `dateAu` VARCHAR(191) NOT NULL,
    `prolongation` BOOLEAN NOT NULL,
    `livrer` BOOLEAN NOT NULL,
    `chauffeur` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `location` ADD CONSTRAINT `voiture` FOREIGN KEY (`id`) REFERENCES `car`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `location` ADD CONSTRAINT `location_id_fkey` FOREIGN KEY (`id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
