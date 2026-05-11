# JewelFlow 💎 — Gestion d'Inventaire de Bijouterie
### TP3 — Docker Compose et architecture multi-services

## Description du projet
**JewelFlow** est une application Full-Stack conçue pour la gestion simplifiée d'un inventaire de bijoux. Elle permet de visualiser une collection de pièces précieuses, d'en ajouter de nouvelles via une interface intuitive et de consulter les détails de chaque article.

L'objectif principal de ce projet est de mettre en pratique la conteneurisation d'une architecture multi-services (Frontend, Backend, Base de données, Proxy) en utilisant Docker et Docker Compose.

---

## Architecture des services
L'application repose sur quatre services principaux qui communiquent au sein d'un réseau Docker :

1.  **client** (React/Vite) : Interface utilisateur moderne.
2.  **api** (Node.js/Express) : Serveur backend gérant la logique et les accès aux données.
3.  **database** (MongoDB) : Base de données NoSQL pour le stockage persistant.
4.  **nginx** (Gateway) : Reverse proxy servant de point d'entrée unique sur le port 80.

---

## Lancement en développement
En mode développement, le projet utilise des **volumes** pour permettre le *live reload* du code.

**Commande :**
```bash
docker compose up --build
```
**Accès Application :** http://localhost (via Nginx)

**Accès API (Direct) :** http://localhost:5000/api/health

## Lancement en production
L'environnement de production est optimisé : le client React est compilé et servi statiquement par Nginx.
**Commande :**
```bash
docker compose -f docker-compose.prod.yml up --build
```
En production, seul le port 80 est exposé publiquement.

## Variables d’environnement
Un fichier .env est requis à la racine (voir .env.example).

**MONGO_URL :** URL de connexion à MongoDB (MONGO_URI=mongodb://database:27017/nom_de_votre_db).

**PORT :** Port d'écoute de l'API (ex: 5000 ou 3000).

**VITE_API_URL :** URL de base pour les requêtes frontend (ex: /api).

## Routes de l’API
- **GET /api/health** : Vérifie la santé du serveur.
- **GET /api/items** : Récupère la liste des bijoux.
- **POST /api/items** : Ajoute un nouveau bijou (body: { name, description, price }).
- **GET /api/items/:id** : Récupère les détails d’un bijou spécifique.
- **PUT /api/items/:id** : Met à jour un bijou existant (body: { name?, description?, price? }).
- **DELETE /api/items/:id** : Supprime un bijou de l’inventaire.

## Structure du projet
```jewelflow/
├── client/             # Code source du frontend React
├── api/                # Code source du backend Node.js
├── database/           # Configuration de MongoDB
├── nginx/              # Configuration de Nginx
├── docker-compose.yml  # Configuration Docker Compose pour développement
├── docker-compose.prod.yml # Configuration Docker Compose pour production
├── .env.example        # Exemple de fichier d’environnement
└── README.md           # Documentation du projet
``` 
### Auteur : *Marina Kamel*

 Étudiante en Développement Logiciel, Collège de Maisonneuve.
