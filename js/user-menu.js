// User Menu - Crispin La Boutique
// Manages user login state and account menu

function initUserMenu() {
    const userMenuEl = document.getElementById('userMenu');
    if (!userMenuEl) {
        console.warn('⚠️ Element #userMenu not found');
        return;
    }

    console.log('👤 Initializing user menu...');

    const user = JSON.parse(localStorage.getItem('crispinUser') || '{}');
    const token = localStorage.getItem('crispinToken');

    if (user.id && token) {
        // User is logged in
        renderLoggedInMenu(userMenuEl, user);
    } else {
        // User is not logged in
        renderLoggedOutMenu(userMenuEl);
    }
}

function renderLoggedInMenu(container, user) {
    container.innerHTML = `
        <div class="user-account-btn" id="userAccountBtn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span class="user-name">${user.firstName}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="chevron">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        </div>
        <div class="user-dropdown" id="userDropdown">
            <div class="user-dropdown-header">
                <div class="user-avatar">
                    ${user.firstName.charAt(0)}${user.lastName.charAt(0)}
                </div>
                <div class="user-info">
                    <div class="user-fullname">${user.firstName} ${user.lastName}</div>
                    <div class="user-email">${user.email}</div>
                </div>
            </div>
            <div class="user-dropdown-divider"></div>
            <a href="account.html" class="user-dropdown-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Mon Compte
            </a>
            <a href="#" class="user-dropdown-item" onclick="logout(event)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Déconnexion
            </a>
        </div>
    `;

    // Setup dropdown toggle
    const accountBtn = document.getElementById('userAccountBtn');
    const dropdown = document.getElementById('userDropdown');

    accountBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
}

function renderLoggedOutMenu(container) {
    container.innerHTML = `
        <a href="login.html" class="login-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
            <span>Connexion</span>
        </a>
    `;
}

function logout(event) {
    if (event) event.preventDefault();

    // Confirm logout
    if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
        // Clear user data (but keep cart)
        localStorage.removeItem('crispinUser');
        localStorage.removeItem('crispinToken');

        // Reload page to update UI
        window.location.reload();
    }
}

// Initialize on DOM ready - with retry mechanism
function safeInitUserMenu() {
    if (document.getElementById('userMenu')) {
        initUserMenu();
    } else {
        console.log('⏳ Waiting for #userMenu...');
        // Retry after a short delay
        setTimeout(safeInitUserMenu, 100);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', safeInitUserMenu);
} else {
    safeInitUserMenu();
}
