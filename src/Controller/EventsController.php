<?php

namespace App\Controller;

use App\Entity\Event;
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
        $events = $em->getRepository(Event::class)->findAll();
        $data = [];
        
        foreach($events as $event) {
            $data[] = [
            'id'=> $event->getId(),
            'name' => $event->getName(),
            'organizer' => $event->getOrganizer(),
            'description'=>$event->getDescription(),
            'category'=>$event->getCategory(),
            'tags'=>$event->getTags(),
            'startDateTime'=>$event->getStartDateTime(),
            'endDateTime'=>$event->getEndDateTime(),
            'price'=>$event->getPrice(),
            'image'=>$event->getImage(),
            'streetname'=>$event->getStreetName(),
            'city'=>$event->getCity(),
            'venue'=>$event->getVenue(),
            'postalCode'=>$event->getPostalCode()
            ];
        }
        return $this->json($data);
    }

    #[Route('/events/{id}', name: 'event_show', methods:['GET'])]

    public function show(int $id, ManagerRegistry $doctrine): Response

    {
        $event = $doctrine->getRepository(Event::class)->find($id);

        if (!$event) {
            return $this->json("No event found for id " . $id, 404);
        }

        $data = [
            'id'=> $event->getId(),
            'name' => $event->getName(),
            'organizer' => $event->getOrganizer(),
            'description'=>$event->getDescription(),
            'category'=>$event->getCategory(),
            'tags'=>$event->getTags(),
            'startDateTime'=>$event->getStartDateTime(),
            'endDateTime'=>$event->getEndDateTime(),
            'price'=>$event->getPrice(),
            'image'=>$event->getImage(),
            'streetname'=>$event->getStreetName(),
            'city'=>$event->getCity(),
            'venue'=>$event->getVenue(),
            'postalCode'=>$event->getPostalCode()
        ];
        return $this->json($data);
    }
    
    #[Route('/events', name: 'event_new', methods:['POST'])]
    public function new(Request $request, ManagerRegistry $doctrine): Response
    {
        $em = $doctrine->getManager();

        $event = new Event();

        $content = json_decode($request->getContent());

        $event->setName($content->name);
        $event->setOrganizer($content->organizer);
        $event->setDescription($content->description);
        $event->setCategory($content->category);
        $event->setTags($content->tags);
        $event->setVenue($content->venue);
        $event->setStartDateTime($content->startDateTime);
        $event->setEndDateTime($content->endDateTime);
        $event->setPrice($content->price);
        $event->setImage($content->image);
        $event->setStreetname($content->streetname);
        $event->setCity($content->city);
        $event->setPostalCode($content->postalCode);

        $em->persist($event);

        $em->flush();

        return $this->json('Created new event succesfully with id' . $event->getId());
    }

    #[Route('/events/{id}', name: 'event_delete', methods:['DELETE'])]

    public function delete(int $id, ManagerRegistry $doctrine): Response

    {
        $em = $doctrine->getManager();

        $event = $em->getRepository(Event::class)->find($id);

        if (!$event) {
            return $this->json("No event found for id " . $id, 404);
        }

        $em->remove($event);
        $em->flush();

        return $this->json('Deleted a event succesfully with id' . $id);
    }

    #[Route('/events/{id}', name: 'event_edit', methods:['PUT', 'PATCH'])]

    public function edit(Request $request, int $id, ManagerRegistry $doctrine): Response

    {
        $em = $doctrine->getManager();
        $event = $em->getRepository(Event::class)->find($id);

        if (!$event) {
            return $this->json("No event found for id " . $id, 404);
        }
        
        $content = json_decode($request->getContent());

        $event->setName($content->name);
        $event->setOrganizer($content->organizer);
        $event->setDescription($content->description);
        $event->setCategory($content->category);
        $event->setTags($content->tags);
        $event->setVenue($content->venue);
        $event->setStartDateTime($content->startDateTime);
        $event->setEndDateTime($content->endDateTime);
        $event->setPrice($content->price);
        $event->setImage($content->image);
        $event->setStreetname($content->streetname);
        $event->setCity($content->city);
        $event->setPostalCode($content->postalCode);

        $em->flush();

        $data = [
        'id'=> $event->getId(),
        'name'=>$event->getName(),
        'organizer' => $event->getOrganizer(),
        'description'=>$event->getDescription(),
        'category'=>$event->getCategory(),
        'venue'=>$event->getVenue(),
        'tags'=>$event->getTags(),
        'startDateTime'=>$event->getStartDateTime(),
        'endDateTime'=>$event->getEndDateTime(),
        'price'=>$event->getPrice(),
        'image'=>$event->getImage(),
        'streetname'=>$event->getStreetname(),
        'city'=>$event->getCity(),
        'postalCode'=>$event->getPostalCode()
        ];

        return $this->json($data);
    }
}
