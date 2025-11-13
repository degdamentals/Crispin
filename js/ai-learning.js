// AI Learning System - Crispin La Boutique
// Machine learning system with response rating and continuous improvement

class AILearningSystem {
    constructor() {
        this.learningData = this.loadLearningData();
        this.currentConversation = [];
        this.conversationRatings = [];
    }

    // Load learning data from localStorage
    loadLearningData() {
        const data = localStorage.getItem('crispinAILearning');
        if (data) {
            return JSON.parse(data);
        }
        return {
            patterns: {},
            successfulResponses: [],
            failedResponses: [],
            userFeedback: [],
            statistics: {
                totalInteractions: 0,
                positiveRatings: 0,
                negativeRatings: 0,
                averageRating: 0,
                topQuestions: {}
            }
        };
    }

    // Save learning data to localStorage
    saveLearningData() {
        localStorage.setItem('crispinAILearning', JSON.stringify(this.learningData));
    }

    // Record a conversation exchange
    recordExchange(userQuestion, aiResponse, productId) {
        const exchange = {
            question: userQuestion.toLowerCase().trim(),
            response: aiResponse,
            productId: productId,
            timestamp: Date.now(),
            rating: null
        };

        this.currentConversation.push(exchange);
        this.learningData.statistics.totalInteractions++;

        // Track question frequency
        const normalizedQuestion = this.normalizeQuestion(userQuestion);
        if (!this.learningData.statistics.topQuestions[normalizedQuestion]) {
            this.learningData.statistics.topQuestions[normalizedQuestion] = 0;
        }
        this.learningData.statistics.topQuestions[normalizedQuestion]++;

        this.saveLearningData();
        return exchange;
    }

    // Normalize question to find similar patterns
    normalizeQuestion(question) {
        return question
            .toLowerCase()
            .replace(/[?!.,]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    // Rate a response (positive/negative)
    rateResponse(exchangeIndex, rating, feedback = '') {
        if (exchangeIndex >= this.currentConversation.length) return;

        const exchange = this.currentConversation[exchangeIndex];
        exchange.rating = rating;
        exchange.feedback = feedback;

        // Update statistics
        if (rating > 0) {
            this.learningData.statistics.positiveRatings++;
            this.learningData.successfulResponses.push({
                question: exchange.question,
                response: exchange.response,
                productId: exchange.productId,
                rating: rating,
                timestamp: exchange.timestamp
            });
        } else {
            this.learningData.statistics.negativeRatings++;
            this.learningData.failedResponses.push({
                question: exchange.question,
                response: exchange.response,
                productId: exchange.productId,
                rating: rating,
                feedback: feedback,
                timestamp: exchange.timestamp
            });
        }

        // Store user feedback
        if (feedback) {
            this.learningData.userFeedback.push({
                question: exchange.question,
                feedback: feedback,
                timestamp: Date.now()
            });
        }

        // Update average rating
        const totalRatings = this.learningData.statistics.positiveRatings +
                           this.learningData.statistics.negativeRatings;
        this.learningData.statistics.averageRating =
            (this.learningData.statistics.positiveRatings / totalRatings) * 100;

        // Learn patterns
        this.learnFromRating(exchange, rating);

        this.saveLearningData();
    }

    // Learn patterns from ratings
    learnFromRating(exchange, rating) {
        const pattern = this.extractPattern(exchange.question);

        if (!this.learningData.patterns[pattern]) {
            this.learningData.patterns[pattern] = {
                successCount: 0,
                failCount: 0,
                bestResponses: [],
                improvements: []
            };
        }

        if (rating > 0) {
            this.learningData.patterns[pattern].successCount++;
            this.learningData.patterns[pattern].bestResponses.push({
                response: exchange.response,
                rating: rating,
                productId: exchange.productId
            });

            // Keep only top 5 best responses
            this.learningData.patterns[pattern].bestResponses =
                this.learningData.patterns[pattern].bestResponses
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 5);
        } else {
            this.learningData.patterns[pattern].failCount++;
            if (exchange.feedback) {
                this.learningData.patterns[pattern].improvements.push(exchange.feedback);
            }
        }
    }

    // Extract pattern from question
    extractPattern(question) {
        const normalized = this.normalizeQuestion(question);

        // Identify question type
        if (normalized.match(/comment (ça va|vas|allez)/)) return 'greeting_howAreYou';
        if (normalized.match(/^(bonjour|salut|hello|hi)/)) return 'greeting_hello';
        if (normalized.match(/prix|tarif|coût|combien/)) return 'question_price';
        if (normalized.match(/application|utiliser|usage|à quoi sert/)) return 'question_usage';
        if (normalized.match(/livraison|expédition|délai/)) return 'question_delivery';
        if (normalized.match(/caractéristique|technique|spécification/)) return 'question_specs';
        if (normalized.match(/qualité|fiable|durabilité/)) return 'question_quality';
        if (normalized.match(/stock|disponible/)) return 'question_availability';
        if (normalized.match(/alternative|autre|similaire/)) return 'question_alternatives';
        if (normalized.match(/merci|thank/)) return 'politeness_thanks';
        if (normalized.match(/au revoir|bye|à bientôt/)) return 'politeness_goodbye';

        return 'general';
    }

    // Get improved response based on learning
    getImprovedResponse(userQuestion, defaultResponse, productId) {
        const pattern = this.extractPattern(userQuestion);

        if (this.learningData.patterns[pattern]) {
            const patternData = this.learningData.patterns[pattern];

            // If we have successful responses for this pattern, use the best one
            if (patternData.bestResponses.length > 0) {
                const bestForProduct = patternData.bestResponses.find(
                    r => r.productId === productId
                );

                if (bestForProduct && Math.random() > 0.3) { // 70% chance to use learned response
                    return bestForProduct.response;
                }

                // Otherwise return the overall best response adapted to current product
                if (patternData.successCount > patternData.failCount * 2) {
                    return defaultResponse;
                }
            }
        }

        return defaultResponse;
    }

    // Get suggestions based on common questions
    getSuggestions() {
        const topQuestions = Object.entries(this.learningData.statistics.topQuestions)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([question, count]) => question);

        const defaultSuggestions = [
            'Quelles sont les applications de ce produit ?',
            'Comment l\'utiliser correctement ?',
            'Quelles sont les alternatives ?'
        ];

        // Combine learned and default suggestions
        const combined = [...new Set([...topQuestions, ...defaultSuggestions])];
        return combined.slice(0, 3);
    }

    // Get analytics data
    getAnalytics() {
        return {
            totalInteractions: this.learningData.statistics.totalInteractions,
            positiveRatings: this.learningData.statistics.positiveRatings,
            negativeRatings: this.learningData.statistics.negativeRatings,
            averageRating: this.learningData.statistics.averageRating.toFixed(1),
            successRate: (
                (this.learningData.statistics.positiveRatings /
                (this.learningData.statistics.positiveRatings + this.learningData.statistics.negativeRatings)) * 100
            ).toFixed(1),
            topPatterns: this.getTopPatterns(),
            improvementAreas: this.getImprovementAreas()
        };
    }

    // Get top performing patterns
    getTopPatterns() {
        return Object.entries(this.learningData.patterns)
            .map(([pattern, data]) => ({
                pattern,
                successRate: (data.successCount / (data.successCount + data.failCount)) * 100,
                totalCount: data.successCount + data.failCount
            }))
            .sort((a, b) => b.successRate - a.successRate)
            .slice(0, 5);
    }

    // Get areas that need improvement
    getImprovementAreas() {
        return Object.entries(this.learningData.patterns)
            .filter(([pattern, data]) => data.failCount > data.successCount)
            .map(([pattern, data]) => ({
                pattern,
                failRate: (data.failCount / (data.successCount + data.failCount)) * 100,
                suggestions: data.improvements.slice(0, 3)
            }))
            .sort((a, b) => b.failRate - a.failRate)
            .slice(0, 3);
    }

    // Reset learning data (for testing)
    resetLearning() {
        this.learningData = {
            patterns: {},
            successfulResponses: [],
            failedResponses: [],
            userFeedback: [],
            statistics: {
                totalInteractions: 0,
                positiveRatings: 0,
                negativeRatings: 0,
                averageRating: 0,
                topQuestions: {}
            }
        };
        this.saveLearningData();
    }

    // Export learning data for analysis
    exportData() {
        return JSON.stringify(this.learningData, null, 2);
    }

    // Start new conversation
    startConversation() {
        this.currentConversation = [];
        this.conversationRatings = [];
    }
}

// Create global instance
const aiLearning = new AILearningSystem();
