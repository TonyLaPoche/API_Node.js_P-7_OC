[![forthebadge](https://forthebadge.com/images/badges/license-mit.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/its-not-a-lie-if-you-believe-it.svg)](https://forthebadge.com)

# API_Node.js_P-7_OC

Bonjour et bienvenue dans le readme du projet 7 OPENCLASSROOMS sur le parcours Développeur Web.

## Introduction

J'ai pour mission ici de créer une API REST avec un système d'authentification sécurisé pour un site intitulé "MonVieuxGrimoire.com". 

Pour mettre en place cette API, j'ai dû parcourir un long chemin, affronter mille dangers, et finalement, j'ai atteint le boss final : les middlewares et l'utilisation de contrôleurs maison. Oui, j'ai même bravé des montagnes de bugs et des océans de commits douteux pour arriver jusqu'ici.

## Installation

Pour installer et tester cette API, il vous faudra bien vous préparer en amont. Voici la liste de vos armes :

- Un compte MongoDB (parce que les grimoires modernes se stockent en base de données)
- Une base de données configurée (sinon, vous allez chercher longtemps)
- Node.js installé sur votre machine (oui, il est votre fidèle destrier)
- GitHub également, mais pas obligatoire (quoi que très utile pour forker et suggérer des améliorations :wink:)
- npm installé (Node Package Manager, pour les non-intimes)

## Les Endpoints

### Authentification

| Point d'accès           | Authentification | Corps de la requête (cas échéant)               | Type de réponse attendu            | Fonction                                                                                                 |
|-------------------------|------------------|-------------------------------------------------|------------------------------------|----------------------------------------------------------------------------------------------------------|
| **POST /api/auth/signup** | Non requis       | `{ email: string, password: string }`            | `{ message: string }`              | Hachage du mot de passe de l'utilisateur, ajout de l'utilisateur à la base de données.                   |
| **POST /api/auth/login**  | Non requis       | `{ email: string, password: string }`            | `{ userId: string, token: string }`| Vérification des informations d'identification de l'utilisateur ; renvoie l’_id de l'utilisateur et un token web JSON signé. |

### Livres

| Point d'accès                   | Authentification | Corps de la requête (cas échéant)               | Type de réponse attendu            | Fonction                                                                                                 |
|---------------------------------|------------------|-------------------------------------------------|------------------------------------|----------------------------------------------------------------------------------------------------------|
| **GET /api/books**              | Non requis       | -                                               | `Array of books`                   | Renvoie un tableau de tous les livres de la base de données.                                             |
| **GET /api/books/:id**          | Non requis       | -                                               | `Single book`                      | Renvoie le livre avec l’_id fourni.                                                                      |
| **GET /api/books/bestrating**   | Non requis       | -                                               | `Array of books`                   | Renvoie un tableau des 3 livres de la base de données ayant la meilleure note moyenne.                   |
| **POST /api/books**             | Requis           | `{ book: string, image: file }`                 | `{ message: String }`              | Capture et enregistre l'image, analyse le livre transformé en chaîne de caractères, et l'enregistre dans la base de données en définissant correctement son ImageUrl. Initialise la note moyenne du livre à 0 et le rating avec un tableau vide. |
| **PUT /api/books/:id**          | Requis           | `Book as JSON` OU `{ book: string, image: file }`| `{ message: string }`              | Met à jour le livre avec l'_id fourni. Si une image est téléchargée, elle est capturée, et l’ImageUrl du livre est mise à jour. Si aucun fichier n'est fourni, les informations sur le livre se trouvent directement dans le corps de la requête (`req.body.title`, `req.body.author`, etc.). Si un fichier est fourni, le livre transformé en chaîne de caractères se trouve dans `req.body.book`. |
| **DELETE /api/books/:id**       | Requis           | -                                               | `{ message: string }`              | Supprime le livre avec l'_id fourni ainsi que l’image associée.                                           |
| **POST /api/books/:id/rating**  | Requis           | `{ userId: String, rating: Number }`            | `Single book`                      | Définit la note pour le user ID fourni. La note doit être comprise entre 0 et 5. L'ID de l'utilisateur et la note doivent être ajoutés au tableau "rating" afin de ne pas laisser un utilisateur noter deux fois le même livre. Il n’est pas possible de modifier une note. La note moyenne "averageRating" doit être tenue à jour, et le livre renvoyé en réponse de la requête. |
---

Voilà, vous avez tout ce qu'il vous faut pour naviguer dans l'univers de "MonVieuxGrimoire.com". Bonne aventure, et n'oubliez pas : avec un grand pouvoir (API), vient une grande responsabilité (débogage) !

[![forthebadge](https://forthebadge.com/images/badges/makes-people-smile.svg)](https://forthebadge.com) ![https://forthebadge.com](https://forthebadge.com/images/badges/powered-by-coffee.svg) [![forthebadge](https://forthebadge.com/images/badges/certified-cousin-terio.svg)](https://forthebadge.com)
