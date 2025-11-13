// Admin Dashboard - Crispin La Boutique AI Analytics

let satisfactionChart = null;
let patternsChart = null;

// Initialize dashboard
function initDashboard() {
    loadKPIs();
    loadCharts();
    loadTopQuestions();
    loadTopPatterns();
    loadImprovementAreas();
    loadRecentFeedback();
}

// Load KPIs
function loadKPIs() {
    const analytics = aiLearning.getAnalytics();

    document.getElementById('totalInteractions').textContent = analytics.totalInteractions;
    document.getElementById('satisfactionRate').textContent = analytics.successRate + '%';
    document.getElementById('positiveRatings').textContent = analytics.positiveRatings;
    document.getElementById('negativeRatings').textContent = analytics.negativeRatings;

    // Add trend indicator
    const trendEl = document.getElementById('satisfactionTrend');
    const rate = parseFloat(analytics.successRate);

    if (rate >= 80) {
        trendEl.textContent = '📈 Excellent';
        trendEl.className = 'kpi-trend positive';
    } else if (rate >= 60) {
        trendEl.textContent = '📊 Bon';
        trendEl.className = 'kpi-trend positive';
    } else if (rate >= 40) {
        trendEl.textContent = '📉 Moyen';
        trendEl.className = 'kpi-trend';
    } else {
        trendEl.textContent = '⚠️ À améliorer';
        trendEl.className = 'kpi-trend negative';
    }
}

// Load satisfaction evolution chart
function loadCharts() {
    loadSatisfactionChart();
    loadPatternsChart();
}

function loadSatisfactionChart() {
    const ctx = document.getElementById('satisfactionChart');
    if (!ctx) return;

    // Simulate historical data (in real app, this would be stored)
    const data = aiLearning.learningData;
    const successfulCount = data.successfulResponses.length;
    const failedCount = data.failedResponses.length;
    const total = successfulCount + failedCount;

    if (total === 0) {
        ctx.parentElement.innerHTML = '<div class="empty-state">Aucune donnée disponible pour le moment</div>';
        return;
    }

    // Create time-based data points
    const allResponses = [
        ...data.successfulResponses.map(r => ({ ...r, success: true })),
        ...data.failedResponses.map(r => ({ ...r, success: false }))
    ].sort((a, b) => a.timestamp - b.timestamp);

    // Group by time intervals (every 5 interactions)
    const groupSize = Math.max(5, Math.floor(allResponses.length / 10));
    const groups = [];
    for (let i = 0; i < allResponses.length; i += groupSize) {
        const group = allResponses.slice(i, i + groupSize);
        const successRate = (group.filter(r => r.success).length / group.length) * 100;
        groups.push(successRate);
    }

    if (satisfactionChart) {
        satisfactionChart.destroy();
    }

    satisfactionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: groups.map((_, i) => `Groupe ${i + 1}`),
            datasets: [{
                label: 'Taux de satisfaction (%)',
                data: groups,
                borderColor: '#FC4C02',
                backgroundColor: 'rgba(252, 76, 2, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Satisfaction: ' + context.parsed.y.toFixed(1) + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

function loadPatternsChart() {
    const ctx = document.getElementById('patternsChart');
    if (!ctx) return;

    const analytics = aiLearning.getAnalytics();
    const patterns = analytics.topPatterns;

    if (patterns.length === 0) {
        ctx.parentElement.innerHTML = '<div class="empty-state">Aucun pattern détecté pour le moment</div>';
        return;
    }

    const labels = patterns.map(p => formatPatternName(p.pattern));
    const data = patterns.map(p => p.totalCount);
    const colors = [
        '#FC4C02',
        '#3b82f6',
        '#10b981',
        '#f59e0b',
        '#ef4444'
    ];

    if (patternsChart) {
        patternsChart.destroy();
    }

    patternsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return label + ': ' + value + ' (' + percentage + '%)';
                        }
                    }
                }
            }
        }
    });
}

// Load top questions
function loadTopQuestions() {
    const container = document.getElementById('topQuestions');
    const questions = Object.entries(aiLearning.learningData.statistics.topQuestions)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    if (questions.length === 0) {
        container.innerHTML = '<div class="empty-state">Aucune question posée pour le moment</div>';
        return;
    }

    container.innerHTML = questions.map(([question, count]) => `
        <div class="question-item">
            <span class="question-text">${escapeHtml(question)}</span>
            <span class="question-count">${count}</span>
        </div>
    `).join('');
}

// Load top patterns
function loadTopPatterns() {
    const container = document.getElementById('topPatterns');
    const analytics = aiLearning.getAnalytics();
    const patterns = analytics.topPatterns;

    if (patterns.length === 0) {
        container.innerHTML = '<div class="empty-state">Aucun pattern analysé pour le moment</div>';
        return;
    }

    container.innerHTML = patterns.map(pattern => {
        let rateClass = 'poor';
        if (pattern.successRate >= 80) rateClass = 'excellent';
        else if (pattern.successRate >= 60) rateClass = 'good';
        else if (pattern.successRate >= 40) rateClass = 'average';

        return `
            <div class="pattern-item">
                <div class="pattern-header">
                    <span class="pattern-name">${formatPatternName(pattern.pattern)}</span>
                    <span class="pattern-rate ${rateClass}">${pattern.successRate.toFixed(1)}%</span>
                </div>
                <div class="pattern-bar">
                    <div class="pattern-fill" style="width: ${pattern.successRate}%; background: ${getPatternColor(rateClass)};"></div>
                </div>
            </div>
        `;
    }).join('');
}

// Load improvement areas
function loadImprovementAreas() {
    const container = document.getElementById('improvementAreas');
    const analytics = aiLearning.getAnalytics();
    const areas = analytics.improvementAreas;

    if (areas.length === 0) {
        container.innerHTML = '<div class="empty-state" style="background: #ecfdf5; color: #059669;">✓ Aucune zone d\'amélioration identifiée. L\'IA performe bien !</div>';
        return;
    }

    container.innerHTML = areas.map(area => `
        <div class="improvement-item">
            <div class="improvement-header">
                <span class="improvement-pattern">${formatPatternName(area.pattern)}</span>
                <span class="improvement-rate">${area.failRate.toFixed(1)}% d'échec</span>
            </div>
            ${area.suggestions.length > 0 ? `
                <div class="improvement-suggestions">
                    <h4>Suggestions d'utilisateurs :</h4>
                    <ul>
                        ${area.suggestions.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    `).join('');
}

// Load recent feedback
function loadRecentFeedback() {
    const container = document.getElementById('recentFeedback');
    const feedback = aiLearning.learningData.userFeedback
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 10);

    if (feedback.length === 0) {
        container.innerHTML = '<div class="empty-state">Aucun retour utilisateur pour le moment</div>';
        return;
    }

    container.innerHTML = feedback.map(item => `
        <div class="feedback-item">
            <div class="feedback-question">"${escapeHtml(item.question)}"</div>
            <div class="feedback-text">${escapeHtml(item.feedback)}</div>
            <div class="feedback-date">${formatDate(item.timestamp)}</div>
        </div>
    `).join('');
}

// Utility functions
function formatPatternName(pattern) {
    return pattern
        .replace('greeting_', 'Salutation - ')
        .replace('question_', 'Question - ')
        .replace('politeness_', 'Politesse - ')
        .replace('_', ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
}

function getPatternColor(rateClass) {
    const colors = {
        excellent: '#10b981',
        good: '#3b82f6',
        average: '#f59e0b',
        poor: '#ef4444'
    };
    return colors[rateClass] || '#6b7280';
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
    if (hours < 24) return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    if (days < 7) return `Il y a ${days} jour${days > 1 ? 's' : ''}`;

    return date.toLocaleDateString('fr-FR');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Actions
function refreshData() {
    initDashboard();
}

function exportData() {
    const data = aiLearning.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `crispin-ai-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    alert('Données exportées avec succès !');
}

function resetLearning() {
    if (confirm('⚠️ ATTENTION !\n\nCette action va effacer toutes les données d\'apprentissage de l\'IA.\n\nÊtes-vous absolument sûr de vouloir continuer ?')) {
        if (confirm('Dernière confirmation : Voulez-vous vraiment réinitialiser l\'apprentissage ?')) {
            aiLearning.resetLearning();
            alert('✓ L\'apprentissage a été réinitialisé.');
            location.reload();
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initDashboard);
