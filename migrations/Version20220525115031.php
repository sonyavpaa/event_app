<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220525115031 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE event ADD start_date_time VARCHAR(255) NOT NULL, ADD end_date_time VARCHAR(255) NOT NULL, ADD streetname VARCHAR(255) NOT NULL, ADD city VARCHAR(255) NOT NULL, DROP date_start, DROP date_end, DROP time_start, DROP time_end, CHANGE location venue VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE event ADD location VARCHAR(255) NOT NULL, ADD date_start DATE NOT NULL, ADD date_end DATE NOT NULL, ADD time_start TIME NOT NULL, ADD time_end TIME NOT NULL, DROP venue, DROP start_date_time, DROP end_date_time, DROP streetname, DROP city');
    }
}
