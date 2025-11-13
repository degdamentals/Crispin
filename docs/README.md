# Crispin La Boutique - E-commerce Professionnel

Site e-commerce moderne pour **Crispin Industrie** - 60 ans d'expertise en solutions adhésives et produits professionnels.

[![Déploiement](https://img.shields.io/badge/Deploy-GitHub%20Pages-brightgreen)](https://github.com)
[![Backend](https://img.shields.io/badge/Backend-Render.com-blue)](https://render.com)
[![Node.js](https://img.shields.io/badge/Node.js-14%2B-green)](https://nodejs.org)

## 🚀 Déploiement Rapide

📖 **[Guide de Déploiement Complet](./GUIDE-DEPLOIEMENT.md)**

```bash
# 1. Cloner et installer
git clone https://github.com/VOTRE-USERNAME/crispin-boutique.git
cd crispin-boutique
npm install

# 2. Lancer en local
node server.js
# Ouvrir index.html dans le navigateur
```

## ✨ Fonctionnalités Principales

### 🛒 E-commerce Complet
- **24 produits** dans 4 catégories (Colles, Teintures, Renforts, Machines)
- **Panier intelligent** avec localStorage et synchronisation
- **Recherche en temps réel** avec suggestions
- **Filtrage par catégorie** dynamique
- **Page panier dédiée** (cart.html)
- **Calcul automatique** des totaux et remises

### 🤖 Assistant IA Intelligent avec Machine Learning
- **Conseils personnalisés** sur chaque produit
- **Icône AI** apparaît au survol des produits
- **Chat interactif** avec réponses contextuelles
- **Système de notation** (👍 Utile / 👎 Pas utile)
- **Feedback utilisateur** pour amélioration continue
- **Apprentissage automatique** basé sur 12 types de patterns :
  - Prix, Applications, Qualité, Livraison
  - Comparaisons, Mode d'emploi, Stock
  - Caractéristiques techniques, Recommandations
  - Salutations, Questions personnelles, Remerciements
- **Réutilisation des bonnes réponses** (70% probabilité)

### 👤 Authentification & Comptes Utilisateurs
- **Page de connexion/inscription** (login.html)
- **Authentification sécurisée** avec tokens
- **Mode invité** pour navigation sans compte
- **Profil utilisateur** sauvegardé
- **Suivi des conversations IA** par utilisateur
- **Historique des commandes** (en développement)

### 📊 Dashboard Admin Avancé
- **Analytics en temps réel** (admin.html)
- **KPIs visuels** :
  - Total des interactions
  - Taux de satisfaction
  - Notes positives/négatives
- **Graphiques Chart.js** :
  - Évolution de la satisfaction
  - Distribution des patterns de questions
- **Top Questions** et patterns performants
- **Zones d'amélioration** identifiées
- **Export des données** en JSON
- **Réinitialisation** de l'apprentissage

### 🎨 Design Ultra-Moderne
- **Pantone 1655C** (#FC4C02) comme couleur principale
- **Icons SVG professionnels** (pas d'emojis enfantins)
- **Particules animées** sur fond (Canvas API)
- **Effets parallaxe** et smooth scroll
- **Barre de progression** de défilement
- **Animations fluides** avec transitions CSS
- **Responsive design** (mobile, tablette, desktop)
- **Modals élégantes** (AI, contact, recherche, panier)

## 📁 Structure du Projet

```
crispin-boutique/
├── Frontend (Pages HTML)
│   ├── index.html              # Page d'accueil
│   ├── cart.html               # Page panier
│   ├── login.html              # Connexion/Inscription
│   ├── admin.html              # Dashboard analytics
│   └── debug-cart.html         # Outil de debug
│
├── Styles (CSS)
│   ├── style.css               # Styles principaux (2000+ lignes)
│   ├── cart-styles.css         # Styles panier
│   └── admin-styles.css        # Styles admin
│
├── Scripts (JavaScript)
│   ├── config.js               # Configuration environnement
│   ├── script.js               # Logique principale + produits
│   ├── cart.js                 # Logique du panier
│   ├── ai-assistant.js         # Assistant IA
│   ├── ai-learning.js          # Machine Learning (328 lignes)
│   └── admin.js                # Dashboard admin
│
├── Backend (Node.js)
│   ├── server.js               # Serveur Express (404 lignes)
│   ├── package.json            # Dépendances
│   └── server-data/            # Stockage JSON (ignoré par Git)
│       ├── users.json
│       ├── ai-conversations.json
│       └── orders.json
│
├── Configuration
│   ├── .gitignore              # Fichiers ignorés
│   ├── render.yaml             # Config Render.com
│   └── DEMARRAGE-RAPIDE.txt    # Instructions serveur
│
├── Documentation
│   ├── README.md               # Ce fichier
│   └── GUIDE-DEPLOIEMENT.md    # Guide déploiement détaillé
│
└── Assets
    └── logo.svg                # Logo Crispin
```

## 🚀 Utilisation

### En Local

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Lancer le serveur backend**
   ```bash
   node server.js
   ```
   Le serveur démarre sur `http://localhost:4000`

3. **Ouvrir le frontend**
   - Ouvrir `index.html` dans votre navigateur
   - Ou utiliser Live Server dans VS Code

### Fonctionnalités Disponibles

- **Navigation** : Parcourir les 24 produits
- **Recherche** : Trouver des produits rapidement
- **Panier** : Ajouter/retirer des articles
- **AI Assistant** : Poser des questions sur les produits
- **Compte** : Créer un compte ou continuer en invité
- **Admin** : Voir les analytics IA sur `admin.html`

## 🎯 Produits

### Colles (6 produits)
- Colle Extra-Forte Pro (Bestseller)
- Colle Néoprène Premium
- Colle Contact Rapide (Nouveau)
- Colle PU Structurale
- Colle Époxy Bi-composant
- Colle Hot-Melt Industriel

### Teintures (6 produits)
- Teinture Cuir Aniline (Premium)
- Teinture Textile Professionnelle
- Teinture Bois Aqua (Éco)
- Pigments Universels
- Teinture Vinyle Marine
- Teinture Daim & Nubuck (Nouveau)

### Renforts (6 produits)
- Renfort Fibre de Verre
- Renfort Carbone Pro (Premium)
- Bande Kevlar Aramide
- Non-tissé Thermocollant (Bestseller)
- Renfort Polyester Tissé
- Mat de Verre 300g

### Machines (6 produits)
- Pistolet Thermocollage Pro
- Refendeuse de Précision
- Presse à Chaud 40x50cm
- Applicateur Colle Pneumatique (Nouveau)
- Table de Découpe Laser (Premium)
- Séchoir Infrarouge Mobile

## 🎨 Images utilisées

Le site utilise des images réelles du site vitrine Crispin Industrie :
- Logo et icônes des catégories
- Photo de la façade (2023)
- Logos des partenaires (Angeleri, Barrera, Galli, etc.)

## 📱 Responsive

Le site est entièrement responsive avec breakpoints à :
- **1024px** : Tablettes
- **768px** : Petits écrans
- **480px** : Mobiles

## 🔧 Technologies

- **HTML5** : Structure sémantique
- **CSS3** : Animations, Grid, Flexbox
- **JavaScript vanilla** : Aucune dépendance
- **LocalStorage** : Sauvegarde du panier

## 🌟 Points forts

- ✨ Design moderne et vendeur
- 🎨 Charte graphique cohérente avec Pantone 1655C
- 🚀 Nombreuses animations fluides
- 📱 Responsive sur tous les écrans
- 🛒 Système de panier complet
- 💾 Sauvegarde automatique
- 🔍 Navigation intuitive
- ⚡ Performance optimisée (pas de framework lourd)

## 🚀 Évolutions futures possibles

- [ ] Connexion à une vraie base de données
- [ ] Système de paiement (Stripe, PayPal)
- [ ] Compte client avec historique
- [ ] Gestion des favoris
- [ ] Système de recherche fonctionnel
- [ ] Filtres avancés (prix, disponibilité)
- [ ] Comparateur de produits
- [ ] Newsletter
- [ ] Chat en direct

## 📞 Contact

Pour toute question : contact@crispin-industrie.com

---

**© 2025 Crispin Industrie - Tous droits réservés**

*60 ans d'expertise à votre service* 🎉
