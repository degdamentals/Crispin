// ===================================
// DONNÉES PRODUITS
// ===================================

const products = [
    // COLLES
    {
        id: 1,
        name: "Colle Extra-Forte Pro",
        category: "colles",
        description: "Adhésif polyvalent haute performance pour tous matériaux",
        price: 24.90,
        unit: "/ litre",
        badge: "Bestseller"
    },
    {
        id: 2,
        name: "Colle Néoprène Premium",
        category: "colles",
        description: "Solution professionnelle pour assemblages flexibles",
        price: 32.50,
        unit: "/ 5L",
        badge: null
    },
    {
        id: 3,
        name: "Colle Contact Rapide",
        category: "colles",
        description: "Séchage ultra-rapide, idéal pour production intensive",
        price: 18.90,
        unit: "/ litre",
        badge: "Nouveau"
    },
    {
        id: 4,
        name: "Colle PU Structurale",
        category: "colles",
        description: "Polyuréthane pour assemblages structuraux exigeants",
        price: 45.00,
        unit: "/ 5L",
        badge: null
    },
    {
        id: 5,
        name: "Colle Époxy Bi-composant",
        category: "colles",
        description: "Résistance exceptionnelle pour applications industrielles",
        price: 38.90,
        unit: "/ kit",
        badge: null
    },
    {
        id: 6,
        name: "Colle Hot-Melt Industriel",
        category: "colles",
        description: "Bâtons thermofusibles pour pistolets professionnels",
        price: 29.90,
        unit: "/ 5kg",
        badge: null
    },

    // TEINTURES
    {
        id: 7,
        name: "Teinture Cuir Aniline",
        category: "teintures",
        description: "Pigments premium pour cuirs de haute qualité",
        price: 35.00,
        unit: "/ litre",
        badge: "Premium"
    },
    {
        id: 8,
        name: "Teinture Textile Professionnelle",
        category: "teintures",
        description: "Colorants textiles résistants au lavage",
        price: 22.50,
        unit: "/ litre",
        badge: null
    },
    {
        id: 9,
        name: "Teinture Bois Aqua",
        category: "teintures",
        description: "Gamme complète de teintes à base d'eau",
        price: 28.90,
        unit: "/ litre",
        badge: "Éco"
    },
    {
        id: 10,
        name: "Pigments Universels",
        category: "teintures",
        description: "Concentrés colorants pour toutes applications",
        price: 42.00,
        unit: "/ kit 12 teintes",
        badge: null
    },
    {
        id: 11,
        name: "Teinture Vinyle Marine",
        category: "teintures",
        description: "Spécial nautisme, résistance UV et sel",
        price: 48.50,
        unit: "/ litre",
        badge: null
    },
    {
        id: 12,
        name: "Teinture Daim & Nubuck",
        category: "teintures",
        description: "Formule spéciale pour cuirs velours",
        price: 31.90,
        unit: "/ 500ml",
        badge: "Nouveau"
    },

    // RENFORTS
    {
        id: 13,
        name: "Renfort Fibre de Verre",
        category: "renforts",
        description: "Tissu de verre haute résistance 200g/m²",
        price: 12.50,
        unit: "/ m²",
        badge: null
    },
    {
        id: 14,
        name: "Renfort Carbone Pro",
        category: "renforts",
        description: "Tissu carbone 3K twill pour performances extrêmes",
        price: 45.00,
        unit: "/ m²",
        badge: "Premium"
    },
    {
        id: 15,
        name: "Bande Kevlar Aramide",
        category: "renforts",
        description: "Renfort ultra-résistant pour zones critiques",
        price: 38.90,
        unit: "/ rouleau 10m",
        badge: null
    },
    {
        id: 16,
        name: "Non-tissé Thermocollant",
        category: "renforts",
        description: "Entoilage professionnel thermo-activé",
        price: 8.90,
        unit: "/ m²",
        badge: "Bestseller"
    },
    {
        id: 17,
        name: "Renfort Polyester Tissé",
        category: "renforts",
        description: "Armature polyester pour stratification",
        price: 15.50,
        unit: "/ m²",
        badge: null
    },
    {
        id: 18,
        name: "Mat de Verre 300g",
        category: "renforts",
        description: "Mat de fibres coupées pour moulage",
        price: 9.90,
        unit: "/ m²",
        badge: null
    },

    // MACHINES
    {
        id: 19,
        name: "Pistolet Thermocollage Pro",
        category: "machines",
        description: "Station professionnelle 500W avec régulation",
        price: 189.00,
        unit: "",
        badge: "Pro"
    },
    {
        id: 20,
        name: "Refendeuse de Précision",
        category: "machines",
        description: "Machine de coupe industrielle programmable",
        price: 2890.00,
        unit: "",
        badge: null
    },
    {
        id: 21,
        name: "Presse à Chaud 40x50cm",
        category: "machines",
        description: "Thermopress professionnel digital",
        price: 1250.00,
        unit: "",
        badge: null
    },
    {
        id: 22,
        name: "Applicateur Colle Pneumatique",
        category: "machines",
        description: "Pistolet à colle pneumatique haute cadence",
        price: 385.00,
        unit: "",
        badge: "Nouveau"
    },
    {
        id: 23,
        name: "Table de Découpe Laser",
        category: "machines",
        description: "Découpe laser CO2 100W professionnelle",
        price: 8500.00,
        unit: "",
        badge: "Premium"
    },
    {
        id: 24,
        name: "Séchoir Infrarouge Mobile",
        category: "machines",
        description: "Système de séchage IR à ondes courtes",
        price: 645.00,
        unit: "",
        badge: null
    }
];

// ===================================
// PANIER
// ===================================

let cart = [];

// ===================================
// INITIALISATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
    loadCart();
});

// ===================================
// RENDU DES PRODUITS
// ===================================

function renderProducts(filter = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    const filteredProducts = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });

    // Animation d'apparition
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            }, index * 50);
        });
    }, 10);
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = product.category;
    card.dataset.id = product.id;

    const badgeHTML = product.badge
        ? `<span class="product-badge">${product.badge}</span>`
        : '';

    card.innerHTML = `
        <div class="product-image">
            ${badgeHTML}
            <div class="product-icon">
                ${getProductIcon(product.category)}
            </div>
        </div>
        <div class="product-info">
            <div class="product-category">${getCategoryName(product.category)}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <div>
                    <span class="product-price">${product.price.toFixed(2)} €</span>
                    <span class="product-price-unit">${product.unit}</span>
                </div>
                <button class="add-to-cart" data-product-id="${product.id}">
                    Ajouter
                </button>
            </div>
        </div>
    `;

    // Clic sur la carte entière = aller vers la page produit
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        window.location.href = `products/product-template.html?id=${product.id}`;
    });

    // Attacher l'événement au bouton "Ajouter" (empêcher la propagation)
    const addButton = card.querySelector('.add-to-cart');
    addButton.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('🖱️ Clic sur bouton Ajouter, productId:', product.id);
        addToCart(product.id);
    });

    return card;
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

function getCategoryName(category) {
    const names = {
        colles: 'Colles',
        teintures: 'Teintures',
        renforts: 'Renforts',
        machines: 'Machines'
    };
    return names[category] || category;
}

// ===================================
// FILTRAGE DES PRODUITS
// ===================================

function filterProducts(category) {
    renderProducts(category);

    // Mettre à jour les boutons actifs
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const activeBtn = document.querySelector(`[data-filter="${category}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // Scroll vers les produits
    document.getElementById('produits').scrollIntoView({ behavior: 'smooth' });
}

// ===================================
// GESTION DU PANIER
// ===================================

function addToCart(productId) {
    console.log('🛒 addToCart appelé avec productId:', productId);

    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error('❌ Produit non trouvé:', productId);
        return;
    }

    console.log('✅ Produit trouvé:', product.name);

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
        console.log('📦 Quantité augmentée:', existingItem.quantity);
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
        console.log('➕ Nouveau produit ajouté au panier');
    }

    console.log('🛒 Panier actuel:', cart);
    console.log('📊 Total articles:', cart.reduce((sum, item) => sum + item.quantity, 0));

    updateCart();
    saveCart();
    showCartNotification();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCart();
        saveCart();
    }
}

function updateCart() {
    // Mettre à jour le compteur
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    console.log('🔄 updateCart - Total articles:', totalItems);

    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
        cartCountEl.textContent = totalItems;
        console.log('✅ Compteur mis à jour:', totalItems);
    } else {
        console.error('❌ Élément cartCount introuvable dans le DOM');
    }

    // Mettre à jour le modal
    updateCartModal();
}

function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    // Si les éléments n'existent pas (ex: on n'est pas sur la page avec le modal), on sort
    if (!cartItems || !cartTotal) {
        return;
    }

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
        cartTotal.textContent = '0,00 €';
        return;
    }

    let total = 0;
    cartItems.innerHTML = '';

    cart.forEach(item => {
        // Get full product data
        const product = products.find(p => p.id === item.id);
        if (!product) return;

        const itemTotal = product.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <div class="product-icon" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: var(--primary);">
                    ${getProductIcon(product.category)}
                </div>
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${product.name}</div>
                <div class="cart-item-price">${product.price.toFixed(2)} € ${product.unit}</div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateQuantity(${product.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${product.id}, 1)">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${product.id})">✕</button>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = total.toFixed(2).replace('.', ',') + ' €';
}

function showCartNotification() {
    const cartBtn = document.getElementById('cartBtn');
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
    }, 200);
}

// ===================================
// SAUVEGARDE LOCALE
// ===================================

function saveCart() {
    console.log('💾 Sauvegarde du panier:', cart);
    localStorage.setItem('crispinCart', JSON.stringify(cart));
    console.log('✅ Panier sauvegardé dans localStorage');
}

function loadCart() {
    console.log('📖 Chargement du panier depuis localStorage...');
    const savedCart = localStorage.getItem('crispinCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        console.log('✅ Panier chargé:', cart);
        updateCart();
    } else {
        console.log('ℹ️ Aucun panier sauvegardé trouvé');
    }
}

// ===================================
// ÉVÉNEMENTS
// ===================================

function setupEventListeners() {
    // Modal panier
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');

    cartBtn.addEventListener('click', () => {
        window.location.href = 'cart.html';
    });

    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });

    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });

    // Filtres produits
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            filterProducts(filter);
        });
    });

    // Smooth scroll pour les liens
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation du header au scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        }

        lastScroll = currentScroll;
    });

    // Animation des statistiques au scroll
    animateStats();

    // Carrousel des produits phares
    initFeaturedCarousel();
}

// ===================================
// ANIMATION DES STATS
// ===================================

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateNumber(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOutQuad = progress * (2 - progress);
        const current = Math.floor(start + (end - start) * easeOutQuad);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = end;
        }
    }

    requestAnimationFrame(update);
}

// ===================================
// CARROUSEL PRODUITS PHARES
// ===================================

let carouselPosition = 0;

function initFeaturedCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    if (!carouselTrack) return;

    // Produits avec badge (bestsellers, nouveaux, etc.)
    const featuredProducts = products.filter(p => p.badge).slice(0, 8);

    featuredProducts.forEach(product => {
        const card = createProductCard(product);
        card.style.minWidth = '280px';
        card.style.flex = '0 0 280px';
        carouselTrack.appendChild(card);
    });
}

function slideCarousel(direction) {
    const track = document.getElementById('carouselTrack');
    const cardWidth = 280 + 32; // largeur + gap
    const visibleCards = Math.floor(track.parentElement.offsetWidth / cardWidth);
    const maxPosition = Math.max(0, track.children.length - visibleCards);

    carouselPosition += direction;
    carouselPosition = Math.max(0, Math.min(carouselPosition, maxPosition));

    const offset = -carouselPosition * cardWidth;
    track.style.transform = `translateX(${offset}px)`;
}

// ===================================
// RECHERCHE FONCTIONNELLE
// ===================================

function setupSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearch = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    // Ouvrir la recherche
    searchBtn.addEventListener('click', () => {
        searchModal.classList.add('active');
        setTimeout(() => searchInput.focus(), 100);
    });

    // Fermer la recherche
    closeSearch.addEventListener('click', () => {
        searchModal.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '<div class="search-suggestions"><p class="search-hint">💡 Tapez pour rechercher parmi nos 1000+ produits</p></div>';
    });

    searchOverlay.addEventListener('click', () => {
        searchModal.classList.remove('active');
    });

    // Recherche en temps réel
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query.length === 0) {
            searchResults.innerHTML = '<div class="search-suggestions"><p class="search-hint">💡 Tapez pour rechercher parmi nos 1000+ produits</p></div>';
            return;
        }

        const results = products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );

        displaySearchResults(results, query);
    });

    // Raccourci clavier ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            searchModal.classList.remove('active');
        }
        // Ctrl+K ou Cmd+K pour ouvrir la recherche
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchModal.classList.add('active');
            setTimeout(() => searchInput.focus(), 100);
        }
    });
}

function displaySearchResults(results, query) {
    const searchResults = document.getElementById('searchResults');

    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <h3>Aucun résultat pour "${query}"</h3>
                <p>Essayez avec d'autres mots-clés ou parcourez nos catégories</p>
            </div>
        `;
        return;
    }

    searchResults.innerHTML = results.map(product => `
        <div class="search-result-item" onclick="goToProduct(${product.id})">
            <div class="search-result-image">
                ${getProductIcon(product.category)}
            </div>
            <div class="search-result-info">
                <div class="search-result-name">${highlightQuery(product.name, query)}</div>
                <div class="search-result-category">${getCategoryName(product.category)}</div>
            </div>
            <div class="search-result-price">${product.price.toFixed(2)} €</div>
        </div>
    `).join('');
}

function highlightQuery(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background: var(--primary); color: var(--white); padding: 2px 4px; border-radius: 3px;">$1</mark>');
}

function goToProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

function quickSearch(category) {
    document.getElementById('searchInput').value = category;
    document.getElementById('searchInput').dispatchEvent(new Event('input'));
}

// ===================================
// FORMULAIRE DE CONTACT
// ===================================

function setupContactForm() {
    const contactModal = document.getElementById('contactModal');
    const closeContact = document.getElementById('closeContact');
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');

    // Fermer le modal
    if (closeContact) {
        closeContact.addEventListener('click', () => {
            contactModal.classList.remove('active');
            resetContactForm();
        });
    }

    // Fermer en cliquant en dehors
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            contactModal.classList.remove('active');
            resetContactForm();
        }
    });

    // Soumettre le formulaire
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Récupérer les données du formulaire
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Validation
            if (!data.consent) {
                alert('Vous devez accepter d\'être contacté pour envoyer le formulaire.');
                return;
            }

            // Simulation d'envoi (remplacer par vraie API)
            try {
                // Simuler un délai d'envoi
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Afficher succès
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';

                // Log les données (pour demo)
                console.log('Formulaire soumis:', data);

                // Réinitialiser après 3 secondes
                setTimeout(() => {
                    contactModal.classList.remove('active');
                    resetContactForm();
                }, 3000);

            } catch (error) {
                // Afficher erreur
                contactForm.style.display = 'none';
                formError.style.display = 'block';

                setTimeout(() => {
                    resetContactForm();
                }, 3000);
            }
        });
    }
}

function resetContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');

    if (contactForm) {
        contactForm.reset();
        contactForm.style.display = 'flex';
    }
    if (formSuccess) formSuccess.style.display = 'none';
    if (formError) formError.style.display = 'none';
}

function openContactModal() {
    const contactModal = document.getElementById('contactModal');
    if (contactModal) {
        contactModal.classList.add('active');
    }
}

// ===================================
// PARTICULES CANVAS
// ===================================

function setupParticles() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    // Réduire le nombre de particules pour meilleures performances
    const particleCount = 30; // 50 → 30
    const maxDistance = 150;
    const maxDistanceSquared = maxDistance * maxDistance; // Éviter sqrt()

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(252, 76, 2, 0.3)';
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    let frame = 0;
    function animateParticles() {
        // Limiter à 30 FPS pour meilleures performances
        frame++;
        if (frame % 2 !== 0) {
            requestAnimationFrame(animateParticles);
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dessiner les particules
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Dessiner les lignes entre particules proches (optimisé)
        // Limiter le nombre de connexions pour Edge/Firefox
        for (let i = 0; i < particles.length; i++) {
            let connectionsCount = 0;
            const maxConnections = 3; // Maximum 3 connexions par particule

            for (let j = i + 1; j < particles.length; j++) {
                if (connectionsCount >= maxConnections) break;

                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distanceSquared = dx * dx + dy * dy; // Éviter sqrt() coûteux

                if (distanceSquared < maxDistanceSquared) {
                    const distance = Math.sqrt(distanceSquared); // Calculer seulement si nécessaire
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(252, 76, 2, ${0.2 - distance / 750})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    connectionsCount++;
                }
            }
        }

        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Throttle resize event
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }, 250);
    });
}

// ===================================
// ANIMATIONS DE SCROLL
// ===================================

function setupScrollAnimations() {
    // Barre de progression
    const scrollProgress = document.getElementById('scrollProgress');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = progress + '%';
        }
    });

    // Révéler les éléments au scroll
    const revealElements = document.querySelectorAll('[data-scroll-reveal]');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Animer les grilles de catégories
    const categoriesGrid = document.querySelector('.categories-grid');
    if (categoriesGrid) {
        const gridObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.2 });

        gridObserver.observe(categoriesGrid);
    }

    // Effet parallax
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(el => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===================================
// BOUTONS MAGNÉTIQUES
// ===================================

function setupMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// Initialiser toutes les nouvelles fonctionnalités
document.addEventListener('DOMContentLoaded', () => {
    setupSearch();
    setupContactForm();
    setupParticles();
    setupScrollAnimations();
    setupMagneticButtons();
});

// Exposer les fonctions globalement pour les onclick
window.filterProducts = filterProducts;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.slideCarousel = slideCarousel;
window.quickSearch = quickSearch;
window.goToProduct = goToProduct;
window.openContactModal = openContactModal;
