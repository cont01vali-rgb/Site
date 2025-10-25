/* Vocabulary Test Engine
   - 60 exerciții: 15 substantive (10 simple + 5 propoziții) + 15 adjective (10 simple + 5 propoziții) + 15 verbe (10 simple + 5 propoziții) + 15 completări
   - Tipuri: RO→DE, DE→RO, completare propoziție prestabilită
   - Fără limită de timp
   - Progres separat de testul general
*/

(function(){
  // ====== Utilitare ======
  const $ = sel => document.querySelector(sel);
  const $$ = sel => document.querySelectorAll(sel);
  const norm = s => String(s||'')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/ă|â/g,'a').replace(/î/g,'i').replace(/ș|ş/g,'s').replace(/ț|ţ/g,'t')
    .trim();
  const shuffle = arr => { const a = arr.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };

  // ====== State ======
  let currentTest = null;
  let currentQuestionIndex = 0;
  let userAnswers = [];
  let isAnswered = false;

  // ====== Propoziții prestabilite logice pentru completare ======
  const fixedSentences = {
    nouns: [
      // 5 propoziții în germană
      { question: "Ich esse einen ___ (măr).", correct: "Apfel", lang: "de" },
      { question: "Das ___ (casă) ist groß.", correct: "Haus", lang: "de" },
      { question: "Die ___ (pisică) schläft.", correct: "Katze", lang: "de" },
      { question: "Der ___ (câine) bellt.", correct: "Hund", lang: "de" },
      { question: "Das ___ (copil) spielt.", correct: "Kind", lang: "de" },
      
      // 5 propoziții în română
      { question: "Ich trinke ___ (apă).", correct: "Wasser", lang: "ro" },
      { question: "Sie fährt das ___ (mașină).", correct: "Auto", lang: "ro" },
      { question: "Ich lese ein ___ (carte).", correct: "Buch", lang: "ro" },
      { question: "Die ___ (floare) ist schön.", correct: "Blume", lang: "ro" },
      { question: "Er trägt einen ___ (pălărie).", correct: "Hut", lang: "ro" }
    ],
    adjectives: [
      // 5 propoziții în germană
      { question: "Das Wetter ist ___ (frumos).", correct: "schön", lang: "de" },
      { question: "Der Mann ist ___ (mare).", correct: "groß", lang: "de" },
      { question: "Das Auto ist ___ (rapid).", correct: "schnell", lang: "de" },
      { question: "Die Stadt ist ___ (mic).", correct: "klein", lang: "de" },
      { question: "Der Tag ist ___ (cald).", correct: "warm", lang: "de" },
      
      // 5 propoziții în română
      { question: "Das Haus ist ___ (nou).", correct: "neu", lang: "ro" },
      { question: "Ich bin ___ (obosit).", correct: "müde", lang: "ro" },
      { question: "Das Buch ist ___ (interesant).", correct: "interessant", lang: "ro" },
      { question: "Die Musik ist ___ (tare).", correct: "laut", lang: "ro" },
      { question: "Das Essen ist ___ (bun).", correct: "gut", lang: "ro" }
    ],
    verbs: [
      // 5 propoziții în germană
      { question: "Ich ___ (merg) zur Schule.", correct: "gehe", lang: "de" },
      { question: "Wir ___ (învățăm) Deutsch.", correct: "lernen", lang: "de" },
      { question: "Er ___ (citește) ein Buch.", correct: "liest", lang: "de" },
      { question: "Sie ___ (cântă) schön.", correct: "singt", lang: "de" },
      { question: "Du ___ (vii) morgen.", correct: "kommst", lang: "de" },
      
      // 5 propoziții în română
      { question: "Ich ___ (beau) Kaffee.", correct: "trinke", lang: "ro" },
      { question: "Wir ___ (locuim) in Wien.", correct: "wohnen", lang: "ro" },
      { question: "Er ___ (lucrează) hier.", correct: "arbeitet", lang: "ro" },
      { question: "Sie ___ (doarme) gut.", correct: "schläft", lang: "ro" },
      { question: "Ich ___ (aud) Musik.", correct: "höre", lang: "ro" }
    ]
  };

  // ====== Funcții pentru generarea exercițiilor ======
  function getRecentlyUsed() {
    try {
      return JSON.parse(localStorage.getItem('vocabularyRecentWords') || '[]');
    } catch {
      return [];
    }
  }

  function saveRecentlyUsed(words) {
    try {
      // Păstrăm ultimele 50 de cuvinte folosite pentru a evita repetarea prea frecventă
      const recent = words.slice(-50);
      localStorage.setItem('vocabularyRecentWords', JSON.stringify(recent));
    } catch (e) {
      console.error('Eroare la salvarea cuvintelor recente:', e);
    }
  }

  function getAvoidRecentWords(allWords, avoid, count) {
    // Încercăm să luăm cuvinte care nu sunt în lista "avoid"
    const fresh = allWords.filter(word => !avoid.includes(word.nomen || word.adjektiv || word.verb));
    if (fresh.length >= count) {
      return shuffle(fresh).slice(0, count);
    }
    // Dacă nu sunt suficiente cuvinte noi, luăm aleatorii din toate
    return shuffle(allWords).slice(0, count);
  }

  function waitForData() {
    return new Promise((resolve) => {
      const check = () => {
        console.log('Checking data availability:', {
          nounsData: !!window.nounsData,
          adjectivesData: !!window.adjectivesData,
          verbsData: !!window.verbsData
        });
        
        if (window.nounsData && window.adjectivesData && window.verbsData) {
          console.log('All data loaded successfully!');
          resolve();
        } else {
          setTimeout(check, 100);
        }
      };
      check();
    });
  }

  function generateNounExercises() {
    const exercises = [];
    const recentWords = getRecentlyUsed();
    const nouns = getAvoidRecentWords(window.nounsData, recentWords, 15);
    
    // Salvează cuvintele folosite
    const usedWords = nouns.map(n => n.nomen);
    saveRecentlyUsed([...recentWords, ...usedWords]);
    
    // Exerciții simple RO→DE și DE→RO (10 exerciții)
    nouns.slice(0, 10).forEach((noun, i) => {
      if (i < 5) {
        // RO → DE
        exercises.push({
          type: 'fill',
          category: 'das-nomen',
          question: `Cum se spune "${noun.traducere}" în germană?`,
          correct: noun.nomen,
          hint: `Articol: ${noun.gen}`
        });
      } else {
        // DE → RO  
        exercises.push({
          type: 'fill',
          category: 'das-nomen',
          question: `Ce înseamnă "${noun.gen} ${noun.nomen}"?`,
          correct: noun.traducere
        });
      }
    });
    
    // Adaugă propoziții prestabilite (5 exerciții)
    const sentenceTemplates = shuffle(fixedSentences.nouns).slice(0, 5);
    sentenceTemplates.forEach((template, i) => {
      exercises.push({
        type: 'fill',
        category: 'das-nomen',
        question: template.question,
        correct: template.correct
      });
    });
    
    return exercises;
  }

  function generateAdjectiveExercises() {
    const exercises = [];
    const recentWords = getRecentlyUsed();
    const adjectives = getAvoidRecentWords(window.adjectivesData, recentWords, 15);
    
    // Salvează cuvintele folosite
    const usedWords = adjectives.map(a => a.adjektiv);
    saveRecentlyUsed([...getRecentlyUsed(), ...usedWords]);
    
    // Exerciții simple RO→DE și DE→RO (10 exerciții)
    adjectives.slice(0, 10).forEach((adj, i) => {
      if (i < 5) {
        // RO → DE
        exercises.push({
          type: 'fill',
          category: 'das-adjektiv',
          question: `Cum se spune "${adj.traducere}" în germană?`,
          correct: adj.adjektiv
        });
      } else {
        // DE → RO
        exercises.push({
          type: 'fill',
          category: 'das-adjektiv',
          question: `Ce înseamnă "${adj.adjektiv}"?`,
          correct: adj.traducere
        });
      }
    });
    
    // Adaugă propoziții prestabilite (5 exerciții)
    const sentenceTemplates = shuffle(fixedSentences.adjectives).slice(0, 5);
    sentenceTemplates.forEach(template => {
      exercises.push({
        type: 'fill',
        category: 'das-adjektiv',
        question: template.question,
        correct: template.correct
      });
    });
    
    return exercises;
  }

  function generateVerbExercises() {
    const exercises = [];
    const recentWords = getRecentlyUsed();
    const verbs = getAvoidRecentWords(window.verbsData, recentWords, 15);
    
    // Salvează cuvintele folosite
    const usedWords = verbs.map(v => v.verb);
    saveRecentlyUsed([...getRecentlyUsed(), ...usedWords]);
    
    // Exerciții simple RO→DE și DE→RO (10 exerciții)
    verbs.slice(0, 10).forEach((verb, i) => {
      if (i < 5) {
        // RO → DE
        exercises.push({
          type: 'fill',
          category: 'das-verb',
          question: `Cum se spune "${verb.traducere}" în germană?`,
          correct: verb.verb
        });
      } else {
        // DE → RO
        exercises.push({
          type: 'fill',
          category: 'das-verb',
          question: `Ce înseamnă "${verb.verb}"?`,
          correct: verb.traducere
        });
      }
    });
    
    // Adaugă propoziții prestabilite (5 exerciții)
    const sentenceTemplates = shuffle(fixedSentences.verbs).slice(0, 5);
    sentenceTemplates.forEach(template => {
      exercises.push({
        type: 'fill',
        category: 'das-verb',
        question: template.question,
        correct: template.correct
      });
    });
    
    return exercises;
  }

  function generateSentenceExercises() {
    // Combinăm toate propozițiile prestabilite și luăm 15 aleatorii
    const allSentences = [
      ...fixedSentences.nouns,
      ...fixedSentences.adjectives, 
      ...fixedSentences.verbs
    ];
    
    return shuffle(allSentences).slice(0, 15).map(sentence => ({
      type: 'fill',
      category: 'sentence-completion',
      question: sentence.question,
      correct: sentence.correct
    }));
  }

  // ====== Funcții principale ======
  window.startVocabularyTest = async function() {
    // Curăță event listener-ul global pentru Enter dacă există
    document.removeEventListener('keypress', handleGlobalEnter);
    
    await waitForData();
    
    const exercises = [
      ...generateNounExercises(),
      ...generateAdjectiveExercises(), 
      ...generateVerbExercises(),
      ...generateSentenceExercises()
    ];
    
    // Acum avem exact 60 de exerciții: 15 substantive + 15 adjective + 15 verbe + 15 completări
    const finalExercises = shuffle(exercises);
    
    currentTest = {
      exercises: finalExercises,
      startTime: Date.now()
    };
    
    currentQuestionIndex = 0;
    userAnswers = [];
    isAnswered = false;
    
    $('#start-screen').style.display = 'none';
    $('#test-container').style.display = '';
    $('#total-questions').textContent = currentTest.exercises.length;
    
    showQuestion();
  };

  function showQuestion() {
    const exercise = currentTest.exercises[currentQuestionIndex];
    const questionArea = $('#question-area');
    
    $('#current-question').textContent = currentQuestionIndex + 1;
    
    questionArea.innerHTML = `
      <div class="question">
        <p><strong>${exercise.question}</strong></p>
        ${exercise.hint ? `<p style="color:#666;font-size:0.9rem;margin-top:4px;"><em>Indiciu: ${exercise.hint}</em></p>` : ''}
      </div>
      <div class="answers">
        <input type="text" id="user-answer" placeholder="Răspunsul tău..." 
               style="width:100%;max-width:400px;padding:8px;border:1px solid #ddd;border-radius:4px;">
      </div>
    `;
    
    const input = $('#user-answer');
    input.focus();
    
    // Elimină event listener-ul anterior dacă există
    document.removeEventListener('keypress', handleGlobalEnter);
    
    // Adaugă event listener global pentru Enter
    document.addEventListener('keypress', handleGlobalEnter);
    
    $('#check-question').style.display = '';
    $('#next-question').style.display = 'none';
    isAnswered = false;
  }

  // Event handler global pentru Enter - doar pentru vocabulary test
  function handleGlobalEnter(e) {
    // Verifică că suntem într-un test activ
    if (!currentTest || !currentTest.exercises) return;
    
    if (e.key === 'Enter') {
      // Previne comportamentul default pentru a evita interferențele
      e.preventDefault();
      
      if (!isAnswered) {
        // Dacă nu am verificat încă răspunsul, verifică-l
        checkAnswer();
      } else {
        // Dacă am verificat deja, treci la următoarea întrebare
        nextQuestion();
      }
    }
  }

  function checkAnswer() {
    if (isAnswered) return;
    
    const exercise = currentTest.exercises[currentQuestionIndex];
    const userAnswer = $('#user-answer').value.trim();
    const isCorrect = norm(userAnswer) === norm(exercise.correct);
    
    userAnswers.push({
      exercise,
      userAnswer,
      isCorrect
    });
    
    // Afișare feedback
    const input = $('#user-answer');
    input.style.backgroundColor = isCorrect ? '#dcfce7' : '#fee2e2';
    input.style.borderColor = isCorrect ? '#22c55e' : '#ef4444';
    input.disabled = true;
    
    if (!isCorrect) {
      const questionArea = $('#question-area');
      questionArea.innerHTML += `
        <div style="margin-top:8px;padding:8px;background:#fee2e2;border-radius:4px;color:#dc2626;">
          <strong>✗ Incorect!</strong> Răspunsul corect: <strong>${exercise.correct}</strong>
        </div>
      `;
    } else {
      const questionArea = $('#question-area');
      questionArea.innerHTML += `
        <div style="margin-top:8px;padding:8px;background:#dcfce7;border-radius:4px;color:#16a34a;">
          <strong>✓ Correct!</strong>
        </div>
      `;
    }
    
    $('#check-question').style.display = 'none';
    $('#next-question').style.display = '';
    isAnswered = true;
  }

  function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex >= currentTest.exercises.length) {
      showResults();
    } else {
      showQuestion();
    }
  }

  function showResults() {
    // Curăță event listener-ul global pentru Enter
    document.removeEventListener('keypress', handleGlobalEnter);
    
    const correct = userAnswers.filter(a => a.isCorrect).length;
    const total = userAnswers.length;
    const percentage = Math.round((correct / total) * 100);
    
    // Analiză pe categorii
    const byCategory = {};
    userAnswers.forEach(answer => {
      const cat = answer.exercise.category;
      if (!byCategory[cat]) byCategory[cat] = { correct: 0, total: 0 };
      byCategory[cat].total++;
      if (answer.isCorrect) byCategory[cat].correct++;
    });
    
    $('#test-container').style.display = 'none';
    $('#result-container').style.display = '';
    
    $('#score-percentage').innerHTML = `
      <span style="font-size:2rem;font-weight:bold;color:${percentage >= 80 ? '#16a34a' : percentage >= 60 ? '#ea580c' : '#dc2626'}">
        ${percentage}%
      </span>
    `;
    
    $('#score-breakdown').textContent = `${correct} din ${total} răspunsuri corecte`;
    
    // Breakdown pe categorii
    let categoryText = 'Rezultate pe categorii:\n';
    Object.entries(byCategory).forEach(([cat, stats]) => {
      const catPercent = Math.round((stats.correct / stats.total) * 100);
      const catName = {
        'das-nomen': 'Substantive',
        'das-adjektiv': 'Adjective', 
        'das-verb': 'Verbe',
        'sentence-completion': 'Completări'
      }[cat] || cat;
      categoryText += `• ${catName}: ${stats.correct}/${stats.total} (${catPercent}%)\n`;
    });
    
    $('#category-breakdown').textContent = categoryText;
    
    // Salvare rezultat
    const result = {
      type: 'vocabulary',
      when: new Date().toISOString(),
      score: correct,
      total: total,
      percent: percentage,
      categoryBreakdown: byCategory,
      duration: Math.round((Date.now() - currentTest.startTime) / 1000)
    };
    
    saveVocabularyResult(result);
  }

  function saveVocabularyResult(result) {
    try {
      let history = JSON.parse(localStorage.getItem('vocabularyTestHistory') || '[]');
      history.push(result);
      // Păstrează ultimele 50 rezultate
      if (history.length > 50) history = history.slice(-50);
      localStorage.setItem('vocabularyTestHistory', JSON.stringify(history));
      localStorage.setItem('vocabularyTestLast', JSON.stringify(result));
    } catch (e) {
      console.error('Eroare la salvarea rezultatului:', e);
    }
  }

  window.saveAndGoProgress = function() {
    // Curăță event listener-ul înainte de a părăsi pagina
    document.removeEventListener('keypress', handleGlobalEnter);
    window.location.href = '../progress.html';
  };

  // Event listeners
  document.addEventListener('DOMContentLoaded', () => {
    $('#check-question')?.addEventListener('click', checkAnswer);
    $('#next-question')?.addEventListener('click', nextQuestion);
    
    // Curăță event listener-ul când se părăsește pagina
    window.addEventListener('beforeunload', () => {
      document.removeEventListener('keypress', handleGlobalEnter);
    });
  });

})();