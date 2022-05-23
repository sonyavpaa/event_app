<?php

namespace App\Controller;

use App\Entity\Project;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route("/api", name: "api_main")]

class EventsController extends AbstractController
{
    #[Route('/events', name: 'event_index', methods: ["GET"])]
    public function index(EntityManagerInterface $em): Response
    {
        return $this->json("fsdfsdfs");
    }

}
