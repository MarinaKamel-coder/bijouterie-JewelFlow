const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const itemRoutes = require('./routes/itemRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middlewares ---
app.use(cors());
app.use(express.json()); 

// --- Connexion à MongoDB ---
const mongoURI = process.env.MONGO_URL;

if (!mongoURI) {
  console.error('❌ ERREUR: La variable d\'environnement MONGO_URI n\'est pas définie.');
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connecté à MongoDB avec succès'))
  .catch(err => {
    console.error('❌ Erreur de connexion à MongoDB:', err.message);
    process.exit(1); // Arrête le serveur si la DB n'est pas accessible
  });

app.get('/api/health', (req, res) => {
  res.json({
    status: "ok",
    message: "API fonctionnelle"
  });
});

// --- Routes ---
app.use('/api/items', itemRoutes);

// Route de base pour vérifier que l'API tourne
app.get('/', (req, res) => {
  res.send('API JewelFlow Pro en ligne 💎');
});

// --- Gestion des erreurs globale ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Une erreur interne est survenue' });
});

// --- Démarrage du serveur ---
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});