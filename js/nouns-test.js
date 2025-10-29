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

  // Categorii de substantive (mapate la noua structură din nouns.js)
  const CATEGORIES = {
    family: { name: 'Familie', description: 'Familie și persoane' },
    haus: { name: 'Casa', description: 'Mobilier și camere' },
    kuche: { name: 'Bucătăria', description: 'Veselă și ustensile' },
    essen: { name: 'Alimente', description: 'Mâncare și băuturi' },
    kleidung: { name: 'Îmbrăcăminte', description: 'Haine și accesorii' },
    schule: { name: 'Școala', description: 'Educație și birou' },
    arbeit: { name: 'Munca', description: 'Profesii și documente' },
    objekte: { name: 'Obiecte', description: 'Tehnologie și obiecte' },
    natur: { name: 'Natura', description: 'Plante și natură' },
    orte: { name: 'Locuri', description: 'Locații și spații' }
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
    setupGlobalKeyboardHandlers();
  });

  // Setup global keyboard handlers
  function setupGlobalKeyboardHandlers() {
    document.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        // Pentru input text
        if (e.target.id === 'userAnswer') {
          e.preventDefault();
          const verifyBtn = $('#verify-btn');
          const nextBtn = $('#next-btn');
          
          // Verifică care buton este vizibil
          const verifyVisible = verifyBtn && getComputedStyle(verifyBtn).display !== 'none';
          const nextVisible = nextBtn && getComputedStyle(nextBtn).display !== 'none';
          
          if (verifyVisible) {
            verifyAnswer();
          } else if (nextVisible) {
            nextQuestion();
          }
        }
        // Pentru feedback (next question)
        else if ($('#feedback').style.display === 'block') {
          e.preventDefault();
          const nextBtn = $('#next-btn');
          if (nextBtn && getComputedStyle(nextBtn).display !== 'none') {
            nextQuestion();
          }
        }
      }
    });
  }

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
    // Mapare pentru categoriile din HTML către cele din JS
    const categoryMapping = {
      'familie': 'family',
      'kleidung': 'kleidung', 
      'essen': 'essen',
      'haus': 'haus',
      'kuche': 'kuche',
      'schule': 'schule',
      'arbeit': 'arbeit',
      'objekte': 'objekte',
      'orte': 'orte'
    };
    
    Object.keys(categoryMapping).forEach(htmlCategory => {
      const jsCategory = categoryMapping[htmlCategory];
      const nouns = getNounsByCategory(jsCategory);
      const card = $(`.category-card[data-category="${htmlCategory}"]`);
      if (card) {
        const countElement = card.querySelector('.category-count');
        if (countElement && nouns.length > 0) {
          const limit = Math.min(nouns.length * 4, 30); // ~4 exerciții per substantiv
          countElement.textContent = `${nouns.length} substantive, ${limit} întrebări`;
        }
      }
    });

    // Pentru "Toate substantivele"
    const allCard = $(`.category-card[data-category="all"]`);
    if (allCard) {
      const countElement = allCard.querySelector('.category-count');
      if (countElement) {
        countElement.textContent = `60 întrebări aleatorii din ${nounsData.length} substantive`;
      }
    }
  }

  // Obține substantive după categorie
  function getNounsByCategory(category) {
    if (category === 'all') return nounsData;
    
    return nounsData.filter(noun => noun.categorie === category);
  }

  // Generează exerciții pe baza substantivelor dintr-o categorie
  function generateExercisesForCategory(category, maxQuestions = 30) {
    const categoryNouns = getNounsByCategory(category);
    const exercises = [];
    
    categoryNouns.forEach(noun => {
      // Exercițiu cu imagine (dacă există)
      if (noun.image) {
        exercises.push({
          type: 'img',
          question: 'Ce vezi în imagine?',
          image: noun.image,
          answer: noun.nomen,
          word: noun.nomen,
          category: noun.categorie,
          nounData: noun // Adaugă referință completă la substantiv
        });
      }
      
      // Exercițiu articol
      exercises.push({
        type: 'multiple',
        question: `Alege articolul corect pentru "${noun.nomen}".`,
        options: ['der', 'die', 'das'],
        correct: noun.gen,
        word: noun.nomen,
        category: noun.categorie,
        nounData: noun // Adaugă referință completă la substantiv
      });
      
      // Exercițiu plural (dacă nu e "-")
      if (noun.plural && noun.plural !== '-') {
        exercises.push({
          type: 'fill',
          question: `Plural: ${noun.gen} ${noun.nomen} → die ______`,
          answer: noun.plural,
          word: noun.nomen,
          category: noun.categorie,
          nounData: noun // Adaugă referință completă la substantiv
        });
      }
      
      // Exercițiu traducere
      exercises.push({
        type: 'fill',
        question: `Traducere în română: ${noun.nomen} = ______`,
        answer: noun.traducere,
        word: noun.nomen,
        category: noun.categorie,
        nounData: noun // Adaugă referință completă la substantiv
      });
    });
    
    // Amestecă și limitează
    return shuffleArray(exercises).slice(0, maxQuestions);
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
    // Mapare pentru categoriile vechi către cele noi
    const categoryMapping = {
      'familie': 'family',
      'imbracaminte': 'kleidung', 
      'alimente': 'essen',
      'casa': 'haus',
      'scoala': 'schule'
    };
    
    // Folosește maparea sau categoria originală
    const actualCategory = categoryMapping[category] || category;
    const nouns = getNounsByCategory(actualCategory);
    
    let testNouns;
    
    if (category === 'all') {
      // Pentru "Toate substantivele" - 60 aleatorii
      testNouns = shuffleArray([...nouns]).slice(0, 60);
    } else {
      // Pentru categorii specifice - până la 30
      testNouns = shuffleArray([...nouns]).slice(0, 30);
    }
    
    startTest(actualCategory, testNouns);
  }

  // Începe testul
  function startTest(category, nouns) {
    currentTest = { category, nouns };
    
    // Folosește noua funcție de generare exerciții
    if (category === 'custom') {
      testQuestions = generateQuestions(nouns); // Păstrează logica veche pentru custom
    } else {
      testQuestions = generateExercisesForCategory(category, 30); // Folosește noua structură
    }
    
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
    if ((question.type === 'image_recognition' && question.noun?.image) || 
        (question.type === 'img' && question.image)) {
      const imageSrc = question.noun?.image || question.image;
      html += `
        <div class="q-media">
          <img src="../assets/nouns/${imageSrc}" alt="${question.answer || question.noun?.nomen}" class="q-img">
        </div>
      `;
    }
    
    html += `<p class="question-text">${question.question}</p>`;
    
    // Adaugă interfața de răspuns în funcție de tipul întrebării
    if (question.type === 'multiple') {
      // Pentru exercițiile de tip multiple choice (articol)
      html += `
        <div class="answer-options">
          ${question.options.map(option => `
            <button type="button" class="option-btn" data-option="${option}">${option}</button>
          `).join('')}
        </div>
      `;
    } else {
      // Pentru exercițiile cu input text
      html += `
        <div class="answer-input">
          <input type="text" id="userAnswer" placeholder="Răspunsul tău..." autocomplete="off">
          <button type="button" id="speakBtn" class="speak-btn" title="Ascultă pronunția">🔊</button>
        </div>
      `;
    }
    
    html += `</div>`;
    
    questionArea.innerHTML = html;
    
    // Setup în funcție de tipul întrebării
    if (question.type === 'multiple') {
      // Pentru multiple choice, setup event listeners pe butoane
      const optionBtns = $$('.option-btn');
      optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          // Marchează opțiunea selectată
          optionBtns.forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          
          // Simulează input pentru verificare
          const hiddenInput = document.createElement('input');
          hiddenInput.type = 'hidden';
          hiddenInput.id = 'userAnswer';
          hiddenInput.value = btn.getAttribute('data-option');
          
          // Înlătură input-ul vechi dacă există
          const oldInput = $('#userAnswer');
          if (oldInput) oldInput.remove();
          
          questionArea.appendChild(hiddenInput);
          
          // Auto-verifică după selecție
          setTimeout(() => verifyAnswer(), 300);
        });
      });
    } else {
      // Pentru input text
      const input = $('#userAnswer');
      input.disabled = false;
      input.value = '';
      input.focus();
      
      // Pronunție
      $('#speakBtn')?.addEventListener('click', () => {
        const nounWord = question.word || question.noun?.nomen || question.answer;
        if (nounWord) {
          speak(nounWord);
        }
      });
    }
    
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
    let correctAnswer;
    
    // Determină răspunsul corect în funcție de tipul exercițiului
    if (question.type === 'multiple') {
      correctAnswer = question.correct;
    } else {
      correctAnswer = question.answer;
    }
    
    const isCorrect = norm(userAnswer) === norm(correctAnswer);
    
    if (isCorrect) {
      score++;
      showFeedback(true, correctAnswer, question, userAnswer);
    } else {
      showFeedback(false, correctAnswer, question, userAnswer);
    }
    
    // Actualizează scorul
    $('#score').textContent = score;
    
    // Schimbă butoanele
    $('#verify-btn').style.display = 'none';
    $('#next-btn').style.display = 'inline-block';
    $('#userAnswer').disabled = true;
  }

  // Afișează feedback
  function showFeedback(isCorrect, correctAnswer, question, userAnswer = '') {
    const feedback = $('#feedback');
    
    // Găsește substantivul - prioritate pentru nounData din question
    let noun = null;
    
    if (question.nounData) {
      // Pentru exercițiile noi cu referință completă
      noun = question.nounData;
    } else if (question.noun) {
      // Pentru exercițiile vechi (custom)
      noun = question.noun;
    } else {
      // Fallback - găsește substantivul pe baza categoriei și răspunsului
      const category = question.category;
      const categoryNouns = getNounsByCategory(category);
      
      // Încearcă să găsească substantivul pe baza word, answer sau question
      const searchTerm = question.word || question.answer || correctAnswer;
      noun = categoryNouns.find(n => 
        n.nomen === searchTerm || 
        n.traducere === searchTerm ||
        n.gen === searchTerm ||
        n.plural === searchTerm
      );
      
      // Dacă nu găsește, încearcă în toate substantivele
      if (!noun) {
        noun = nounsData.find(n => 
          n.nomen === searchTerm || 
          n.traducere === searchTerm ||
          n.gen === searchTerm ||
          n.plural === searchTerm
        );
      }
    }
    
    // Fallback dacă nu găsește substantivul
    if (!noun) {
      noun = {
        nomen: question.word || correctAnswer || 'N/A',
        gen: question.correct || 'N/A',
        traducere: correctAnswer || 'N/A',
        plural: 'N/A',
        exemplu: 'N/A'
      };
    }
    
    if (isCorrect) {
      feedback.innerHTML = `
        <div class="feedback success">
          <p><strong>✅ Corect!</strong></p>
          <div class="noun-details">
            <p><strong>${noun.nomen}</strong> (${noun.gen}) → <strong>${noun.traducere}</strong></p>
            <p><em>Plural:</em> ${noun.plural || 'N/A'}</p>
            <p><em>Exemplu:</em> ${noun.exemplu || 'N/A'}</p>
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
            <p><em>Plural:</em> ${noun.plural || 'N/A'}</p>
            <p><em>Exemplu:</em> ${noun.exemplu || 'N/A'}</p>
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