<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $username;

    #[ORM\Column(type: 'string', length: 255)]
    private $password;

    #[ORM\Column(type: 'array', nullable: true)]
    private $events_created = [];

    #[ORM\Column(type: 'array', nullable: true)]
    private $favourites = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getEventsCreated(): ?array
    {
        return $this->events_created;
    }

    public function setEventsCreated(?array $events_created): self
    {
        $this->events_created = $events_created;

        return $this;
    }

    public function getFavourites(): ?array
    {
        return $this->favourites;
    }

    public function setFavourites(?array $favourites): self
    {
        $this->favourites = $favourites;

        return $this;
    }
}
