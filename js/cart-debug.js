// Cart Debug Helper - Crispin La Boutique
// Add this script to index.html to debug cart issues

(function() {
    console.log('%c🔍 CART DEBUG MODE ACTIVATED', 'background: #FC4C02; color: white; padding: 10px; font-size: 16px; font-weight: bold;');

    // Monitor localStorage changes
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
        if (key === 'crispinCart') {
            console.log('%c💾 localStorage.setItem("crispinCart")', 'color: #10b981; font-weight: bold');
            console.log('Value:', value);
            try {
                const parsed = JSON.parse(value);
                console.log('Parsed:', parsed);
                console.log('Items count:', parsed.length);
            } catch (e) {
                console.error('Failed to parse:', e);
            }
        }
        return originalSetItem.apply(this, arguments);
    };

    const originalGetItem = localStorage.getItem;
    localStorage.getItem = function(key) {
        const value = originalGetItem.apply(this, arguments);
        if (key === 'crispinCart') {
            console.log('%c📖 localStorage.getItem("crispinCart")', 'color: #3b82f6; font-weight: bold');
            console.log('Value:', value);
        }
        return value;
    };

    // Monitor DOM for product cards
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.classList && node.classList.contains('product-card')) {
                    console.log('✅ Product card added to DOM:', node.dataset.id);

                    // Check for add button
                    const addButton = node.querySelector('.add-to-cart');
                    if (addButton) {
                        console.log('✅ Add button found:', addButton);
                        console.log('Product ID:', addButton.dataset.productId);

                        // Add debug listener
                        addButton.addEventListener('click', function(e) {
                            console.log('%c🖱️ CLICK EVENT FIRED', 'background: #fbbf24; color: black; padding: 5px; font-weight: bold');
                            console.log('Target:', e.target);
                            console.log('Current Target:', e.currentTarget);
                            console.log('Product ID:', this.dataset.productId);
                        }, true); // Use capture phase
                    } else {
                        console.warn('⚠️ No add button found in product card');
                    }
                }
            });
        });
    });

    // Wait for DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            startObserving();
        });
    } else {
        startObserving();
    }

    function startObserving() {
        const productsGrid = document.getElementById('productsGrid');
        if (productsGrid) {
            console.log('✅ Observing productsGrid for changes');
            observer.observe(productsGrid, { childList: true, subtree: true });
        } else {
            console.error('❌ productsGrid not found!');
        }

        // Check current state
        setTimeout(() => {
            console.log('%c📊 CURRENT STATE CHECK', 'background: #8b5cf6; color: white; padding: 5px; font-weight: bold');
            const cart = localStorage.getItem('crispinCart');
            console.log('localStorage cart:', cart);

            if (typeof window.cart !== 'undefined') {
                console.log('window.cart variable:', window.cart);
            }

            const addButtons = document.querySelectorAll('.add-to-cart');
            console.log('Add to cart buttons found:', addButtons.length);

            addButtons.forEach((btn, i) => {
                console.log(`Button ${i}:`, btn.dataset.productId, 'Has click listener:', !!btn.onclick);
            });
        }, 1000);
    }

    // Add global test function
    window.testAddToCart = function(productId) {
        console.log('%c🧪 TEST: Adding product', 'background: #ec4899; color: white; padding: 5px; font-weight: bold');
        console.log('Product ID:', productId);

        if (typeof window.addToCart === 'function') {
            console.log('✅ window.addToCart function exists');
            window.addToCart(productId);
        } else {
            console.error('❌ window.addToCart function NOT found');
        }
    };

    // Log when page is fully loaded
    window.addEventListener('load', () => {
        console.log('%c✅ PAGE FULLY LOADED', 'background: #10b981; color: white; padding: 10px; font-size: 14px; font-weight: bold');
        console.log('Type "testAddToCart(1)" in console to test cart functionality');
    });
})();
