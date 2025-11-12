// ===================================
// PRODUCT DETAIL PAGE SCRIPT
// ===================================

let currentProduct = null;

// Charger le produit depuis l'URL
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    if (productId && products) {
        currentProduct = products.find(p => p.id === productId);
        if (currentProduct) {
            loadProductDetail(currentProduct);
            loadRelatedProducts(currentProduct.category);
        }
    }

    setupProductTabs();
});

// Charger les détails du produit
function loadProductDetail(product) {
    // Titre de la page
    document.getElementById('pageTitle').textContent = `${product.name} - Crispin La Boutique`;

    // Breadcrumb
    document.getElementById('breadcrumbCategory').textContent = getCategoryName(product.category);
    document.getElementById('breadcrumbProduct').textContent = product.name;

    // Image principale (utilise une icône SVG pour l'instant)
    const mainImage = document.getElementById('mainImage');
    mainImage.innerHTML = `
        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--gray-light) 0%, var(--gray-medium) 100%);">
            <div style="width: 200px; height: 200px; color: var(--primary);">
                ${getProductIcon(product.category)}
            </div>
        </div>
    `;

    // Badge
    const badge = document.getElementById('productBadge');
    if (product.badge) {
        badge.textContent = product.badge;
        badge.style.display = 'block';
    } else {
        badge.style.display = 'none';
    }

    // Category tag
    document.getElementById('categoryTag').textContent = getCategoryName(product.category);

    // Titre et description
    document.getElementById('productTitle').textContent = product.name;
    document.getElementById('productDescription').textContent = product.description;

    // Prix
    document.getElementById('productPrice').textContent = product.price.toFixed(2) + ' €';
    document.getElementById('priceUnit').textContent = product.unit;

    // Description complète
    document.getElementById('fullDescription').textContent =
        `${product.description} Ce produit professionnel de haute qualité répond aux exigences les plus strictes. Développé en collaboration avec nos partenaires européens, il garantit des résultats optimaux dans toutes les conditions d'utilisation. Idéal pour les professionnels comme pour les particuliers exigeants.`;

    // Specs
    document.getElementById('specRef').textContent = `CRISP-${product.category.toUpperCase()}-${product.id.toString().padStart(4, '0')}`;
    document.getElementById('specCategory').textContent = getCategoryName(product.category);
    document.getElementById('specPackaging').textContent = product.unit || 'Variable';
}

// Charger les produits similaires
function loadRelatedProducts(category) {
    const relatedProducts = products.filter(p => p.category === category && p.id !== currentProduct.id).slice(0, 4);
    const relatedGrid = document.getElementById('relatedProducts');
    relatedGrid.innerHTML = '';

    relatedProducts.forEach(product => {
        const card = createProductCard(product);
        relatedGrid.appendChild(card);
    });
}

// Gestion des onglets
function setupProductTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Retirer active de tous
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Activer le bon
            btn.classList.add('active');
            const tabId = btn.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Gestion de la quantité
function updateDetailQuantity(change) {
    const input = document.getElementById('quantityInput');
    let value = parseInt(input.value) || 1;
    value += change;
    if (value < 1) value = 1;
    input.value = value;
}

// Ajouter au panier depuis la page produit
function addToCartFromDetail() {
    if (!currentProduct) return;

    const quantity = parseInt(document.getElementById('quantityInput').value) || 1;

    for (let i = 0; i < quantity; i++) {
        addToCart(currentProduct.id);
    }

    // Animation de confirmation
    const btn = event.target.closest('.btn-primary');
    const originalText = btn.innerHTML;
    btn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="margin-right: 8px;">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Ajouté au panier !
    `;
    btn.style.background = 'var(--accent)';

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
    }, 2000);

    // Ouvrir le panier
    setTimeout(() => {
        document.getElementById('cartModal').classList.add('active');
    }, 500);
}

// Acheter maintenant
function buyNow() {
    addToCartFromDetail();
    setTimeout(() => {
        alert('Redirection vers le paiement... (à implémenter)');
    }, 1000);
}

// Exposer les fonctions globalement
window.updateDetailQuantity = updateDetailQuantity;
window.addToCartFromDetail = addToCartFromDetail;
window.buyNow = buyNow;
