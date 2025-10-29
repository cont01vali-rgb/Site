// Test runner pentru Das Adjektiv — folosește același design ca lernziel-test
// Generează întrebări automate de tipul "Ce înseamnă X?" și "Care este traducerea pentru Y?"
document.addEventListener('DOMContentLoaded', () => {
  // Verifică dacă datele pentru adjective sunt disponibile
  const adjectivesData = window.adjectivesData || [];
  
  if (!adjectivesData.length) {
    const questionArea = document.getElementById('questionArea');
    if (questionArea) {
      questionArea.textContent = 'Încă nu există adjective — verifică js/adjektiv.js';
      const verifyBtn = document.getElementById('verify-btn');
      if (verifyBtn) verifyBtn.style.display = 'none';
    }
    return;
  }

  // Generează întrebări automate din tabelul de adjective
  const questions = generateQuestionsFromAdjectives(adjectivesData);
  
  // Shuffle pentru test
  shuffleArray(questions);
  
  // Limitează la 15 întrebări pentru test optim
  const testQuestions = questions.slice(0, 15);

  // Referințe DOM
  const questionArea = document.getElementById('questionArea');
  const feedback = document.getElementById('feedback');
  const qIndexEl = document.getElementById('qIndex');
  const qTotalEl = document.getElementById('qTotal');
  const scoreEl = document.getElementById('score');
  const verifyBtn = document.getElementById('verify-btn');
  const nextBtn = document.getElementById('next-btn');

  // State management
  let currentIndex = 0;
  let score = 0;
  let selectedAnswer = null;

  // Setează totalul întrebărilor
  qTotalEl.textContent = testQuestions.length;
  
  // Afișează prima întrebare
  renderCurrentQuestion();

  // Event listeners
  verifyBtn.addEventListener('click', () => {
    if (!canVerifyAnswer()) return;
    
    const isCorrect = checkCurrentAnswer();
    const question = testQuestions[currentIndex];
    
    // Feedback cu design modern identic cu lernziel + explicații detaliate
    feedback.className = isCorrect ? 'test-feedback success' : 'test-feedback error';
    feedback.innerHTML = isCorrect ? 
      `✅ Corect! ${generateDetailedExplanation(question, true)}` : 
      `❌ Greșit! ${generateDetailedExplanation(question, false)}`;
    
    if (isCorrect) score++;
    scoreEl.textContent = score;
    
    // Schimbă butoanele
    verifyBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
  });

  nextBtn.addEventListener('click', () => {
    currentIndex++;
    
    if (currentIndex >= testQuestions.length) {
      finishTest();
      return;
    }
    
    // Reset pentru următoarea întrebare
    selectedAnswer = null;
    feedback.textContent = '';
    feedback.className = 'test-feedback';
    verifyBtn.style.display = 'inline-block';
    nextBtn.style.display = 'none';
    
    renderCurrentQuestion();
  });

  function generateQuestionsFromAdjectives(adjectives) {
    const questions = [];
    
    adjectives.forEach(adj => {
      // Tip 1: "Ce înseamnă [adjektiv german]?"
      questions.push({
        type: 'mc',
        text: `Ce înseamnă "${adj.adjektiv}"?`,
        correct: 'a',
        options: generateOptions(adj.traducere, adjectives, 'traducere'),
        questionType: 'translation',
        adjective: adj
      });
      
      // Tip 2: "Care este traducerea în germană pentru [adjektiv românesc]?"
      questions.push({
        type: 'mc', 
        text: `Care este traducerea în germană pentru "${adj.traducere}"?`,
        correct: 'a',
        options: generateOptions(adj.adjektiv, adjectives, 'adjektiv'),
        questionType: 'german-translation',
        adjective: adj
      });
      
      // Tip 3: "Forma comparativă a cuvântului [adjektiv] este:"
      if (adj.comparativ && adj.comparativ !== '-') {
        questions.push({
          type: 'mc',
          text: `Forma comparativă a cuvântului "${adj.adjektiv}" este:`,
          correct: 'a', 
          options: generateOptions(adj.comparativ, adjectives, 'comparativ'),
          questionType: 'comparative',
          adjective: adj
        });
      }
      
      // Tip 4: "Forma superlativă a cuvântului [adjektiv] este:"
      if (adj.superlativ && adj.superlativ !== '-') {
        questions.push({
          type: 'mc',
          text: `Forma superlativă a cuvântului "${adj.adjektiv}" este:`,
          correct: 'a',
          options: generateOptions(adj.superlativ, adjectives, 'superlativ'),
          questionType: 'superlative',
          adjective: adj
        });
      }
    });
    
    return questions;
  }

  function generateOptions(correctAnswer, allAdjectives, field) {
    const options = [correctAnswer]; // Prima opțiune e întotdeauna cea corectă
    const used = new Set([correctAnswer.toLowerCase()]);
    
    // Adaugă 2-3 opțiuni false aleatorii
    while (options.length < 4 && used.size < allAdjectives.length) {
      const randomAdj = allAdjectives[Math.floor(Math.random() * allAdjectives.length)];
      const value = randomAdj[field];
      
      if (value && value !== '-' && !used.has(value.toLowerCase())) {
        options.push(value);
        used.add(value.toLowerCase());
      }
    }
    
    // Shuffle opțiunile pentru a nu fi întotdeauna prima cea corectă
    const shuffledOptions = [...options];
    shuffleArray(shuffledOptions);
    
    // Găsește noua poziție a răspunsului corect
    const correctIndex = shuffledOptions.indexOf(correctAnswer);
    const correctLetter = ['a', 'b', 'c', 'd'][correctIndex];
    
    // Returnează opțiunile și litera corectă
    return {
      list: shuffledOptions,
      correct: correctLetter
    };
  }

  function renderCurrentQuestion() {
    const question = testQuestions[currentIndex];
    qIndexEl.textContent = currentIndex + 1;
    scoreEl.textContent = score;
    
    // Actualizează bara de progres
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
      const progressPercent = ((currentIndex + 1) / testQuestions.length) * 100;
      progressFill.style.width = `${progressPercent}%`;
    }
    
    questionArea.innerHTML = '';

    // Container pentru textul întrebării
    const questionTitle = document.createElement('div');
    questionTitle.className = 'question-text';
    questionTitle.textContent = `${currentIndex + 1}. ${question.text}`;
    questionArea.appendChild(questionTitle);

    // Container pentru opțiunile de răspuns
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'question-options';

    // Generează butoanele pentru opțiuni
    question.options.list.forEach((option, index) => {
      const letter = ['a', 'b', 'c', 'd'][index];
      const button = createOptionButton(letter, option);
      optionsContainer.appendChild(button);
    });
    
    questionArea.appendChild(optionsContainer);

    // Salvează răspunsul corect pentru verificare
    testQuestions[currentIndex].correctLetter = question.options.correct;

    // Bind evenimente pentru selecția opțiunilor
    questionArea.querySelectorAll('.ans-btn').forEach(btn => {
      btn.addEventListener('click', (event) => {
        // Elimină selecția precedentă
        questionArea.querySelectorAll('.ans-btn').forEach(b => b.classList.remove('selected'));
        
        // Marchează selecția curentă
        event.currentTarget.classList.add('selected');
        selectedAnswer = event.currentTarget.dataset.val;
      });
    });
  }

  function createOptionButton(letter, text) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'ans-btn';
    button.dataset.val = letter;
    button.textContent = `${letter}. ${text}`;
    return button;
  }

  function canVerifyAnswer() {
    return selectedAnswer !== null;
  }

  function checkCurrentAnswer() {
    const question = testQuestions[currentIndex];
    return selectedAnswer === question.correctLetter;
  }

  function finishTest() {
    const percentage = Math.round((score / testQuestions.length) * 100);
    
    questionArea.innerHTML = `
      <div class="test-completion">
        <h2>🎉 Test terminat!</h2>
        <div class="final-score">
          <p><strong>Scor final: ${score} / ${testQuestions.length}</strong></p>
          <p><strong>Procentaj: ${percentage}%</strong></p>
        </div>
        <div class="completion-actions">
          <a href="../lessons/das-adjektiv.html" class="btn btn-primary">Înapoi la lecție</a>
          <button id="review-btn" class="btn btn-secondary">Arată răspunsurile corecte</button>
          <button onclick="location.reload()" class="btn btn-outline">Încearcă din nou</button>
        </div>
      </div>
    `;
    
    verifyBtn.style.display = 'none';
    nextBtn.style.display = 'none';

    // Funcție pentru afișarea răspunsurilor corecte
    const reviewBtn = document.getElementById('review-btn');
    if (reviewBtn) {
      reviewBtn.addEventListener('click', () => showCorrectAnswers());
    }
  }

  function showCorrectAnswers() {
    questionArea.innerHTML = '';
    
    testQuestions.forEach((question, index) => {
      const reviewCard = document.createElement('div');
      reviewCard.className = 'frage';
      
      // Header cu întrebarea
      const header = document.createElement('div');
      header.innerHTML = `<strong>${index + 1}.</strong> ${escapeHtml(question.text)}`;
      reviewCard.appendChild(header);
      
      // Opțiunile cu răspunsul corect marcat
      const answersDiv = document.createElement('div');
      question.options.list.forEach((option, optIndex) => {
        const letter = ['a', 'b', 'c', 'd'][optIndex];
        const isCorrect = letter === question.correctLetter;
        
        const optionDiv = document.createElement('div');
        optionDiv.className = 'mc-row';
        
        if (isCorrect) {
          optionDiv.innerHTML = `<strong class="mc-correct">${letter}.</strong> ${escapeHtml(option)}`;
        } else {
          optionDiv.innerHTML = `${letter}. ${escapeHtml(option)}`;
        }
        
        answersDiv.appendChild(optionDiv);
      });
      
      reviewCard.appendChild(answersDiv);
      questionArea.appendChild(reviewCard);
    });
    
    // Elimină butonul de review după afișare
    const reviewBtn = document.getElementById('review-btn');
    if (reviewBtn) reviewBtn.remove();
  }

  // Utility functions
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function generateDetailedExplanation(question, isCorrect) {
    const adj = question.adjective;
    
    switch (question.questionType) {
      case 'comparative':
        return generateComparativeExplanation(adj, isCorrect);
      case 'superlative':
        return generateSuperlativeExplanation(adj, isCorrect);
      case 'translation':
        return `<div class="explanation-box"><strong>Traducere:</strong> "${adj.adjektiv}" = "${adj.traducere}"</div>`;
      case 'german-translation':
        return `<div class="explanation-box"><strong>Cuvânt german:</strong> "${adj.traducere}" = "${adj.adjektiv}"</div>`;
      default:
        return '';
    }
  }

  function generateComparativeExplanation(adj, isCorrect) {
    const baseWord = adj.adjektiv;
    const comparative = adj.comparativ;
    
    // Detectează regula aplicată
    let rule = '';
    let ending = '';
    let explanation = '';
    
    if (comparative.endsWith('er')) {
      ending = 'er';
      if (baseWord.endsWith('e')) {
        rule = 'Pentru adjective terminate în "e", se adaugă doar "r"';
        explanation = `"${baseWord}" + r = "${comparative}"`;
      } else if (baseWord.length === 1 || /[aeiou]/.test(baseWord.slice(-2,-1))) {
        rule = 'Pentru adjective scurte cu vocală, se dublează consona finală + er';
        explanation = `"${baseWord}" → "${comparative}"`;
      } else {
        rule = 'Regula generală: adjektiv + er';
        explanation = `"${baseWord}" + <span style="color: red; font-weight: bold;">er</span> = "${comparative}"`;
      }
    } else if (comparative.includes('ä') || comparative.includes('ö') || comparative.includes('ü')) {
      rule = 'Adjective cu Umlaut în comparativ';
      ending = 'er cu Umlaut';
      explanation = `"${baseWord}" → "${comparative}" (cu modificarea vocalei + <span style="color: red; font-weight: bold;">er</span>)`;
    } else {
      rule = 'Formă neregulată de comparativ';
      explanation = `"${baseWord}" → "${comparative}" (formă specială)`;
    }
    
    return `
      <div class="explanation-box comparative-explanation">
        <div class="rule-title">📈 <strong>Regula Comparativului:</strong></div>
        <div class="rule-text">${rule}</div>
        <div class="example-formation">${explanation}</div>
        <div class="general-rule">
          <small>💡 <strong>Regula generală:</strong> Majoritatea adjectivelor formează comparativul prin adăugarea terminației <span style="color: red; font-weight: bold; font-size: 16px;">-er</span></small>
        </div>
      </div>
    `;
  }

  function generateSuperlativeExplanation(adj, isCorrect) {
    const baseWord = adj.adjektiv;
    const superlative = adj.superlativ;
    
    let rule = '';
    let ending = '';
    let explanation = '';
    
    if (superlative.startsWith('am ')) {
      const supForm = superlative.replace('am ', '');
      
      if (supForm.endsWith('sten')) {
        ending = 'sten';
        rule = 'Pentru adjective terminate în -d, -t, -s, -ß, -x, -z se adaugă -esten';
        explanation = `"${baseWord}" → am <span style="color: red; font-weight: bold;">${supForm}</span>`;
      } else if (supForm.endsWith('esten')) {
        ending = 'esten';
        rule = 'Pentru adjective terminate în -d, -t, -s, -ß, -x, -z se adaugă -esten';
        explanation = `"${baseWord}" → am <span style="color: red; font-weight: bold;">${supForm}</span>`;
      } else if (supForm.endsWith('ten')) {
        ending = 'ten';
        rule = 'Pentru adjective terminate în vocală se adaugă -sten';
        explanation = `"${baseWord}" → am <span style="color: red; font-weight: bold;">${supForm}</span>`;
      } else {
        rule = 'Formă neregulată de superlativ';
        explanation = `"${baseWord}" → ${superlative} (formă specială)`;
      }
    } else {
      rule = 'Formă neregulată de superlativ';
      explanation = `"${baseWord}" → ${superlative} (formă specială)`;
    }
    
    return `
      <div class="explanation-box superlative-explanation">
        <div class="rule-title">🏆 <strong>Regula Superlativului:</strong></div>
        <div class="rule-text">${rule}</div>
        <div class="example-formation">${explanation}</div>
        <div class="general-rule">
          <small>💡 <strong>Regula generală:</strong> Superlativul se formează cu <span style="color: red; font-weight: bold; font-size: 16px;">am</span> + adjektiv + <span style="color: red; font-weight: bold; font-size: 16px;">-sten</span></small>
        </div>
        <div class="special-cases">
          <small>⚠️ <strong>Cazuri speciale:</strong> Adjective terminate în -d, -t, -s, -ß, -x, -z → <span style="color: red; font-weight: bold;">-esten</span></small>
        </div>
      </div>
    `;
  }
});