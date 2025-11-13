// Cart Page - Crispin La Boutique
// Simple and functional cart implementation

console.log('🛒 Cart.js loaded');

// Product catalog (same as main site)
const products = [
    {id: 1, name: "Colle Extra-Forte Pro", category: "colles", price: 24.90, unit: "/ litre", image: "https://via.placeholder.com/150/FC4C02/FFFFFF?text=Colle+1"},
    {id: 2, name: "Colle Néoprène Premium", category: "colles", price: 32.50, unit: "/ 5L", image: "https://via.placeholder.com/150/FC4C02/FFFFFF?text=Colle+2"},
    {id: 3, name: "Colle Contact Rapide", category: "colles", price: 18.90, unit: "/ litre", image: "https://via.placeholder.com/150/FC4C02/FFFFFF?text=Colle+3"},
    {id: 4, name: "Colle PU Structurale", category: "colles", price: 45.00, unit: "/ 5L", image: "https://via.placeholder.com/150/FC4C02/FFFFFF?text=Colle+4"},
    {id: 5, name: "Colle Époxy Bi-composant", category: "colles", price: 38.90, unit: "/ kit", image: "https://via.placeholder.com/150/FC4C02/FFFFFF?text=Colle+5"},
    {id: 6, name: "Colle Hot-Melt Industriel", category: "colles", price: 29.90, unit: "/ 5kg", image: "https://via.placeholder.com/150/FC4C02/FFFFFF?text=Colle+6"},
    {id: 7, name: "Teinture Cuir Aniline", category: "teintures", price: 35.00, unit: "/ litre", image: "https://via.placeholder.com/150/FC4C02/FFFFFF?text=Teinture+1"},
    {id: 8, name: "Teinture Textile Professionnelle", category: "teintures", price: 22.50, unit: "/ litre", image: "https://via.placeholder.com/150/FC4C02/FFFFFF?text=Teinture+2"},
    {id: 9, name: "Teinture Bois Aqua", category: "teintures", price: 28.90, unit: "/ litre", image: "https://via.placeholder.com/150/FC4C02/FFFFFF?text=Teinture+3"},
    {id: 10, name: "Pigments Universels", category: "teintures", price: 42.00, unit: "/ kit 12 teintes", image: "https://via.placeholder.com/150/FC4C02/FFFFFF?text=Teinture+4"},
    {id: 11, name: "Teinture Vinyle Marine", category: "teintures", price: 48.50, unit: "/ litre", image: "https://via.placeholder.com/150/FC4C02/FFFFFF?text=Teinture+5"},
    {id: 12, name: "Teinture Daim & Nubuck", category: "teintures", price: 31.90, unit: "/ 500ml", image: "https://via.placeholder.com/150/FC4C02/FFFFFF?text=Teinture+6"},
    {id: 13, name: "Renfort Fibre de Verre", category: "renforts", price: 12.50, unit: "/ m²", image: "https://via.placeholder.com/150/FC4C02/FFFFFF?text=Renfort+1"},
    {id: 14, name: "Renfort Carbone Pro", category: "renforts", price: 45.00, unit: "/ m²", image: "https://via.placeholder.com/150/FC4C02/FFFFFF?text=Renfort+2"},
    {id: 15, name: "Bande Kevlar Aramide", category: "renforts", price: 38.90, unit: "/ rouleau 10m", image: "https://via.placeholder.com/150/FC4C02/FFFFFF?text=Renfort+3"},
    {id: 16, name: "Non-tissé Thermocollant", category: "renforts", price: 8.90, unit: "/ m²", image: "https://via.placeholder.com/150/FC4C02/FFFFFF?text=Renfort+4"},
    {id: 17, name: "Renfort Polyester Tissé", category: "renforts", price: 15.50, unit: "/ m²", image: "https://via.placeholder.com/150/FC4C02/FFFFFF?text=Renfort+5"},
    {id: 18, name: "Mat de Verre 300g", category: "renforts", price: 9.90, unit: "/ m²", image: "https://via.placeholder.com/150/FC4C02/FFFFFF?text=Renfort+6"},
    {id: 19, name: "Pistolet Thermocollage Pro", category: "machines", price: 189.00, unit: "", image: "https://via.placeholder.com/150/FC4C02/FFFFFF?text=Machine+1"},
    {id: 20, name: "Refendeuse de Précision", category: "machines", price: 2890.00, unit: "", image: "https://via.placeholder.com/150/FC4C02/FFFFFF?text=Machine+2"},
    {id: 21, name: "Presse à Chaud 40x50cm", category: "machines", price: 1250.00, unit: "", image: "https://via.placeholder.com/150/FC4C02/FFFFFF?text=Machine+3"},
    {id: 22, name: "Applicateur Colle Pneumatique", category: "machines", price: 385.00, unit: "", image: "https://via.placeholder.com/150/FC4C02/FFFFFF?text=Machine+4"},
    {id: 23, name: "Table de Découpe Laser", category: "machines", price: 8500.00, unit: "", image: "https://via.placeholder.com/150/FC4C02/FFFFFF?text=Machine+5"},
    {id: 24, name: "Séchoir Infrarouge Mobile", category: "machines", price: 645.00, unit: "", image: "https://via.placeholder.com/150/FC4C02/FFFFFF?text=Machine+6"}
];

// Constants
const TAX_RATE = 0.20;
const FREE_SHIPPING_THRESHOLD = 200.00;
const SHIPPING_COST = 15.00;

// State
let cart = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM loaded, initializing cart page...');
    loadCart();
    renderCart();
});

// Load cart from localStorage
function loadCart() {
    console.log('📖 Loading cart from localStorage...');
    const savedCart = localStorage.getItem('crispinCart');

    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            console.log('✅ Cart loaded:', cart);
        } catch (e) {
            console.error('❌ Error parsing cart:', e);
            cart = [];
        }
    } else {
        console.log('ℹ️ No saved cart found');
        cart = [];
    }
}

// Save cart to localStorage
function saveCart() {
    console.log('💾 Saving cart:', cart);
    localStorage.setItem('crispinCart', JSON.stringify(cart));
}

// Render cart
function renderCart() {
    console.log('🎨 Rendering cart...');

    const emptyCartEl = document.getElementById('emptyCart');
    const cartContentEl = document.getElementById('cartContent');
    const cartItemsListEl = document.getElementById('cartItemsList');
    const cartCountEl = document.getElementById('cartCount');

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;

    // Show/hide empty state
    if (cart.length === 0) {
        console.log('📦 Cart is empty');
        emptyCartEl.style.display = 'flex';
        cartContentEl.style.display = 'none';
        return;
    }

    console.log('📦 Cart has', cart.length, 'items');
    emptyCartEl.style.display = 'none';
    cartContentEl.style.display = 'block';

    // Render cart items
    cartItemsListEl.innerHTML = cart.map((item, index) => {
        const product = products.find(p => p.id === item.id);
        if (!product) {
            console.warn('⚠️ Product not found:', item.id);
            return '';
        }

        const itemTotal = product.price * item.quantity;

        return `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="cart-item-details">
                    <h3>${product.name}</h3>
                    <p class="cart-item-price">${product.price.toFixed(2)} € ${product.unit}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="changeQuantity(${index}, -1)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn" onclick="changeQuantity(${index}, 1)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                </div>
                <div class="cart-item-total">
                    <strong>${itemTotal.toFixed(2)} €</strong>
                </div>
                <button class="cart-item-remove" onclick="removeItem(${index})" title="Retirer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `;
    }).join('');

    // Update summary
    updateSummary();
}

// Update summary
function updateSummary() {
    const subtotal = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const tax = (subtotal + shipping) * TAX_RATE;
    const total = subtotal + shipping + tax;

    // Update display
    document.getElementById('subtotal').textContent = subtotal.toFixed(2) + ' €';
    document.getElementById('shipping').textContent = shipping === 0 ? 'Gratuite' : shipping.toFixed(2) + ' €';
    document.getElementById('tax').textContent = tax.toFixed(2) + ' €';
    document.getElementById('total').textContent = total.toFixed(2) + ' €';

    // Update shipping message
    const shippingMessageEl = document.getElementById('shippingMessage');
    const remainingEl = document.getElementById('remaining');

    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
        shippingMessageEl.innerHTML = '<strong style="color: var(--success);">✓ Livraison gratuite</strong>';
    } else {
        const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
        remainingEl.textContent = remaining.toFixed(2) + ' €';
    }
}

// Change quantity
function changeQuantity(index, delta) {
    console.log('🔢 Changing quantity for item', index, 'by', delta);

    if (cart[index]) {
        cart[index].quantity += delta;

        if (cart[index].quantity <= 0) {
            removeItem(index);
            return;
        }

        saveCart();
        renderCart();
    }
}

// Remove item
function removeItem(index) {
    console.log('🗑️ Removing item at index', index);

    if (confirm('Voulez-vous vraiment retirer cet article du panier ?')) {
        cart.splice(index, 1);
        saveCart();
        renderCart();
    }
}

// Checkout
function checkout() {
    console.log('💳 Proceeding to checkout...');
    alert('Fonctionnalité de paiement en cours de développement.\n\nVotre panier contient ' + cart.length + ' article(s).');
}

// Setup checkout button
document.getElementById('checkoutBtn')?.addEventListener('click', checkout);

// Expose functions globally
window.changeQuantity = changeQuantity;
window.removeItem = removeItem;

console.log('✅ Cart.js initialized');
