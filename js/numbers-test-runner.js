// Numbers Test Runner - Execută testele de numere germane
// Versiune simplă și funcțională

let currentExercise = 0;
let exercises = [];
let score = 0;

// Inițializare test
function initializeTest() {
    console.log("🎯 Inițializez testul de numere...");
    
    // Verifică dacă datele sunt încărcate
    if (typeof numbersTestData === 'undefined') {
        showError("Datele testului nu s-au încărcat!");
        return;
    }
    
    // Generează exerciții
    exercises = numbersTestData.generateRandomExercises(18);
    
    if (!exercises || exercises.length === 0) {
        showError("Nu s-au putut genera exercițiile!");
        return;
    }
    
    console.log(`✅ Test inițializat cu ${exercises.length} exerciții`);
    
    // Afișează primul exercițiu
    displayCurrentExercise();
}

// Afișează exercițiul curent
function displayCurrentExercise() {
    if (currentExercise >= exercises.length) {
        displayFinalResults();
        return;
    }
    
    const exercise = exercises[currentExercise];
    const progressText = `Întrebare ${currentExercise + 1} din ${exercises.length}`;
    const scoreText = `Scor: ${score}/${currentExercise}`;
    
    // Actualizează elementele din pagină
    updateElement('progress-text', progressText);
    updateElement('score-text', scoreText);
    
    // Afișează exercițiul pe baza tipului
    if (exercise.type === 'fill-in') {
        displayFillInExercise(exercise);
    } else if (exercise.type === 'audio') {
        displayAudioExercise(exercise);
    } else if (exercise.type === 'multiple-choice') {
        displayMultipleChoiceExercise(exercise);
    }
    
    // Ascunde feedback-ul
    hideElement('feedback');
    
    // Afișează butonul de verificare
    showElement('verify-btn');
    hideElement('next-btn');
    
    console.log(`📝 Afișez întrearea ${currentExercise + 1} (${exercise.type}): ${exercise.question}`);
}

// Afișează exercițiu fill-in
function displayFillInExercise(exercise) {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `
        <div id="progress-text" class="progress-text">Întrebare ${currentExercise + 1} din ${exercises.length}</div>
        <div id="score-text" class="score-text">Scor: ${score}/${currentExercise}</div>
        <div id="question-text" class="question-text">${exercise.question}</div>
        <div class="answer-input-container">
            <input type="text" id="answer-input" placeholder="Scrie răspunsul aici..." autocomplete="off">
        </div>
    `;
    
    // Pune focus pe input
    const inputElement = document.getElementById('answer-input');
    if (inputElement) {
        inputElement.focus();
        // Adaugă event listener pentru Enter
        inputElement.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                verifyAnswer();
            }
        });
    }
}

// Afișează exercițiu audio cu TTS
function displayAudioExercise(exercise) {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `
        <div id="progress-text" class="progress-text">Întrebare ${currentExercise + 1} din ${exercises.length}</div>
        <div id="score-text" class="score-text">Scor: ${score}/${currentExercise}</div>
        <div id="question-text" class="question-text">${exercise.question}</div>
        <div class="audio-controls">
            <button id="play-audio-btn" class="btn btn-audio">🔊 Ascultă numărul</button>
            <button id="replay-audio-btn" class="btn btn-audio" style="display:none;">🔄 Ascultă din nou</button>
        </div>
        <div class="answer-input-container">
            <input type="text" id="answer-input" placeholder="Scrie numărul în cifre (ex: 25)" autocomplete="off">
        </div>
    `;
    
    // Adaugă event listeners pentru butoanele audio
    const playBtn = document.getElementById('play-audio-btn');
    const replayBtn = document.getElementById('replay-audio-btn');
    
    if (playBtn) {
        playBtn.addEventListener('click', () => playAudio(exercise.audioText, playBtn, replayBtn));
    }
    
    if (replayBtn) {
        replayBtn.addEventListener('click', () => playAudio(exercise.audioText, playBtn, replayBtn));
    }
    
    // Pune focus pe input după un mic delay
    setTimeout(() => {
        const inputElement = document.getElementById('answer-input');
        if (inputElement) {
            inputElement.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    verifyAnswer();
                }
            });
        }
    }, 100);
}

// Afișează exercițiu multiple choice
function displayMultipleChoiceExercise(exercise) {
    const questionContainer = document.getElementById('question-container');
    
    let optionsHTML = '';
    exercise.options.forEach((option, index) => {
        const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
        const colorizedOption = exercise.subtype === 'number-to-german' ? 
            numbersTestData.colorizeGermanNumber(option) : option;
        
        optionsHTML += `
            <div class="multiple-choice-option" data-value="${option}">
                <span class="option-letter">${optionLetter}.</span>
                <span class="option-text">${colorizedOption}</span>
            </div>
        `;
    });
    
    questionContainer.innerHTML = `
        <div id="progress-text" class="progress-text">Întrebare ${currentExercise + 1} din ${exercises.length}</div>
        <div id="score-text" class="score-text">Scor: ${score}/${currentExercise}</div>
        <div id="question-text" class="question-text">${exercise.question}</div>
        <div class="multiple-choice-container">
            ${optionsHTML}
        </div>
        <input type="hidden" id="answer-input" value="">
    `;
    
    // Adaugă event listeners pentru opțiuni
    const options = document.querySelectorAll('.multiple-choice-option');
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Elimină selecția anterioară
            options.forEach(opt => opt.classList.remove('selected'));
            
            // Selectează opțiunea curentă
            this.classList.add('selected');
            
            // Setează valoarea în input-ul ascuns
            const hiddenInput = document.getElementById('answer-input');
            if (hiddenInput) {
                hiddenInput.value = this.dataset.value;
            }
        });
    });
}

// Funcție pentru redarea audio cu Speech Synthesis
function playAudio(text, playBtn, replayBtn) {
    if ('speechSynthesis' in window) {
        // Oprește orice audio anterior
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Configurează vocea pentru germană
        utterance.lang = 'de-DE';
        utterance.rate = 0.8; // Viteză mai lentă pentru învățare
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        // Event listeners pentru butoane
        utterance.onstart = function() {
            playBtn.style.display = 'none';
            replayBtn.style.display = 'inline-block';
            playBtn.disabled = true;
        };
        
        utterance.onend = function() {
            playBtn.disabled = false;
        };
        
        utterance.onerror = function(event) {
            console.error('Eroare TTS:', event.error);
            showError('Nu s-a putut reda audio-ul. Încearcă din nou.');
            playBtn.disabled = false;
        };
        
        // Redă audio
        window.speechSynthesis.speak(utterance);
        
        console.log(`🔊 Redau audio pentru: ${text}`);
    } else {
        showError('Browser-ul nu suportă sinteza vocală.');
    }
}

// Verifică răspunsul utilizatorului
function verifyAnswer() {
    const inputElement = document.getElementById('answer-input');
    if (!inputElement) {
        showError("Câmpul de răspuns nu a fost găsit!");
        return;
    }
    
    const exercise = exercises[currentExercise];
    let userAnswer = inputElement.value.trim().toLowerCase();
    let correctAnswer = exercise.correctAnswer.toLowerCase();
    
    // Pentru exercițiile multiple choice, verifică dacă s-a selectat o opțiune
    if (exercise.type === 'multiple-choice' && !userAnswer) {
        showError("Te rog selectează o opțiune!");
        return;
    }
    
    console.log(`🔍 Verific ${exercise.type}: "${userAnswer}" vs "${correctAnswer}"`);
    
    const feedbackElement = document.getElementById('feedback');
    if (!feedbackElement) return;
    
    let isCorrect = false;
    
    // Verifică răspunsul pe baza tipului de exercițiu
    if (exercise.type === 'audio') {
        // Pentru audio, verifică doar numărul
        isCorrect = userAnswer === exercise.number.toString();
        correctAnswer = exercise.number.toString();
    } else {
        // Pentru fill-in și multiple choice
        isCorrect = userAnswer === correctAnswer;
    }
    
    if (isCorrect) {
        // Răspuns corect
        score++;
        let feedbackHTML = `
            <div class="correct-answer">
                🎉 Excelent! Răspuns corect!
            </div>
        `;
        
        // Adaugă informații suplimentare pentru exercițiile audio
        if (exercise.type === 'audio') {
            feedbackHTML += `
                <div class="audio-feedback">
                    <strong>${exercise.number}</strong> se pronunță: 
                    <span class="german-number-display">${exercise.colorizedGerman}</span>
                </div>
            `;
        }
        
        feedbackElement.innerHTML = feedbackHTML;
        feedbackElement.className = 'feedback correct';
    } else {
        // Răspuns greșit
        let wrongAnswerHTML = `
            <div class="wrong-answer">
                ❌ Nu este corect.<br>
                Răspunsul corect era: <strong>${exercise.correctAnswer}</strong>
            </div>
        `;
        
        // Adaugă informații suplimentare pentru exercițiile audio
        if (exercise.type === 'audio') {
            wrongAnswerHTML += `
                <div class="audio-feedback">
                    Numărul era <strong>${exercise.number}</strong>, care se pronunță: 
                    <span class="german-number-display">${exercise.colorizedGerman}</span>
                </div>
            `;
        }
        
        feedbackElement.innerHTML = wrongAnswerHTML;
        feedbackElement.className = 'feedback wrong';
    }
    
    // Afișează feedback-ul și butonul pentru întrebarea următoare
    showElement('feedback');
    hideElement('verify-btn');
    showElement('next-btn');
    
    // Actualizează scorul
    updateElement('score-text', `Scor: ${score}/${currentExercise + 1}`);
}

// Trece la următorul exercițiu
function nextQuestion() {
    currentExercise++;
    displayCurrentExercise();
}

// Afișează rezultatele finale
function displayFinalResults() {
    const percentage = Math.round((score / exercises.length) * 100);
    const resultText = `
        <div class="final-results">
            <h2>🎯 Test Finalizat!</h2>
            <p>Ai obținut <strong>${score}</strong> din <strong>${exercises.length}</strong> puncte</p>
            <p>Procentaj: <strong>${percentage}%</strong></p>
            ${percentage >= 70 ? 
                '<p class="success">🎉 Felicitări! Ai trecut testul!</p>' : 
                '<p class="retry">💪 Mai exercițiu și vei reuși!</p>'
            }
        </div>
    `;
    
    // Actualizează interfața
    updateElement('question-container', resultText);
    hideElement('verify-btn');
    hideElement('next-btn');
    hideElement('feedback');
    
    console.log(`🎉 Test finalizat: ${score}/${exercises.length} (${percentage}%)`);
}

// Funcții helper pentru manipularea DOM
function updateElement(id, content) {
    const element = document.getElementById(id);
    if (element) {
        element.innerHTML = content;
    }
}

function showElement(id) {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = 'block';
    }
}

function hideElement(id) {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = 'none';
    }
}

function showError(message) {
    console.error(`❌ ${message}`);
    updateElement('question-container', `
        <div class="error-message">
            <h3>⚠️ Eroare</h3>
            <p>${message}</p>
            <button onclick="location.reload()" class="retry-btn">🔄 Încearcă din nou</button>
        </div>
    `);
}

// Event listeners pentru butoane
document.addEventListener('DOMContentLoaded', function() {
    console.log("🔄 DOM încărcat, inițializez testul...");
    
    // Adaugă event listeners pentru butoane
    const verifyBtn = document.getElementById('verify-btn');
    if (verifyBtn) {
        verifyBtn.addEventListener('click', verifyAnswer);
    }
    
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', nextQuestion);
    }
    
    // Event listener pentru Enter în câmpul de input
    const inputElement = document.getElementById('answer-input');
    if (inputElement) {
        inputElement.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const verifyBtn = document.getElementById('verify-btn');
                const nextBtn = document.getElementById('next-btn');
                
                if (verifyBtn && verifyBtn.style.display !== 'none') {
                    verifyAnswer();
                } else if (nextBtn && nextBtn.style.display !== 'none') {
                    nextQuestion();
                }
            }
        });
    }
    
    // Inițializează testul
    setTimeout(initializeTest, 100);
});