/*************************************************
 * FORMULA LEARNING - QUESTION HANDLER
 * Question display, answer handling, feedback
 *************************************************/

class QuestionHandler {
    constructor() {
        this.currentQuestion = null;
        this.answerCallback = null;
        this.questionStartTime = null;
        this.selectedAnswer = null;
        this.isAnswering = false;
    }

    // Show question in modal
    showQuestion(question, callback) {
        console.log('📚 Showing question:', question.text);
        
        this.currentQuestion = question;
        this.answerCallback = callback;
        this.questionStartTime = Date.now();
        this.selectedAnswer = null;
        this.isAnswering = true;
        
        // Get modal elements
        const modal = document.getElementById('question-modal');
        const questionText = document.getElementById('question-text');
        const questionNumber = document.getElementById('question-number');
        const totalQuestions = document.getElementById('total-questions');
        const answerOptions = document.getElementById('answer-options');
        const submitButton = document.getElementById('submit-answer');
        const timeBonusElement = document.getElementById('time-bonus');
        
        if (!modal || !questionText || !answerOptions) {
            console.error('Question modal elements not found');
            return;
        }

        // Update question content
        questionText.textContent = question.text;
        
        // Update question progress
        if (questionNumber) {
            const raceEngine = window.raceEngine;
            const current = raceEngine ? raceEngine.gameState.currentQuestion + 1 : 1;
            questionNumber.textContent = current;
        }
        
        if (totalQuestions) {
            const raceEngine = window.raceEngine;
            const total = raceEngine ? raceEngine.gameState.questions.length : 5;
            totalQuestions.textContent = total;
        }

        // Create answer options
        this.createAnswerOptions(question.options, answerOptions);
        
        // Reset submit button
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.onclick = () => this.submitAnswer();
        }
        
        // Start time bonus countdown
        this.startTimeBonusCountdown(timeBonusElement);
        
        // Show modal
        modal.style.display = 'flex';
        
        // Add keyboard support
        this.addKeyboardSupport();
    }

    // Create answer option buttons
    createAnswerOptions(options, container) {
        container.innerHTML = '';
        
        options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'answer-option';
            button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
            button.setAttribute('data-index', index);
            
            button.addEventListener('click', () => {
                this.selectAnswer(index, button);
            });
            
            container.appendChild(button);
        });
    }

    // Handle answer selection
    selectAnswer(answerIndex, buttonElement) {
        if (!this.isAnswering) return;
        
        // Remove previous selection
        const previousSelected = document.querySelector('.answer-option.selected');
        if (previousSelected) {
            previousSelected.classList.remove('selected');
        }
        
        // Mark new selection
        buttonElement.classList.add('selected');
        this.selectedAnswer = answerIndex;
        
        // Enable submit button
        const submitButton = document.getElementById('submit-answer');
        if (submitButton) {
            submitButton.disabled = false;
        }
        
        console.log(`📝 Answer selected: ${answerIndex} (${this.currentQuestion.options[answerIndex]})`);
    }

    // Submit the selected answer
    submitAnswer() {
        if (!this.isAnswering || this.selectedAnswer === null) return;
        
        this.isAnswering = false;
        
        const isCorrect = this.selectedAnswer === this.currentQuestion.correct;
        const timeBonus = this.calculateTimeBonus();
        
        console.log(`✅ Answer submitted: ${isCorrect ? 'Correct' : 'Incorrect'}, Time bonus: ${timeBonus}`);
        
        // Show immediate feedback
        this.showAnswerFeedback(isCorrect, timeBonus);
        
        // Disable all options
        const options = document.querySelectorAll('.answer-option');
        options.forEach(option => {
            option.style.pointerEvents = 'none';
            
            // Color code the answers
            const optionIndex = parseInt(option.getAttribute('data-index'));
            if (optionIndex === this.currentQuestion.correct) {
                option.classList.add('correct');
            } else if (optionIndex === this.selectedAnswer && !isCorrect) {
                option.classList.add('incorrect');
            }
        });
        
        // Disable submit button
        const submitButton = document.getElementById('submit-answer');
        if (submitButton) {
            submitButton.disabled = true;
        }
    }

    // Show answer feedback overlay
    showAnswerFeedback(isCorrect, timeBonus) {
        const feedbackElement = document.getElementById('answer-feedback');
        const feedbackIcon = document.getElementById('feedback-icon');
        const feedbackTitle = document.getElementById('feedback-title');
        const feedbackExplanation = document.getElementById('feedback-explanation');
        
        if (!feedbackElement) return;
        
        // Set feedback content
        if (isCorrect) {
            feedbackIcon.textContent = '✅';
            feedbackTitle.textContent = 'Correct!';
            feedbackTitle.style.color = '#22c55e';
            
            if (timeBonus > 0) {
                feedbackExplanation.textContent = `Excellent! You earned a ${timeBonus} point speed bonus! ${this.currentQuestion.explanation}`;
            } else {
                feedbackExplanation.textContent = `Well done! ${this.currentQuestion.explanation}`;
            }
        } else {
            feedbackIcon.textContent = '❌';
            feedbackTitle.textContent = 'Incorrect';
            feedbackTitle.style.color = '#dc2626';
            feedbackExplanation.textContent = `Not quite right. ${this.currentQuestion.explanation} You'll have 4 additional questions to complete.`;
        }
        
        // Show feedback overlay
        feedbackElement.style.display = 'flex';
        
        // Auto-continue after 3 seconds if correct, or wait for manual continue if incorrect
        if (isCorrect) {
            setTimeout(() => {
                this.hideFeedbackAndContinue(isCorrect, timeBonus);
            }, 3000);
        } else {
            // For incorrect answers, require manual continue to emphasize the mistake
            setTimeout(() => {
                // Make continue button more prominent for incorrect answers
                const continueBtn = feedbackElement.querySelector('.continue-btn');
                if (continueBtn) {
                    continueBtn.style.background = 'linear-gradient(45deg, #dc2626, #b91c1c)';
                    continueBtn.textContent = '🔄 Continue Race (+4 Questions)';
                    continueBtn.style.animation = 'pulse 1s infinite';
                }
            }, 1000);
        }
    }

    // Hide feedback and continue race
    hideFeedbackAndContinue(isCorrect, timeBonus) {
        // Hide feedback
        const feedbackElement = document.getElementById('answer-feedback');
        if (feedbackElement) {
            feedbackElement.style.display = 'none';
        }
        
        // Call the callback to continue the race
        if (this.answerCallback) {
            this.answerCallback(isCorrect, timeBonus);
        }
        
        // Hide the question modal
        this.hideQuestion();
    }

    // Hide question modal
    hideQuestion() {
        const modal = document.getElementById('question-modal');
        if (modal) {
            modal.style.display = 'none';
        }
        
        // Reset state
        this.currentQuestion = null;
        this.answerCallback = null;
        this.selectedAnswer = null;
        this.isAnswering = false;
        
        // Remove keyboard event listener
        document.removeEventListener('keydown', this.keyboardHandler);
    }

    // Calculate time bonus based on answer speed
    calculateTimeBonus() {
        if (!this.questionStartTime) return 0;
        
        const answerTime = Date.now() - this.questionStartTime;
        const secondsToAnswer = answerTime / 1000;
        
        // Award bonus points for quick answers
        if (secondsToAnswer < 5) return 10;      // Under 5 seconds = 10 bonus
        if (secondsToAnswer < 10) return 5;      // Under 10 seconds = 5 bonus
        if (secondsToAnswer < 15) return 2;      // Under 15 seconds = 2 bonus
        
        return 0; // No bonus for slow answers
    }

    // Start time bonus countdown display
    startTimeBonusCountdown(bonusElement) {
        if (!bonusElement) return;
        
        let currentBonus = 10;
        bonusElement.textContent = `+${currentBonus}`;
        
        const countdown = setInterval(() => {
            const elapsedSeconds = (Date.now() - this.questionStartTime) / 1000;
            
            if (elapsedSeconds < 5) {
                currentBonus = 10;
            } else if (elapsedSeconds < 10) {
                currentBonus = 5;
            } else if (elapsedSeconds < 15) {
                currentBonus = 2;
            } else {
                currentBonus = 0;
            }
            
            bonusElement.textContent = `+${currentBonus}`;
            bonusElement.style.color = currentBonus > 5 ? '#ffd700' : 
                                      currentBonus > 0 ? '#f59e0b' : '#9ca3af';
            
            // Stop countdown when answer is submitted or time runs out
            if (!this.isAnswering || currentBonus === 0) {
                clearInterval(countdown);
            }
        }, 1000);
    }

    // Add keyboard support for answer selection
    addKeyboardSupport() {
        this.keyboardHandler = (event) => {
            if (!this.isAnswering) return;
            
            const key = event.key.toUpperCase();
            const options = document.querySelectorAll('.answer-option');
            
            // A, B, C, D keys for answer selection
            if (key >= 'A' && key <= 'D') {
                const index = key.charCodeAt(0) - 65; // A=0, B=1, C=2, D=3
                if (index < options.length) {
                    this.selectAnswer(index, options[index]);
                }
                event.preventDefault();
            }
            
            // Enter key to submit
            if (key === 'ENTER' && this.selectedAnswer !== null) {
                this.submitAnswer();
                event.preventDefault();
            }
            
            // Escape key to exit (emergency)
            if (key === 'ESCAPE') {
                if (confirm('Are you sure you want to exit the race?')) {
                    window.exitRace();
                }
                event.preventDefault();
            }
        };
        
        document.addEventListener('keydown', this.keyboardHandler);
    }

    // Show bonus question (for track problems)
    showBonusQuestion() {
        // Simple bonus questions for track problems
        const bonusQuestions = [
            {
                text: "Quick! What's the German word for 'fast'?",
                options: ["schnell", "langsam", "groß", "klein"],
                correct: 0,
                explanation: "Schnell means fast - perfect for racing!"
            },
            {
                text: "Racing term: What does 'Geschwindigkeit' mean?",
                options: ["Distance", "Speed", "Time", "Position"],
                correct: 1,
                explanation: "Geschwindigkeit means speed or velocity."
            },
            {
                text: "What's the German for 'victory'?",
                options: ["Niederlage", "Sieg", "Rennen", "Start"],
                correct: 1,
                explanation: "Sieg means victory - aim for the Sieg!"
            }
        ];
        
        const randomQuestion = bonusQuestions[Math.floor(Math.random() * bonusQuestions.length)];
        
        this.showQuestion(randomQuestion, (isCorrect, timeBonus) => {
            if (isCorrect) {
                // Award bonus points
                if (window.raceEngine) {
                    window.raceEngine.gameState.score += 15 + timeBonus;
                    window.raceEngine.updateUI();
                }
                alert(`🎁 Bonus Question Correct! +${15 + timeBonus} points!`);
            } else {
                alert('❌ Bonus question incorrect, but no penalty for bonus questions!');
            }
        });
    }

    // Get current question info
    getCurrentQuestionInfo() {
        return {
            question: this.currentQuestion,
            selectedAnswer: this.selectedAnswer,
            isAnswering: this.isAnswering,
            startTime: this.questionStartTime
        };
    }
}

// Global question handler instance
window.QuestionHandler = new QuestionHandler();

// Global continue function for feedback
window.continueRace = function() {
    if (window.QuestionHandler && window.QuestionHandler.answerCallback) {
        const isCorrect = window.QuestionHandler.selectedAnswer === window.QuestionHandler.currentQuestion.correct;
        const timeBonus = window.QuestionHandler.calculateTimeBonus();
        window.QuestionHandler.hideFeedbackAndContinue(isCorrect, timeBonus);
    }
};