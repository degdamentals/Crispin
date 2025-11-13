// Configuration - Crispin La Boutique
// Détecte automatiquement l'environnement (local ou production)

const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

const CONFIG = {
    // URL de l'API backend
    API_URL: isProduction
        ? 'https://crispin.onrender.com/api'  // ✅ URL de production Render
        : 'http://localhost:4000/api',

    // Autres configurations
    IS_PRODUCTION: isProduction,
    SITE_NAME: 'Crispin La Boutique',
    VERSION: '1.0.0'
};

// Log pour debug
console.log('🌍 Environnement:', isProduction ? 'PRODUCTION' : 'LOCAL');
console.log('🔗 API URL:', CONFIG.API_URL);
