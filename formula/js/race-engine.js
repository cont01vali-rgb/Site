/*************************************************
 * FORMULA LEARNING - RACE ENGINE
 * Main race logic, AI behavior, game state
 *************************************************/

class RaceEngine {
    constructor() {
        this.gameState = {
            track: null,
            questions: [],
            currentQuestion: 0,
            lives: 3,
            score: 0,
            position: 1,
            startTime: null,
            checkpoints: [],
            opponents: [],
            isRaceActive: false,
            isPaused: false
        };
        
        this.trackProgress = {
            player: 10, // Start player behind for more challenge
            ai1: 0,
            ai2: 0,
            ai3: 0,
            ai4: 0,
            ai5: 0
        };
        
        this.raceTimer = null;
        this.aiUpdateTimer = null;
    }

    // Initialize race from localStorage data
    async initializeRace() {
        console.log('🏁 Initializing Formula Learning Race...');
        
        try {
            // Get track selection from localStorage
            const trackData = localStorage.getItem('selectedTrack');
            const opponentsData = localStorage.getItem('raceOpponents');
            
            if (!trackData) {
                throw new Error('No track selected');
            }
            
            this.gameState.track = JSON.parse(trackData);
            this.gameState.opponents = opponentsData ? JSON.parse(opponentsData) : [];
            
            // Load questions for this track
            await this.loadQuestions();
            
            // Setup initial UI
            this.updateUI();
            
            // Initialize track visualization
            if (window.TrackRenderer) {
                window.TrackRenderer.initializeTrack(this.gameState.track.id);
            }
            
            // Start race countdown
            this.startRaceCountdown();
            
        } catch (error) {
            console.error('Failed to initialize race:', error);
            this.showError('Failed to load race. Returning to track selection...');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    }

    // Load questions based on track difficulty
    async loadQuestions() {
        const track = this.gameState.track;
        
        // Use the expanded question bank if available
        if (window.GermanQuestionBank) {
            this.gameState.questions = window.GermanQuestionBank.getBalancedQuestions(track.config.questions);
            console.log(`📚 Loaded ${this.gameState.questions.length} questions from expanded bank for ${track.config.name}`);
        } else {
            // Fallback to sample questions
            this.gameState.questions = this.generateSampleQuestions(track.config.questions);
            console.log(`📚 Loaded ${this.gameState.questions.length} sample questions for ${track.config.name}`);
        }
    }

    // Generate sample German learning questions
    generateSampleQuestions(count) {
        const sampleQuestions = [
            {
                id: 1,
                text: "What is the German word for 'car'?",
                options: ["Auto", "Haus", "Buch", "Wasser"],
                correct: 0,
                explanation: "Das Auto = the car. This is a fundamental vocabulary word in German.",
                difficulty: "easy"
            },
            {
                id: 2,
                text: "Which article goes with 'Mädchen' (girl)?",
                options: ["der", "die", "das", "dem"],
                correct: 2,
                explanation: "Das Mädchen - despite referring to a girl, 'Mädchen' is neuter because it ends in '-chen'.",
                difficulty: "medium"
            },
            {
                id: 3,
                text: "What is the correct plural of 'Buch' (book)?",
                options: ["Buchs", "Bücher", "Buchen", "Büchs"],
                correct: 1,
                explanation: "Die Bücher - many German nouns form plurals with umlaut changes.",
                difficulty: "medium"
            },
            {
                id: 4,
                text: "How do you say 'I am learning German'?",
                options: ["Ich lerne Deutsch", "Ich lernt Deutsch", "Ich lernst Deutsch", "Ich lernen Deutsch"],
                correct: 0,
                explanation: "Ich lerne Deutsch - 'ich' (I) takes the '-e' ending with regular verbs.",
                difficulty: "easy"
            },
            {
                id: 5,
                text: "Which is the accusative form of 'der Mann'?",
                options: ["der Mann", "dem Mann", "den Mann", "des Mannes"],
                correct: 2,
                explanation: "Den Mann - masculine nouns change from 'der' to 'den' in accusative case.",
                difficulty: "hard"
            },
            {
                id: 6,
                text: "What time is it? Es ist halb acht.",
                options: ["7:30", "8:30", "7:15", "8:15"],
                correct: 0,
                explanation: "Halb acht = half eight = 7:30. In German, 'half eight' means 30 minutes before eight.",
                difficulty: "medium"
            },
            {
                id: 7,
                text: "Choose the correct form: 'Die Kinder _____ gern.'",
                options: ["spielt", "spielen", "spielst", "spiele"],
                correct: 1,
                explanation: "Die Kinder spielen gern - plural subjects take the '-en' ending.",
                difficulty: "easy"
            },
            {
                id: 8,
                text: "What does 'Entschuldigung' mean?",
                options: ["Thank you", "Excuse me", "Good morning", "Goodbye"],
                correct: 1,
                explanation: "Entschuldigung = Excuse me/Sorry. A very useful polite expression in German.",
                difficulty: "easy"
            },
            {
                id: 9,
                text: "Which preposition requires accusative case?",
                options: ["mit", "durch", "von", "bei"],
                correct: 1,
                explanation: "Durch requires accusative case. Mit, von, and bei require dative case.",
                difficulty: "hard"
            },
            {
                id: 10,
                text: "How do you say 'My name is...' in German?",
                options: ["Mein Name bin...", "Mein Name ist...", "Mein Name hat...", "Mein Name wird..."],
                correct: 1,
                explanation: "Mein Name ist... - 'ist' (is) is the correct verb form with 'Name'.",
                difficulty: "easy"
            },
            {
                id: 11,
                text: "What is the genitive form of 'das Kind'?",
                options: ["das Kindes", "des Kindes", "dem Kind", "den Kind"],
                correct: 1,
                explanation: "Des Kindes - neuter nouns in genitive use 'des' + often add '-es' ending.",
                difficulty: "hard"
            },
            {
                id: 12,
                text: "Which modal verb means 'can/to be able to'?",
                options: ["müssen", "wollen", "können", "sollen"],
                correct: 2,
                explanation: "Können = can/to be able to. Essential modal verb for expressing ability.",
                difficulty: "medium"
            }
        ];

        // Shuffle and return the required number of questions
        const shuffled = sampleQuestions.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    }

    // Start race countdown
    startRaceCountdown() {
        let countdown = 3;
        const countdownElement = document.createElement('div');
        countdownElement.className = 'race-countdown';
        countdownElement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 6rem;
            font-weight: bold;
            color: #ffd700;
            z-index: 2000;
            text-shadow: 3px 3px 6px rgba(0,0,0,0.8);
        `;
        document.body.appendChild(countdownElement);

        const countdownInterval = setInterval(() => {
            if (countdown > 0) {
                countdownElement.textContent = countdown;
                countdown--;
            } else {
                countdownElement.textContent = '🏁 GO!';
                setTimeout(() => {
                    document.body.removeChild(countdownElement);
                    this.startRace();
                }, 800);
                clearInterval(countdownInterval);
            }
        }, 1000);
    }

    // Start the actual race
    startRace() {
        console.log('🚀 Race Started!');
        
        this.gameState.isRaceActive = true;
        this.gameState.startTime = Date.now();
        
        // Start AI movement simulation
        this.startAISimulation();
        
        // Show first checkpoint question immediately
        setTimeout(() => {
            this.showNextQuestion();
        }, 1000);
    }

    // Start AI opponent simulation with enhanced difficulty
    startAISimulation() {
        this.aiUpdateTimer = setInterval(() => {
            if (!this.gameState.isRaceActive || this.gameState.isPaused) return;
            
            // Update AI positions with enhanced difficulty system
            this.gameState.opponents.forEach((opponent, index) => {
                const aiKey = `ai${index + 1}`;
                const playerProgress = this.trackProgress.player;
                
                // AI behavior based on driver skill and type
                let aiSpeed = opponent.speed * 0.8; // Base speed from skill level
                
                // Legendary drivers (Verstappen/Leclerc) get special treatment
                if (opponent.difficulty === 'legendary') {
                    aiSpeed = opponent.speed * 1.2; // 20% faster
                    
                    // They maintain lead more aggressively
                    if (this.trackProgress[aiKey] < playerProgress + 10) {
                        aiSpeed *= 1.3; // Extra boost when behind
                    }
                } else if (opponent.difficulty === 'elite') {
                    aiSpeed = opponent.speed * 1.0;
                } else if (opponent.difficulty === 'pro') {
                    aiSpeed = opponent.speed * 0.9;
                } else {
                    aiSpeed = opponent.speed * 0.7; // Competitive drivers slower
                }
                
                // Add some randomness but keep skill-based performance
                const randomFactor = 0.8 + (Math.random() * 0.4); // 0.8 to 1.2
                aiSpeed *= randomFactor;
                
                // Update AI position
                this.trackProgress[aiKey] = Math.max(0, Math.min(100, 
                    this.trackProgress[aiKey] + aiSpeed
                ));
            });
            
            this.updateStandings();
            this.updateCarPositions();
        }, 1500); // Slightly faster updates for more dynamic racing
    }

    // Show next checkpoint question
    showNextQuestion() {
        if (this.gameState.currentQuestion >= this.gameState.questions.length) {
            this.completeRace();
            return;
        }

        const question = this.gameState.questions[this.gameState.currentQuestion];
        this.gameState.isPaused = true;
        
        // Update checkpoint indicator
        this.updateCheckpointProgress();
        
        // Show question modal
        if (window.QuestionHandler) {
            window.QuestionHandler.showQuestion(question, (isCorrect, timeBonus) => {
                this.handleAnswer(isCorrect, timeBonus);
            });
        }
    }

    // Handle answer submission
    handleAnswer(isCorrect, timeBonus = 0) {
        console.log(`📝 Answer: ${isCorrect ? 'Correct' : 'Incorrect'}, Time bonus: ${timeBonus}`);
        
        if (isCorrect) {
            // Correct answer - advance progress
            this.gameState.score += 10 + timeBonus;
            this.trackProgress.player += (100 / this.gameState.questions.length);
            
            // Advance to next question
            this.gameState.currentQuestion++;
            
        } else {
            // Incorrect answer - lose a life
            this.gameState.lives--;
            
            if (this.gameState.lives <= 0) {
                this.gameOver();
                return;
            } else {
                // Add 4 extra questions as penalty
                this.addPenaltyQuestions(4);
            }
        }
        
        // Update UI
        this.updateUI();
        this.updateCarPositions();
        
        // Continue race
        this.gameState.isPaused = false;
        
        // Show next question after brief delay
        setTimeout(() => {
            this.showNextQuestion();
        }, 1500);
    }

    // Add penalty questions when answer is wrong
    addPenaltyQuestions(count) {
        const penaltyQuestions = this.generateSampleQuestions(count);
        
        // Insert penalty questions after current question
        this.gameState.questions.splice(
            this.gameState.currentQuestion + 1, 
            0, 
            ...penaltyQuestions
        );
        
        console.log(`⚠️ Added ${count} penalty questions. Total questions now: ${this.gameState.questions.length}`);
    }

    // Update car positions on track
    updateCarPositions() {
        const playerCar = document.getElementById('player-car');
        const aiCars = [
            document.getElementById('ai-car-1'),
            document.getElementById('ai-car-2'),
            document.getElementById('ai-car-3'),
            document.getElementById('ai-car-4'),
            document.getElementById('ai-car-5')
        ];

        if (playerCar && window.TrackRenderer) {
            const position = window.TrackRenderer.getPositionOnTrack(this.trackProgress.player);
            if (position) {
                playerCar.style.left = position.x + 'px';
                playerCar.style.top = position.y + 'px';
            }
        }

        aiCars.forEach((car, index) => {
            if (car && window.TrackRenderer) {
                const progress = this.trackProgress[`ai${index + 1}`];
                const position = window.TrackRenderer.getPositionOnTrack(progress);
                if (position) {
                    car.style.left = position.x + 'px';
                    car.style.top = position.y + 'px';
                }
            }
        });
    }

    // Update race standings
    updateStandings() {
        const standings = [
            { type: 'player', name: 'You', progress: this.trackProgress.player, flag: '🏎️' },
            ...this.gameState.opponents.map((opponent, index) => ({
                type: 'ai',
                name: opponent.name,
                progress: this.trackProgress[`ai${index + 1}`],
                flag: opponent.flag
            }))
        ];

        // Sort by progress (descending)
        standings.sort((a, b) => b.progress - a.progress);

        // Update player position
        const playerPosition = standings.findIndex(s => s.type === 'player') + 1;
        this.gameState.position = playerPosition;

        // Update standings display
        const standingsContainer = document.getElementById('standings');
        if (standingsContainer) {
            standingsContainer.innerHTML = standings.map((standing, index) => `
                <div class="standing-item ${standing.type} ${index === 0 ? 'first' : ''} ${index === standings.length - 1 ? 'last' : ''}">
                    <div class="standing-position">${index + 1}</div>
                    <div class="standing-driver">
                        <span class="standing-flag">${standing.flag}</span>
                        <span class="standing-name">${standing.name}</span>
                    </div>
                    <div class="standing-progress">${Math.round(standing.progress)}%</div>
                </div>
            `).join('');
        }
    }

    // Update checkpoint progress indicators
    updateCheckpointProgress() {
        const checkpointInfo = document.getElementById('checkpoint-info');
        if (checkpointInfo) {
            const current = this.gameState.currentQuestion + 1;
            const total = this.gameState.questions.length;
            checkpointInfo.textContent = `Question ${current} of ${total} - Racing towards victory!`;
        }
        
        // Update progress bar
        if (window.TrackRenderer) {
            window.TrackRenderer.updateProgressBar(
                this.gameState.currentQuestion,
                this.gameState.questions.length,
                this.trackProgress.player
            );
        }
    }

    // Update all UI elements
    updateUI() {
        // Update track name
        const trackName = document.querySelector('.track-name');
        if (trackName && this.gameState.track) {
            trackName.textContent = `🏁 ${this.gameState.track.config.name}`;
        }

        // Update progress
        const progress = document.getElementById('progress');
        if (progress) {
            progress.textContent = `${this.gameState.currentQuestion}/${this.gameState.questions.length}`;
        }

        // Update lives
        const lives = document.getElementById('lives');
        if (lives) {
            lives.textContent = '❤️'.repeat(this.gameState.lives) + '🤍'.repeat(3 - this.gameState.lives);
        }

        // Update position
        const position = document.getElementById('position');
        if (position) {
            const positionText = this.gameState.position === 1 ? '1st' : 
                                 this.gameState.position === 2 ? '2nd' : 
                                 this.gameState.position === 3 ? '3rd' : 
                                 `${this.gameState.position}th`;
            position.textContent = positionText;
        }
    }

    // Handle game over scenario
    gameOver() {
        console.log('💥 Game Over - No lives remaining');
        
        this.gameState.isRaceActive = false;
        
        if (this.aiUpdateTimer) {
            clearInterval(this.aiUpdateTimer);
        }

        // Show game over modal
        const gameOverModal = document.getElementById('game-over-modal');
        if (gameOverModal) {
            gameOverModal.style.display = 'flex';
        }
    }

    // Complete the race successfully
    completeRace() {
        console.log('🏆 Race Complete!');
        
        this.gameState.isRaceActive = false;
        
        if (this.aiUpdateTimer) {
            clearInterval(this.aiUpdateTimer);
        }

        // Calculate final stats
        const raceTime = Date.now() - this.gameState.startTime;
        const finalStats = {
            position: this.gameState.position,
            correctAnswers: this.gameState.currentQuestion,
            totalQuestions: this.gameState.questions.length,
            raceTime: this.formatTime(raceTime),
            pointsEarned: this.gameState.score
        };

        // Show completion modal
        this.showRaceComplete(finalStats);
    }

    // Show race completion modal
    showRaceComplete(stats) {
        const modal = document.getElementById('race-complete-modal');
        if (!modal) return;

        // Update completion title based on position
        const title = document.getElementById('completion-title');
        const position = document.getElementById('final-position');
        if (title && position) {
            if (stats.position === 1) {
                title.textContent = '🏆 Victory!';
                position.textContent = '1st Place - Champion!';
                position.style.color = '#ffd700';
            } else if (stats.position === 2) {
                title.textContent = '🥈 Great Race!';
                position.textContent = '2nd Place - Well Done!';
                position.style.color = '#e5e7eb';
            } else if (stats.position === 3) {
                title.textContent = '🥉 Good Effort!';
                position.textContent = '3rd Place - Nice Try!';
                position.style.color = '#cd7c5c';
            } else {
                title.textContent = '🏁 Race Finished!';
                position.textContent = `${stats.position}th Place`;
                position.style.color = '#9ca3af';
            }
        }

        // Update stats
        this.updateStatElement('correct-count', `${stats.correctAnswers}/${stats.totalQuestions}`);
        this.updateStatElement('race-time', stats.raceTime);
        this.updateStatElement('final-pos-text', this.getPositionText(stats.position));
        this.updateStatElement('points-earned', stats.pointsEarned);

        // Generate podium
        this.generatePodium();

        modal.style.display = 'flex';
    }

    // Helper methods
    updateStatElement(id, value) {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    }

    getPositionText(position) {
        return position === 1 ? '1st' : position === 2 ? '2nd' : position === 3 ? '3rd' : `${position}th`;
    }

    formatTime(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    generatePodium() {
        const podium = document.getElementById('podium');
        if (!podium) return;

        const standings = [
            { name: 'You', position: this.gameState.position },
            ...this.gameState.opponents.map((opponent, index) => ({
                name: opponent.name,
                position: Math.floor(Math.random() * 4) + 1 // Random for demo
            }))
        ].sort((a, b) => a.position - b.position);

        podium.innerHTML = standings.slice(0, 3).map((driver, index) => {
            const placeClass = index === 0 ? 'first' : index === 1 ? 'second' : 'third';
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
            return `
                <div class="podium-place ${placeClass}">
                    <div style="font-size: 2rem;">${medal}</div>
                    <div>${driver.name}</div>
                </div>
            `;
        }).join('');
    }

    // Show error message
    showError(message) {
        alert(message); // Simple error handling for now
    }
}

// Global race engine instance
window.raceEngine = new RaceEngine();

// Global navigation functions
window.exitRace = function() {
    if (confirm('Are you sure you want to exit the race? Your progress will be lost.')) {
        window.location.href = 'index.html';
    }
};

window.continueRace = function() {
    if (window.QuestionHandler) {
        window.QuestionHandler.hideQuestion();
    }
};

window.raceAgain = function() {
    window.location.reload();
};

window.selectNewTrack = function() {
    window.location.href = 'index.html';
};

window.returnHome = function() {
    window.location.href = '../index.html';
};

window.restartFromCheckpoint = function() {
    // Reset to last checkpoint (for demo, just restart)
    window.location.reload();
};

window.restartRace = function() {
    window.location.reload();
};

window.selectEasierTrack = function() {
    localStorage.setItem('suggestEasierTrack', 'true');
    window.location.href = 'index.html';
};

// Initialize race when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏁 Formula Learning Race Page Loaded');
    window.raceEngine.initializeRace();
});