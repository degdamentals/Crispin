# Crispin La Boutique - E-commerce Professionnel

Site e-commerce moderne pour **Crispin Industrie** - 60 ans d'expertise en solutions adhésives et produits professionnels.

[![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-brightgreen)](https://github.com)
[![Backend](https://img.shields.io/badge/Backend-Render.com-blue)](https://render.com)
[![Node.js](https://img.shields.io/badge/Node.js-14%2B-green)](https://nodejs.org)

---

## 🚀 Démarrage Rapide

```bash
# 1. Cloner le repository
git clone https://github.com/VOTRE-USERNAME/crispin-boutique.git
cd crispin-boutique

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur backend
node server.js

# 4. Ouvrir index.html dans votre navigateur
```

📖 **[Guide de Déploiement Complet](./docs/GUIDE-DEPLOIEMENT.md)**

---

## ✨ Fonctionnalités

### 🛒 E-commerce
- 24 produits professionnels (Colles, Teintures, Renforts, Machines)
- Panier intelligent avec synchronisation localStorage
- Recherche en temps réel
- Filtrage par catégorie
- Page panier dédiée ([cart.html](./cart.html))

### 🤖 Assistant IA avec Machine Learning
- Conseils personnalisés sur chaque produit
- Icône AI sur les produits (apparaît au survol)
- Chat interactif professionnel
- Système de notation (👍 Utile / 👎 Pas utile)
- Apprentissage automatique basé sur 12 types de patterns
- Réutilisation des meilleures réponses

### 👤 Authentification
- Inscription / Connexion utilisateur ([login.html](./login.html))
- Mode invité
- Tokens d'authentification sécurisés
- Suivi des conversations par utilisateur

### 📊 Dashboard Admin
- Analytics en temps réel ([admin.html](./admin.html))
- Graphiques Chart.js (satisfaction, patterns)
- KPIs visuels
- Top questions et zones d'amélioration
- Export JSON

### 🎨 Design
- Pantone 1655C (#FC4C02)
- Icons SVG professionnels
- Particules animées (Canvas)
- Barre de progression
- Responsive (mobile, tablette, desktop)

---

## 📁 Structure du Projet

```
crispin-boutique/
├── assets/              # Ressources
│   └── logo.svg
├── css/                 # Styles
│   ├── style.css
│   ├── cart-styles.css
│   └── admin-styles.css
├── js/                  # Scripts
│   ├── config.js        # Configuration env
│   ├── script.js        # Logique principale
│   ├── cart.js          # Panier
│   ├── ai-assistant.js  # Assistant IA
│   ├── ai-learning.js   # Machine Learning
│   └── admin.js         # Dashboard
├── docs/                # Documentation
│   ├── README.md
│   └── GUIDE-DEPLOIEMENT.md
├── server-data/         # Données backend (git ignored)
│   ├── users.json
│   ├── ai-conversations.json
│   └── orders.json
├── index.html           # Page d'accueil
├── cart.html            # Panier
├── login.html           # Authentification
├── admin.html           # Dashboard
├── server.js            # Backend Node.js/Express
├── package.json         # Dépendances
├── render.yaml          # Config Render.com
└── .gitignore           # Fichiers ignorés
```

---

## 🛠️ Technologies

| Frontend | Backend | Outils |
|----------|---------|--------|
| HTML5, CSS3 | Node.js | Git |
| JavaScript ES6+ | Express.js | GitHub Pages |
| Canvas API | CORS | Render.com |
| Chart.js | JSON Storage | npm |

---

## 📖 Utilisation

### En Local

1. **Lancer le backend**
   ```bash
   node server.js
   ```
   Serveur sur `http://localhost:4000`

2. **Ouvrir le frontend**
   - Ouvrir `index.html` dans votre navigateur
   - Ou utiliser Live Server (VS Code)

### En Production

1. **Frontend** : GitHub Pages
   - URL : `https://USERNAME.github.io/REPO/`

2. **Backend** : Render.com
   - URL : `https://VOTRE-APP.onrender.com`

3. **Configuration** : `js/config.js` détecte automatiquement l'environnement

---

## 🔌 API Endpoints

### Authentification
- `POST /api/auth/register` - Créer un compte
- `POST /api/auth/login` - Se connecter

### Conversations IA
- `POST /api/ai/conversation` - Sauvegarder
- `GET /api/ai/conversations` - Liste complète
- `GET /api/ai/analytics` - Statistiques

### Commandes
- `POST /api/orders` - Créer une commande
- `GET /api/orders/user/:userId` - Par utilisateur
- `PUT /api/orders/:orderId/status` - Mettre à jour

---

## 🤝 Contribuer

1. Fork le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit (`git commit -m 'Ajout fonctionnalité'`)
4. Push (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

---

## 📝 Licence

© 2025 Crispin Industrie - Tous droits réservés

---

## 📞 Contact

- **Site Web** : [crispin-industrie.com](https://crispin-industrie.com)
- **Email** : contact@crispin-industrie.com
- **Téléphone** : +33 1 23 45 67 89

---

**60 ans d'expertise depuis 1963** | Livraison 24h | Stock permanent 1000+ références
