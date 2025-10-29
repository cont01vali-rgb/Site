/*************************************************
 * HOME.JS - Dashboard logic pentru pagina principală
 *************************************************/

window.homeData = {
    // Mesaje motivaționale
    welcomeMessages: {
        ro: [
            'Bună ziua! Gata să învățăm germana? 🇩🇪',
            'Willkommen! Hai să continuăm! 📚',
            'Excelent! Să facem progrese astăzi! 💪',
            'Guten Tag! Timpul pentru o nouă lecție! ⏰'
        ],
        en: [
            'Good day! Ready to learn German? 🇩🇪',
            'Willkommen! Let\'s continue! 📚',
            'Excellent! Let\'s make progress today! 💪',
            'Guten Tag! Time for a new lesson! ⏰'
        ],
        ua: [
            'Добрий день! Готові вивчати німецьку? 🇩🇪',
            'Willkommen! Давайте продовжимо! 📚',
            'Чудово! Робимо прогрес сьогодні! 💪',
            'Guten Tag! Час для нового уроку! ⏰'
        ]
    }
};

class HomePage {
    constructor() {
        this.currentLang = localStorage.getItem('selectedLanguage') || 'ro';
        this.init();
    }

    init() {
        this.updateWelcomeMessage();
        this.renderQuickActions();
        this.addCardAnimations();
        this.startTypingAnimation();
        
        // Event listener pentru schimbarea limbii
        document.addEventListener('languageChanged', () => {
            this.currentLang = localStorage.getItem('selectedLanguage') || 'ro';
            this.updateWelcomeMessage();
            this.renderQuickActions();
        });
    }

    updateWelcomeMessage() {
        const messages = window.homeData.welcomeMessages[this.currentLang];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        const messageElement = document.getElementById('welcome-message');
        if (messageElement) {
            messageElement.textContent = randomMessage;
            messageElement.style.opacity = '0';
            setTimeout(() => {
                messageElement.style.opacity = '1';
            }, 100);
        }
    }

    renderStats() {
        const statsContainer = document.getElementById('stats-container');
        if (!statsContainer) return;

        statsContainer.innerHTML = `
            <div class="stat-card">
                <div class="stat-number">${this.stats.lessonsCompleted}</div>
                <div class="stat-label">Lecții</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${this.stats.testsCompleted}</div>
                <div class="stat-label">Teste</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${this.stats.currentStreak}</div>
                <div class="stat-label">Zile</div>
            </div>
        `;
    }

    renderQuickActions() {
        const actionsContainer = document.getElementById('quick-actions');
        if (!actionsContainer) return;

        const getTranslation = (key, fallback) => {
            if (window.translationSystem) {
                return window.translationSystem.t(key) || fallback;
            }
            return fallback;
        };

        const continueTitle = getTranslation('home.continue_lesson', 'Continuă Lecția');
        const continueSubtitle = getTranslation('home.continue_subtitle', 'Das deutsche Alphabet');
        const raceTitle = getTranslation('home.start_race', 'Începe Cursa');
        const raceSubtitle = getTranslation('home.race_subtitle', 'F1 Racing cu Germana');

        const actionsHTML = `
            <div class="quick-action" onclick="location.href='lessons/lesson1.html'">
                <div class="action-icon">▶️</div>
                <div class="action-content">
                    <div class="action-title">${continueTitle}</div>
                    <div class="action-subtitle">${continueSubtitle}</div>
                </div>
            </div>
            <div class="quick-action f1-racing-action" onclick="location.href='formula/index.html'">
                <div class="action-icon f1-flag">🏁</div>
                <div class="action-content">
                    <div class="action-title">${raceTitle}</div>
                    <div class="action-subtitle">${raceSubtitle}</div>
                </div>
                <div class="action-extra">
                    <span class="romania-flag">🇷🇴</span>
                </div>
            </div>
        `;

        actionsContainer.innerHTML = actionsHTML;
    }

    addCardAnimations() {
        const cards = document.querySelectorAll('.card, .quick-action');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in-up');
            
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    startTypingAnimation() {
        const titleElement = document.querySelector('[data-i18n="home.title"]');
        if (!titleElement) return;

        const text = titleElement.textContent;
        titleElement.textContent = '';
        titleElement.style.borderRight = '2px solid #333';
        
        let i = 0;
        const typing = setInterval(() => {
            titleElement.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(typing);
                setTimeout(() => {
                    titleElement.style.borderRight = 'none';
                }, 1000);
            }
        }, 100);
    }
}

// Inițializează când DOM-ul este încărcat
document.addEventListener('DOMContentLoaded', () => {
    window.homePage = new HomePage();
});