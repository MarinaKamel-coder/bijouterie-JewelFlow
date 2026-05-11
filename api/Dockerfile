# Utiliser une image Node légère
FROM node:20-alpine

# Créer le dossier de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Exposer le port de l'API
EXPOSE 5000

# Commande pour le développement avec nodemon
CMD ["npm", "run", "dev"]