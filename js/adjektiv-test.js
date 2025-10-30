// Test pentru adjective cu sistem de categorii
document.addEventListener('DOMContentLoaded', () => {
  const adjectivesData = window.adjectivesData || [];
  
  if (!adjectivesData.length) {
    console.error('Nu s-au găsit date pentru adjective');
    return;
  }

  // Configurarea categoriilor
  const categories = {
    'personenstand': { name: 'Starea civilă', count: 0, color: '#FF6B6B' },
    'zustand': { name: 'Stări generale', count: 0, color: '#4ECDC4' },
    'gefuehle_charakter': { name: 'Sentimente și caracter', count: 0, color: '#45B7D1' },
    'farben': { name: 'Culori', count: 0, color: '#96CEB4' },
    'eigenschaften': { name: 'Proprietăți fizice', count: 0, color: '#FFEAA7' },
    'wetter_temperatur': { name: 'Vreme și temperatură', count: 0, color: '#DDA0DD' },
    'geschmack_textur': { name: 'Gust și textură', count: 0, color: '#98D8C8' },
    'intelligenz': { name: 'Inteligență', count: 0, color: '#F7DC6F' },
    'wert_qualitaet': { name: 'Valoare și calitate', count:0, color: '#BB8FCE' }
  };

  // Numără adjective-le din fiecare categorie
  adjectivesData.forEach(adj => {
    if (categories[adj.category]) {
      categories[adj.category].count++;
    }
  });

  // Referințe DOM
  const categorySelection = document.getElementById('categorySelection');
  const testContainer = document.getElementById('testContainer');
  const questionArea = document.getElementById('questionArea');
  const feedback = document.getElementById('feedback');
  const qIndexEl = document.getElementById('qIndex');
  const qTotalEl = document.getElementById('qTotal');
  const scoreEl = document.getElementById('score');
  const verifyBtn = document.getElementById('verify-btn');
  const nextBtn = document.getElementById('next-btn');
  const backToMenuBtn = document.getElementById('back-to-menu');

  // State management
  let currentCategory = null;
  let currentExercises = [];
  let currentIndex = 0;
  let score = 0;
  let selectedAnswer = null;

  // Render meniul de categorii
  renderCategoryMenu();

  // Event handlers pentru butoane
  verifyBtn.addEventListener('click', handleVerifyAnswer);
  nextBtn.addEventListener('click', handleNextQuestion);
  backToMenuBtn.addEventListener('click', showCategoryMenu);

  // Setup global keyboard handlers
  setupGlobalKeyboardHandlers();

  function renderCategoryMenu() {
    categorySelection.innerHTML = '';
    
    const header = document.createElement('div');
    header.className = 'category-header';
    header.innerHTML = `
      <h2>Alegeți categoria pentru testul de adjective</h2>
      <p>Selectați o categorie pentru a începe testul cu adjective specifice.</p>
    `;
    categorySelection.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'category-grid';

    Object.entries(categories).forEach(([key, category]) => {
      if (category.count === 0) return;

      const card = document.createElement('div');
      card.className = 'category-card';
      card.style.borderLeft = `4px solid ${category.color}`;
      
      card.innerHTML = `
        <div class="category-info">
          <h3>${category.name}</h3>
          <p>${category.count} adjective</p>
        </div>
        <div class="category-action">
          <button class="btn btn-primary start-category-btn" data-category="${key}">
            Începe testul
          </button>
        </div>
      `;
      
      grid.appendChild(card);
    });

    categorySelection.appendChild(grid);

    // Event listeners pentru butoanele de start
    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('.start-category-btn');
      if (btn) {
        const category = btn.dataset.category;
        startCategoryTest(category);
      }
    });

    // Afișează meniul și ascunde testul
    categorySelection.style.display = 'block';
    testContainer.style.display = 'none';
  }

  function startCategoryTest(categoryKey) {
    currentCategory = categoryKey;
    
    // Filtrează adjective-le pentru categoria selectată
    const categoryAdjectives = adjectivesData.filter(adj => adj.category === categoryKey);
    
    // Generează exerciții pentru categoria selectată
    currentExercises = generateExercisesForCategory(categoryAdjectives);
    
    // Amestecă exercițiile
    shuffleArray(currentExercises);
    
    // Reset state
    currentIndex = 0;
    score = 0;
    selectedAnswer = null;
    
    // Update UI
    qTotalEl.textContent = currentExercises.length;
    scoreEl.textContent = score;
    
    // Afișează containerul de test și ascunde selecția categoriei
    categorySelection.style.display = 'none';
    testContainer.style.display = 'block';
    
    // Afișează prima întrebare
    renderCurrentQuestion();
  }

  function generateExercisesForCategory(adjectives) {
    const exercises = [];
    
    // Sistem special pentru categoria de culori
    if (currentCategory === 'farben') {
      return generateColorExercises(adjectives);
    }
    
    adjectives.forEach(adj => {
      // Exercițiu: "Ce înseamnă [adjektiv]?" (germană → română)
      exercises.push({
        type: 'translation',
        question: `Ce înseamnă cuvântul "${adj.adjektiv}"?`,
        correctAnswer: adj.traducere,
        options: generateTranslationOptions(adj.traducere, adjectives),
        adjectiveData: adj
      });
      
      // Exercițiu: "Care este traducerea pentru [traducere]?" (română → germană)
      exercises.push({
        type: 'german-word',
        question: `Care este traducerea în germană pentru "${adj.traducere}"?`,
        correctAnswer: adj.adjektiv,
        options: generateGermanOptions(adj.adjektiv, adjectives),
        adjectiveData: adj
      });
      
      // Exercițiu: "Forma comparativă" (doar dacă există)
      if (adj.comparativ && adj.comparativ !== '-') {
        exercises.push({
          type: 'comparative',
          question: `Care este forma comparativă a cuvântului "${adj.adjektiv}"?`,
          correctAnswer: adj.comparativ,
          options: generateComparativeOptions(adj.comparativ, adjectives),
          adjectiveData: adj
        });
      }
      
      // Exercițiu: "Forma superlativă" (doar dacă există)
      if (adj.superlativ && adj.superlativ !== '-') {
        exercises.push({
          type: 'superlative',
          question: `Care este forma superlativă a cuvântului "${adj.adjektiv}"?`,
          correctAnswer: adj.superlativ,
          options: generateSuperlativeOptions(adj.superlativ, adjectives),
          adjectiveData: adj
        });
      }
    });
    
    // Randomizează exercițiile pentru varietate
    return shuffleArray(exercises);
  }

  // Sistem special pentru culori cu generare vizuală automată
  function generateColorExercises(adjectives) {
    // Culori extinse cu valorile lor hex exacte
    const colorData = {
      'rot': { hex: '#DC143C', ro: 'roșu' },
      'blau': { hex: '#0066CC', ro: 'albastru' },
      'grün': { hex: '#228B22', ro: 'verde' },
      'gelb': { hex: '#FFD700', ro: 'galben' },
      'weiß': { hex: '#FFFFFF', ro: 'alb' },
      'schwarz': { hex: '#000000', ro: 'negru' },
      'grau': { hex: '#808080', ro: 'gri' },
      'braun': { hex: '#8B4513', ro: 'maro' },
      'orange': { hex: '#FF8C00', ro: 'portocaliu' },
      'rosa': { hex: '#FFC0CB', ro: 'roz' },
      'lila': { hex: '#9370DB', ro: 'mov' },
      'violett': { hex: '#8A2BE2', ro: 'violet' },
      'türkis': { hex: '#40E0D0', ro: 'turcoaz' },
      'beige': { hex: '#F5F5DC', ro: 'bej' },
      'silber': { hex: '#C0C0C0', ro: 'argintiu' },
      'gold': { hex: '#FFD700', ro: 'auriu' }
    };

    const exercises = [];
    
    // Pentru fiecare culoare din adjective
    adjectives.forEach(adj => {
      const colorKey = adj.adjektiv.toLowerCase();
      const colorInfo = colorData[colorKey];
      
      if (colorInfo) {
        // Exercițiu vizual: "Ce culoare vezi?" - răspunsuri în germană!
        exercises.push({
          type: 'color-visual',
          question: 'Ce culoare vezi?',
          correctAnswer: adj.adjektiv,  // Răspunsul corect în germană
          colorHex: colorInfo.hex,
          colorName: adj.adjektiv,
          options: generateGermanColorOptions(adj.adjektiv, adjectives),  // Opțiuni în germană
          adjectiveData: adj
        });
        
        // Exercițiu tradițional: "Ce înseamnă [culoare]?"
        exercises.push({
          type: 'translation',
          question: `Ce înseamnă cuvântul "${adj.adjektiv}"?`,
          correctAnswer: adj.traducere,
          options: generateTranslationOptions(adj.traducere, adjectives),
          adjectiveData: adj
        });
        
        // Exercițiu invers: "Care este traducerea pentru [culoare]?"
        exercises.push({
          type: 'german-word',
          question: `Care este traducerea în germană pentru "${adj.traducere}"?`,
          correctAnswer: adj.adjektiv,
          options: generateGermanOptions(adj.adjektiv, adjectives),
          adjectiveData: adj
        });
      }
    });
    
    // Adaugă și exerciții pentru culorile extinse care nu sunt în adjective
    Object.keys(colorData).forEach(germanColor => {
      const colorInfo = colorData[germanColor];
      const existsInAdjectives = adjectives.some(adj => adj.adjektiv.toLowerCase() === germanColor);
      
      if (!existsInAdjectives) {
        // Creează un obiect adjective temporar pentru culorile noi
        const tempAdj = {
          adjektiv: germanColor,
          traducere: colorInfo.ro,
          category: 'farben'
        };
        
        exercises.push({
          type: 'color-visual',
          question: 'Ce culoare vezi?',
          correctAnswer: germanColor,  // Răspunsul corect în germană
          colorHex: colorInfo.hex,
          colorName: germanColor,
          options: generateGermanColorOptions(germanColor, [...adjectives, tempAdj]),  // Opțiuni în germană
          adjectiveData: tempAdj
        });
      }
    });
    
    // Randomizează exercițiile pentru varietate
    return shuffleArray(exercises);
  }

  function generateGermanColorOptions(correct, allColors) {
    const options = [correct];
    const used = new Set([correct.toLowerCase()]);
    
    while (options.length < 4 && used.size < allColors.length) {
      const randomColor = allColors[Math.floor(Math.random() * allColors.length)];
      const germanName = randomColor.adjektiv;
      
      if (germanName && !used.has(germanName.toLowerCase())) {
        options.push(germanName);
        used.add(germanName.toLowerCase());
      }
    }
    
    // Amestecă opțiunile
    return options.sort(() => Math.random() - 0.5);
  }

  function generateColorOptions(correct, allColors) {
    const options = [correct];
    const used = new Set([correct.toLowerCase()]);
    
    while (options.length < 4 && used.size < allColors.length) {
      const randomColor = allColors[Math.floor(Math.random() * allColors.length)];
      const translation = randomColor.traducere;
      
      if (translation && !used.has(translation.toLowerCase())) {
        options.push(translation);
        used.add(translation.toLowerCase());
      }
    }
    
    // Amestecă opțiunile
    return options.sort(() => Math.random() - 0.5);
  }

  function generateTranslationOptions(correct, allAdjectives) {
    const options = [correct];
    const used = new Set([correct.toLowerCase()]);
    
    while (options.length < 4 && used.size < allAdjectives.length) {
      const randomAdj = allAdjectives[Math.floor(Math.random() * allAdjectives.length)];
      const translation = randomAdj.traducere;
      
      if (translation && !used.has(translation.toLowerCase())) {
        options.push(translation);
        used.add(translation.toLowerCase());
      }
    }
    
    return shuffleArray([...options]);
  }

  function generateGermanOptions(correct, allAdjectives) {
    const options = [correct];
    const used = new Set([correct.toLowerCase()]);
    
    while (options.length < 4 && used.size < allAdjectives.length) {
      const randomAdj = allAdjectives[Math.floor(Math.random() * allAdjectives.length)];
      const german = randomAdj.adjektiv;
      
      if (german && !used.has(german.toLowerCase())) {
        options.push(german);
        used.add(german.toLowerCase());
      }
    }
    
    return shuffleArray([...options]);
  }

  function generateComparativeOptions(correct, allAdjectives) {
    const options = [correct];
    const used = new Set([correct.toLowerCase()]);
    
    while (options.length < 4 && used.size < allAdjectives.length) {
      const randomAdj = allAdjectives[Math.floor(Math.random() * allAdjectives.length)];
      const comparative = randomAdj.comparativ;
      
      if (comparative && comparative !== '-' && !used.has(comparative.toLowerCase())) {
        options.push(comparative);
        used.add(comparative.toLowerCase());
      }
    }
    
    return shuffleArray([...options]);
  }

  function generateSuperlativeOptions(correct, allAdjectives) {
    const options = [correct];
    const used = new Set([correct.toLowerCase()]);
    
    while (options.length < 4 && used.size < allAdjectives.length) {
      const randomAdj = allAdjectives[Math.floor(Math.random() * allAdjectives.length)];
      const superlative = randomAdj.superlativ;
      
      if (superlative && superlative !== '-' && !used.has(superlative.toLowerCase())) {
        options.push(superlative);
        used.add(superlative.toLowerCase());
      }
    }
    
    return shuffleArray([...options]);
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
      <p class="question-text">${exercise.question}</p>
    `;
    questionArea.appendChild(questionHeader);
    
    // Afișare specială pentru exercițiile de culori vizuale
    if (exercise.type === 'color-visual') {
      const colorDisplay = document.createElement('div');
      colorDisplay.className = 'color-display';
      colorDisplay.style.cssText = `
        width: 150px;
        height: 150px;
        background-color: ${exercise.colorHex};
        border-radius: 20px;
        margin: 20px auto;
        border: 3px solid #ddd;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      `;
      
      // Pentru culori foarte deschise, folosește border mai întunecat pentru contrast
      if (exercise.colorHex === '#FFFFFF' || exercise.colorHex === '#F5F5DC') {
        colorDisplay.style.border = '3px solid #999';
      }
      
      questionArea.appendChild(colorDisplay);
    }
    
    // Answer options
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'answer-options';
    
    exercise.options.forEach((option, index) => {
      const optionBtn = document.createElement('button');
      optionBtn.type = 'button';
      optionBtn.className = 'option-btn';
      optionBtn.textContent = option;
      optionBtn.addEventListener('click', () => selectOption(optionBtn, option));
      optionsContainer.appendChild(optionBtn);
    });
    
    questionArea.appendChild(optionsContainer);
    
    // Reset selected answer
    selectedAnswer = null;
    
    // Reset button states
    verifyBtn.style.display = 'inline-block';
    nextBtn.style.display = 'none';
  }

  function selectOption(button, option) {
    // Remove previous selection
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.classList.remove('selected');
    });
    
    // Mark current selection
    button.classList.add('selected');
    selectedAnswer = option;
  }

  function handleVerifyAnswer() {
    if (!selectedAnswer) {
      alert('Vă rugăm să selectați un răspuns!');
      return;
    }
    
    const exercise = currentExercises[currentIndex];
    const isCorrect = selectedAnswer === exercise.correctAnswer;
    
    if (isCorrect) {
      score++;
      scoreEl.textContent = score;
    }
    
    showFeedback(exercise, isCorrect);
    
    // Update button states
    verifyBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
    
    // Disable all option buttons
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === exercise.correctAnswer) {
        btn.classList.add('correct');
      } else if (btn.textContent === selectedAnswer && !isCorrect) {
        btn.classList.add('incorrect');
      }
    });
  }

  function showFeedback(exercise, isCorrect) {
    const adj = exercise.adjectiveData;
    
    feedback.className = isCorrect ? 'test-feedback success' : 'test-feedback error';
    
    let feedbackText = isCorrect ? '✅ Corect!' : '❌ Greșit!';
    feedbackText += `<br>Răspunsul corect: <strong>${exercise.correctAnswer}</strong>`;
    
    // Add extra information based on exercise type
    switch (exercise.type) {
      case 'translation':
        feedbackText += `<br><em>Exemplu: ${adj.exemplu}</em>`;
        break;
      case 'german-word':
        feedbackText += `<br><em>Exemplu: ${adj.exemplu}</em>`;
        break;
      case 'comparative':
        feedbackText += `<br><em>Forma de bază: ${adj.adjektiv} → Comparativ: ${adj.comparativ}</em>`;
        break;
      case 'superlative':
        feedbackText += `<br><em>Forma de bază: ${adj.adjektiv} → Superlativ: ${adj.superlativ}</em>`;
        break;
    }
    
    feedback.innerHTML = feedbackText;
  }

  function handleNextQuestion() {
    currentIndex++;
    
    if (currentIndex >= currentExercises.length) {
      showTestResults();
      return;
    }
    
    // Reset for next question
    selectedAnswer = null;
    renderCurrentQuestion();
  }

  function showTestResults() {
    const categoryInfo = categories[currentCategory];
    const percentage = Math.round((score / currentExercises.length) * 100);
    
    questionArea.innerHTML = `
      <div class="test-completion">
        <h2>🎉 Test terminat!</h2>
        <h3>Categoria: ${categoryInfo.name}</h3>
        <div class="final-score">
          <p><strong>Scor final: ${score} / ${currentExercises.length}</strong></p>
          <p><strong>Procentaj: ${percentage}%</strong></p>
        </div>
        <div class="completion-message">
          ${percentage >= 80 ? 
            '🌟 Excelent! Ați stăpânit foarte bine această categorie!' : 
            percentage >= 60 ? 
            '👍 Bine! Continuați să exersați pentru a îmbunătăți rezultatul.' : 
            '💪 Încercați din nou! Practica face pe artistul.'
          }
        </div>
        <div class="completion-actions">
          <button id="retry-category" class="btn btn-primary">Încercați din nou</button>
          <button id="back-to-categories" class="btn btn-secondary">Alte categorii</button>
          <a href="../lessons/das-adjektiv.html" class="btn btn-outline">Înapoi la lecție</a>
        </div>
      </div>
    `;
    
    // Hide control buttons
    verifyBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    
    // Event listeners for completion actions
    document.getElementById('retry-category').addEventListener('click', () => {
      startCategoryTest(currentCategory);
    });
    
    document.getElementById('back-to-categories').addEventListener('click', showCategoryMenu);
  }

  function showCategoryMenu() {
    categorySelection.style.display = 'block';
    testContainer.style.display = 'none';
    
    // Reset test state
    currentCategory = null;
    currentExercises = [];
    currentIndex = 0;
    score = 0;
    selectedAnswer = null;
    
    // Clear feedback
    feedback.textContent = '';
    feedback.className = 'test-feedback';
  }

  function setupGlobalKeyboardHandlers() {
    document.addEventListener('keydown', (e) => {
      // Only handle keyboard events when test is visible
      if (testContainer.style.display === 'none') return;
      
      if (e.key === 'Enter') {
        e.preventDefault();
        
        // Determine which button is currently visible and enabled
        if (verifyBtn.style.display !== 'none' && !verifyBtn.disabled) {
          handleVerifyAnswer();
        } else if (nextBtn.style.display !== 'none' && !nextBtn.disabled) {
          handleNextQuestion();
        }
      }
      
      // Number keys for selecting options (1-4)
      if (e.key >= '1' && e.key <= '4') {
        e.preventDefault();
        const optionIndex = parseInt(e.key) - 1;
        const optionBtns = document.querySelectorAll('.option-btn');
        if (optionBtns[optionIndex] && !optionBtns[optionIndex].disabled) {
          optionBtns[optionIndex].click();
        }
      }
    });
  }

  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
});