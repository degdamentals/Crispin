// Product Page JavaScript - Crispin La Boutique

// Product data (same as main site)
const products = [
    // COLLES
    { id: 1, name: "Colle Extra-Forte Pro", category: "colles", description: "Adhésif polyvalent haute performance pour tous matériaux", price: 24.90, unit: "/ litre", badge: "Bestseller" },
    { id: 2, name: "Colle Néoprène Premium", category: "colles", description: "Solution professionnelle pour assemblages flexibles", price: 32.50, unit: "/ 5L", badge: null },
    { id: 3, name: "Colle Contact Rapide", category: "colles", description: "Séchage ultra-rapide, idéal pour production intensive", price: 18.90, unit: "/ litre", badge: "Nouveau" },
    { id: 4, name: "Colle PU Structurale", category: "colles", description: "Polyuréthane pour assemblages structuraux exigeants", price: 45.00, unit: "/ 5L", badge: null },
    { id: 5, name: "Colle Époxy Bi-composant", category: "colles", description: "Résistance exceptionnelle pour applications industrielles", price: 38.90, unit: "/ kit", badge: null },
    { id: 6, name: "Colle Hot-Melt Industriel", category: "colles", description: "Bâtons thermofusibles pour pistolets professionnels", price: 29.90, unit: "/ 5kg", badge: null },
    // TEINTURES
    { id: 7, name: "Teinture Cuir Aniline", category: "teintures", description: "Pigments premium pour cuirs de haute qualité", price: 35.00, unit: "/ litre", badge: "Premium" },
    { id: 8, name: "Teinture Textile Professionnelle", category: "teintures", description: "Colorants textiles résistants au lavage", price: 22.50, unit: "/ litre", badge: null },
    { id: 9, name: "Teinture Bois Aqua", category: "teintures", description: "Gamme complète de teintes à base d'eau", price: 28.90, unit: "/ litre", badge: "Éco" },
    { id: 10, name: "Pigments Universels", category: "teintures", description: "Concentrés colorants pour toutes applications", price: 42.00, unit: "/ kit 12 teintes", badge: null },
    { id: 11, name: "Teinture Vinyle Marine", category: "teintures", description: "Spécial nautisme, résistance UV et sel", price: 48.50, unit: "/ litre", badge: null },
    { id: 12, name: "Teinture Daim & Nubuck", category: "teintures", description: "Formule spéciale pour cuirs velours", price: 31.90, unit: "/ 500ml", badge: "Nouveau" },
    // RENFORTS
    { id: 13, name: "Renfort Fibre de Verre", category: "renforts", description: "Tissu de verre haute résistance 200g/m²", price: 12.50, unit: "/ m²", badge: null },
    { id: 14, name: "Renfort Carbone Pro", category: "renforts", description: "Tissu carbone 3K twill pour performances extrêmes", price: 45.00, unit: "/ m²", badge: "Premium" },
    { id: 15, name: "Bande Kevlar Aramide", category: "renforts", description: "Renfort ultra-résistant pour zones critiques", price: 38.90, unit: "/ rouleau 10m", badge: null },
    { id: 16, name: "Non-tissé Thermocollant", category: "renforts", description: "Entoilage professionnel thermo-activé", price: 8.90, unit: "/ m²", badge: "Bestseller" },
    { id: 17, name: "Renfort Polyester Tissé", category: "renforts", description: "Armature polyester pour stratification", price: 15.50, unit: "/ m²", badge: null },
    { id: 18, name: "Mat de Verre 300g", category: "renforts", description: "Mat de fibres coupées pour moulage", price: 9.90, unit: "/ m²", badge: null },
    // MACHINES
    { id: 19, name: "Pistolet Thermocollage Pro", category: "machines", description: "Station professionnelle 500W avec régulation", price: 189.00, unit: "", badge: "Pro" },
    { id: 20, name: "Refendeuse de Précision", category: "machines", description: "Machine de coupe industrielle programmable", price: 2890.00, unit: "", badge: null },
    { id: 21, name: "Presse à Chaud 40x50cm", category: "machines", description: "Thermopress professionnel digital", price: 1250.00, unit: "", badge: null },
    { id: 22, name: "Applicateur Colle Pneumatique", category: "machines", description: "Pistolet à colle pneumatique haute cadence", price: 385.00, unit: "", badge: "Nouveau" },
    { id: 23, name: "Table de Découpe Laser", category: "machines", description: "Découpe laser CO2 100W professionnelle", price: 8500.00, unit: "", badge: "Premium" },
    { id: 24, name: "Séchoir Infrarouge Mobile", category: "machines", description: "Système de séchage IR à ondes courtes", price: 645.00, unit: "", badge: null }
];

// Extended product details
const productDetails = {
    1: {
        detailedDescription: "La Colle Extra-Forte Pro est notre solution d'adhésion la plus polyvalente. Formulée avec des polymères de dernière génération, elle offre une prise rapide et une résistance exceptionnelle sur tous types de matériaux : bois, métal, plastique, céramique et plus encore. Idéale pour les professionnels exigeants.",
        features: [
            "Adhérence universelle sur tous matériaux",
            "Prise rapide en 30 secondes",
            "Résistance aux températures extrêmes (-40°C à +120°C)",
            "Sans solvants nocifs",
            "Conditionnement professionnel 1L"
        ],
        specs: {
            "Type": "Colle polyvalente polymère",
            "Viscosité": "2500 mPa.s",
            "Temps de prise": "30 secondes",
            "Résistance finale": "24 heures",
            "Température d'application": "5°C à 35°C",
            "Couleur": "Transparent",
            "Conditionnement": "1 litre",
            "Durée de conservation": "18 mois"
        }
    }
    // Add more product details as needed
};

// Current product and cart
let currentProduct = null;
let cart = [];
let quantity = 1;

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadProductFromURL();
    setupQuantityControls();
    setupAddToCart();
    setupTabs();
    loadCart();
    updateCartCount();
});

// Load product based on URL parameter
function loadProductFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    if (productId) {
        currentProduct = products.find(p => p.id === productId);
        if (currentProduct) {
            displayProduct(currentProduct);
            loadRelatedProducts(currentProduct);
            return;
        }
    }

    // If no valid product, redirect to main page
    window.location.href = '../index.html';
}

// Display product information
function displayProduct(product) {
    // Set page title
    document.title = `${product.name} - Crispin La Boutique`;

    // Breadcrumb
    document.getElementById('breadcrumbCategory').textContent = getCategoryName(product.category);
    document.getElementById('breadcrumbProduct').textContent = product.name;

    // Main image
    const mainImage = document.getElementById('mainProductImage');
    mainImage.src = `https://www.crispin-industrie.com/wp-content/uploads/2023/03/${getCategoryImage(product.category)}`;
    mainImage.alt = product.name;

    // Badge
    const badge = document.getElementById('productBadge');
    if (product.badge) {
        badge.textContent = product.badge;
        badge.style.display = 'inline-block';
    } else {
        badge.style.display = 'none';
    }

    // Product info
    document.getElementById('productCategory').textContent = getCategoryName(product.category);
    document.getElementById('productTitle').textContent = product.name;
    document.getElementById('productPrice').textContent = product.price.toFixed(2) + ' €';
    document.getElementById('productUnit').textContent = product.unit;
    document.getElementById('productDescription').textContent = product.description;

    // Features
    const details = productDetails[product.id];
    if (details && details.features) {
        const featuresEl = document.getElementById('productFeatures');
        featuresEl.innerHTML = '<ul>' + details.features.map(f => `<li>${f}</li>`).join('') + '</ul>';
    }

    // Detailed description
    if (details && details.detailedDescription) {
        document.getElementById('detailDescription').innerHTML = `<p>${details.detailedDescription}</p>`;
    } else {
        document.getElementById('detailDescription').innerHTML = `<p>${product.description}</p>`;
    }

    // Specifications
    if (details && details.specs) {
        const specsGrid = document.getElementById('specsGrid');
        specsGrid.innerHTML = Object.entries(details.specs).map(([key, value]) => `
            <div class="spec-item">
                <div class="spec-label">${key}</div>
                <div class="spec-value">${value}</div>
            </div>
        `).join('');
    }

    // Reviews (mock data)
    displayReviews();
}

// Display mock reviews
function displayReviews() {
    const reviewsList = document.getElementById('reviewsList');
    const mockReviews = [
        { author: "Jean D.", stars: 5, date: "Il y a 2 jours", content: "Excellente qualité, exactement ce que je cherchais pour mon atelier. Livraison rapide." },
        { author: "Marie L.", stars: 5, date: "Il y a 1 semaine", content: "Produit professionnel, conforme à la description. Je recommande vivement." },
        { author: "Pierre M.", stars: 4, date: "Il y a 2 semaines", content: "Très bon produit, prix compétitif. Petit bémol sur l'emballage mais rien de grave." }
    ];

    reviewsList.innerHTML = mockReviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div class="review-author">${review.author}</div>
                <div class="review-stars">${'★'.repeat(review.stars)}${'☆'.repeat(5-review.stars)}</div>
            </div>
            <div class="review-date">${review.date}</div>
            <div class="review-content">${review.content}</div>
        </div>
    `).join('');
}

// Load related products
function loadRelatedProducts(product) {
    const relatedContainer = document.getElementById('relatedProducts');
    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    relatedContainer.innerHTML = relatedProducts.map(p => `
        <div class="product-card" onclick="goToProduct(${p.id})">
            <div class="product-image">
                ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
                <div class="product-icon">
                    ${getProductIcon(p.category)}
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryName(p.category)}</div>
                <h3 class="product-name">${p.name}</h3>
                <p class="product-description">${p.description}</p>
                <div class="product-footer">
                    <div>
                        <span class="product-price">${p.price.toFixed(2)} €</span>
                        <span class="product-price-unit">${p.unit}</span>
                    </div>
                    <button class="add-to-cart" onclick="event.stopPropagation(); quickAddToCart(${p.id})">
                        Ajouter
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup quantity controls
function setupQuantityControls() {
    const quantityInput = document.getElementById('quantity');
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');

    qtyMinus.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantityInput.value = quantity;
        }
    });

    qtyPlus.addEventListener('click', () => {
        if (quantity < 999) {
            quantity++;
            quantityInput.value = quantity;
        }
    });

    quantityInput.addEventListener('change', (e) => {
        const value = parseInt(e.target.value);
        if (value >= 1 && value <= 999) {
            quantity = value;
        } else {
            quantityInput.value = quantity;
        }
    });
}

// Setup add to cart button
function setupAddToCart() {
    const addToCartBtn = document.getElementById('addToCartBtn');
    addToCartBtn.addEventListener('click', () => {
        addToCart(currentProduct.id, quantity);

        // Visual feedback
        const originalText = addToCartBtn.innerHTML;
        addToCartBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Ajouté au panier !';
        addToCartBtn.style.background = '#10b981';

        setTimeout(() => {
            addToCartBtn.innerHTML = originalText;
            addToCartBtn.style.background = '';
        }, 2000);
    });
}

// Add to cart functionality
function addToCart(productId, qty = 1) {
    console.log('🛒 Adding to cart:', productId, 'Quantity:', qty);

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({ id: productId, quantity: qty });
    }

    saveCart();
    updateCartCount();
}

// Quick add to cart (for related products)
function quickAddToCart(productId) {
    addToCart(productId, 1);
    alert('Produit ajouté au panier !');
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('crispinCart', JSON.stringify(cart));
    console.log('💾 Cart saved:', cart);
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('crispinCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        console.log('📖 Cart loaded:', cart);
    }
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
        cartCountEl.textContent = totalItems;
    }
}

// Setup tabs
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;

            // Remove active class from all
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            document.getElementById(`tab-${tabName}`).classList.add('active');
        });
    });
}

// Navigate to product page
function goToProduct(productId) {
    window.location.href = `product-template.html?id=${productId}`;
}

// Cart button navigation
document.getElementById('cartBtn').addEventListener('click', () => {
    window.location.href = '../cart.html';
});

// Helper functions
function getCategoryName(category) {
    const names = {
        colles: 'Colles',
        teintures: 'Teintures',
        renforts: 'Renforts',
        machines: 'Machines'
    };
    return names[category] || category;
}

function getCategoryImage(category) {
    const images = {
        colles: 'colle-forte.jpg',
        teintures: 'teinture-cuir.jpg',
        renforts: 'fibre-verre.jpg',
        machines: 'pistolet.jpg'
    };
    return images[category] || 'placeholder.jpg';
}

function getProductIcon(category) {
    const icons = {
        colles: '<svg viewBox="0 0 100 100"><path d="M40 20 L60 20 L60 70 Q60 80 50 80 Q40 80 40 70 Z" fill="currentColor"/></svg>',
        teintures: '<svg viewBox="0 0 100 100"><circle cx="50" cy="40" r="20" fill="currentColor"/><path d="M35 60 L65 60 L60 80 L40 80 Z" fill="currentColor"/></svg>',
        renforts: '<svg viewBox="0 0 100 100"><rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" stroke-width="8"/><line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" stroke-width="4"/></svg>',
        machines: '<svg viewBox="0 0 100 100"><rect x="25" y="30" width="50" height="40" fill="currentColor"/><circle cx="40" cy="75" r="8" fill="currentColor"/><circle cx="60" cy="75" r="8" fill="currentColor"/></svg>'
    };
    return icons[category] || '';
}

// Expose functions globally
window.goToProduct = goToProduct;
window.quickAddToCart = quickAddToCart;
