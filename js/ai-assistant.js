// AI Assistant - Crispin La Boutique
// Provides product advice and recommendations with machine learning

let currentProduct = null;
let chatMessages = [];
let currentExchangeIndex = 0;

// Initialize AI Assistant
function initAIAssistant() {
    createAIModal();
    addAIButtonsToProducts();
}

// Create AI Modal HTML
function createAIModal() {
    const modalHTML = `
        <div class="ai-modal" id="aiModal">
            <div class="ai-overlay" id="aiOverlay"></div>
            <div class="ai-container">
                <div class="ai-header">
                    <div class="ai-header-content">
                        <div class="ai-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                <path d="M9 10h.01"></path>
                                <path d="M15 10h.01"></path>
                                <path d="M9 14h6"></path>
                            </svg>
                        </div>
                        <div class="ai-header-text">
                            <h3>Assistant Produit</h3>
                            <p>Posez vos questions sur ce produit</p>
                        </div>
                    </div>
                    <button class="ai-close" id="aiClose">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="ai-body">
                    <div class="ai-product-info" id="aiProductInfo"></div>
                    <div class="ai-chat" id="aiChat">
                        <!-- Messages will be added here -->
                    </div>
                </div>
                <div class="ai-footer">
                    <div class="ai-suggestions" id="aiSuggestions">
                        <button class="ai-suggestion" onclick="sendSuggestion('Quelles sont les applications de ce produit ?')">
                            Applications
                        </button>
                        <button class="ai-suggestion" onclick="sendSuggestion('Comment l\\'utiliser correctement ?')">
                            Mode d'emploi
                        </button>
                        <button class="ai-suggestion" onclick="sendSuggestion('Quelles sont les alternatives ?')">
                            Alternatives
                        </button>
                    </div>
                    <div class="ai-input-wrapper">
                        <input type="text" class="ai-input" id="aiInput" placeholder="Posez votre question..." />
                        <button class="ai-send-btn" id="aiSendBtn">
                            <span>Envoyer</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setupAIEventListeners();
}

// Add AI buttons to product cards
function addAIButtonsToProducts() {
    const productImages = document.querySelectorAll('.product-image');
    productImages.forEach((imageEl, index) => {
        const button = document.createElement('button');
        button.className = 'product-ai-btn';
        button.setAttribute('aria-label', 'Demander conseil IA');
        button.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                <circle cx="9" cy="10" r="1"></circle>
                <circle cx="15" cy="10" r="1"></circle>
                <path d="M9 14a3 3 0 0 0 6 0"></path>
            </svg>
        `;

        button.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const productCard = imageEl.closest('.product-card');
            const productId = parseInt(productCard.dataset.id);
            openAIAssistant(productId);
        };

        imageEl.appendChild(button);
    });
}

// Open AI Assistant for a product
function openAIAssistant(productId) {
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;

    chatMessages = [];
    currentExchangeIndex = 0;
    aiLearning.startConversation();

    // Update product info
    const productInfoEl = document.getElementById('aiProductInfo');
    productInfoEl.innerHTML = `
        <div class="ai-product-image"></div>
        <div class="ai-product-details">
            <h4>${currentProduct.name}</h4>
            <p>${currentProduct.price.toFixed(2)} € ${currentProduct.unit}</p>
        </div>
    `;

    // Clear chat
    const chatEl = document.getElementById('aiChat');
    chatEl.innerHTML = '';

    // Add welcome message
    addMessage('assistant', `Bonjour ! Je suis là pour répondre à vos questions sur ${currentProduct.name}. Comment puis-je vous aider ?`);

    // Show modal
    document.getElementById('aiModal').classList.add('active');
}

// Close AI Assistant
function closeAIAssistant() {
    document.getElementById('aiModal').classList.remove('active');
    currentProduct = null;
    chatMessages = [];
}

// Add message to chat
function addMessage(sender, text, userQuestion = null) {
    const chatEl = document.getElementById('aiChat');
    const messageEl = document.createElement('div');
    messageEl.className = `ai-message ${sender}`;
    messageEl.dataset.index = currentExchangeIndex;

    const avatar = sender === 'assistant' ? 'AI' : 'Vous';

    let ratingHTML = '';
    if (sender === 'assistant' && userQuestion) {
        ratingHTML = `
            <div class="ai-rating" data-exchange="${currentExchangeIndex}">
                <div class="rating-question">Cette réponse vous a-t-elle aidé ?</div>
                <div class="rating-buttons">
                    <button class="rating-btn rating-positive" onclick="rateAIResponse(${currentExchangeIndex}, 1)" title="Réponse utile">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                        </svg>
                        Utile
                    </button>
                    <button class="rating-btn rating-negative" onclick="rateAIResponse(${currentExchangeIndex}, -1)" title="Réponse non utile">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
                        </svg>
                        Pas utile
                    </button>
                </div>
                <div class="rating-feedback" style="display: none;">
                    <textarea class="feedback-input" placeholder="Comment pouvons-nous améliorer cette réponse ? (optionnel)"></textarea>
                    <button class="feedback-submit" onclick="submitFeedback(${currentExchangeIndex})">Envoyer</button>
                </div>
            </div>
        `;
    }

    messageEl.innerHTML = `
        <div class="ai-avatar">${avatar}</div>
        <div class="ai-bubble-container">
            <div class="ai-bubble">${text}</div>
            ${ratingHTML}
        </div>
    `;

    chatEl.appendChild(messageEl);
    chatEl.scrollTop = chatEl.scrollHeight;

    chatMessages.push({ sender, text, index: currentExchangeIndex });

    if (sender === 'assistant' && userQuestion) {
        // Record exchange in learning system
        aiLearning.recordExchange(userQuestion, text, currentProduct.id);
        currentExchangeIndex++;
    }
}

// Show typing indicator
function showTyping() {
    const chatEl = document.getElementById('aiChat');
    const typingEl = document.createElement('div');
    typingEl.className = 'ai-message assistant';
    typingEl.id = 'aiTyping';
    typingEl.innerHTML = `
        <div class="ai-avatar">AI</div>
        <div class="ai-bubble">
            <div class="ai-typing">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatEl.appendChild(typingEl);
    chatEl.scrollTop = chatEl.scrollHeight;
}

// Hide typing indicator
function hideTyping() {
    const typingEl = document.getElementById('aiTyping');
    if (typingEl) {
        typingEl.remove();
    }
}

// Send user message
async function sendMessage() {
    const input = document.getElementById('aiInput');
    const message = input.value.trim();

    if (!message || !currentProduct) return;

    // Add user message
    addMessage('user', message);
    const userQuestion = message;
    input.value = '';

    // Show typing
    showTyping();

    // Generate AI response with reasoning
    try {
        const response = await generateAIResponse(userQuestion);

        // Simulate thinking time for better UX
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

        hideTyping();

        // Use improved response from learning system if available
        let finalResponse = response;
        if (typeof aiLearning !== 'undefined') {
            finalResponse = aiLearning.getImprovedResponse(userQuestion, response, currentProduct.id);
        }

        addMessage('assistant', finalResponse, userQuestion);

        // Save conversation
        if (typeof aiLearning !== 'undefined') {
            aiLearning.recordExchange(userQuestion, finalResponse, currentProduct.id);
        }

    } catch (error) {
        console.error('Error generating response:', error);
        hideTyping();
        addMessage('assistant', 'Désolé, une erreur s\'est produite. Pouvez-vous reformuler votre question ?');
    }
}

// Save conversation to server
async function saveConversationToServer(question, response, rating = null, feedback = '') {
    // Get user info from localStorage
    const user = JSON.parse(localStorage.getItem('crispinUser') || '{}');
    const token = localStorage.getItem('crispinToken');

    // If no user logged in, skip server save (only save locally)
    if (!user.id || !token) {
        return;
    }

    try {
        const conversationData = {
            userId: user.id,
            userName: `${user.firstName} ${user.lastName}`,
            productId: currentProduct.id,
            productName: currentProduct.name,
            question: question,
            response: response,
            rating: rating,
            feedback: feedback
        };

        const apiResponse = await fetch(`${CONFIG.API_URL}/ai/conversation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(conversationData)
        });

        if (!apiResponse.ok) {
            console.warn('Failed to save conversation to server');
        }
    } catch (error) {
        console.error('Error saving conversation to server:', error);
    }
}

// Rate AI response
function rateAIResponse(exchangeIndex, rating) {
    aiLearning.rateResponse(exchangeIndex, rating);

    // Get the exchange data to save to server
    const exchange = aiLearning.currentConversation[exchangeIndex];
    if (exchange) {
        saveConversationToServer(exchange.question, exchange.response, rating, '');
    }

    const ratingEl = document.querySelector(`.ai-rating[data-exchange="${exchangeIndex}"]`);
    if (!ratingEl) return;

    const buttons = ratingEl.querySelector('.rating-buttons');
    const feedback = ratingEl.querySelector('.rating-feedback');

    if (rating > 0) {
        // Positive rating
        buttons.innerHTML = `
            <div class="rating-success">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span style="color: #10b981; font-weight: 600;">Merci pour votre retour !</span>
            </div>
        `;
    } else {
        // Negative rating - show feedback form
        buttons.style.display = 'none';
        feedback.style.display = 'block';
    }
}

// Submit feedback
function submitFeedback(exchangeIndex) {
    const ratingEl = document.querySelector(`.ai-rating[data-exchange="${exchangeIndex}"]`);
    if (!ratingEl) return;

    const textarea = ratingEl.querySelector('.feedback-input');
    const feedbackText = textarea.value.trim();

    // Update rating with feedback
    aiLearning.rateResponse(exchangeIndex, -1, feedbackText);

    // Get the exchange data to save to server with feedback
    const exchange = aiLearning.currentConversation[exchangeIndex];
    if (exchange) {
        saveConversationToServer(exchange.question, exchange.response, -1, feedbackText);
    }

    const feedback = ratingEl.querySelector('.rating-feedback');
    feedback.innerHTML = `
        <div class="rating-success">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span style="color: #10b981; font-weight: 600;">Merci ! Nous allons améliorer nos réponses.</span>
        </div>
    `;
}

// Update suggestions based on learning
function updateSuggestions() {
    const suggestionsContainer = document.getElementById('aiSuggestions');
    if (!suggestionsContainer) return;

    const suggestions = aiLearning.getSuggestions();

    suggestionsContainer.innerHTML = suggestions.map(suggestion => `
        <button class="ai-suggestion" onclick="sendSuggestion('${suggestion.replace(/'/g, "\\'")}')">
            ${suggestion}
        </button>
    `).join('');
}

// Generate simulated AI response
// Generate AI Response using advanced reasoning engine
async function generateAIResponse(userMessage) {
    console.log('🤖 Generating AI response with reasoning...');

    // Check if reasoning engine is available
    if (typeof window.aiReasoning === 'undefined') {
        console.warn('⚠️ AI Reasoning Engine not loaded, using fallback');
        return generateFallbackResponse(userMessage);
    }

    try {
        // Use the reasoning engine
        const result = await window.aiReasoning.reason(userMessage, currentProduct);

        console.log('💡 Reasoning complete:', result);
        console.log('🧠 Reasoning steps:', result.reasoning);

        // Update suggestions if provided
        if (result.suggestions && result.suggestions.length > 0) {
            updateSuggestions(result.suggestions);
        }

        // Show confidence indicator if low
        let response = result.response;
        if (result.confidence < 0.7) {
            response += '\n\n💭 _Niveau de confiance: ' + (result.confidence * 100).toFixed(0) + '%_';
        }

        return response;

    } catch (error) {
        console.error('❌ Error in AI reasoning:', error);
        return generateFallbackResponse(userMessage);
    }
}

// Fallback response generator (simple rules-based)
function generateFallbackResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    // Greetings
    if (lowerMessage.match(/^(salut|bonjour|hello|hi)/)) {
        return `Bonjour ! Je suis votre assistant IA. Posez-moi vos questions sur **${currentProduct.name}**.`;
    }

    // Politeness
    if (lowerMessage.includes('merci')) {
        return `Je vous en prie ! N'hésitez pas pour d'autres questions.`;
    }

    if (lowerMessage.includes('au revoir') || lowerMessage.includes('bye')) {
        return `Au revoir ! À bientôt !`;
    }

    // Price
    if (lowerMessage.includes('prix') || lowerMessage.includes('coût')) {
        return `**${currentProduct.name}** coûte ${currentProduct.price.toFixed(2)}€ ${currentProduct.unit}.`;
    }

    // Usage
    if (lowerMessage.includes('utiliser') || lowerMessage.includes('application')) {
        return `**${currentProduct.name}** : ${currentProduct.description}. Un excellent choix pour vos besoins professionnels.`;
    }

    // Default
    return `Concernant **${currentProduct.name}** : ${currentProduct.description}. Prix: ${currentProduct.price.toFixed(2)}€ ${currentProduct.unit}. Que souhaitez-vous savoir de plus ?`;
}

// Update suggestion buttons
function updateSuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('aiSuggestions');
    if (!suggestionsContainer) return;

    suggestionsContainer.innerHTML = suggestions.map(s =>
        `<button class="ai-suggestion" onclick="sendSuggestion('${s.replace(/'/g, "\\'")}')">${s}</button>`
    ).join('');
}

// Send suggestion (quick answer)
function sendSuggestion(text) {
    const input = document.getElementById('aiInput');
    input.value = text;
    sendMessage();
}

// Setup event listeners
function setupAIEventListeners() {
    const modal = document.getElementById('aiModal');
    const overlay = document.getElementById('aiOverlay');
    const closeBtn = document.getElementById('aiClose');
    const sendBtn = document.getElementById('aiSendBtn');
    const input = document.getElementById('aiInput');

    // Close modal
    closeBtn.addEventListener('click', closeAIAssistant);
    overlay.addEventListener('click', closeAIAssistant);

    // Send message
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeAIAssistant();
        }
    });
}

// Get category name helper
function getCategoryName(category) {
    const categories = {
        'colles': 'Colles',
        'teintures': 'Teintures',
        'renforts': 'Renforts',
        'machines': 'Machines'
    };
    return categories[category] || category;
}

// Initialize when products are loaded
function initAIWhenReady() {
    // Check if products are rendered
    const checkProducts = setInterval(() => {
        const productCards = document.querySelectorAll('.product-card');
        if (productCards.length > 0) {
            clearInterval(checkProducts);
            initAIAssistant();
        }
    }, 100);
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAIWhenReady);
} else {
    initAIWhenReady();
}
