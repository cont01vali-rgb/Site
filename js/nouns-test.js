(function(){
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);
  const norm = s => String(s||'').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/ă|â/g,'a').replace(/î/g,'i').replace(/ș|ş/g,'s').replace(/ț|ţ/g,'t')
    .trim();

  // TTS (Germană)
  function speak(text, lang='de-DE') {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const run = () => {
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      const v = synth.getVoices().find(v => /de(-|_)?/i.test(v.lang) || /german/i.test(v.name));
      if (v) u.voice = v;
      synth.speak(u);
    };
    if (!synth.getVoices().length) {
      synth.onvoiceschanged = () => { synth.onvoiceschanged = null; run(); };
      setTimeout(run, 150);
    } else run();
  }

  // Categorii de substantive (mapate la structura reală din nouns.js)
  const CATEGORIES = {
    familie: ['Familie & identitate'],
    imbracaminte: ['Îmbrăcăminte'],
    alimente: ['Alimente'],
    casa: ['Obiecte casă'],
    scoala: ['Școală']
  };

  // State global
  let nounsData = [];
  let currentTest = null;
  let currentQuestion = 0;
  let score = 0;
  let testQuestions = [];

  // Initialize
  document.addEventListener('DOMContentLoaded', async () => {
    // Așteaptă ca toate script-urile să se încarce
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verifică direct dacă datele sunt disponibile
    if (window.nounsData && Array.isArray(window.nounsData)) {
      nounsData = window.nounsData;
    } else {
      await loadNounsData();
    }
    
    if (nounsData.length === 0) {
      console.error('No nouns data available');
      return;
    }
    
    setupCategorySelection();
    updateCategoryCounts();
  });

  // Încarcă datele substantivelor
  async function loadNounsData() {
    // Așteaptă încărcarea nouns.js cu timeout mai mare
    let attempts = 0;
    while ((!window.nounsData || !Array.isArray(window.nounsData)) && attempts < 50) {
      await new Promise(resolve => setTimeout(resolve, 200));
      attempts++;
    }
    
    if (window.nounsData && Array.isArray(window.nounsData)) {
      nounsData = window.nounsData;
    } else {
      console.error('Failed to load nounsData after 50 attempts');
    }
  }

  // Setup pentru selecția categoriilor
  function setupCategorySelection() {
    const categoryCards = $$('.category-card');
    categoryCards.forEach(card => {
      card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');
        if (category === 'custom') {
          showCustomSelection();
        } else {
          startCategoryTest(category);
        }
      });
    });

    // Custom selection controls
    $('#selectAllBtn')?.addEventListener('click', selectAllNouns);
    $('#deselectAllBtn')?.addEventListener('click', deselectAllNouns);
    $('#startCustomTestBtn')?.addEventListener('click', startCustomTest);
    $('#back-to-categories')?.addEventListener('click', backToCategories);
  }

  // Actualizează contoarele pentru categorii
  function updateCategoryCounts() {
    Object.keys(CATEGORIES).forEach(category => {
      const nouns = getNounsByCategory(category);
      const card = $(`.category-card[data-category="${category}"]`);
      if (card) {
        const countElement = card.querySelector('.category-count');
        if (countElement) {
          const limit = Math.min(nouns.length, 45);
          countElement.textContent = `${limit} întrebări disponibile`;
        }
      }
    });

    // Pentru "Toate substantivele"
    const allCard = $(`.category-card[data-category="all"]`);
    if (allCard) {
      const countElement = allCard.querySelector('.category-count');
      if (countElement) {
        countElement.textContent = `60 întrebări aleatorii din ${nounsData.length}`;
      }
    }
  }

  // Obține substantive după categorie
  function getNounsByCategory(category) {
    if (category === 'all') return nounsData;
    
    const categoryNames = CATEGORIES[category] || [];
    return nounsData.filter(noun => {
      // Verifică comentariile din nouns.js pentru categorii
      const prevComment = getPreviousComment(noun);
      return categoryNames.some(catName => 
        prevComment && prevComment.includes(catName)
      );
    });
  }

  // Obține comentariul anterior pentru un substantiv (pe baza structurii reale din nouns.js)
  function getPreviousComment(noun) {
    const index = nounsData.indexOf(noun);
    if (index === -1) return null;
    
    // Mapează indexurile la categoriile reale din nouns.js cu corectări
    // Familie & identitate (0-69 + 163+)
    if ((index >= 0 && index < 70) || index >= 163) {
      return 'Familie & identitate';
    } 
    // Obiecte casă (70-89)
    else if (index >= 70 && index < 90) {
      return 'Obiecte casă';
    }
    // Veselă/ustensile (90-97) - parte din Obiecte casă
    else if (index >= 90 && index < 98) {
      return 'Obiecte casă';
    }
    // Alimente & băuturi + Fructe + Legume (98-121)
    else if (index >= 98 && index < 122) {
      return 'Alimente';
    }
    // Școală / obiecte uzuale (122-128)
    else if (index >= 122 && index < 129) {
      return 'Școală';
    }
    // Îmbrăcăminte (129-162)
    else if (index >= 129 && index < 163) {
      return 'Îmbrăcăminte';
    }
    
    return null;
  }

  // Afișează selecția personalizată
  function showCustomSelection() {
    const customPanel = $('#customSelection');
    customPanel.style.display = 'block';
    
    const grid = $('#nounCheckboxGrid');
    grid.innerHTML = '';
    
    nounsData.forEach((noun, index) => {
      const item = document.createElement('div');
      item.className = 'noun-checkbox-item';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `noun-${index}`;
      checkbox.value = index;
      checkbox.addEventListener('change', updateSelectedCount);
      
      const label = document.createElement('label');
      label.htmlFor = `noun-${index}`;
      label.textContent = `${noun.nomen} (${noun.traducere})`;
      
      item.appendChild(checkbox);
      item.appendChild(label);
      grid.appendChild(item);
    });
    
    updateSelectedCount();
  }

  // Selectează toate substantivele
  function selectAllNouns() {
    const checkboxes = $$('#nounCheckboxGrid input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = true);
    updateSelectedCount();
  }

  // Deselectează toate substantivele
  function deselectAllNouns() {
    const checkboxes = $$('#nounCheckboxGrid input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    updateSelectedCount();
  }

  // Actualizează numărul selectat
  function updateSelectedCount() {
    const checkboxes = $$('#nounCheckboxGrid input[type="checkbox"]:checked');
    const count = checkboxes.length;
    $('#selectedCount').textContent = count;
    $('#startCustomTestBtn').disabled = count === 0;
  }

  // Începe testul personalizat
  function startCustomTest() {
    const checkboxes = $$('#nounCheckboxGrid input[type="checkbox"]:checked');
    const selectedIndices = Array.from(checkboxes).map(cb => parseInt(cb.value));
    const selectedNouns = selectedIndices.map(i => nounsData[i]);
    
    if (selectedNouns.length === 0) return;
    
    startTest('custom', selectedNouns);
  }

  // Începe testul pentru o categorie
  function startCategoryTest(category) {
    const nouns = getNounsByCategory(category);
    let testNouns;
    
    if (category === 'all') {
      // Pentru "Toate substantivele" - 60 aleatorii
      testNouns = shuffleArray([...nouns]).slice(0, 60);
    } else {
      // Pentru categorii specifice - până la 45
      testNouns = shuffleArray([...nouns]).slice(0, 45);
    }
    
    startTest(category, testNouns);
  }

  // Începe testul
  function startTest(category, nouns) {
    currentTest = { category, nouns };
    testQuestions = generateQuestions(nouns);
    currentQuestion = 0;
    score = 0;
    
    // Ascunde selecția categoriilor
    $('#categorySelection').style.display = 'none';
    $('#testScreen').style.display = 'block';
    
    // Actualizează UI-ul
    $('#qTotal').textContent = testQuestions.length;
    
    // Începe primul exercițiu
    showQuestion();
  }

  // Generează întrebări pentru substantive
  function generateQuestions(nouns) {
    const questions = [];
    
    nouns.forEach(noun => {
      // Pentru "Alege Substantive" - doar 4 tipuri de întrebări automate
      if (currentTest.category === 'custom') {
        // 1. Recunoaștere imagine
        if (noun.image) {
          questions.push({
            type: 'image_recognition',
            noun: noun,
            question: 'Scrie ce vezi în imagine:',
            answer: noun.nomen
          });
        }
        
        // 2. Traducere DE->RO
        questions.push({
          type: 'translate_de_ro',
          noun: noun,
          question: `Cum se spune în română la: "${noun.nomen}"?`,
          answer: noun.traducere
        });
        
        // 3. Traducere RO->DE
        questions.push({
          type: 'translate_ro_de',
          noun: noun,
          question: `Cum se spune în germană la: "${noun.traducere}"?`,
          answer: noun.nomen
        });
        
        // 4. Articol (nou)
        questions.push({
          type: 'article',
          noun: noun,
          question: `Articolul cuvântului "${noun.nomen}":`,
          answer: noun.gen
        });
      } else {
        // Pentru alte categorii - exerciții mixte (de la nouns-exercises.js și automate)
        // Adaugă exercițiul automat de bază
        questions.push({
          type: 'basic_translation',
          noun: noun,
          question: `Cum se traduce "${noun.nomen}"?`,
          answer: noun.traducere
        });
        
        // TODO: Adaugă exerciții prestabilite din nouns-exercises.js
      }
    });
    
    return shuffleArray(questions);
  }

  // Afișează întrebarea curentă
  function showQuestion() {
    if (currentQuestion >= testQuestions.length) {
      showResults();
      return;
    }
    
    const question = testQuestions[currentQuestion];
    const questionArea = $('#questionArea');
    
    // Actualizează progresul
    $('#qIndex').textContent = currentQuestion + 1;
    const progress = ((currentQuestion + 1) / testQuestions.length) * 100;
    $('#progressFill').style.width = `${progress}%`;
    
    // Generează HTML-ul întrebării
    let html = `<div class="question-content">`;
    
    // Adaugă imaginea dacă este necesară
    if (question.type === 'image_recognition' && question.noun.image) {
      html += `
        <div class="q-media">
          <img src="../assets/nouns/${question.noun.image}" alt="${question.noun.nomen}" class="q-img">
        </div>
      `;
    }
    
    html += `
      <p class="question-text">${question.question}</p>
      <div class="answer-input">
        <input type="text" id="userAnswer" placeholder="Răspunsul tău..." autocomplete="off">
        <button type="button" id="speakBtn" class="speak-btn" title="Ascultă pronunția">🔊</button>
      </div>
    </div>`;
    
    questionArea.innerHTML = html;
    
    // Focus pe input și setup Enter key
    const input = $('#userAnswer');
    input.disabled = false; // Re-enable input pentru noua întrebare
    input.value = ''; // Clear previous answer
    input.focus();
    
    // Add Enter key support pentru noul input
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const verifyBtn = $('#verify-btn');
        const nextBtn = $('#next-btn');
        
        // Use offsetParent pentru a verifica dacă butoanele sunt vizibile
        const verifyVisible = verifyBtn && verifyBtn.offsetParent !== null;
        const nextVisible = nextBtn && nextBtn.offsetParent !== null;
        
        if (verifyVisible) {
          verifyAnswer();
        } else if (nextVisible) {
          nextQuestion();
        }
      }
    });
    
    // Pronunție
    $('#speakBtn')?.addEventListener('click', () => {
      if (question.noun.nomen) {
        speak(question.noun.nomen);
      }
    });
    
    // Setup butoane
    setupTestButtons();
  }

  // Setup butoane test
  function setupTestButtons() {
    const verifyBtn = $('#verify-btn');
    const nextBtn = $('#next-btn');
    
    verifyBtn.style.display = 'inline-block';
    nextBtn.style.display = 'none';
    
    verifyBtn.onclick = verifyAnswer;
    nextBtn.onclick = nextQuestion;
  }

  // Verifică răspunsul
  function verifyAnswer() {
    const userAnswer = $('#userAnswer').value.trim();
    const question = testQuestions[currentQuestion];
    const correctAnswer = question.answer;
    
    const isCorrect = norm(userAnswer) === norm(correctAnswer);
    
    if (isCorrect) {
      score++;
      showFeedback(true, correctAnswer, question.noun);
    } else {
      showFeedback(false, correctAnswer, question.noun, userAnswer);
    }
    
    // Actualizează scorul
    $('#score').textContent = score;
    
    // Schimbă butoanele
    $('#verify-btn').style.display = 'none';
    $('#next-btn').style.display = 'inline-block';
    $('#userAnswer').disabled = true;
  }

  // Afișează feedback
  function showFeedback(isCorrect, correctAnswer, noun, userAnswer = '') {
    const feedback = $('#feedback');
    
    if (isCorrect) {
      feedback.innerHTML = `
        <div class="feedback success">
          <p><strong>✅ Corect!</strong></p>
          <div class="noun-details">
            <p><strong>${noun.nomen}</strong> (${noun.gen}) → <strong>${noun.traducere}</strong></p>
            <p><em>Plural:</em> ${noun.plural}</p>
            <p><em>Exemplu:</em> ${noun.exemplu}</p>
          </div>
        </div>
      `;
    } else {
      feedback.innerHTML = `
        <div class="feedback error">
          <p><strong>❌ Greșit</strong></p>
          <p>Ai răspuns: <strong>${userAnswer}</strong></p>
          <p>Răspunsul corect: <strong>${correctAnswer}</strong></p>
          <div class="noun-details">
            <p><strong>${noun.nomen}</strong> (${noun.gen}) → <strong>${noun.traducere}</strong></p>
            <p><em>Plural:</em> ${noun.plural}</p>
            <p><em>Exemplu:</em> ${noun.exemplu}</p>
          </div>
        </div>
      `;
    }
    
    feedback.style.display = 'block';
  }

  // Următoarea întrebare
  function nextQuestion() {
    currentQuestion++;
    $('#feedback').style.display = 'none';
    showQuestion();
  }

  // Afișează rezultatele finale
  function showResults() {
    const percentage = Math.round((score / testQuestions.length) * 100);
    const questionArea = $('#questionArea');
    
    let grade = '';
    if (percentage >= 90) grade = 'Excelent! 🏆';
    else if (percentage >= 80) grade = 'Foarte bine! 🌟';
    else if (percentage >= 70) grade = 'Bine! 👍';
    else if (percentage >= 60) grade = 'Satisfăcător 📚';
    else grade = 'Mai ai de lucrat! 💪';
    
    questionArea.innerHTML = `
      <div class="test-results">
        <h2>🎯 Test finalizat!</h2>
        <div class="score-summary">
          <p class="final-score">${score} / ${testQuestions.length} (${percentage}%)</p>
          <p class="grade">${grade}</p>
        </div>
        <div class="results-actions">
          <button onclick="location.reload()" class="btn btn-primary">🔄 Reîncepe testul</button>
          <button id="backToCategoriesBtn" class="btn btn-outline">← Alege altă categorie</button>
        </div>
      </div>
    `;
    
    // Ascunde butoanele de test
    $('#verify-btn').style.display = 'none';
    $('#next-btn').style.display = 'none';
    
    // Setup buton înapoi la categorii
    $('#backToCategoriesBtn').onclick = backToCategories;
  }

  // Înapoi la categorii
  function backToCategories() {
    $('#testScreen').style.display = 'none';
    $('#categorySelection').style.display = 'block';
    $('#customSelection').style.display = 'none';
    
    // Reset state
    currentTest = null;
    currentQuestion = 0;
    score = 0;
    testQuestions = [];
  }

  // Utility: shuffle array
  function shuffleArray(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

})();