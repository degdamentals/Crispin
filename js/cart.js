// Cart Page JavaScript - Crispin La Boutique
// Handle all cart page functionality

// Load cart from localStorage
function getCart() {
    const cart = localStorage.getItem('crispinCart');
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('crispinCart', JSON.stringify(cart));
}

// Product data (same as script.js for recommendations)
const products = [
    // COLLES
    {
        id: 1,
        name: "Colle Extra-Forte Pro",
        category: "colles",
        description: "Adhésif polyvalent haute performance pour tous matériaux",
        price: 24.90,
        unit: "/ litre",
        badge: "Bestseller",
        image: "https://www.crispin-industrie.com/wp-content/uploads/2023/03/colle-forte.jpg"
    },
    {
        id: 2,
        name: "Colle Néoprène Premium",
        category: "colles",
        description: "Solution professionnelle pour assemblages flexibles",
        price: 32.50,
        unit: "/ 5L",
        badge: null,
        image: "https://www.crispin-industrie.com/wp-content/uploads/2023/03/neoprene.jpg"
    },
    {
        id: 3,
        name: "Colle Contact Rapide",
        category: "colles",
        description: "Séchage ultra-rapide, idéal pour production intensive",
        price: 18.90,
        unit: "/ litre",
        badge: "Nouveau",
        image: "https://www.crispin-industrie.com/wp-content/uploads/2023/03/contact.jpg"
    },
    {
        id: 4,
        name: "Colle PU Structurale",
        category: "colles",
        description: "Polyuréthane pour assemblages structuraux exigeants",
        price: 45.00,
        unit: "/ 5L",
        badge: null,
        image: "https://www.crispin-industrie.com/wp-content/uploads/2023/03/pu.jpg"
    },
    {
        id: 5,
        name: "Colle Époxy Bi-composant",
        category: "colles",
        description: "Résistance exceptionnelle pour applications industrielles",
        price: 38.90,
        unit: "/ kit",
        badge: null,
        image: "https://www.crispin-industrie.com/wp-content/uploads/2023/03/epoxy.jpg"
    },
    {
        id: 6,
        name: "Colle Hot-Melt Industriel",
        category: "colles",
        description: "Bâtons thermofusibles pour pistolets professionnels",
        price: 29.90,
        unit: "/ 5kg",
        badge: null,
        image: "https://www.crispin-industrie.com/wp-content/uploads/2023/03/hotmelt.jpg"
    },
    // TEINTURES
    {
        id: 7,
        name: "Teinture Cuir Aniline",
        category: "teintures",
        description: "Pigments premium pour cuirs de haute qualité",
        price: 35.00,
        unit: "/ litre",
        badge: "Premium",
        image: "https://www.crispin-industrie.com/wp-content/uploads/2023/03/teinture-cuir.jpg"
    },
    {
        id: 8,
        name: "Teinture Textile Professionnelle",
        category: "teintures",
        description: "Colorants textiles résistants au lavage",
        price: 22.50,
        unit: "/ litre",
        badge: null,
        image: "https://www.crispin-industrie.com/wp-content/uploads/2023/03/teinture-textile.jpg"
    },
    {
        id: 9,
        name: "Teinture Bois Aqua",
        category: "teintures",
        description: "Gamme complète de teintes à base d'eau",
        price: 28.90,
        unit: "/ litre",
        badge: "Éco",
        image: "https://www.crispin-industrie.com/wp-content/uploads/2023/03/teinture-bois.jpg"
    },
    {
        id: 10,
        name: "Pigments Universels",
        category: "teintures",
        description: "Concentrés colorants pour toutes applications",
        price: 42.00,
        unit: "/ kit 12 teintes",
        badge: null,
        image: "https://www.crispin-industrie.com/wp-content/uploads/2023/03/pigments.jpg"
    },
    {
        id: 11,
        name: "Teinture Vinyle Marine",
        category: "teintures",
        description: "Spécial nautisme, résistance UV et sel",
        price: 48.50,
        unit: "/ litre",
        badge: null,
        image: "https://www.crispin-industrie.com/wp-content/uploads/2023/03/vinyle.jpg"
    },
    {
        id: 12,
        name: "Teinture Daim & Nubuck",
        category: "teintures",
        description: "Formule spéciale pour cuirs velours",
        price: 31.90,
        unit: "/ 500ml",
        badge: "Nouveau",
        image: "https://www.crispin-industrie.com/wp-content/uploads/2023/03/daim.jpg"
    },
    // RENFORTS
    {
        id: 13,
        name: "Renfort Fibre de Verre",
        category: "renforts",
        description: "Tissu de verre haute résistance 200g/m²",
        price: 12.50,
        unit: "/ m²",
        badge: null,
        image: "https://www.crispin-industrie.com/wp-content/uploads/2023/03/fibre-verre.jpg"
    },
    {
        id: 14,
        name: "Renfort Carbone Pro",
        category: "renforts",
        description: "Tissu carbone 3K twill pour performances extrêmes",
        price: 45.00,
        unit: "/ m²",
        badge: "Premium",
        image: "https://www.crispin-industrie.com/wp-content/uploads/2023/03/carbone.jpg"
    },
    {
        id: 15,
        name: "Bande Kevlar Aramide",
        category: "renforts",
        description: "Renfort ultra-résistant pour zones critiques",
        price: 38.90,
        unit: "/ rouleau 10m",
        badge: null,
        image: "https://www.crispin-industrie.com/wp-content/uploads/2023/03/kevlar.jpg"
    },
    {
        id: 16,
        name: "Non-tissé Thermocollant",
        category: "renforts",
        description: "Entoilage professionnel thermo-activé",
        price: 8.90,
        unit: "/ m²",
        badge: "Bestseller",
        image: "https://www.crispin-industrie.com/wp-content/uploads/2023/03/non-tisse.jpg"
    },
    {
        id: 17,
        name: "Renfort Polyester Tissé",
        category: "renforts",
        description: "Armature polyester pour stratification",
        price: 15.50,
        unit: "/ m²",
        badge: null,
        image: "https://www.crispin-industrie.com/wp-content/uploads/2023/03/polyester.jpg"
    },
    {
        id: 18,
        name: "Mat de Verre 300g",
        category: "renforts",
        description: "Mat de fibres coupées pour moulage",
        price: 9.90,
        unit: "/ m²",
        badge: null,
        image: "https://www.crispin-industrie.com/wp-content/uploads/2023/03/mat-verre.jpg"
    },
    // MACHINES
    {
        id: 19,
        name: "Pistolet Thermocollage Pro",
        category: "machines",
        description: "Station professionnelle 500W avec régulation",
        price: 189.00,
        unit: "",
        badge: "Pro",
        image: "https://www.crispin-industrie.com/wp-content/uploads/2023/03/pistolet.jpg"
    },
    {
        id: 20,
        name: "Refendeuse de Précision",
        category: "machines",
        description: "Machine de coupe industrielle programmable",
        price: 2890.00,
        unit: "",
        badge: null,
        image: "https://www.crispin-industrie.com/wp-content/uploads/2023/03/refendeuse.jpg"
    },
    {
        id: 21,
        name: "Presse à Chaud 40x50cm",
        category: "machines",
        description: "Thermopress professionnel digital",
        price: 1250.00,
        unit: "",
        badge: null,
        image: "https://www.crispin-industrie.com/wp-content/uploads/2023/03/presse.jpg"
    },
    {
        id: 22,
        name: "Applicateur Colle Pneumatique",
        category: "machines",
        description: "Pistolet à colle pneumatique haute cadence",
        price: 385.00,
        unit: "",
        badge: "Nouveau",
        image: "https://www.crispin-industrie.com/wp-content/uploads/2023/03/pneumatique.jpg"
    },
    {
        id: 23,
        name: "Table de Découpe Laser",
        category: "machines",
        description: "Découpe laser CO2 100W professionnelle",
        price: 8500.00,
        unit: "",
        badge: "Premium",
        image: "https://www.crispin-industrie.com/wp-content/uploads/2023/03/laser.jpg"
    },
    {
        id: 24,
        name: "Séchoir Infrarouge Mobile",
        category: "machines",
        description: "Système de séchage IR à ondes courtes",
        price: 645.00,
        unit: "",
        badge: null,
        image: "https://www.crispin-industrie.com/wp-content/uploads/2023/03/sechoir.jpg"
    }
];

// Configuration
const TAX_RATE = 0.20; // 20% TVA
const FREE_SHIPPING_THRESHOLD = 200; // Free shipping above 200€
const SHIPPING_COST = 15.00; // Shipping cost below threshold
const PROMO_CODES = {
    'CRISPIN10': { discount: 0.10, type: 'percentage' },
    'WELCOME': { discount: 15, type: 'fixed' },
    'BIENVENUE20': { discount: 0.20, type: 'percentage' }
};

// State - Always reload cart from localStorage on cart page
let cart = getCart();
console.log('🛒 Panier chargé depuis localStorage:', cart);

let appliedPromoCode = null;
let promoDiscount = 0;

// Initialize cart page
function initCartPage() {
    // Force reload cart from localStorage
    cart = getCart();
    console.log('🔄 Panier rechargé:', cart);

    renderCart();
    setupEventListeners();
    renderRecommendations();
    startUrgencyTimer();
}

// Render cart items
function renderCart() {
    const cartContainer = document.getElementById('cartItems');
    const emptyState = document.getElementById('emptyCart');
    const cartContent = document.getElementById('cartContent');

    if (cart.length === 0) {
        emptyState.style.display = 'flex';
        cartContent.style.display = 'none';
        return;
    }

    emptyState.style.display = 'none';
    cartContent.style.display = 'block';

    cartContainer.innerHTML = cart.map((item, index) => {
        const product = products.find(p => p.id === item.id);
        if (!product) return '';

        const itemTotal = product.price * item.quantity;

        return `
            <div class="cart-item-card" data-index="${index}">
                <div class="item-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/120x120/FC4C02/FFFFFF?text=Produit'">
                </div>
                <div class="item-details">
                    <h3 class="item-name">${product.name}</h3>
                    <p class="item-category">${getCategoryName(product.category)}</p>
                    <p class="item-price">${product.price.toFixed(2)} € / ${product.unit}</p>
                </div>
                <div class="item-actions">
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQuantity(${index}, -1)" aria-label="Diminuer la quantité">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                        <input type="number" class="qty-input" value="${item.quantity}" min="1" max="999"
                               onchange="setQuantity(${index}, this.value)" aria-label="Quantité">
                        <button class="qty-btn" onclick="updateQuantity(${index}, 1)" aria-label="Augmenter la quantité">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                    </div>
                    <div class="item-total">
                        <span class="total-label">Total:</span>
                        <span class="total-price">${itemTotal.toFixed(2)} €</span>
                    </div>
                    <button class="remove-btn" onclick="removeItem(${index})" aria-label="Retirer du panier">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                        Retirer
                    </button>
                </div>
            </div>
        `;
    }).join('');

    updateSummary();
}

// Update item quantity
function updateQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity = Math.max(1, Math.min(999, cart[index].quantity + change));
        saveCart(cart);
        renderCart();
    }
}

// Set item quantity directly
function setQuantity(index, value) {
    const quantity = parseInt(value);
    if (cart[index] && quantity >= 1 && quantity <= 999) {
        cart[index].quantity = quantity;
        saveCart(cart);
        renderCart();
    }
}

// Remove item from cart
function removeItem(index) {
    if (confirm('Êtes-vous sûr de vouloir retirer cet article du panier ?')) {
        cart.splice(index, 1);
        saveCart(cart);
        renderCart();

        // Update cart count in header if on same page
        if (typeof updateCartCount === 'function') {
            updateCartCount();
        }
    }
}

// Calculate subtotal
function calculateSubtotal() {
    return cart.reduce((total, item) => {
        const product = products.find(p => p.id === item.id);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
}

// Update summary sidebar
function updateSummary() {
    const subtotal = calculateSubtotal();
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const subtotalWithDiscount = subtotal - promoDiscount;
    const tax = subtotalWithDiscount * TAX_RATE;
    const total = subtotalWithDiscount + tax + shipping;

    // Update displayed values
    document.getElementById('subtotalAmount').textContent = subtotal.toFixed(2) + ' €';
    document.getElementById('taxAmount').textContent = tax.toFixed(2) + ' €';
    document.getElementById('shippingAmount').textContent = shipping === 0 ? 'Gratuite' : shipping.toFixed(2) + ' €';
    document.getElementById('totalAmount').textContent = total.toFixed(2) + ' €';

    // Update discount display
    const discountRow = document.querySelector('.discount-row');
    if (promoDiscount > 0) {
        discountRow.style.display = 'flex';
        document.getElementById('discountAmount').textContent = '-' + promoDiscount.toFixed(2) + ' €';
    } else {
        discountRow.style.display = 'none';
    }

    // Update shipping progress
    updateShippingProgress(subtotal);
}

// Update shipping progress bar
function updateShippingProgress(subtotal) {
    const progressBar = document.getElementById('shippingProgress');
    const message = document.getElementById('shippingMessage');

    const percentage = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
    progressBar.style.width = percentage + '%';

    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
        message.innerHTML = '<strong style="color: var(--success);">🎉 Vous bénéficiez de la livraison gratuite !</strong>';
    } else {
        const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
        message.innerHTML = `Plus que <strong>${remaining.toFixed(2)} €</strong> pour la livraison gratuite !`;
    }
}

// Apply promo code
function applyPromoCode() {
    const input = document.getElementById('promoInput');
    const code = input.value.trim().toUpperCase();
    const feedback = document.getElementById('promoFeedback');

    if (!code) {
        showPromoFeedback('Veuillez entrer un code promo', 'error');
        return;
    }

    if (PROMO_CODES[code]) {
        const promo = PROMO_CODES[code];
        appliedPromoCode = code;

        const subtotal = calculateSubtotal();
        if (promo.type === 'percentage') {
            promoDiscount = subtotal * promo.discount;
        } else {
            promoDiscount = promo.discount;
        }

        showPromoFeedback(`✓ Code "${code}" appliqué avec succès !`, 'success');
        input.value = '';
        input.disabled = true;
        document.querySelector('.promo-apply-btn').disabled = true;

        updateSummary();
    } else {
        showPromoFeedback('Code promo invalide', 'error');
    }
}

// Show promo feedback
function showPromoFeedback(message, type) {
    const feedback = document.getElementById('promoFeedback');
    feedback.textContent = message;
    feedback.className = 'promo-feedback ' + type;
    feedback.style.display = 'block';

    if (type === 'error') {
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 3000);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Promo code
    const promoBtn = document.querySelector('.promo-apply-btn');
    const promoInput = document.getElementById('promoInput');

    if (promoBtn) {
        promoBtn.addEventListener('click', applyPromoCode);
    }

    if (promoInput) {
        promoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                applyPromoCode();
            }
        });
    }

    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', proceedToCheckout);
    }

    // Continue shopping
    const continueBtn = document.getElementById('continueShopping');
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            window.location.href = 'index.html#produits';
        });
    }
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Votre panier est vide');
        return;
    }

    // Here you would typically redirect to a checkout page
    // For now, we'll show an alert
    alert('Fonctionnalité de paiement en cours de développement.\n\nVotre commande sera bientôt traitée !');

    // In a real implementation:
    // window.location.href = 'checkout.html';
}

// Get category display name
function getCategoryName(category) {
    const categories = {
        'cereales': 'Céréales',
        'oleagineux': 'Oléagineux',
        'proteagineux': 'Protéagineux',
        'fourrage': 'Fourrage'
    };
    return categories[category] || category;
}

// Render product recommendations
function renderRecommendations() {
    const container = document.getElementById('recommendationsGrid');
    if (!container) return;

    // Get random products not in cart
    const cartProductIds = cart.map(item => item.id);
    const availableProducts = products.filter(p => !cartProductIds.includes(p.id));
    const recommendations = availableProducts
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

    container.innerHTML = recommendations.map(product => `
        <div class="recommendation-card">
            <div class="recommendation-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/200x200/FC4C02/FFFFFF?text=Produit'">
            </div>
            <div class="recommendation-content">
                <h4 class="recommendation-name">${product.name}</h4>
                <p class="recommendation-category">${getCategoryName(product.category)}</p>
                <div class="recommendation-footer">
                    <span class="recommendation-price">${product.price.toFixed(2)} € / ${product.unit}</span>
                    <button class="recommendation-add-btn" onclick="addRecommendationToCart(${product.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Ajouter
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add recommendation to cart
function addRecommendationToCart(productId) {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    saveCart(cart);
    renderCart();
    renderRecommendations();

    // Show feedback
    const btn = event.target.closest('.recommendation-add-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Ajouté';
    btn.style.backgroundColor = 'var(--success)';

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.backgroundColor = '';
    }, 1500);
}

// Start urgency timer
function startUrgencyTimer() {
    const timerElement = document.getElementById('urgencyTimer');
    if (!timerElement) return;

    let minutes = 14;
    let seconds = 59;

    setInterval(() => {
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
            if (minutes < 0) {
                minutes = 14;
                seconds = 59;
            }
        }

        const displayMinutes = String(minutes).padStart(2, '0');
        const displaySeconds = String(seconds).padStart(2, '0');
        timerElement.textContent = `${displayMinutes}:${displaySeconds}`;
    }, 1000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initCartPage);
