<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    #[Route('/api/signup', name: 'app_signup', methods: ["POST"])]
    public function index(UserPasswordHasherInterface $passwordHasher, Request $request, ManagerRegistry $doctrine): Response
    {   
        
        $em = $doctrine->getManager();

        $content = json_decode($request->getContent());

        //return $this->json($content);

        $user = new User();
        $user->setEmail($content->email);
        $user->setFirstname($content->firstname);
        $user->setLastname($content->lastname);

        $plaintextPassword = $content->password;

        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $plaintextPassword
        );

        $user->setPassword($hashedPassword);

        $em->persist($user);
        $em->flush();

        return $this->json("user created");
    }
}

