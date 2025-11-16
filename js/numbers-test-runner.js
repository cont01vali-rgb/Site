// Numbers Test Runner - Modern Design
// Based on lernziel test system with improved UX

class NumbersTestRunner {
    constructor() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.totalQuestions = 15; // 5 de fiecare tip
        this.exercises = [];
        this.userAnswers = [];
        this.testStartTime = new Date();
        this.currentLanguage = localStorage.getItem('selectedLanguage') || 'ro';
        
        this.initializeElements();
        this.generateExercises();
        this.updateProgress();
        this.displayCurrentQuestion();
        this.setupEventListeners();
    }

    initializeElements() {
        this.questionArea = document.getElementById('questionArea');
        this.verifyBtn = document.getElementById('verify-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.feedback = document.getElementById('feedback');
        this.progressFill = document.getElementById('progressFill');
        this.qIndex = document.getElementById('qIndex');
        this.qTotal = document.getElementById('qTotal');
        this.scoreDisplay = document.getElementById('score');
    }

    generateExercises() {
        this.exercises = window.numbersTestData.generateRandomExercises();
        this.totalQuestions = this.exercises.length;
        
        if (this.qTotal) {
            this.qTotal.textContent = this.totalQuestions;
        }
    }

    setupEventListeners() {
        if (this.verifyBtn) {
            this.verifyBtn.addEventListener('click', () => this.verifyAnswer());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextQuestion());
        }

        // Enter key pentru submit
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                if (this.verifyBtn.style.display !== 'none') {
                    this.verifyAnswer();
                } else if (this.nextBtn.style.display !== 'none') {
                    this.nextQuestion();
                }
            }
        });
    }

    displayCurrentQuestion() {
        if (this.currentQuestionIndex >= this.totalQuestions) {
            this.showFinalResults();
            return;
        }

        const exercise = this.exercises[this.currentQuestionIndex];
        this.clearFeedback();
        
        switch (exercise.type) {
            case 'fill-in':
                this.displayFillInQuestion(exercise);
                break;
            case 'audio':
                this.displayAudioQuestion(exercise);
                break;
            case 'multiple-choice':
                this.displayMultipleChoiceQuestion(exercise);
                break;
        }
        
        this.showVerifyButton();
        this.hideNextButton();
    }

    displayFillInQuestion(exercise) {
        const html = `
            <div class="question-container fill-in-question">
                <div class="question-header">
                    <h3>🔢 ${this.getTranslation('fill_in_title')}</h3>
                    <div class="question-number-display">
                        <span class="number-to-convert">${exercise.number}</span>
                    </div>
                </div>
                <div class="question-content">
                    <p class="instruction">${this.getTranslation('fill_instruction', 'Scrie numărul în germană:')}</p>
                    <div class="answer-input-container">
                        <input type="text" 
                               id="fillAnswer" 
                               placeholder="ex: dreiundzwanzig"
                               class="answer-input number-input"
                               autocomplete="off">
                    </div>
                </div>
            </div>
        `;
        
        this.questionArea.innerHTML = html;
        
        // Focus pe input
        setTimeout(() => {
            const input = document.getElementById('fillAnswer');
            if (input) input.focus();
        }, 100);
    }

    displayAudioQuestion(exercise) {
        const html = `
            <div class="question-container audio-question">
                <div class="question-header">
                    <h3>🎵 ${this.getTranslation('audio_title')}</h3>
                </div>
                <div class="question-content">
                    <p class="instruction">${this.getTranslation('audio_instruction', 'Ascultă numărul și scrie cifra:')}</p>
                    <div class="audio-controls">
                        <button id="playAudio" class="audio-play-btn">
                            🔊 ${this.getTranslation('play_audio', 'Redă audio')}
                        </button>
                        <button id="playAgain" class="audio-replay-btn" style="display: none;">
                            🔄 ${this.getTranslation('play_again', 'Redă din nou')}
                        </button>
                    </div>
                    <div class="answer-input-container">
                        <input type="number" 
                               id="audioAnswer" 
                               placeholder="ex: 23"
                               class="answer-input number-input"
                               autocomplete="off">
                    </div>
                </div>
            </div>
        `;
        
        this.questionArea.innerHTML = html;
        
        // Setup audio functionality
        const playBtn = document.getElementById('playAudio');
        const replayBtn = document.getElementById('playAgain');
        
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                this.speakGermanNumber(exercise.german);
                playBtn.style.display = 'none';
                replayBtn.style.display = 'inline-block';
            });
        }
        
        if (replayBtn) {
            replayBtn.addEventListener('click', () => {
                this.speakGermanNumber(exercise.german);
            });
        }
    }

    displayMultipleChoiceQuestion(exercise) {
        const shuffledOptions = [...exercise.options];
        
        const html = `
            <div class="question-container multiple-choice-question">
                <div class="question-header">
                    <h3>🤔 ${this.getTranslation('multiple_choice_title')}</h3>
                    <div class="question-number-display">
                        <span class="number-to-convert">${exercise.number}</span>
                    </div>
                </div>
                <div class="question-content">
                    <p class="instruction">${this.getTranslation('mc_instruction', 'Alege forma corectă în germană:')}</p>
                    <div class="multiple-choice-options">
                        ${shuffledOptions.map((option, index) => `
                            <label class="option-label">
                                <input type="radio" name="mcAnswer" value="${option}" id="option${index}">
                                <span class="option-text">${option}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        this.questionArea.innerHTML = html;
    }

    verifyAnswer() {
        const exercise = this.exercises[this.currentQuestionIndex];
        let userAnswer = '';
        let isCorrect = false;

        switch (exercise.type) {
            case 'fill-in':
                const fillInput = document.getElementById('fillAnswer');
                userAnswer = fillInput ? fillInput.value.trim().toLowerCase() : '';
                isCorrect = userAnswer === exercise.correctAnswer.toLowerCase();
                break;
                
            case 'audio':
                const audioInput = document.getElementById('audioAnswer');
                userAnswer = audioInput ? audioInput.value.trim() : '';
                isCorrect = userAnswer === exercise.correctAnswer;
                break;
                
            case 'multiple-choice':
                const selectedOption = document.querySelector('input[name="mcAnswer"]:checked');
                userAnswer = selectedOption ? selectedOption.value : '';
                isCorrect = userAnswer === exercise.correctAnswer;
                break;
        }

        // Salvează răspunsul utilizatorului
        this.userAnswers.push({
            questionIndex: this.currentQuestionIndex,
            userAnswer: userAnswer,
            correctAnswer: exercise.correctAnswer,
            isCorrect: isCorrect,
            exercise: exercise
        });

        if (isCorrect) {
            this.score++;
        }

        this.showFeedback(exercise, isCorrect, userAnswer);
        this.updateScore();
        this.hideVerifyButton();
        this.showNextButton();
    }

    showFeedback(exercise, isCorrect, userAnswer) {
        const feedbackClass = isCorrect ? 'feedback-correct' : 'feedback-incorrect';
        const feedbackIcon = isCorrect ? '🎉' : '❌';
        const feedbackTitle = isCorrect ? 
            this.getTranslation('correct_answer', 'Excelent! Răspuns corect!') :
            this.getTranslation('wrong_answer', 'Nu este corect. Încearcă din nou!');
        
        let feedbackContent = `
            <div class="feedback-container ${feedbackClass}">
                <div class="feedback-header">
                    <span class="feedback-icon">${feedbackIcon}</span>
                    <h4 class="feedback-title">${feedbackTitle}</h4>
                </div>
                <div class="feedback-content">
        `;
        
        if (!isCorrect) {
            feedbackContent += `
                <div class="correct-answer-display">
                    <strong>✔️ ${this.getTranslation('correct_answer_was', 'Răspunsul corect era')}:</strong> 
                    <span class="correct-answer">${exercise.correctAnswer}</span>
                </div>
            `;
        }
        
        feedbackContent += `
                    <div class="explanation">
                        <strong>💡 ${this.getTranslation('explanation', 'Explicație')}:</strong> 
                        <span>${exercise.explanation}</span>
                    </div>
                    <div class="grammar-rule">
                        <strong>📖 ${this.getTranslation('rule', 'Regulă')}:</strong> 
                        <span>${exercise.rule}</span>
                    </div>
                </div>
            </div>
        `;
        
        this.feedback.innerHTML = feedbackContent;
        this.feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.updateProgress();
        this.displayCurrentQuestion();
    }

    updateProgress() {
        const progress = ((this.currentQuestionIndex) / this.totalQuestions) * 100;
        
        if (this.progressFill) {
            this.progressFill.style.width = `${progress}%`;
        }
        
        if (this.qIndex) {
            this.qIndex.textContent = this.currentQuestionIndex + 1;
        }
    }

    updateScore() {
        if (this.scoreDisplay) {
            this.scoreDisplay.textContent = this.score;
        }
    }

    showFinalResults() {
        const testEndTime = new Date();
        const testDuration = Math.round((testEndTime - this.testStartTime) / 1000 / 60);
        const percentage = Math.round((this.score / this.totalQuestions) * 100);
        
        let resultMessage = '';
        let resultClass = '';
        
        if (percentage >= 90) {
            resultMessage = this.getTranslation('excellent_result', 'Excelent! Stăpânești foarte bine numerele germane!');
            resultClass = 'result-excellent';
        } else if (percentage >= 75) {
            resultMessage = this.getTranslation('good_result', 'Foarte bine! Ai o înțelegere bună a numerelor.');
            resultClass = 'result-good';
        } else if (percentage >= 60) {
            resultMessage = this.getTranslation('okay_result', 'Bine făcut! Cu puțină practică vei fi și mai bun.');
            resultClass = 'result-okay';
        } else {
            resultMessage = this.getTranslation('needs_improvement', 'Nu e rău! Repetă lecția și încearcă din nou.');
            resultClass = 'result-needs-improvement';
        }

        const resultsHTML = `
            <div class="final-results ${resultClass}">
                <div class="results-header">
                    <h2>${this.getTranslation('test_completed', 'Test finalizat!')}</h2>
                    <div class="final-score-circle">
                        <span class="score-percentage">${percentage}%</span>
                    </div>
                </div>
                
                <div class="results-summary">
                    <div class="result-stat">
                        <span class="stat-label">${this.getTranslation('final_score', 'Scor final')}</span>
                        <span class="stat-value">${this.score}/${this.totalQuestions}</span>
                    </div>
                    <div class="result-stat">
                        <span class="stat-label">${this.getTranslation('test_duration', 'Durata testului')}</span>
                        <span class="stat-value">${testDuration} min</span>
                    </div>
                    <div class="result-message">${resultMessage}</div>
                </div>
                
                <div class="results-actions">
                    <button onclick="location.reload()" class="btn btn-primary">
                        🔄 ${this.getTranslation('retry_test', 'Repetă testul')}
                    </button>
                    <a href="../lessons/lesson2.html" class="btn btn-outline">
                        📚 ${this.getTranslation('back_to_lesson', 'Înapoi la lecție')}
                    </a>
                </div>
            </div>
        `;

        this.questionArea.innerHTML = resultsHTML;
        this.hideVerifyButton();
        this.hideNextButton();
        this.clearFeedback();
        
        // Update progress to 100%
        if (this.progressFill) {
            this.progressFill.style.width = '100%';
        }
    }

    speakGermanNumber(germanText) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(germanText);
            utterance.lang = 'de-DE';
            utterance.rate = 0.8;
            utterance.pitch = 1;
            window.speechSynthesis.speak(utterance);
        }
    }

    getTranslation(key, defaultText = '') {
        if (window.numbersTestData && window.numbersTestData.translations) {
            const translations = window.numbersTestData.translations[this.currentLanguage];
            return translations && translations[key] ? translations[key] : defaultText;
        }
        return defaultText;
    }

    clearFeedback() {
        if (this.feedback) {
            this.feedback.innerHTML = '';
        }
    }

    showVerifyButton() {
        if (this.verifyBtn) {
            this.verifyBtn.style.display = 'block';
        }
    }

    hideVerifyButton() {
        if (this.verifyBtn) {
            this.verifyBtn.style.display = 'none';
        }
    }

    showNextButton() {
        if (this.nextBtn) {
            this.nextBtn.style.display = 'block';
        }
    }

    hideNextButton() {
        if (this.nextBtn) {
            this.nextBtn.style.display = 'none';
        }
    }
}

// Initialize test when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Wait for data to be loaded
    if (window.numbersTestData) {
        new NumbersTestRunner();
    } else {
        console.error('Numbers test data not loaded');
    }
});