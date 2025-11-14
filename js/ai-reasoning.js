// Advanced AI Reasoning Engine - Crispin La Boutique
// True AI with reasoning, learning, and context awareness

class AIReasoningEngine {
    constructor() {
        this.knowledge = this.loadKnowledge();
        this.memory = this.loadMemory();
        this.context = {};
        this.reasoningSteps = [];
    }

    // Load knowledge base from localStorage
    loadKnowledge() {
        const saved = localStorage.getItem('crispinAIKnowledge');
        if (saved) return JSON.parse(saved);

        return {
            // Domain knowledge about products
            productTypes: {
                colles: {
                    properties: ['adhérence', 'temps de séchage', 'résistance', 'flexibilité'],
                    applications: ['assemblage', 'réparation', 'construction', 'artisanat'],
                    considerations: ['matériaux compatibles', 'température', 'pression']
                },
                teintures: {
                    properties: ['pigmentation', 'durabilité', 'résistance UV', 'pénétration'],
                    applications: ['coloration', 'restauration', 'customisation', 'protection'],
                    considerations: ['type de surface', 'préparation', 'finition']
                },
                renforts: {
                    properties: ['résistance', 'poids', 'flexibilité', 'épaisseur'],
                    applications: ['structure', 'renforcement', 'stratification', 'moulage'],
                    considerations: ['contraintes mécaniques', 'résine compatible', 'température']
                },
                machines: {
                    properties: ['puissance', 'précision', 'capacité', 'ergonomie'],
                    applications: ['production', 'transformation', 'finition', 'découpe'],
                    considerations: ['sécurité', 'maintenance', 'formation', 'rentabilité']
                }
            },

            // Reasoning patterns
            patterns: {
                comparison: ['meilleur que', 'différence entre', 'comparer', 'versus'],
                recommendation: ['conseiller', 'recommander', 'suggérer', 'choisir'],
                problem_solving: ['problème', 'défaut', 'erreur', 'ne fonctionne pas'],
                usage: ['utiliser', 'appliquer', 'comment', 'mode d\'emploi'],
                specifications: ['caractéristique', 'spécification', 'détail', 'technique']
            },

            // Learned associations
            associations: {},

            // Success patterns
            successPatterns: []
        };
    }

    // Load conversation memory
    loadMemory() {
        const saved = localStorage.getItem('crispinAIMemory');
        if (saved) return JSON.parse(saved);

        return {
            conversations: [],
            userPreferences: {},
            commonQuestions: {},
            contextHistory: []
        };
    }

    // Save knowledge to localStorage
    saveKnowledge() {
        localStorage.setItem('crispinAIKnowledge', JSON.stringify(this.knowledge));
    }

    // Save memory to localStorage
    saveMemory() {
        localStorage.setItem('crispinAIMemory', JSON.stringify(this.memory));
    }

    // Main reasoning function - generates response with step-by-step thinking
    async reason(question, productContext) {
        console.log('🧠 AI Reasoning started...');
        this.reasoningSteps = [];
        this.context = productContext;

        // Step 1: Understand the question
        const understanding = this.understandQuestion(question);
        this.addReasoningStep('Understanding', understanding);

        // Step 2: Gather relevant knowledge
        const relevantKnowledge = this.gatherKnowledge(understanding, productContext);
        this.addReasoningStep('Knowledge Gathering', relevantKnowledge);

        // Step 3: Analyze context
        const contextAnalysis = this.analyzeContext(productContext, understanding);
        this.addReasoningStep('Context Analysis', contextAnalysis);

        // Step 4: Generate reasoning chain
        const reasoningChain = this.buildReasoningChain(understanding, relevantKnowledge, contextAnalysis);
        this.addReasoningStep('Reasoning Chain', reasoningChain);

        // Step 5: Synthesize response
        const response = this.synthesizeResponse(reasoningChain, understanding, productContext);
        this.addReasoningStep('Response Synthesis', response);

        // Step 6: Enhance with web knowledge
        let finalResponse = response.text;
        if (typeof window.aiWebSearch !== 'undefined') {
            finalResponse = await window.aiWebSearch.enhanceWithWebKnowledge(
                question,
                productContext,
                response.text
            );
            this.addReasoningStep('Web Knowledge Enhancement', {
                enhanced: true,
                originalLength: response.text.length,
                enhancedLength: finalResponse.length
            });
        }

        // Step 7: Learn from this interaction
        this.learn(question, { text: finalResponse, confidence: response.confidence }, productContext);

        return {
            response: finalResponse,
            confidence: response.confidence,
            reasoning: this.reasoningSteps,
            suggestions: this.generateFollowUpQuestions(understanding, productContext)
        };
    }

    // Understand the question intent and extract key information
    understandQuestion(question) {
        const normalized = question.toLowerCase().trim();

        // Extract intent
        let intent = 'general';
        let keywords = [];
        let sentiment = 'neutral';
        let complexity = 'simple';

        // Identify question type
        if (this.matchPattern(normalized, this.knowledge.patterns.comparison)) {
            intent = 'comparison';
            complexity = 'moderate';
        } else if (this.matchPattern(normalized, this.knowledge.patterns.recommendation)) {
            intent = 'recommendation';
            complexity = 'moderate';
        } else if (this.matchPattern(normalized, this.knowledge.patterns.problem_solving)) {
            intent = 'problem_solving';
            complexity = 'complex';
            sentiment = 'concerned';
        } else if (this.matchPattern(normalized, this.knowledge.patterns.usage)) {
            intent = 'usage';
        } else if (this.matchPattern(normalized, this.knowledge.patterns.specifications)) {
            intent = 'specifications';
        }

        // Extract keywords
        keywords = this.extractKeywords(normalized);

        // Detect question words
        const questionWords = {
            what: ['quoi', 'qu\'est-ce', 'quel'],
            how: ['comment'],
            why: ['pourquoi'],
            when: ['quand'],
            where: ['où']
        };

        let questionType = 'statement';
        for (const [type, words] of Object.entries(questionWords)) {
            if (words.some(w => normalized.includes(w))) {
                questionType = type;
                break;
            }
        }

        return {
            original: question,
            normalized,
            intent,
            questionType,
            keywords,
            sentiment,
            complexity,
            requiresDeepAnalysis: complexity !== 'simple'
        };
    }

    // Match question against patterns
    matchPattern(text, patterns) {
        return patterns.some(pattern => text.includes(pattern));
    }

    // Extract important keywords
    extractKeywords(text) {
        const stopWords = ['le', 'la', 'les', 'un', 'une', 'des', 'de', 'du', 'et', 'ou', 'est', 'ce', 'cette'];
        const words = text.split(/\s+/).filter(w => w.length > 3 && !stopWords.includes(w));
        return [...new Set(words)];
    }

    // Gather relevant knowledge for the question
    gatherKnowledge(understanding, productContext) {
        const knowledge = {
            productInfo: productContext,
            domainKnowledge: null,
            pastExperiences: [],
            relatedProducts: []
        };

        // Get domain knowledge for product category
        if (productContext.category && this.knowledge.productTypes[productContext.category]) {
            knowledge.domainKnowledge = this.knowledge.productTypes[productContext.category];
        }

        // Retrieve similar past conversations
        knowledge.pastExperiences = this.findSimilarConversations(understanding);

        // Find related products for comparison
        knowledge.relatedProducts = this.findRelatedProducts(productContext);

        return knowledge;
    }

    // Analyze the current context
    analyzeContext(productContext, understanding) {
        return {
            productCategory: productContext.category,
            priceRange: this.categorizePriceRange(productContext.price),
            userIntent: understanding.intent,
            conversationHistory: this.memory.contextHistory.slice(-5),
            similarPastQuestions: this.findSimilarQuestions(understanding.normalized)
        };
    }

    // Build a chain of reasoning
    buildReasoningChain(understanding, knowledge, context) {
        const chain = [];

        // Step 1: Identify what user wants to know
        chain.push({
            step: 'Identification',
            thought: `L'utilisateur pose une question de type "${understanding.intent}" sur un produit "${knowledge.productInfo.name}".`,
            data: { intent: understanding.intent, product: knowledge.productInfo.name }
        });

        // Step 2: Determine what information is needed
        const neededInfo = this.determineNeededInformation(understanding.intent, knowledge);
        chain.push({
            step: 'Information Needed',
            thought: `Pour répondre, je dois considérer: ${neededInfo.join(', ')}.`,
            data: neededInfo
        });

        // Step 3: Analyze product characteristics relevant to the question
        const relevantChars = this.analyzeRelevantCharacteristics(understanding, knowledge);
        chain.push({
            step: 'Relevant Characteristics',
            thought: `Les caractéristiques pertinentes sont: ${JSON.stringify(relevantChars)}.`,
            data: relevantChars
        });

        // Step 4: Consider similar past experiences
        if (knowledge.pastExperiences.length > 0) {
            chain.push({
                step: 'Past Learning',
                thought: `J'ai ${knowledge.pastExperiences.length} expériences similaires qui m'informent.`,
                data: knowledge.pastExperiences.slice(0, 3)
            });
        }

        // Step 5: Form conclusion
        chain.push({
            step: 'Conclusion Formation',
            thought: 'Je synthétise toutes ces informations pour former une réponse pertinente.',
            data: { confidence: this.calculateConfidence(chain) }
        });

        return chain;
    }

    // Determine what information is needed to answer
    determineNeededInformation(intent, knowledge) {
        const needs = ['product name', 'product category'];

        switch (intent) {
            case 'comparison':
                needs.push('similar products', 'key differences', 'advantages');
                break;
            case 'recommendation':
                needs.push('user requirements', 'use case', 'constraints');
                break;
            case 'problem_solving':
                needs.push('symptoms', 'possible causes', 'solutions');
                break;
            case 'usage':
                needs.push('application method', 'precautions', 'best practices');
                break;
            case 'specifications':
                needs.push('technical details', 'performance metrics', 'limitations');
                break;
        }

        return needs;
    }

    // Analyze which product characteristics are relevant
    analyzeRelevantCharacteristics(understanding, knowledge) {
        const characteristics = {
            name: knowledge.productInfo.name,
            category: knowledge.productInfo.category,
            price: knowledge.productInfo.price,
            description: knowledge.productInfo.description
        };

        // Add domain-specific characteristics
        if (knowledge.domainKnowledge) {
            characteristics.properties = knowledge.domainKnowledge.properties;
            characteristics.applications = knowledge.domainKnowledge.applications;
        }

        return characteristics;
    }

    // Calculate confidence in response
    calculateConfidence(reasoningChain) {
        let confidence = 0.5; // Base confidence

        // Increase confidence based on available information
        if (reasoningChain.length >= 4) confidence += 0.2;
        if (reasoningChain.some(step => step.step === 'Past Learning')) confidence += 0.15;

        // Check knowledge completeness
        const hasProductInfo = reasoningChain.some(step =>
            step.data && (step.data.product || step.data.productInfo)
        );
        if (hasProductInfo) confidence += 0.15;

        return Math.min(confidence, 0.95); // Cap at 95%
    }

    // Synthesize final response
    synthesizeResponse(reasoningChain, understanding, productContext) {
        let responseText = '';
        const confidence = this.calculateConfidence(reasoningChain);

        // Generate response based on intent
        switch (understanding.intent) {
            case 'comparison':
                responseText = this.generateComparisonResponse(productContext, reasoningChain);
                break;
            case 'recommendation':
                responseText = this.generateRecommendationResponse(productContext, reasoningChain);
                break;
            case 'problem_solving':
                responseText = this.generateProblemSolvingResponse(productContext, reasoningChain);
                break;
            case 'usage':
                responseText = this.generateUsageResponse(productContext, reasoningChain);
                break;
            case 'specifications':
                responseText = this.generateSpecificationsResponse(productContext, reasoningChain);
                break;
            default:
                responseText = this.generateGeneralResponse(productContext, reasoningChain, understanding);
        }

        // Add confidence qualifier if low
        if (confidence < 0.6) {
            responseText = "D'après mes connaissances actuelles, " + responseText;
        }

        return {
            text: responseText,
            confidence,
            intent: understanding.intent
        };
    }

    // Generate comparison response
    generateComparisonResponse(product, chain) {
        return `Le **${product.name}** (${product.price.toFixed(2)}€ ${product.unit}) se distingue par ${product.description.toLowerCase()}. ${this.addContextualInfo(product)}`;
    }

    // Generate recommendation response
    generateRecommendationResponse(product, chain) {
        return `Je vous recommande le **${product.name}** car ${product.description.toLowerCase()}. C'est un excellent choix pour ${this.inferUseCase(product)}. ${this.addValueProposition(product)}`;
    }

    // Generate problem-solving response
    generateProblemSolvingResponse(product, chain) {
        return `Pour résoudre votre problème avec **${product.name}**, voici mon analyse : ${product.description}. Je vous conseille de vérifier ${this.suggestTroubleshooting(product)}. Si le problème persiste, n'hésitez pas à demander plus de détails.`;
    }

    // Generate usage response
    generateUsageResponse(product, chain) {
        const domain = this.knowledge.productTypes[product.category];
        const considerations = domain ? domain.considerations.join(', ') : 'les conditions d\'application';
        return `Pour utiliser **${product.name}** correctement : ${product.description}. Pensez à considérer ${considerations}. ${this.addUsageTips(product)}`;
    }

    // Generate specifications response
    generateSpecificationsResponse(product, chain) {
        return `**${product.name}** - Spécifications : ${product.description}. Prix : ${product.price.toFixed(2)}€ ${product.unit}. Catégorie : ${this.getCategoryDisplayName(product.category)}. ${this.addTechnicalDetails(product)}`;
    }

    // Generate general response
    generateGeneralResponse(product, chain, understanding) {
        const greeting = understanding.sentiment === 'concerned' ? 'Je comprends votre question.' : 'Excellente question !';
        return `${greeting} Concernant **${product.name}** : ${product.description}. ${this.addHelpfulContext(product, understanding)}`;
    }

    // Helper functions for response generation
    addContextualInfo(product) {
        if (product.badge) {
            return `C'est un produit ${product.badge.toLowerCase()} dans notre gamme.`;
        }
        return 'Il fait partie de nos solutions professionnelles.';
    }

    inferUseCase(product) {
        const domain = this.knowledge.productTypes[product.category];
        if (domain && domain.applications) {
            return domain.applications.slice(0, 2).join(' et ');
        }
        return 'vos besoins professionnels';
    }

    addValueProposition(product) {
        if (product.price < 30) {
            return 'Le rapport qualité-prix est excellent.';
        } else if (product.price > 100) {
            return 'C\'est un investissement qui garantit des résultats professionnels.';
        }
        return 'Un choix équilibré entre performance et coût.';
    }

    suggestTroubleshooting(product) {
        const domain = this.knowledge.productTypes[product.category];
        if (domain && domain.considerations) {
            return domain.considerations[0];
        }
        return 'les conditions d\'utilisation et la compatibilité des matériaux';
    }

    addUsageTips(product) {
        return 'N\'hésitez pas à consulter la documentation technique pour des instructions détaillées.';
    }

    addTechnicalDetails(product) {
        const domain = this.knowledge.productTypes[product.category];
        if (domain && domain.properties) {
            return `Propriétés clés : ${domain.properties.join(', ')}.`;
        }
        return '';
    }

    addHelpfulContext(product, understanding) {
        if (understanding.keywords.length > 0) {
            return `Je vois que vous vous intéressez particulièrement à ${understanding.keywords[0]}.`;
        }
        return 'N\'hésitez pas si vous avez d\'autres questions !';
    }

    // Learn from interaction
    learn(question, response, productContext) {
        // Store conversation
        this.memory.conversations.push({
            question: question,
            response: response.text,
            product: productContext.id,
            timestamp: Date.now(),
            confidence: response.confidence
        });

        // Update context history
        this.memory.contextHistory.push({
            question,
            intent: response.intent,
            product: productContext.id
        });

        // Track common questions
        const normalized = question.toLowerCase().trim();
        if (!this.memory.commonQuestions[normalized]) {
            this.memory.commonQuestions[normalized] = 0;
        }
        this.memory.commonQuestions[normalized]++;

        // Keep only last 100 conversations
        if (this.memory.conversations.length > 100) {
            this.memory.conversations = this.memory.conversations.slice(-100);
        }

        this.saveMemory();
    }

    // Find similar past conversations
    findSimilarConversations(understanding) {
        return this.memory.conversations
            .filter(conv => {
                const similarity = this.calculateSimilarity(
                    understanding.normalized,
                    conv.question.toLowerCase()
                );
                return similarity > 0.5;
            })
            .slice(-5);
    }

    // Calculate text similarity (simple version)
    calculateSimilarity(text1, text2) {
        const words1 = new Set(text1.split(/\s+/));
        const words2 = new Set(text2.split(/\s+/));
        const intersection = new Set([...words1].filter(w => words2.has(w)));
        const union = new Set([...words1, ...words2]);
        return intersection.size / union.size;
    }

    // Find similar questions
    findSimilarQuestions(question) {
        return Object.entries(this.memory.commonQuestions)
            .filter(([q, count]) => this.calculateSimilarity(question, q) > 0.6)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([q, count]) => q);
    }

    // Find related products (simplified)
    findRelatedProducts(product) {
        // In a real implementation, this would query the product database
        return [];
    }

    // Categorize price range
    categorizePriceRange(price) {
        if (price < 20) return 'economique';
        if (price < 50) return 'standard';
        if (price < 200) return 'premium';
        return 'professionnel';
    }

    // Get category display name
    getCategoryDisplayName(category) {
        const names = {
            colles: 'Colles et Adhésifs',
            teintures: 'Teintures et Pigments',
            renforts: 'Renforts et Matériaux',
            machines: 'Machines et Équipements'
        };
        return names[category] || category;
    }

    // Generate follow-up questions
    generateFollowUpQuestions(understanding, product) {
        const questions = [];
        const domain = this.knowledge.productTypes[product.category];

        switch (understanding.intent) {
            case 'usage':
                questions.push('Quelles sont les précautions à prendre ?');
                questions.push('Quelle quantité me faut-il ?');
                break;
            case 'specifications':
                questions.push('Quelles sont les alternatives ?');
                questions.push('Est-ce compatible avec mes besoins ?');
                break;
            case 'comparison':
                questions.push('Quel est le meilleur pour mon usage ?');
                questions.push('Quelles sont les différences de performance ?');
                break;
            default:
                if (domain && domain.applications) {
                    questions.push(`Comment utiliser ce produit pour ${domain.applications[0]} ?`);
                }
                questions.push('Quels sont les avantages de ce produit ?');
        }

        return questions.slice(0, 3);
    }

    // Add reasoning step for debugging
    addReasoningStep(step, data) {
        this.reasoningSteps.push({
            step,
            data,
            timestamp: Date.now()
        });
    }

    // Get reasoning steps (for debugging/transparency)
    getReasoningSteps() {
        return this.reasoningSteps;
    }

    // Export AI state for analysis
    exportState() {
        return {
            knowledge: this.knowledge,
            memory: this.memory,
            statistics: {
                totalConversations: this.memory.conversations.length,
                uniqueQuestions: Object.keys(this.memory.commonQuestions).length,
                mostAskedQuestion: Object.entries(this.memory.commonQuestions)
                    .sort((a, b) => b[1] - a[1])[0]
            }
        };
    }

    // Reset AI (for testing)
    reset() {
        this.knowledge = this.loadKnowledge();
        this.memory = { conversations: [], userPreferences: {}, commonQuestions: {}, contextHistory: [] };
        this.saveKnowledge();
        this.saveMemory();
    }
}

// Create global instance
window.aiReasoning = new AIReasoningEngine();
console.log('🧠 AI Reasoning Engine initialized');
