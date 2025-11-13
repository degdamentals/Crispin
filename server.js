// Backend Server - Crispin La Boutique
// Node.js + Express server for authentication and AI data collection

const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Data storage paths
const DATA_DIR = path.join(__dirname, 'server-data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const AI_CONVERSATIONS_FILE = path.join(DATA_DIR, 'ai-conversations.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

// Initialize data directory
async function initDataDir() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });

        // Initialize files if they don't exist
        try {
            await fs.access(USERS_FILE);
        } catch {
            await fs.writeFile(USERS_FILE, JSON.stringify([]));
        }

        try {
            await fs.access(AI_CONVERSATIONS_FILE);
        } catch {
            await fs.writeFile(AI_CONVERSATIONS_FILE, JSON.stringify([]));
        }

        try {
            await fs.access(ORDERS_FILE);
        } catch {
            await fs.writeFile(ORDERS_FILE, JSON.stringify([]));
        }

        console.log('✅ Data directory initialized');
    } catch (error) {
        console.error('❌ Error initializing data directory:', error);
    }
}

// Utility functions
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function generateToken() {
    return crypto.randomBytes(32).toString('hex');
}

// Read/Write helpers
async function readJSON(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading file:', error);
        return [];
    }
}

async function writeJSON(filePath, data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing file:', error);
        return false;
    }
}

// =======================
// TEST & INFO ROUTES
// =======================

// Health check / Test endpoint
app.get('/api/test', (req, res) => {
    res.json({
        message: 'API Crispin fonctionne!',
        timestamp: Date.now(),
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0'
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Crispin La Boutique API',
        status: 'online',
        endpoints: {
            test: 'GET /api/test',
            register: 'POST /api/auth/register',
            login: 'POST /api/auth/login',
            aiConversation: 'POST /api/ai/conversation',
            aiConversations: 'GET /api/ai/conversations',
            aiAnalytics: 'GET /api/ai/analytics',
            orders: 'POST /api/orders',
            userOrders: 'GET /api/orders/:userId',
            updateOrder: 'PUT /api/orders/:orderId/status'
        }
    });
});

// =======================
// AUTHENTICATION ROUTES
// =======================

// Register
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ error: 'Tous les champs sont requis' });
        }

        const users = await readJSON(USERS_FILE);

        // Check if user exists
        if (users.find(u => u.email === email)) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé' });
        }

        // Create new user
        const newUser = {
            id: crypto.randomUUID(),
            email,
            password: hashPassword(password),
            firstName,
            lastName,
            role: 'customer',
            createdAt: Date.now(),
            orders: [],
            preferences: {}
        };

        users.push(newUser);
        await writeJSON(USERS_FILE, users);

        // Generate token
        const token = generateToken();

        // Return user without password
        const { password: _, ...userWithoutPassword } = newUser;

        res.json({
            success: true,
            user: userWithoutPassword,
            token
        });

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email et mot de passe requis' });
        }

        const users = await readJSON(USERS_FILE);
        const user = users.find(u => u.email === email && u.password === hashPassword(password));

        if (!user) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        }

        // Generate token
        const token = generateToken();

        // Return user without password
        const { password: _, ...userWithoutPassword } = user;

        res.json({
            success: true,
            user: userWithoutPassword,
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// =======================
// AI CONVERSATION ROUTES
// =======================

// Save AI conversation
app.post('/api/ai/conversation', async (req, res) => {
    try {
        const { userId, userName, productId, productName, question, response, rating, feedback } = req.body;

        const conversations = await readJSON(AI_CONVERSATIONS_FILE);

        const newConversation = {
            id: crypto.randomUUID(),
            userId,
            userName,
            productId,
            productName,
            question,
            response,
            rating: rating || null,
            feedback: feedback || null,
            timestamp: Date.now()
        };

        conversations.push(newConversation);
        await writeJSON(AI_CONVERSATIONS_FILE, conversations);

        res.json({ success: true, conversation: newConversation });

    } catch (error) {
        console.error('Save conversation error:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Get all AI conversations (admin only)
app.get('/api/ai/conversations', async (req, res) => {
    try {
        const conversations = await readJSON(AI_CONVERSATIONS_FILE);

        // Sort by most recent
        conversations.sort((a, b) => b.timestamp - a.timestamp);

        res.json({ success: true, conversations });

    } catch (error) {
        console.error('Get conversations error:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Get AI analytics
app.get('/api/ai/analytics', async (req, res) => {
    try {
        const conversations = await readJSON(AI_CONVERSATIONS_FILE);

        const analytics = {
            totalConversations: conversations.length,
            totalRatings: conversations.filter(c => c.rating !== null).length,
            positiveRatings: conversations.filter(c => c.rating > 0).length,
            negativeRatings: conversations.filter(c => c.rating < 0).length,
            averageRating: 0,
            topProducts: {},
            topQuestions: {},
            recentFeedback: []
        };

        // Calculate average rating
        const ratedConversations = conversations.filter(c => c.rating !== null);
        if (ratedConversations.length > 0) {
            const totalRating = ratedConversations.filter(c => c.rating > 0).length;
            analytics.averageRating = (totalRating / ratedConversations.length * 100).toFixed(1);
        }

        // Top products
        conversations.forEach(c => {
            if (c.productName) {
                analytics.topProducts[c.productName] = (analytics.topProducts[c.productName] || 0) + 1;
            }
        });

        // Top questions
        conversations.forEach(c => {
            if (c.question) {
                analytics.topQuestions[c.question] = (analytics.topQuestions[c.question] || 0) + 1;
            }
        });

        // Recent feedback
        analytics.recentFeedback = conversations
            .filter(c => c.feedback)
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 20)
            .map(c => ({
                userName: c.userName,
                question: c.question,
                feedback: c.feedback,
                timestamp: c.timestamp
            }));

        res.json({ success: true, analytics });

    } catch (error) {
        console.error('Get analytics error:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// =======================
// ORDER ROUTES
// =======================

// Create order
app.post('/api/orders', async (req, res) => {
    try {
        const { userId, userName, cart, total, shippingAddress } = req.body;

        const orders = await readJSON(ORDERS_FILE);

        const newOrder = {
            id: crypto.randomUUID(),
            orderNumber: `CMD${Date.now()}`,
            userId,
            userName,
            cart,
            total,
            shippingAddress,
            status: 'pending', // pending, processing, shipped, delivered, cancelled
            createdAt: Date.now(),
            updatedAt: Date.now()
        };

        orders.push(newOrder);
        await writeJSON(ORDERS_FILE, orders);

        res.json({ success: true, order: newOrder });

    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Get user orders
app.get('/api/orders/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await readJSON(ORDERS_FILE);

        const userOrders = orders.filter(o => o.userId === userId);
        userOrders.sort((a, b) => b.createdAt - a.createdAt);

        res.json({ success: true, orders: userOrders });

    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Update order status (admin)
app.put('/api/orders/:orderId/status', async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const orders = await readJSON(ORDERS_FILE);
        const order = orders.find(o => o.id === orderId);

        if (!order) {
            return res.status(404).json({ error: 'Commande non trouvée' });
        }

        order.status = status;
        order.updatedAt = Date.now();

        await writeJSON(ORDERS_FILE, orders);

        res.json({ success: true, order });

    } catch (error) {
        console.error('Update order error:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// =======================
// USER MANAGEMENT ROUTES
// =======================

// Delete user account (RGPD compliance)
app.delete('/api/user/delete', async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'User ID requis' });
        }

        // Read all data files
        const users = await readJSON(USERS_FILE);
        const conversations = await readJSON(AI_CONVERSATIONS_FILE);
        const orders = await readJSON(ORDERS_FILE);

        // Find user
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        const deletedUser = users[userIndex];

        // Remove user data (RGPD compliant deletion)
        users.splice(userIndex, 1);

        // Remove all conversations from this user
        const filteredConversations = conversations.filter(c => c.userId !== userId);
        const deletedConversationsCount = conversations.length - filteredConversations.length;

        // Remove all orders from this user
        const filteredOrders = orders.filter(o => o.userId !== userId);
        const deletedOrdersCount = orders.length - filteredOrders.length;

        // Save updated data
        await writeJSON(USERS_FILE, users);
        await writeJSON(AI_CONVERSATIONS_FILE, filteredConversations);
        await writeJSON(ORDERS_FILE, filteredOrders);

        console.log(`🗑️ RGPD Deletion - User: ${deletedUser.email}`);
        console.log(`   - User account: ✅ Deleted`);
        console.log(`   - Conversations: ${deletedConversationsCount} deleted`);
        console.log(`   - Orders: ${deletedOrdersCount} deleted`);

        res.json({
            success: true,
            message: 'Compte et données supprimés conformément au RGPD',
            deleted: {
                user: true,
                conversations: deletedConversationsCount,
                orders: deletedOrdersCount
            }
        });

    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// =======================
// ADMIN ROUTES
// =======================

// Get all users (admin only - for now no authentication)
app.get('/api/admin/users', async (req, res) => {
    try {
        const users = await readJSON(USERS_FILE);

        // Remove passwords before sending
        const safeUsers = users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        res.json({
            success: true,
            count: safeUsers.length,
            users: safeUsers
        });

    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Get all data (backup endpoint)
app.get('/api/admin/backup', async (req, res) => {
    try {
        const users = await readJSON(USERS_FILE);
        const conversations = await readJSON(AI_CONVERSATIONS_FILE);
        const orders = await readJSON(ORDERS_FILE);

        // Remove passwords
        const safeUsers = users.map(({ password, ...user }) => user);

        res.json({
            success: true,
            timestamp: Date.now(),
            data: {
                users: safeUsers,
                conversations: conversations,
                orders: orders
            },
            stats: {
                totalUsers: users.length,
                totalConversations: conversations.length,
                totalOrders: orders.length
            }
        });

    } catch (error) {
        console.error('Backup error:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// =======================
// SERVER START
// =======================

initDataDir().then(() => {
    app.listen(PORT, () => {
        console.log(`
╔══════════════════════════════════════════════╗
║  🚀 Serveur Crispin La Boutique démarré !   ║
║                                               ║
║  📍 URL: http://localhost:${PORT}              ║
║  📁 Données: ${DATA_DIR}                      ║
║                                               ║
║  ✅ API Authentification: /api/auth/*        ║
║  ✅ API IA: /api/ai/*                        ║
║  ✅ API Commandes: /api/orders/*             ║
╚══════════════════════════════════════════════╝
        `);
    });
});
