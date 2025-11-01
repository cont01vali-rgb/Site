// Test pentru Buchstabiertafel cu sistem automat de cuvinte
document.addEventListener('DOMContentLoaded', () => {
  // Așteptăm să se încarce datele
  setTimeout(initTest, 100);
});

function initTest() {
  const nounsData = window.nounsData || [];
  const verbsData = window.verbsData || [];
  
  if (!nounsData.length && !verbsData.length) {
    console.error('Nu s-au găsit date pentru substantive sau verbe');
    return;
  }

  // Tabelul de ortografiere austriac
  const buchstabiertafel = {
    'a': 'Anton', 'ä': 'Ärger', 'b': 'Berta', 'c': 'Cäsar',
    'd': 'Dora', 'e': 'Emil', 'f': 'Friedrich', 'g': 'Gustav',
    'h': 'Heinrich', 'i': 'Ida', 'j': 'Julius', 'k': 'Konrad',
    'l': 'Ludwig', 'm': 'Martha', 'n': 'Nordpol', 'o': 'Otto',
    'ö': 'Österreich', 'p': 'Paula', 'q': 'ku', 'r': 'Richard',
    's': 'Siegfried', 'ß': 'scharfes ß', 't': 'Theodor', 'u': 'Ulrich',
    'ü': 'Übel', 'v': 'Viktor', 'w': 'Wilhelm', 'x': 'Xaver',
    'y': 'Ypsilon', 'z': 'Zürich'
  };

  // Referințe DOM
  const questionArea = document.getElementById('questionArea');
  const feedback = document.getElementById('feedback');
  const qIndexEl = document.getElementById('qIndex');
  const qTotalEl = document.getElementById('qTotal');
  const scoreEl = document.getElementById('score');
  const verifyBtn = document.getElementById('verify-btn');
  const nextBtn = document.getElementById('next-btn');

  // State management
  let currentExercises = [];
  let currentIndex = 0;
  let score = 0;
  let userInput = '';

  // Generează exercițiile
  generateExercises();
  startTest();

  function generateExercises() {
    const allWords = [];
    
    // Adaugă substantive (folosind proprietatea 'nomen')
    nounsData.forEach(noun => {
      if (noun.nomen && noun.nomen.length >= 3 && noun.nomen.length <= 8) {
        allWords.push({
          word: noun.nomen,
          type: 'substantiv'
        });
      }
    });
    
    // Adaugă verbe (folosind proprietatea 'verb')
    verbsData.forEach(verb => {
      if (verb.verb && verb.verb.length >= 3 && verb.verb.length <= 8) {
        allWords.push({
          word: verb.verb,
          type: 'verb'
        });
      }
    });

    // Selectează 15 cuvinte aleatoare
    const shuffled = allWords.sort(() => Math.random() - 0.5);
    const selectedWords = shuffled.slice(0, 15);

    // Generează exercițiile
    currentExercises = selectedWords.map(item => ({
      word: item.word,
      type: item.type,
      correctAnswer: generateBuchstabiertafelAnswer(item.word)
    }));

    qTotalEl.textContent = currentExercises.length;
  }

  function generateBuchstabiertafelAnswer(word) {
    return word.toLowerCase()
      .split('')
      .map(letter => buchstabiertafel[letter] || letter.toUpperCase())
      .join(' ');
  }

  function startTest() {
    currentIndex = 0;
    score = 0;
    scoreEl.textContent = score;
    renderCurrentQuestion();
  }

  function renderCurrentQuestion() {
    const exercise = currentExercises[currentIndex];
    
    // Update progress
    qIndexEl.textContent = currentIndex + 1;
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
      const progressPercent = ((currentIndex + 1) / currentExercises.length) * 100;
      progressFill.style.width = `${progressPercent}%`;
    }
    
    // Clear previous content
    questionArea.innerHTML = '';
    feedback.textContent = '';
    feedback.className = 'test-feedback';
    
    // Question header
    const questionHeader = document.createElement('div');
    questionHeader.className = 'question-header';
    questionHeader.innerHTML = `
      <h3>Întrebarea ${currentIndex + 1}</h3>
      <div class="buchstabier-word">
        <p class="question-text">Ortografiază cuvântul:</p>
        <div class="target-word">${exercise.word}</div>
        <p class="question-hint">Folosind Buchstabiertafel-ul austriac</p>
      </div>
    `;
    questionArea.appendChild(questionHeader);
    
    // Input area
    const inputContainer = document.createElement('div');
    inputContainer.className = 'answer-input-container';
    inputContainer.innerHTML = `
      <label for="buchstabier-input" class="input-label">Răspunsul tău:</label>
      <input type="text" id="buchstabier-input" class="buchstabier-input" 
             placeholder="ex: Anton Nordpol Anton" autocomplete="off">
      <div class="input-hint">Scrie numele pentru fiecare literă, separate prin spațiu</div>
    `;
    questionArea.appendChild(inputContainer);
    
    // Focus on input
    setTimeout(() => {
      const input = document.getElementById('buchstabier-input');
      if (input) {
        input.focus();
        
        // Handle Enter key - folosim addEventListener o singură dată
        input.addEventListener('keydown', handleInputKeydown);
      }
    }, 100);
    
    // Reset button states
    verifyBtn.style.display = 'inline-block';
    nextBtn.style.display = 'none';
  }

  function handleInputKeydown(e) {
    if (e.key === 'Enter') {
      e.preventDefault(); // Previne comportamentul default
      e.stopPropagation(); // Oprește propagarea evenimentului
      if (verifyBtn.style.display !== 'none') {
        verifyAnswer();
      }
    }
  }

  function verifyAnswer() {
    const input = document.getElementById('buchstabier-input');
    if (!input) return;
    
    userInput = input.value.trim();
    const exercise = currentExercises[currentIndex];
    const correctAnswer = exercise.correctAnswer;
    
    // Normalize answers for comparison
    const userNormalized = normalizeAnswer(userInput);
    const correctNormalized = normalizeAnswer(correctAnswer);
    
    const isCorrect = userNormalized === correctNormalized;
    
    if (isCorrect) {
      score++;
      scoreEl.textContent = score;
      feedback.innerHTML = `
        <div class="feedback-correct">
          ✅ <strong>Corect!</strong><br>
          <div class="feedback-details">
            <strong>${exercise.word}</strong> = ${correctAnswer}
          </div>
        </div>
      `;
      feedback.className = 'test-feedback feedback-correct';
    } else {
      feedback.innerHTML = `
        <div class="feedback-incorrect">
          ❌ <strong>Incorect</strong><br>
          <div class="feedback-details">
            <strong>Răspunsul tău:</strong> ${userInput || '(gol)'}<br>
            <strong>Răspunsul corect:</strong> ${correctAnswer}
          </div>
        </div>
      `;
      feedback.className = 'test-feedback feedback-incorrect';
    }
    
    // Forțează afișarea feedback-ului
    feedback.style.display = 'block';
    feedback.style.opacity = '1';
    
    // Disable input and show next button
    input.disabled = true;
    verifyBtn.style.display = 'none';
    
    if (currentIndex < currentExercises.length - 1) {
      nextBtn.style.display = 'inline-block';
      nextBtn.focus();
    } else {
      // Test finished
      setTimeout(showFinalResults, 1500);
    }
  }

  function normalizeAnswer(answer) {
    return answer.toLowerCase()
      .replace(/[^\w\säöüß]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function showFinalResults() {
    const percentage = Math.round((score / currentExercises.length) * 100);
    
    questionArea.innerHTML = `
      <div class="test-completion">
        <h2>🎉 Test finalizat!</h2>
        <div class="final-score">
          <div class="score-circle">
            <span class="score-number">${score}/${currentExercises.length}</span>
            <span class="score-percentage">${percentage}%</span>
          </div>
        </div>
        <div class="completion-message">
          ${percentage >= 80 ? 
            '🏆 Excelent! Știi foarte bine Buchstabiertafel-ul!' : 
            percentage >= 60 ? 
            '👍 Bun rezultat! Mai exersează pentru perfecționare.' :
            '📚 Mai exersează pentru a stăpâni Buchstabiertafel-ul.'
          }
        </div>
        <div class="completion-actions">
          <button class="btn btn-primary" onclick="location.reload()">🔄 Încearcă din nou</button>
          <a class="btn btn-outline" href="../lessons/buchstabiertafel.html">← Înapoi la lecție</a>
        </div>
      </div>
    `;
    
    // Hide controls
    document.querySelector('.test-controls-modern').style.display = 'none';
    feedback.style.display = 'none';
  }

  // Event listeners
  verifyBtn?.addEventListener('click', verifyAnswer);
  
  nextBtn?.addEventListener('click', () => {
    currentIndex++;
    renderCurrentQuestion();
  });

  // Enter key pentru next button când e în focus
  nextBtn?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      currentIndex++;
      renderCurrentQuestion();
    }
  });
}