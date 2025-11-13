# Guide de Déploiement - Crispin La Boutique

## Vue d'ensemble

Ce guide vous explique comment déployer votre site e-commerce Crispin La Boutique sur GitHub Pages (frontend) et Render.com (backend).

## Architecture

- **Frontend** : HTML/CSS/JavaScript hébergé sur GitHub Pages
- **Backend** : Node.js/Express hébergé sur Render.com
- **Base de données** : Fichiers JSON sur le serveur Render
- **Configuration** : Système auto-détectant l'environnement (local vs production)

---

## Étape 1 : Préparer le Repository GitHub

### 1.1 Créer un nouveau repository sur GitHub

1. Allez sur [github.com](https://github.com)
2. Cliquez sur le bouton "+" en haut à droite → "New repository"
3. Nommez votre repository (exemple : `crispin-boutique`)
4. Laissez-le **public** (requis pour GitHub Pages gratuit)
5. **Ne cochez pas** "Initialize with README" (vous avez déjà des fichiers)
6. Cliquez sur "Create repository"

### 1.2 Pousser votre code vers GitHub

Ouvrez un terminal dans le dossier de votre projet et exécutez :

```bash
# Initialiser git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit - Crispin La Boutique e-commerce"

# Ajouter le remote GitHub (remplacez USERNAME et REPO par vos valeurs)
git remote add origin https://github.com/USERNAME/REPO.git

# Pousser vers GitHub
git branch -M main
git push -u origin main
```

---

## Étape 2 : Déployer le Backend sur Render

### 2.1 Créer un compte Render

1. Allez sur [render.com](https://render.com)
2. Cliquez sur "Get Started" ou "Sign Up"
3. Connectez-vous avec votre compte GitHub (recommandé)

### 2.2 Créer un nouveau Web Service

1. Dans le dashboard Render, cliquez sur "New +" → "Web Service"
2. Connectez votre repository GitHub `crispin-boutique`
3. Configurez le service :
   - **Name** : `crispin-backend` (ou ce que vous voulez)
   - **Region** : Choisissez la plus proche (ex: Frankfurt)
   - **Branch** : `main`
   - **Root Directory** : Laissez vide
   - **Runtime** : Node
   - **Build Command** : `npm install`
   - **Start Command** : `node server.js`
4. Cliquez sur "Advanced" et ajoutez les variables d'environnement :
   - `NODE_ENV` = `production`
   - `PORT` = `4000`
5. Sélectionnez le plan **Free** (gratuit)
6. Cliquez sur "Create Web Service"

### 2.3 Attendre le déploiement

- Render va construire et déployer votre backend
- Cela prend environ 2-5 minutes
- Une fois terminé, vous verrez "Live" en vert
- Notez l'URL de votre backend (exemple : `https://crispin-backend.onrender.com`)

---

## Étape 3 : Mettre à jour l'URL du Backend

### 3.1 Modifier config.js

Ouvrez le fichier `config.js` et remplacez l'URL de production par votre URL Render :

```javascript
const CONFIG = {
    API_URL: isProduction
        ? 'https://VOTRE-BACKEND.onrender.com/api'  // ← Remplacez ici
        : 'http://localhost:4000/api',
    IS_PRODUCTION: isProduction,
    SITE_NAME: 'Crispin La Boutique',
    VERSION: '1.0.0'
};
```

### 3.2 Pousser la mise à jour

```bash
git add config.js
git commit -m "Update: Add production backend URL"
git push
```

---

## Étape 4 : Déployer le Frontend sur GitHub Pages

### 4.1 Activer GitHub Pages

1. Allez dans votre repository sur GitHub
2. Cliquez sur "Settings" (en haut)
3. Dans le menu de gauche, cliquez sur "Pages"
4. Sous "Source", sélectionnez :
   - **Branch** : `main`
   - **Folder** : `/ (root)`
5. Cliquez sur "Save"

### 4.2 Attendre le déploiement

- GitHub Pages va construire votre site (1-2 minutes)
- Une fois terminé, vous verrez un message vert avec l'URL de votre site
- URL typique : `https://USERNAME.github.io/REPO/`

---

## Étape 5 : Tester le Site en Production

### 5.1 Vérifications Frontend

1. Ouvrez votre site : `https://USERNAME.github.io/REPO/`
2. Testez :
   - ✓ La page d'accueil s'affiche correctement
   - ✓ Les produits sont visibles
   - ✓ Le panier fonctionne
   - ✓ La recherche fonctionne
   - ✓ Les modals s'ouvrent (contact, AI assistant)

### 5.2 Vérifications Backend

1. Ouvrez la console du navigateur (F12 → Console)
2. Testez l'inscription :
   - Cliquez sur le lien "Connexion" (si ajouté au menu)
   - Ou allez sur `https://USERNAME.github.io/REPO/login.html`
   - Créez un nouveau compte
   - Vérifiez qu'il n'y a pas d'erreurs dans la console
3. Testez la connexion avec le compte créé
4. Testez l'AI assistant :
   - Survolez un produit → cliquez sur l'icône AI
   - Posez une question
   - Notez la réponse avec 👍 ou 👎
   - Vérifiez la console pour confirmer l'envoi au serveur

### 5.3 Vérifier le Dashboard Admin

1. Allez sur `https://USERNAME.github.io/REPO/admin.html`
2. Vérifiez que les statistiques d'AI s'affichent
3. Si vous avez testé l'AI, les interactions devraient apparaître

---

## Étape 6 : Maintenance et Mises à Jour

### 6.1 Pour mettre à jour le site

```bash
# Faire vos modifications dans le code
# ...

# Ajouter les changements
git add .

# Créer un commit
git commit -m "Description de vos changements"

# Pousser vers GitHub
git push
```

- **Frontend** : Les changements sont automatiquement déployés sur GitHub Pages (1-2 minutes)
- **Backend** : Render redéploie automatiquement quand vous poussez sur la branche `main`

### 6.2 Voir les logs du backend

1. Allez sur [dashboard.render.com](https://dashboard.render.com)
2. Cliquez sur votre service `crispin-backend`
3. Cliquez sur "Logs" pour voir les logs en temps réel

---

## Étape 7 : Ajouter un Lien de Connexion au Menu (Optionnel)

Pour que les utilisateurs puissent accéder à la page de connexion, ajoutez un lien dans le menu :

### Dans index.html

Trouvez la section `<nav class="nav">` et ajoutez :

```html
<nav class="nav">
    <ul>
        <li><a href="#accueil">Accueil</a></li>
        <li><a href="#produits">Produits</a></li>
        <li><a href="#categories">Catégories</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="login.html">Connexion</a></li>  <!-- Nouveau -->
    </ul>
</nav>
```

---

## Résolution de Problèmes

### Problème : Le backend ne répond pas

**Solution** :
1. Vérifiez que le service Render est "Live" (vert)
2. Vérifiez l'URL dans `config.js`
3. Vérifiez les logs Render pour voir les erreurs
4. Render Free peut s'endormir après 15 minutes d'inactivité → Le premier appel peut prendre 30 secondes

### Problème : CORS Error

**Erreur** : `Access to fetch at '...' from origin '...' has been blocked by CORS`

**Solution** : Vérifiez que `server.js` contient bien :

```javascript
app.use(cors({
    origin: '*', // Ou spécifiez votre domaine GitHub Pages
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Problème : Les fichiers CSS/JS ne se chargent pas sur GitHub Pages

**Solution** : Si votre repo s'appelle `crispin-boutique`, l'URL sera `username.github.io/crispin-boutique/`
- Les chemins relatifs comme `src="script.js"` fonctionnent
- Évitez les chemins absolus comme `src="/script.js"` qui ne fonctionneront pas

### Problème : 404 sur les pages

**Solution** : Utilisez des liens relatifs :
- ✓ `<a href="login.html">Connexion</a>`
- ✗ `<a href="/login.html">Connexion</a>`

---

## Fonctionnalités Avancées

### Utiliser un Nom de Domaine Personnalisé

1. Achetez un nom de domaine (ex: crispin-boutique.com)
2. Dans les paramètres GitHub Pages, ajoutez votre domaine personnalisé
3. Configurez les DNS chez votre registrar :
   ```
   Type: CNAME
   Name: www
   Value: USERNAME.github.io
   ```
4. GitHub générera automatiquement un certificat SSL (HTTPS)

### Ajouter Google Analytics

Ajoutez ce code avant `</head>` dans toutes vos pages HTML :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Sécurité

### Fichiers sensibles

Le fichier `.gitignore` protège automatiquement :
- `node_modules/` - Dépendances Node.js
- `server-data/` - Données utilisateurs (JSON)
- `.env` - Variables d'environnement sensibles

**IMPORTANT** : Ne commitez JAMAIS :
- Des mots de passe en dur dans le code
- Des clés API privées
- Des tokens d'authentification

### Backup des données

Les données sont stockées dans `server-data/` sur Render. Pour sauvegarder :

1. Connectez-vous au shell Render :
   - Dashboard Render → Votre service → "Shell"
2. Téléchargez les fichiers JSON :
   ```bash
   cat server-data/users.json
   cat server-data/ai-conversations.json
   cat server-data/orders.json
   ```
3. Copiez le contenu et sauvegardez localement

---

## Support

Pour tout problème :
1. Vérifiez les logs (Console navigateur + Logs Render)
2. Vérifiez que toutes les URLs sont correctes dans `config.js`
3. Testez d'abord en local (`node server.js` + ouvrir `index.html`)
4. Consultez la documentation :
   - [GitHub Pages](https://docs.github.com/en/pages)
   - [Render.com](https://render.com/docs)

---

## Récapitulatif des URLs

Après déploiement, vous aurez :

| Service | URL | Description |
|---------|-----|-------------|
| Site principal | `https://USERNAME.github.io/REPO/` | Page d'accueil |
| Page panier | `https://USERNAME.github.io/REPO/cart.html` | Panier d'achat |
| Page connexion | `https://USERNAME.github.io/REPO/login.html` | Authentification |
| Dashboard admin | `https://USERNAME.github.io/REPO/admin.html` | Analytics IA |
| Backend API | `https://VOTRE-APP.onrender.com/api` | Serveur Node.js |

---

## Félicitations ! 🎉

Votre site e-commerce est maintenant en ligne et fonctionnel !

**Prochaines étapes suggérées** :
- Ajouter plus de produits dans `script.js`
- Personnaliser les couleurs dans `style.css`
- Améliorer les réponses de l'AI
- Ajouter un système de paiement (Stripe, PayPal)
- Configurer un vrai système d'emailing pour les commandes
