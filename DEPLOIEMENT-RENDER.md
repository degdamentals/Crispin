# 🚀 Guide de Déploiement Render.com

## Objectif

Déployer le **backend** (server.js) sur Render.com pour que tous les utilisateurs puissent :
- ✅ Se connecter depuis n'importe quel PC
- ✅ Créer un compte qui sera sauvegardé
- ✅ Les données AI seront centralisées
- ✅ Vous pourrez voir les conversations de tout le monde

---

## 📋 Prérequis

- ✅ Code sur GitHub : https://github.com/degdamentals/Crispin.git
- ✅ Compte Render.com (gratuit)

---

## 🎯 Étape par Étape

### Étape 1 : Créer un compte Render (si pas déjà fait)

1. Allez sur **https://render.com**
2. Cliquez sur **"Get Started for Free"**
3. Choisissez **"Continue with GitHub"**
4. Autorisez Render à accéder à vos repositories

---

### Étape 2 : Créer un nouveau Web Service

1. Une fois connecté, cliquez sur **"New +"** (en haut à droite)
2. Sélectionnez **"Web Service"**
3. Vous verrez la liste de vos repositories GitHub
4. Cherchez et sélectionnez **"degdamentals/Crispin"**
5. Cliquez sur **"Connect"**

---

### Étape 3 : Configurer le Service

Remplissez les informations suivantes :

#### 📝 Configuration de Base

| Champ | Valeur |
|-------|--------|
| **Name** | `crispin-backend` |
| **Region** | `Frankfurt (EU Central)` ou le plus proche |
| **Branch** | `main` |
| **Root Directory** | *(laisser vide)* |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |

#### 🔧 Variables d'Environnement

Cliquez sur **"Advanced"** puis **"Add Environment Variable"** :

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `4000` |

#### 💰 Plan

- Sélectionnez **"Free"** (0€/mois)
- Le plan gratuit offre :
  - ✅ 750 heures/mois
  - ✅ 512 MB RAM
  - ✅ Parfait pour votre projet

---

### Étape 4 : Déployer

1. Cliquez sur **"Create Web Service"**
2. Render va automatiquement :
   - ✅ Cloner votre code depuis GitHub
   - ✅ Exécuter `npm install`
   - ✅ Lancer `node server.js`
3. **Attendez 2-5 minutes** pendant le déploiement

Vous verrez des logs en temps réel :
```
==> Cloning from https://github.com/degdamentals/Crispin...
==> Running 'npm install'
==> Starting service with 'node server.js'
==> Server listening on port 4000
==> Your service is live 🎉
```

---

### Étape 5 : Récupérer l'URL du Backend

Une fois déployé, vous verrez en haut :

```
✅ Live    https://crispin-backend.onrender.com
```

**C'est votre URL de backend !** Copiez-la (exemple : `https://crispin-backend-abc123.onrender.com`)

---

### Étape 6 : Mettre à Jour config.js

Sur votre PC, ouvrez le fichier `js/config.js` et remplacez l'URL :

**Avant :**
```javascript
const CONFIG = {
    API_URL: isProduction
        ? 'https://crispin-backend.onrender.com/api'  // ❌ URL générique
        : 'http://localhost:4000/api',
    // ...
};
```

**Après :**
```javascript
const CONFIG = {
    API_URL: isProduction
        ? 'https://crispin-backend-abc123.onrender.com/api'  // ✅ VOTRE URL
        : 'http://localhost:4000/api',
    // ...
};
```

**Remplacez** `crispin-backend-abc123` par votre vraie URL !

---

### Étape 7 : Pousser la Mise à Jour

```bash
cd "c:\Users\delac\Desktop\Crispin\site test"
git add js/config.js
git commit -m "Update: Production backend URL"
git push origin main
```

---

### Étape 8 : Activer GitHub Pages (Frontend)

1. Allez sur **https://github.com/degdamentals/Crispin**
2. Cliquez sur **"Settings"** (en haut)
3. Dans le menu de gauche, cliquez sur **"Pages"**
4. Sous **"Source"**, sélectionnez :
   - Branch : **`main`**
   - Folder : **`/ (root)`**
5. Cliquez sur **"Save"**
6. Attendez 1-2 minutes

Vous verrez :
```
✅ Your site is live at https://degdamentals.github.io/Crispin/
```

---

## 🧪 Tester Tout le Système

### Test 1 : Backend Fonctionne

Ouvrez cette URL dans votre navigateur :
```
https://VOTRE-BACKEND.onrender.com/api/test
```

Vous devriez voir :
```json
{"message":"API Crispin fonctionne!","timestamp":1234567890}
```

Si vous voyez une erreur 404, c'est **normal** ! Votre API fonctionne. Ajoutez juste un endpoint de test dans server.js :

```javascript
// Dans server.js, ajoutez :
app.get('/api/test', (req, res) => {
    res.json({
        message: 'API Crispin fonctionne!',
        timestamp: Date.now()
    });
});
```

### Test 2 : Frontend → Backend

1. Ouvrez **https://degdamentals.github.io/Crispin/login.html**
2. Créez un compte :
   - Prénom : Test
   - Nom : User
   - Email : test@example.com
   - Password : Test1234
3. Cliquez sur **"S'inscrire"**
4. Si ça fonctionne, vous serez redirigé vers index.html
5. Ouvrez la console (F12) pour voir les logs

### Test 3 : Vérifier les Données

1. Allez dans le **Dashboard Render** : https://dashboard.render.com
2. Cliquez sur votre service **"crispin-backend"**
3. Cliquez sur **"Shell"** (à gauche)
4. Tapez :
   ```bash
   cat server-data/users.json
   ```
5. Vous devriez voir votre utilisateur créé !

---

## 📊 Surveiller le Backend

### Voir les Logs en Direct

1. Dashboard Render → Votre service
2. Cliquez sur **"Logs"** (à gauche)
3. Vous verrez tous les appels API en temps réel :
   ```
   POST /api/auth/register - 201 (User created)
   POST /api/auth/login - 200 (Login successful)
   POST /api/ai/conversation - 201 (Conversation saved)
   ```

### Voir les Métriques

1. Dashboard Render → Votre service
2. Cliquez sur **"Metrics"** (à gauche)
3. Vous verrez :
   - CPU usage
   - Memory usage
   - Requests/minute
   - Response time

---

## ⚠️ Important : Limitations du Plan Gratuit

### Render Free Tier

- ✅ **750 heures/mois** (suffisant pour usage normal)
- ✅ **512 MB RAM**
- ⚠️ **Le serveur s'endort après 15 minutes d'inactivité**
  - Premier appel API après sommeil : 30-60 secondes
  - Appels suivants : instantanés
- ⚠️ **Les données sont perdues si vous redéployez**
  - Solution : Backuper régulièrement (voir ci-dessous)

### Comment Backuper les Données

**Méthode 1 : Via Shell**
```bash
# Dans le Shell Render
cat server-data/users.json > users-backup.json
cat server-data/ai-conversations.json > conversations-backup.json
cat server-data/orders.json > orders-backup.json
```

**Méthode 2 : Via API**

Créez un endpoint dans server.js :
```javascript
app.get('/api/admin/backup', (req, res) => {
    res.json({
        users: readJSON(USERS_FILE),
        conversations: readJSON(AI_CONVERSATIONS_FILE),
        orders: readJSON(ORDERS_FILE)
    });
});
```

Puis visitez : `https://VOTRE-BACKEND.onrender.com/api/admin/backup`

---

## 🎉 Récapitulatif

### URLs Finales

| Service | URL | Accessible par |
|---------|-----|----------------|
| **Site (Frontend)** | https://degdamentals.github.io/Crispin/ | 🌍 Tout le monde |
| **Backend API** | https://VOTRE-BACKEND.onrender.com | 🌍 Tout le monde |
| **Admin Dashboard** | https://degdamentals.github.io/Crispin/admin.html | 🌍 Tout le monde |

### Flux de Données

```
Utilisateur Paris     ┐
Utilisateur Lyon      ├──→ GitHub Pages (Frontend)
Utilisateur New York  ┘           ↓
                                  ↓ fetch(API_URL)
                                  ↓
                          Render.com (Backend)
                                  ↓
                         server-data/users.json
                         server-data/ai-conversations.json
                         server-data/orders.json
                                  ↓
                    Toutes les données centralisées
                    Vous pouvez les voir dans admin.html
```

---

## 🐛 Résolution de Problèmes

### Erreur CORS

Si vous voyez :
```
Access to fetch at 'https://...' from origin '...' has been blocked by CORS
```

**Solution :** Vérifiez que `server.js` contient :
```javascript
app.use(cors({
    origin: '*',  // Permet tous les domaines
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Backend ne démarre pas

**Vérifiez les logs Render :**
1. Dashboard → Votre service → Logs
2. Cherchez les erreurs rouges
3. Erreur commune : Port déjà utilisé
   - Solution : Render utilise automatiquement `process.env.PORT`

### Données ne se sauvegardent pas

**Vérifiez que le dossier existe :**
```javascript
// Dans server.js
const DATA_DIR = path.join(__dirname, 'server-data');
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}
```

---

## 🚀 Prochaines Étapes

Une fois tout fonctionnel :

1. ✅ Testez l'inscription depuis plusieurs PC
2. ✅ Testez l'AI assistant (les conversations sont sauvegardées)
3. ✅ Vérifiez admin.html pour voir toutes les données
4. ✅ Partagez le lien à vos amis : https://degdamentals.github.io/Crispin/
5. ✅ Surveillez les logs Render pour voir l'activité

---

## 📞 Support

**Dashboard Render :** https://dashboard.render.com
**Documentation Render :** https://render.com/docs
**Votre Repository :** https://github.com/degdamentals/Crispin

---

🎉 **Félicitations ! Votre site est maintenant en ligne et accessible à tous !**
