// Trennbare Verben Test Runner - Comprehensive Implementation
// A1 Level German Test with 25 exercises and detailed explanations

class TrennbareVerbenTestRunner {
    constructor() {
        this.exercises = trennbareVerbenExercises.exercises;
        this.currentExerciseIndex = 0;
        this.score = 0;
        this.totalExercises = this.exercises.length;
        this.userAnswers = [];
        this.testStartTime = null;
        this.isTestComplete = false;
        
        // Shuffle exercises for variety
        this.shuffleExercises();
        
        // Initialize UI elements
        this.initializeElements();
        this.initializeTTS();
        
        // Start the test
        this.startTest();
    }

    initializeElements() {
        this.progressBar = document.getElementById('progressBar');
        this.progressText = document.getElementById('progressText');
        this.scoreDisplay = document.getElementById('scoreDisplay');
        this.questionContainer = document.getElementById('questionContainer');
        this.feedbackArea = document.getElementById('feedbackArea');
        this.nextButton = document.getElementById('nextButton');
        this.submitButton = document.getElementById('submitButton');
        this.resultsContainer = document.getElementById('resultsContainer');
        
        // Bind event listeners
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => this.nextExercise());
        }
        if (this.submitButton) {
            this.submitButton.addEventListener('click', () => this.submitAnswer());
        }
    }

    initializeTTS() {
        this.synth = window.speechSynthesis;
        this.germanVoice = null;
        
        // Wait for voices to load
        if (this.synth.getVoices().length === 0) {
            this.synth.addEventListener('voiceschanged', () => {
                this.setGermanVoice();
            });
        } else {
            this.setGermanVoice();
        }
    }

    setGermanVoice() {
        const voices = this.synth.getVoices();
        this.germanVoice = voices.find(voice => 
            voice.lang.includes('de') || voice.name.includes('German')
        ) || voices[0];
    }

    speak(text, rate = 0.8) {
        if (this.synth.speaking) {
            this.synth.cancel();
        }
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'de-DE';
        utterance.rate = rate;
        utterance.pitch = 1;
        
        if (this.germanVoice) {
            utterance.voice = this.germanVoice;
        }
        
        this.synth.speak(utterance);
    }

    shuffleExercises() {
        for (let i = this.exercises.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.exercises[i], this.exercises[j]] = [this.exercises[j], this.exercises[i]];
        }
    }

    startTest() {
        this.testStartTime = new Date();
        this.updateProgress();
        this.updateScore();
        this.displayCurrentExercise();
    }

    updateProgress() {
        const progress = ((this.currentExerciseIndex) / this.totalExercises) * 100;
        if (this.progressBar) {
            this.progressBar.style.width = `${progress}%`;
        }
        if (this.progressText) {
            this.progressText.textContent = `Exercițiul ${this.currentExerciseIndex + 1} din ${this.totalExercises}`;
        }
    }

    updateScore() {
        if (this.scoreDisplay) {
            this.scoreDisplay.textContent = `Punkte: ${this.score}/${this.currentExerciseIndex}`;
        }
    }

    displayCurrentExercise() {
        if (this.currentExerciseIndex >= this.totalExercises) {
            this.completeTest();
            return;
        }

        const exercise = this.exercises[this.currentExerciseIndex];
        this.clearFeedback();
        
        switch (exercise.type) {
            case 'fill-in-the-blanks-conjugation':
                this.displayFillBlanksExercise(exercise);
                break;
            case 'sentence-building':
                this.displaySentenceBuildingExercise(exercise);
                break;
            case 'audio-listen-and-write':
                this.displayAudioExercise(exercise);
                break;
            case 'multiple-choice-prefix':
                this.displayMultipleChoiceExercise(exercise);
                break;
            case 'transform-the-sentence':
                this.displayTransformExercise(exercise);
                break;
            case 'match-verb-meaning':
                this.displayMatchingExercise(exercise);
                break;
            case 'separable-or-not':
                this.displayClassificationExercise(exercise);
                break;
            case 'find-the-mistake':
                this.displayFindMistakeExercise(exercise);
                break;
            case 'image-association':
                this.displayImageAssociationExercise(exercise);
                break;
            case 'dialogue-completion':
                this.displayDialogueExercise(exercise);
                break;
            case 'verb-conjugation':
                this.displayVerbConjugationExercise(exercise);
                break;
            case 'conjugation-multiple-choice':
                this.displayConjugationMultipleChoiceExercise(exercise);
                break;
            case 'fill-conjugation-blanks':
                this.displayFillConjugationBlanksExercise(exercise);
                break;
            default:
                console.error('Unknown exercise type:', exercise.type);
        }

        this.showSubmitButton();
        this.hideNextButton();
    }

    displayFillBlanksExercise(exercise) {
        const html = `
            <div class="exercise-container">
                <h3>📝 Completează spațiile libere</h3>
                <p class="exercise-instruction">Completează cu forma corectă a verbului și prefixul separat:</p>
                <div class="fill-blanks-exercise">
                    <p class="question-text">${this.formatFillBlanksQuestion(exercise.question)}</p>
                </div>
                <div class="answer-inputs">
                    <input type="text" id="verbInput" placeholder="Forma verbului (ex: stehe)" class="verb-input">
                    <input type="text" id="prefixInput" placeholder="Prefixul (ex: auf)" class="prefix-input">
                </div>
            </div>
        `;
        this.questionContainer.innerHTML = html;
    }

    formatFillBlanksQuestion(question) {
        return question.replace(/____/g, '<span class="blank-space">____</span>');
    }

    displaySentenceBuildingExercise(exercise) {
        const shuffledWords = [...exercise.words].sort(() => Math.random() - 0.5);
        
        const html = `
            <div class="exercise-container">
                <h3>🧩 Construirea propozițiilor</h3>
                <p class="exercise-instruction">${exercise.question}</p>
                <div class="word-bank">
                    ${shuffledWords.map(word => 
                        `<span class="word-token" data-word="${word}">${word}</span>`
                    ).join('')}
                </div>
                <div class="sentence-builder" id="sentenceBuilder">
                    <p>Apasă pe cuvinte pentru a construi propoziția:</p>
                    <div class="drop-zone" id="dropZone"></div>
                </div>
            </div>
        `;
        this.questionContainer.innerHTML = html;
        this.initializeDragAndDrop();
    }

    initializeDragAndDrop() {
        const wordTokens = document.querySelectorAll('.word-token');
        const dropZone = document.getElementById('dropZone');

        wordTokens.forEach(token => {
            token.addEventListener('click', () => {
                if (!token.classList.contains('used')) {
                    this.addWordToSentence(token.dataset.word);
                    token.classList.add('used');
                }
            });
        });

        // Reset button
        const resetBtn = document.createElement('button');
        resetBtn.textContent = 'Zurücksetzen';
        resetBtn.className = 'reset-button';
        resetBtn.addEventListener('click', () => this.resetSentenceBuilder());
        dropZone.parentNode.appendChild(resetBtn);
    }

    addWordToSentence(word) {
        const dropZone = document.getElementById('dropZone');
        const wordSpan = document.createElement('span');
        wordSpan.textContent = word;
        wordSpan.className = 'sentence-word';
        wordSpan.addEventListener('click', () => {
            this.removeWordFromSentence(wordSpan, word);
        });
        dropZone.appendChild(wordSpan);
    }

    removeWordFromSentence(wordSpan, word) {
        wordSpan.remove();
        const token = document.querySelector(`[data-word="${word}"]`);
        if (token) {
            token.classList.remove('used');
        }
    }

    resetSentenceBuilder() {
        document.getElementById('dropZone').innerHTML = '';
        document.querySelectorAll('.word-token').forEach(token => {
            token.classList.remove('used');
        });
    }

    displayAudioExercise(exercise) {
        const html = `
            <div class="exercise-container">
                <h3>🔊 Ascultă și scrie</h3>
                <p class="exercise-instruction">${exercise.question}</p>
                <div class="audio-exercise">
                    <button class="audio-play-button" id="playAudioBtn">
                        🔊 Redă audio-ul
                    </button>
                    <textarea id="audioAnswer" placeholder="Scrie aici propoziția pe care ai auzit-o..." 
                              class="audio-answer-input"></textarea>
                </div>
            </div>
        `;
        this.questionContainer.innerHTML = html;
        
        document.getElementById('playAudioBtn').addEventListener('click', () => {
            this.speak(exercise.audioText);
        });
    }

    displayMultipleChoiceExercise(exercise) {
        const html = `
            <div class="exercise-container">
                <h3>✅ Alege răspunsul corect</h3>
                <p class="exercise-instruction">Selectează opțiunea corectă:</p>
                <p class="question-text">${exercise.question}</p>
                <div class="multiple-choice-options">
                    ${exercise.options.map((option, index) => `
                        <label class="option-label">
                            <input type="radio" name="multipleChoice" value="${option}" id="option${index}">
                            <span class="option-text">${option}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
        this.questionContainer.innerHTML = html;
    }

    displayTransformExercise(exercise) {
        const html = `
            <div class="exercise-container">
                <h3>Satztransformation</h3>
                <p class="exercise-instruction">${exercise.question}</p>
                <div class="transform-exercise">
                    <p class="original-sentence"><strong>Original:</strong> ${exercise.originalSentence}</p>
                    <textarea id="transformAnswer" placeholder="Schreibe den transformierten Satz hier..." 
                              class="transform-input"></textarea>
                </div>
            </div>
        `;
        this.questionContainer.innerHTML = html;
    }

    displayMatchingExercise(exercise) {
        const shuffledVerbs = [...exercise.verbs].sort(() => Math.random() - 0.5);
        const shuffledMeanings = [...exercise.meanings].sort(() => Math.random() - 0.5);

        const html = `
            <div class="exercise-container">
                <h3>Zuordnung</h3>
                <p class="exercise-instruction">${exercise.question}</p>
                <div class="matching-exercise">
                    <div class="verbs-column">
                        <h4>Verben</h4>
                        ${shuffledVerbs.map(verb => `
                            <div class="match-item verb-item" data-verb="${verb}">
                                ${verb}
                            </div>
                        `).join('')}
                    </div>
                    <div class="meanings-column">
                        <h4>Bedeutungen</h4>
                        ${shuffledMeanings.map(meaning => `
                            <div class="match-item meaning-item" data-meaning="${meaning}">
                                ${meaning}
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="matches-display" id="matchesDisplay"></div>
            </div>
        `;
        this.questionContainer.innerHTML = html;
        this.initializeMatching();
    }

    initializeMatching() {
        let selectedVerb = null;
        let selectedMeaning = null;
        const matches = {};

        document.querySelectorAll('.verb-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.verb-item').forEach(v => v.classList.remove('selected'));
                item.classList.add('selected');
                selectedVerb = item.dataset.verb;
                this.checkForMatch();
            });
        });

        document.querySelectorAll('.meaning-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.meaning-item').forEach(m => m.classList.remove('selected'));
                item.classList.add('selected');
                selectedMeaning = item.dataset.meaning;
                this.checkForMatch();
            });
        });

        this.checkForMatch = () => {
            if (selectedVerb && selectedMeaning) {
                matches[selectedVerb] = selectedMeaning;
                this.displayMatches(matches);
                
                // Reset selections
                document.querySelectorAll('.match-item').forEach(item => {
                    item.classList.remove('selected');
                });
                selectedVerb = null;
                selectedMeaning = null;
            }
        };

        this.displayMatches = (matches) => {
            const display = document.getElementById('matchesDisplay');
            display.innerHTML = '<h4>Deine Zuordnungen:</h4>' +
                Object.entries(matches).map(([verb, meaning]) => 
                    `<p>${verb} → ${meaning}</p>`
                ).join('');
        };

        this.getMatchingAnswers = () => matches;
    }

    displayClassificationExercise(exercise) {
        const html = `
            <div class="exercise-container">
                <h3>Klassifikation</h3>
                <p class="exercise-instruction">${exercise.question}</p>
                <div class="classification-exercise">
                    <div class="verbs-to-classify">
                        <h4>Verben zum Sortieren:</h4>
                        ${exercise.verbs.map(verb => `
                            <div class="classify-verb" data-verb="${verb}">
                                ${verb}
                            </div>
                        `).join('')}
                    </div>
                    <div class="classification-boxes">
                        <div class="classify-box" data-type="separable">
                            <h4>Trennbar</h4>
                            <div class="classify-drop-zone" id="separableZone"></div>
                        </div>
                        <div class="classify-box" data-type="inseparable">
                            <h4>Untrennbar</h4>
                            <div class="classify-drop-zone" id="inseparableZone"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.questionContainer.innerHTML = html;
        this.initializeClassification();
    }

    initializeClassification() {
        document.querySelectorAll('.classify-verb').forEach(verbEl => {
            verbEl.addEventListener('click', () => {
                // Show classification options
                this.showClassificationOptions(verbEl);
            });
        });
    }

    showClassificationOptions(verbElement) {
        const verb = verbElement.dataset.verb;
        
        // Remove any existing option dialogs
        document.querySelectorAll('.classification-dialog').forEach(dialog => dialog.remove());
        
        const dialog = document.createElement('div');
        dialog.className = 'classification-dialog';
        dialog.innerHTML = `
            <p>Wohin gehört "${verb}"?</p>
            <button class="classify-btn" data-type="separable">Trennbar</button>
            <button class="classify-btn" data-type="inseparable">Untrennbar</button>
        `;
        
        verbElement.appendChild(dialog);
        
        dialog.querySelectorAll('.classify-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.dataset.type;
                this.classifyVerb(verb, type, verbElement);
                dialog.remove();
            });
        });
    }

    classifyVerb(verb, type, verbElement) {
        const zone = document.getElementById(type + 'Zone');
        const verbDiv = document.createElement('div');
        verbDiv.textContent = verb;
        verbDiv.className = 'classified-verb';
        verbDiv.dataset.verb = verb;
        verbDiv.addEventListener('click', () => {
            verbDiv.remove();
            verbElement.style.display = 'block';
        });
        
        zone.appendChild(verbDiv);
        verbElement.style.display = 'none';
    }

    displayFindMistakeExercise(exercise) {
        const html = `
            <div class="exercise-container">
                <h3>Fehler finden</h3>
                <p class="exercise-instruction">${exercise.question}</p>
                <div class="mistake-exercise">
                    <p class="incorrect-sentence">${exercise.incorrectSentence}</p>
                    <textarea id="mistakeCorrection" placeholder="Schreibe den korrigierten Satz hier..." 
                              class="mistake-input"></textarea>
                </div>
            </div>
        `;
        this.questionContainer.innerHTML = html;
    }

    displayImageAssociationExercise(exercise) {
        const html = `
            <div class="exercise-container">
                <h3>Bildassoziation</h3>
                <p class="exercise-instruction">${exercise.question}</p>
                <div class="image-exercise">
                    <div class="scenario-description">
                        <p><strong>Szenario:</strong> ${exercise.description}</p>
                    </div>
                    <div class="image-options">
                        ${exercise.options.map((option, index) => `
                            <label class="image-option-label">
                                <input type="radio" name="imageChoice" value="${option}" id="imgOption${index}">
                                <span class="option-text">${option}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        this.questionContainer.innerHTML = html;
    }

    displayDialogueExercise(exercise) {
        const html = `
            <div class="exercise-container">
                <h3>Dialog vervollständigen</h3>
                <p class="exercise-instruction">${exercise.question}</p>
                <div class="dialogue-exercise">
                    ${exercise.dialogue.map((line, index) => `
                        <div class="dialogue-line">
                            ${this.formatDialogueLine(line, index)}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        this.questionContainer.innerHTML = html;
    }

    formatDialogueLine(line, index) {
        const parts = line.split('_____');
        if (parts.length === 1) {
            return line; // No blanks
        }
        
        let result = parts[0];
        for (let i = 1; i < parts.length; i++) {
            result += `<input type="text" class="dialogue-blank" data-line="${index}" data-blank="${i-1}" placeholder="...">`;
            result += parts[i];
        }
        return result;
    }

    displayVerbConjugationExercise(exercise) {
        const html = `
            <div class="exercise-container">
                <h3>🔄 Conjugarea verbelor</h3>
                <p class="exercise-instruction">${exercise.question}</p>
                <div class="verb-conjugation-exercise">
                    <div class="verb-info">
                        <p><strong>Verb:</strong> ${exercise.verb} (${exercise.prefix} + ${exercise.baseVerb})</p>
                    </div>
                    <div class="conjugation-inputs">
                        ${exercise.persons.map((person, index) => `
                            <div class="conjugation-row">
                                <label class="person-label">${person}:</label>
                                <input type="text" 
                                       id="conjugation_${index}" 
                                       data-person="${person}"
                                       placeholder="ex: stehe auf"
                                       class="conjugation-input">
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        this.questionContainer.innerHTML = html;
    }

    displayConjugationMultipleChoiceExercise(exercise) {
        const html = `
            <div class="exercise-container">
                <h3>✅ Conjugarea corectă</h3>
                <p class="exercise-instruction">Alege conjugarea corectă:</p>
                <div class="conjugation-question">
                    <p class="question-text"><strong>${exercise.question}</strong></p>
                    <p class="verb-info">Verb: <strong>${exercise.verb}</strong> | Persoana: <strong>${exercise.person}</strong></p>
                </div>
                <div class="multiple-choice-options">
                    ${exercise.options.map((option, index) => `
                        <label class="option-label">
                            <input type="radio" name="conjugationChoice" value="${option}" id="conjOption${index}">
                            <span class="option-text">${option}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
        this.questionContainer.innerHTML = html;
    }

    displayFillConjugationBlanksExercise(exercise) {
        const html = `
            <div class="exercise-container">
                <h3>📝 Completează conjugarea</h3>
                <p class="exercise-instruction">Completează cu forma corectă a verbului:</p>
                <div class="fill-conjugation-exercise">
                    <p class="question-text">${this.formatFillBlanksQuestion(exercise.question)}</p>
                    <div class="verb-info">
                        <p><strong>Verb:</strong> ${exercise.verb} | <strong>Persoana:</strong> ${exercise.person}</p>
                    </div>
                </div>
                <div class="answer-inputs">
                    <input type="text" id="verbConjugationInput" placeholder="Forma verbului (ex: macht)" class="verb-input">
                    <input type="text" id="prefixConjugationInput" placeholder="Prefixul (ex: auf)" class="prefix-input">
                </div>
            </div>
        `;
        this.questionContainer.innerHTML = html;
    }

    submitAnswer() {
        const exercise = this.exercises[this.currentExerciseIndex];
        let userAnswer = null;
        let isCorrect = false;

        switch (exercise.type) {
            case 'fill-in-the-blanks-conjugation':
                userAnswer = this.getFillBlanksAnswer();
                isCorrect = this.checkFillBlanksAnswer(userAnswer, exercise);
                break;
            case 'sentence-building':
                userAnswer = this.getSentenceBuildingAnswer();
                isCorrect = this.checkSentenceBuildingAnswer(userAnswer, exercise);
                break;
            case 'audio-listen-and-write':
                userAnswer = this.getAudioAnswer();
                isCorrect = this.checkAudioAnswer(userAnswer, exercise);
                break;
            case 'multiple-choice-prefix':
                userAnswer = this.getMultipleChoiceAnswer();
                isCorrect = this.checkMultipleChoiceAnswer(userAnswer, exercise);
                break;
            case 'transform-the-sentence':
                userAnswer = this.getTransformAnswer();
                isCorrect = this.checkTransformAnswer(userAnswer, exercise);
                break;
            case 'match-verb-meaning':
                userAnswer = this.getMatchingAnswers();
                isCorrect = this.checkMatchingAnswer(userAnswer, exercise);
                break;
            case 'separable-or-not':
                userAnswer = this.getClassificationAnswer();
                isCorrect = this.checkClassificationAnswer(userAnswer, exercise);
                break;
            case 'find-the-mistake':
                userAnswer = this.getFindMistakeAnswer();
                isCorrect = this.checkFindMistakeAnswer(userAnswer, exercise);
                break;
            case 'image-association':
                userAnswer = this.getImageAssociationAnswer();
                isCorrect = this.checkImageAssociationAnswer(userAnswer, exercise);
                break;
            case 'dialogue-completion':
                userAnswer = this.getDialogueAnswer();
                isCorrect = this.checkDialogueAnswer(userAnswer, exercise);
                break;
            case 'verb-conjugation':
                userAnswer = this.getVerbConjugationAnswer();
                isCorrect = this.checkVerbConjugationAnswer(userAnswer, exercise);
                break;
            case 'conjugation-multiple-choice':
                userAnswer = this.getConjugationMultipleChoiceAnswer();
                isCorrect = this.checkConjugationMultipleChoiceAnswer(userAnswer, exercise);
                break;
            case 'fill-conjugation-blanks':
                userAnswer = this.getFillConjugationBlanksAnswer();
                isCorrect = this.checkFillConjugationBlanksAnswer(userAnswer, exercise);
                break;
        }

        this.userAnswers.push({
            exerciseId: exercise.id,
            userAnswer: userAnswer,
            correctAnswer: this.getCorrectAnswerForDisplay(exercise),
            isCorrect: isCorrect,
            exerciseType: exercise.type
        });

        if (isCorrect) {
            this.score++;
        }

        this.showFeedback(exercise, isCorrect, userAnswer);
        this.updateScore();
        this.hideSubmitButton();
        this.showNextButton();
    }

    // Answer retrieval methods
    getFillBlanksAnswer() {
        const verbInput = document.getElementById('verbInput');
        const prefixInput = document.getElementById('prefixInput');
        return {
            verb: verbInput ? verbInput.value.trim() : '',
            prefix: prefixInput ? prefixInput.value.trim() : ''
        };
    }

    getSentenceBuildingAnswer() {
        const words = Array.from(document.querySelectorAll('#dropZone .sentence-word'))
                          .map(span => span.textContent);
        return words;
    }

    getAudioAnswer() {
        const input = document.getElementById('audioAnswer');
        return input ? input.value.trim() : '';
    }

    getMultipleChoiceAnswer() {
        const selected = document.querySelector('input[name="multipleChoice"]:checked');
        return selected ? selected.value : '';
    }

    getTransformAnswer() {
        const input = document.getElementById('transformAnswer');
        return input ? input.value.trim() : '';
    }

    getClassificationAnswer() {
        const separable = Array.from(document.querySelectorAll('#separableZone .classified-verb'))
                               .map(el => el.dataset.verb);
        const inseparable = Array.from(document.querySelectorAll('#inseparableZone .classified-verb'))
                                 .map(el => el.dataset.verb);
        return { separable, inseparable };
    }

    getFindMistakeAnswer() {
        const input = document.getElementById('mistakeCorrection');
        return input ? input.value.trim() : '';
    }

    getImageAssociationAnswer() {
        const selected = document.querySelector('input[name="imageChoice"]:checked');
        return selected ? selected.value : '';
    }

    getDialogueAnswer() {
        const blanks = document.querySelectorAll('.dialogue-blank');
        const answers = {};
        blanks.forEach(blank => {
            const line = blank.dataset.line;
            const blankIndex = blank.dataset.blank;
            if (!answers[line]) answers[line] = [];
            answers[line][blankIndex] = blank.value.trim();
        });
        return answers;
    }

    getVerbConjugationAnswer() {
        const answers = {};
        const inputs = document.querySelectorAll('.conjugation-input');
        inputs.forEach(input => {
            const person = input.dataset.person;
            answers[person] = input.value.trim();
        });
        return answers;
    }

    getConjugationMultipleChoiceAnswer() {
        const selected = document.querySelector('input[name="conjugationChoice"]:checked');
        return selected ? selected.value : '';
    }

    getFillConjugationBlanksAnswer() {
        const verbInput = document.getElementById('verbConjugationInput');
        const prefixInput = document.getElementById('prefixConjugationInput');
        return {
            verb: verbInput ? verbInput.value.trim() : '',
            prefix: prefixInput ? prefixInput.value.trim() : ''
        };
    }

    // Answer checking methods
    checkFillBlanksAnswer(userAnswer, exercise) {
        const [correctVerb, correctPrefix] = exercise.correctAnswer.split('|');
        return userAnswer.verb.toLowerCase() === correctVerb.toLowerCase() && 
               userAnswer.prefix.toLowerCase() === correctPrefix.toLowerCase();
    }

    checkSentenceBuildingAnswer(userAnswer, exercise) {
        return JSON.stringify(userAnswer) === JSON.stringify(exercise.correctOrder);
    }

    checkAudioAnswer(userAnswer, exercise) {
        return this.normalizeString(userAnswer) === this.normalizeString(exercise.correctAnswer);
    }

    checkMultipleChoiceAnswer(userAnswer, exercise) {
        return userAnswer === exercise.correctAnswer;
    }

    checkTransformAnswer(userAnswer, exercise) {
        return this.normalizeString(userAnswer) === this.normalizeString(exercise.correctAnswer);
    }

    checkMatchingAnswer(userAnswer, exercise) {
        return JSON.stringify(userAnswer) === JSON.stringify(exercise.correctMatches);
    }

    checkClassificationAnswer(userAnswer, exercise) {
        const correctSep = exercise.separable.sort();
        const correctInsep = exercise.inseparable.sort();
        const userSep = userAnswer.separable.sort();
        const userInsep = userAnswer.inseparable.sort();
        
        return JSON.stringify(userSep) === JSON.stringify(correctSep) &&
               JSON.stringify(userInsep) === JSON.stringify(correctInsep);
    }

    checkFindMistakeAnswer(userAnswer, exercise) {
        return this.normalizeString(userAnswer) === this.normalizeString(exercise.correctSentence);
    }

    checkImageAssociationAnswer(userAnswer, exercise) {
        return userAnswer === exercise.correctAnswer;
    }

    checkDialogueAnswer(userAnswer, exercise) {
        // Compare each line's answers
        for (let i = 0; i < exercise.correctAnswers.length; i++) {
            const correctParts = exercise.correctAnswers[i].split('|');
            const userParts = userAnswer[i] || [];
            
            for (let j = 0; j < correctParts.length; j++) {
                if (!userParts[j] || 
                    userParts[j].toLowerCase() !== correctParts[j].toLowerCase()) {
                    return false;
                }
            }
        }
        return true;
    }

    checkVerbConjugationAnswer(userAnswer, exercise) {
        for (const person of exercise.persons) {
            const userResponse = userAnswer[person] ? userAnswer[person].toLowerCase() : '';
            const correctResponse = exercise.correctAnswers[person].toLowerCase();
            if (userResponse !== correctResponse) {
                return false;
            }
        }
        return true;
    }

    checkConjugationMultipleChoiceAnswer(userAnswer, exercise) {
        return userAnswer === exercise.correctAnswer;
    }

    checkFillConjugationBlanksAnswer(userAnswer, exercise) {
        const [correctVerb, correctPrefix] = exercise.correctAnswer.split('|');
        return userAnswer.verb.toLowerCase() === correctVerb.toLowerCase() && 
               userAnswer.prefix.toLowerCase() === correctPrefix.toLowerCase();
    }

    normalizeString(str) {
        return str.toLowerCase()
                  .replace(/[.,!?]/g, '')
                  .replace(/\s+/g, ' ')
                  .trim();
    }

    getCorrectAnswerForDisplay(exercise) {
        switch (exercise.type) {
            case 'fill-in-the-blanks-conjugation':
                return exercise.correctAnswer.replace('|', ' ... ');
            case 'sentence-building':
                return exercise.correctOrder.join(' ');
            case 'dialogue-completion':
                return exercise.correctAnswers.map(ans => ans.replace('|', ' ... ')).join(' / ');
            default:
                return exercise.correctAnswer || 'Siehe Erklärung';
        }
    }

    showFeedback(exercise, isCorrect, userAnswer) {
        const feedbackClass = isCorrect ? 'feedback-correct' : 'feedback-incorrect';
        const feedbackIcon = isCorrect ? '✅' : '❌';
        const feedbackTitle = isCorrect ? 'Excelent! Răspuns corect!' : 'Nu este corect, dar poți învăța din această greșeală:';
        
        let feedbackContent = `
            <div class="feedback-container ${feedbackClass}">
                <h3>${feedbackIcon} ${feedbackTitle}</h3>
                <div class="feedback-content">
                    <p><strong>💡 Explicația:</strong> ${exercise.explanation}</p>
                    <p><strong>📖 Regula gramaticală:</strong> ${exercise.rule}</p>
        `;
        
        if (!isCorrect) {
            feedbackContent += `
                    <p><strong>✔️ Răspunsul corect:</strong> ${this.getCorrectAnswerForDisplay(exercise)}</p>
                    <p><strong>🎯 Sfat:</strong> Repetă această regulă și încearcă să o aplici la următoarele exerciții!</p>
            `;
        } else {
            feedbackContent += `
                    <p><strong>🎉 Foarte bine!</strong> Înțelegi cum funcționează verbele separabile!</p>
            `;
        }
        
        feedbackContent += `
                </div>
            </div>
        `;
        
        this.feedbackArea.innerHTML = feedbackContent;
        this.feedbackArea.scrollIntoView({ behavior: 'smooth' });
    }

    clearFeedback() {
        this.feedbackArea.innerHTML = '';
    }

    showSubmitButton() {
        if (this.submitButton) {
            this.submitButton.style.display = 'block';
        }
    }

    hideSubmitButton() {
        if (this.submitButton) {
            this.submitButton.style.display = 'none';
        }
    }

    showNextButton() {
        if (this.nextButton) {
            this.nextButton.style.display = 'block';
        }
    }

    hideNextButton() {
        if (this.nextButton) {
            this.nextButton.style.display = 'none';
        }
    }

    nextExercise() {
        this.currentExerciseIndex++;
        this.updateProgress();
        this.displayCurrentExercise();
    }

    completeTest() {
        this.isTestComplete = true;
        const testEndTime = new Date();
        const testDuration = Math.round((testEndTime - this.testStartTime) / 1000 / 60); // minutes
        const percentage = Math.round((this.score / this.totalExercises) * 100);
        
        let resultMessage = '';
        let resultClass = '';
        
        if (percentage >= 90) {
            resultMessage = 'Excelent! Stăpânești foarte bine verbele separabile!';
            resultClass = 'result-excellent';
        } else if (percentage >= 75) {
            resultMessage = 'Foarte bine! Ai o înțelegere bună a verbelor separabile.';
            resultClass = 'result-good';
        } else if (percentage >= 60) {
            resultMessage = 'Bine făcut! Cu puțină practică vei fi și mai bun.';
            resultClass = 'result-okay';
        } else {
            resultMessage = 'Nu e rău! Repetă lecția și încearcă din nou.';
            resultClass = 'result-needs-improvement';
        }

        const resultsHTML = `
            <div class="test-results ${resultClass}">
                <h2>Test finalizat!</h2>
                <div class="results-summary">
                    <p class="final-score">Scor final: ${this.score}/${this.totalExercises} (${percentage}%)</p>
                    <p class="test-duration">Durata testului: ${testDuration} minute</p>
                    <p class="result-message">${resultMessage}</p>
                </div>
                <div class="results-actions">
                    <button onclick="location.reload()" class="retry-button">Repetă testul</button>
                    <button onclick="window.location.href='../lessons/trennbare-verben.html'" class="lesson-button">Înapoi la lecție</button>
                    <button onclick="this.showDetailedResults()" class="details-button">Rezultate detaliate</button>
                </div>
            </div>
        `;

        this.questionContainer.innerHTML = resultsHTML;
        this.hideSubmitButton();
        this.hideNextButton();
        
        // Update progress to 100%
        if (this.progressBar) {
            this.progressBar.style.width = '100%';
        }
        if (this.progressText) {
            this.progressText.textContent = 'Test finalizat!';
        }
    }

    showDetailedResults() {
        const detailsHTML = `
            <div class="detailed-results">
                <h3>Detaillierte Ergebnisse</h3>
                <div class="results-list">
                    ${this.userAnswers.map((answer, index) => `
                        <div class="result-item ${answer.isCorrect ? 'correct' : 'incorrect'}">
                            <h4>Übung ${index + 1}: ${this.getExerciseTypeName(answer.exerciseType)}</h4>
                            <p><strong>Status:</strong> ${answer.isCorrect ? '✅ Richtig' : '❌ Falsch'}</p>
                            ${!answer.isCorrect ? `<p><strong>Richtige Antwort:</strong> ${answer.correctAnswer}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        this.feedbackArea.innerHTML = detailsHTML;
    }

    getExerciseTypeName(type) {
        const typeNames = {
            'fill-in-the-blanks-conjugation': 'Completează spațiile libere',
            'sentence-building': 'Construirea propozițiilor',
            'audio-listen-and-write': 'Ascultă și scrie',
            'multiple-choice-prefix': 'Alege prefixul corect',
            'transform-the-sentence': 'Transformă propoziția',
            'match-verb-meaning': 'Asociază verbul cu înțelesul',
            'separable-or-not': 'Separabil sau neseparabil?',
            'find-the-mistake': 'Găsește greșeala',
            'image-association': 'Asociază cu imaginea',
            'dialogue-completion': 'Completează dialogul'
        };
        return typeNames[type] || type;
    }
}

// Initialize test when page loads
document.addEventListener('DOMContentLoaded', () => {
    new TrennbareVerbenTestRunner();
});