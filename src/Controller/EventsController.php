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
                'location'=>$event->getLocation(),
                'startDate'=>$event->getStartDate(),
                'endDate'=>$event->getEndDate(),
                'startTime'=>$event->getStartTime(),
                'endTime'=>$event->getEndTime(),
                'price'=>$event->getPrice(),
                'image'=>$event->getImage(),
                ];
        }
        return $this->json($data);
    }

    #[Route('/event/{id}', name: 'event_show', methods:['GET'])]

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
            'location'=>$event->getLocation(),
            'startDate'=>$event->getStartDate(),
            'endDate'=>$event->getEndDate(),
            'startTime'=>$event->getStartTime(),
            'endTime'=>$event->getEndTime(),
            'price'=>$event->getPrice(),
            'image'=>$event->getImage(),
        ];
        return $this->json($data);
    }
    
    #[Route('/events', name: 'event_new', methods:['POST'])]
    public function new(Request $request, ManagerRegistry $doctrine): Response
    {
        $em = $doctrine->getManager();

        $event = new Event();

        $event->setName($request->request->get('name'));
        $event->setOrganizer($request->request->get('organizer'));
        $event->setDescription($request->request->get('description'));
        $event->setCategory($request->request->get('category'));
        $event->setTags($request->request->get('tags'));
        $event->setLocation($request->request->get('location'));
        $event->setStartDate($request->request->get('startDate'));
        $event->setEndDate($request->request->get('endDate'));
        $event->setStartTime($request->request->get('startTime'));
        $event->setEndTime($request->request->get('endTime'));
        $event->setPrice($request->request->get('price'));
        $event->setImage($request->request->get('image'));

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
    #TODO: get content to show

    public function edit(Request $request, int $id, ManagerRegistry $doctrine): Response

    {
        $em = $doctrine->getManager();
        $event = $em->getRepository(Event::class)->find($id);

        if (!$event) {
            return $this->json("No event found for id " . $id, 404);
        }

        $content = json_decode($request->getContent());
        echo $content;

        $event->setName($content->name);
        $event->setOrganizer($content->organizer);
        $event->setDescription($content->description);
        $event->setCategory($content->category);
        $event->setTags($content->tags);
        $event->setLocation($content->location);
        $event->setStartDate($content->startDate);
        $event->setEndDate($content->endDate);
        $event->setStartTime($content->startTime);
        $event->setEndTime($content->endTime);
        $event->setPrice($content->price);
        $event->setImage($content->image);

        $em->flush();

        $data[] = [
        'id'=> $event->getId(),
        'name' => $event->getName(),
        'organizer' => $event->getOrganizer(),
        'description'=>$event->getDescription(),
        'category'=>$event->getCategory(),
        'tags'=>$event->getTags(),
        'location'=>$event->getLocation(),
        'startDate'=>$event->getStartDate(),
        'endDate'=>$event->getEndDate(),
        'startTime'=>$event->getStartTime(),
        'endTime'=>$event->getEndTime(),
        'price'=>$event->getPrice(),
        'image'=>$event->getImage(),
        ];

        return $this->json($data);
    }
}
