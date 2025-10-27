/* Possessivpronomen Test Engine
   - Exerciții pe teorie: completare tabel și întrebări punctuale
   - Tipuri: fill-in pentru tabel, întrebări directe
   - Fără limită de timp
   - Progres separat cu explicații detaliate
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
  
  // Funcție pentru amestecare array
  const shuffle = arr => {
    const array = arr.slice();
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // ====== State ======
  let currentTest = null;
  let currentQuestionIndex = 0;
  let userAnswers = [];
  let isAnswered = false;

  // ====== Exerciții Possessivpronomen ======
  const possessivpronomenExercises = [
    // Exerciții punctuale directe
    {
      type: "fill",
      question: "Scrie pronumele posesiv pentru: ich + masculin",
      correct: "mein",
      explanation: "Explicație: ich → mein (pentru masculin și neutru)"
    },
    {
      type: "fill", 
      question: "Scrie pronumele posesiv pentru: ich + feminin",
      correct: "meine",
      explanation: "Explicație: ich → meine (pentru feminin și plural)"
    },
    {
      type: "fill",
      question: "Scrie pronumele posesiv pentru: du + neutru",
      correct: "dein",
      explanation: "Explicație: du → dein (pentru masculin și neutru)"
    },
    {
      type: "fill",
      question: "Scrie pronumele posesiv pentru: du + plural",
      correct: "deine",
      explanation: "Explicație: du → deine (pentru feminin și plural)"
    },
    {
      type: "fill",
      question: "Scrie pronumele posesiv pentru: er + masculin",
      correct: "sein",
      explanation: "Explicație: er → sein (pentru masculin și neutru)"
    },
    {
      type: "fill",
      question: "Scrie pronumele posesiv pentru: er + feminin",
      correct: "seine",
      explanation: "Explicație: er → seine (pentru feminin și plural)"
    },
    {
      type: "fill",
      question: "Scrie pronumele posesiv pentru: sie (ea) + neutru",
      correct: "ihr",
      explanation: "Explicație: sie (ea) → ihr (pentru masculin și neutru)"
    },
    {
      type: "fill",
      question: "Scrie pronumele posesiv pentru: sie (ea) + plural",
      correct: "ihre",
      explanation: "Explicație: sie (ea) → ihre (pentru feminin și plural)"
    },
    {
      type: "fill",
      question: "Scrie pronumele posesiv pentru: wir + masculin",
      correct: "unser",
      explanation: "Explicație: wir → unser (pentru masculin și neutru)"
    },
    {
      type: "fill",
      question: "Scrie pronumele posesiv pentru: wir + feminin",
      correct: "unsere",
      explanation: "Explicație: wir → unsere (pentru feminin și plural)"
    },
    {
      type: "fill",
      question: "Scrie pronumele posesiv pentru: ihr + neutru",
      correct: "euer",
      explanation: "Explicație: ihr → euer (pentru masculin și neutru)"
    },
    {
      type: "fill",
      question: "Scrie pronumele posesiv pentru: ihr + feminin",
      correct: "eure",
      explanation: "Explicație: ihr → eure (pentru feminin și plural)"
    },
    {
      type: "fill",
      question: "Scrie pronumele posesiv pentru: sie (ei) + masculin",
      correct: "ihr",
      explanation: "Explicație: sie (ei) → ihr (pentru masculin și neutru)"
    },
    {
      type: "fill",
      question: "Scrie pronumele posesiv pentru: sie (ei) + plural",
      correct: "ihre",
      explanation: "Explicație: sie (ei) → ihre (pentru feminin și plural)"
    },
    {
      type: "fill",
      question: "Scrie pronumele posesiv pentru: Sie (formal) + neutru",
      correct: "Ihr",
      explanation: "Explicație: Sie (formal) → Ihr (cu majusculă, pentru masculin și neutru)"
    },
    {
      type: "fill",
      question: "Scrie pronumele posesiv pentru: Sie (formal) + feminin",
      correct: "Ihre",
      explanation: "Explicație: Sie (formal) → Ihre (cu majusculă, pentru feminin și plural)"
    },
    // Exerciții cu tabel de completat
    {
      type: "table-fill",
      question: "Completează tabelul pentru pronumele posesive:",
      tableData: {
        headers: ["Persoană", "Masculin", "Neutru", "Feminin", "Plural"],
        rows: [
          { person: "ich", masculine: "", neuter: "", feminine: "", plural: "" },
          { person: "du", masculine: "", neuter: "", feminine: "", plural: "" },
          { person: "er", masculine: "", neuter: "", feminine: "", plural: "" },
          { person: "sie (ea)", masculine: "", neuter: "", feminine: "", plural: "" }
        ]
      },
      correct: {
        "ich-masculine": "mein",
        "ich-neuter": "mein", 
        "ich-feminine": "meine",
        "ich-plural": "meine",
        "du-masculine": "dein",
        "du-neuter": "dein",
        "du-feminine": "deine", 
        "du-plural": "deine",
        "er-masculine": "sein",
        "er-neuter": "sein",
        "er-feminine": "seine",
        "er-plural": "seine",
        "sie (ea)-masculine": "ihr",
        "sie (ea)-neuter": "ihr",
        "sie (ea)-feminine": "ihre",
        "sie (ea)-plural": "ihre"
      },
      explanation: "Explicație: Pronumele posesive se acordă după genul substantivului, nu după persoana care posedă."
    },
    {
      type: "table-fill",
      question: "Completează tabelul pentru pronumele posesive (partea a doua):",
      tableData: {
        headers: ["Persoană", "Masculin", "Neutru", "Feminin", "Plural"],
        rows: [
          { person: "wir", masculine: "", neuter: "", feminine: "", plural: "" },
          { person: "ihr", masculine: "", neuter: "", feminine: "", plural: "" },
          { person: "sie (ei)", masculine: "", neuter: "", feminine: "", plural: "" },
          { person: "Sie (formal)", masculine: "", neuter: "", feminine: "", plural: "" }
        ]
      },
      correct: {
        "wir-masculine": "unser",
        "wir-neuter": "unser",
        "wir-feminine": "unsere",
        "wir-plural": "unsere",
        "ihr-masculine": "euer",
        "ihr-neuter": "euer", 
        "ihr-feminine": "eure",
        "ihr-plural": "eure",
        "sie (ei)-masculine": "ihr",
        "sie (ei)-neuter": "ihr",
        "sie (ei)-feminine": "ihre",
        "sie (ei)-plural": "ihre",
        "Sie (formal)-masculine": "Ihr",
        "Sie (formal)-neuter": "Ihr",
        "Sie (formal)-feminine": "Ihre",
        "Sie (formal)-plural": "Ihre"
      },
      explanation: "Explicație: Observă că \"ihr\" poate fi pentru \"ea\", \"ei\" sau \"voi\", dar \"Ihr\" (cu majusculă) e pentru forma de politețe."
    },
    // Exerciții de recunoaștere în context
    {
      type: "fill",
      question: "Completează: Das ist ___ Auto. (ich)",
      correct: "mein",
      explanation: "Explicație: Auto (das Auto) este neutru → ich + neutru = mein"
    },
    {
      type: "fill",
      question: "Completează: Wo ist ___ Tasche? (du)",
      correct: "deine",
      explanation: "Explicație: Tasche (die Tasche) este feminin → du + feminin = deine"
    },
    {
      type: "fill",
      question: "Completează: ___ Kinder spielen im Garten. (er)",
      correct: "Seine",
      explanation: "Explicație: Kinder este plural → er + plural = seine (Seine cu majusculă la început)"
    },
    {
      type: "fill",
      question: "Completează: Ich sehe ___ Bruder. (sie - ea)",
      correct: "ihren",
      explanation: "Explicație: Bruder (der Bruder) masculin în Akkusativ → sie (ea) + masculin Akk. = ihren"
    },
    {
      type: "fill",
      question: "Completează: Wir helfen ___ Eltern. (wir)",
      correct: "unseren",
      explanation: "Explicație: Eltern (plural) în Dativ → wir + plural Dat. = unseren"
    },
    {
      type: "fill",
      question: "Completează: Wo sind ___ Bücher? (ihr)",
      correct: "eure",
      explanation: "Explicație: Bücher (die Bücher) este plural → ihr + plural = eure"
    },
    {
      type: "fill",
      question: "Completează: ___ Haus ist sehr schön. (Sie - formal)",
      correct: "Ihr",
      explanation: "Explicație: Haus (das Haus) este neutru → Sie (formal) + neutru = Ihr (cu majusculă)"
    }
  ];

  // ====== Funcții principale ======
  window.startPossessivpronomenTest = function() {
    // Curăță event listener-ul global pentru Enter dacă există
    document.removeEventListener('keypress', handleGlobalEnter);
    
    // Amestecă întrebările pentru o ordine aleatoare
    const shuffledExercises = shuffle(possessivpronomenExercises);
    
    currentTest = {
      exercises: shuffledExercises,
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
    
    if (exercise.type === 'fill') {
      questionArea.innerHTML = `
        <div class="question">
          <p><strong>${exercise.question}</strong></p>
        </div>
        <div class="answers">
          <input type="text" id="user-answer" placeholder="Scrie răspunsul…" 
                 style="width:100%;max-width:400px;padding:8px;border:1px solid #ddd;border-radius:4px;">
        </div>
      `;
      
      const input = $('#user-answer');
      input.focus();
      
    } else if (exercise.type === 'table-fill') {
      let tableHTML = `
        <div class="question">
          <p><strong>${exercise.question}</strong></p>
        </div>
        <div class="answers">
          <table class="weekday-table" style="max-width:800px;margin:0 auto;">
            <thead>
              <tr>
                ${exercise.tableData.headers.map(header => `<th>${header}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
      `;
      
      exercise.tableData.rows.forEach((row, rowIndex) => {
        tableHTML += `<tr><td>${row.person}</td>`;
        ['masculine', 'neuter', 'feminine', 'plural'].forEach(gender => {
          const inputId = `${row.person}-${gender}`;
          tableHTML += `<td><input type="text" id="${inputId}" data-answer-key="${inputId}" 
                               style="width:80px;padding:4px;border:1px solid #ddd;border-radius:3px;text-align:center;"
                               placeholder="…"></td>`;
        });
        tableHTML += `</tr>`;
      });
      
      tableHTML += `
            </tbody>
          </table>
        </div>
      `;
      
      questionArea.innerHTML = tableHTML;
      
      // Focus primul input
      const firstInput = questionArea.querySelector('input');
      if (firstInput) firstInput.focus();
    }
    
    // Elimină event listener-ul anterior dacă există
    document.removeEventListener('keypress', handleGlobalEnter);
    
    // Adaugă event listener global pentru Enter
    document.addEventListener('keypress', handleGlobalEnter);
    
    $('#check-question').style.display = '';
    $('#next-question').style.display = 'none';
    isAnswered = false;
  }

  // Event handler global pentru Enter
  function handleGlobalEnter(e) {
    if (!currentTest || !currentTest.exercises) return;
    
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!isAnswered) {
        checkAnswer();
      } else {
        nextQuestion();
      }
    }
  }

  function checkAnswer() {
    if (isAnswered) return;
    
    const exercise = currentTest.exercises[currentQuestionIndex];
    let userAnswer = '';
    let isCorrect = false;
    let correctAnswers = 0;
    let totalAnswers = 0;
    
    if (exercise.type === 'fill') {
      const input = $('#user-answer');
      userAnswer = input.value.trim();
      if (!userAnswer) {
        alert('Te rog să scrii un răspuns!');
        return;
      }
      isCorrect = norm(userAnswer) === norm(exercise.correct);
      
      // Colorează input-ul
      input.style.backgroundColor = isCorrect ? '#dcfce7' : '#fee2e2';
      input.style.borderColor = isCorrect ? '#22c55e' : '#ef4444';
      input.disabled = true;
      
    } else if (exercise.type === 'table-fill') {
      const inputs = $$('input[data-answer-key]');
      const userAnswers = {};
      
      inputs.forEach(input => {
        const key = input.dataset.answerKey;
        const value = input.value.trim();
        userAnswers[key] = value;
        
        totalAnswers++;
        const isInputCorrect = norm(value) === norm(exercise.correct[key]);
        if (isInputCorrect) correctAnswers++;
        
        // Colorează input-ul
        input.style.backgroundColor = isInputCorrect ? '#dcfce7' : '#fee2e2';
        input.style.borderColor = isInputCorrect ? '#22c55e' : '#ef4444';
        input.disabled = true;
        
        // Afișează răspunsul corect lângă input dacă e greșit
        if (!isInputCorrect) {
          const correctSpan = document.createElement('div');
          correctSpan.style.cssText = 'color:#ef4444;font-size:0.8em;margin-top:2px;';
          correctSpan.textContent = `✓ ${exercise.correct[key]}`;
          input.parentNode.appendChild(correctSpan);
        }
      });
      
      userAnswer = userAnswers;
      isCorrect = correctAnswers === totalAnswers;
    }
    
    userAnswers.push({
      exercise,
      userAnswer,
      isCorrect,
      score: exercise.type === 'table-fill' ? correctAnswers / totalAnswers : (isCorrect ? 1 : 0)
    });
    
    // Afișare explicație
    let feedbackHTML = '';
    if (isCorrect) {
      feedbackHTML = `
        <div style="color:#22c55e;font-weight:600;margin-bottom:8px;">✓ Corect!</div>
      `;
    } else {
      if (exercise.type === 'table-fill') {
        feedbackHTML = `
          <div style="color:#ef4444;font-weight:600;margin-bottom:8px;">Parțial corect: ${correctAnswers}/${totalAnswers}</div>
        `;
      } else {
        feedbackHTML = `
          <div style="color:#ef4444;font-weight:600;margin-bottom:8px;">✗ Greșit!</div>
          <div style="color:#ef4444;margin-bottom:8px;">Răspunsul corect: <strong>${exercise.correct}</strong></div>
        `;
      }
    }
    
    if (exercise.explanation) {
      feedbackHTML += `<div style="color:#666;margin-top:8px;">${exercise.explanation}</div>`;
    }
    
    const questionArea = $('#question-area');
    questionArea.innerHTML += `<div style="margin-top:16px;padding:12px;border-radius:8px;background:#f8fafc;border-left:4px solid ${isCorrect ? '#22c55e' : '#ef4444'};">${feedbackHTML}</div>`;
    
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
    
    // Calculează scorul total (luând în considerare exercițiile cu tabel)
    let totalScore = 0;
    let maxScore = 0;
    
    userAnswers.forEach(answer => {
      totalScore += answer.score;
      maxScore += 1;
    });
    
    const percentage = Math.round((totalScore / maxScore) * 100);
    
    let message = '';
    if (percentage >= 90) {
      message = '🎉 Excelent! Stăpânești foarte bine pronumele posesive!';
    } else if (percentage >= 75) {
      message = '👏 Foarte bine! Ai o înțelegere solidă a pronumelor posesive.';
    } else if (percentage >= 60) {
      message = '👍 Bine! Mai exersează puțin pronumele posesive.';
    } else {
      message = '💪 Mai studiază pronumele posesive și încearcă din nou!';
    }
    
    $('#test-container').style.display = 'none';
    $('#result-container').style.display = '';
    
    $('#score-percentage').innerHTML = `<strong style="font-size:1.5rem;color:#059669;">${percentage}%</strong>`;
    $('#score-breakdown').textContent = `Scor: ${Math.round(totalScore)}/${maxScore} puncte.`;
    
    const messageEl = document.createElement('p');
    messageEl.style.cssText = 'color:#374151;margin-top:12px;font-weight:500;';
    messageEl.textContent = message;
    $('#score-breakdown').parentNode.insertBefore(messageEl, $('#score-breakdown').nextSibling);
    
    // Salvează progresul
    savePossessivpronomenResult({ percentage, totalScore, maxScore });
  }

  function savePossessivpronomenResult(result) {
    try {
      const progress = JSON.parse(localStorage.getItem('germanProgress') || '{}');
      progress['possessivpronomen'] = {
        lastScore: result.percentage,
        completed: result.percentage >= 60,
        date: new Date().toISOString(),
        details: result
      };
      localStorage.setItem('germanProgress', JSON.stringify(progress));
    } catch (e) {
      console.warn('Nu s-a putut salva progresul:', e);
    }
  }

  window.saveAndGoProgress = function() {
    window.location.href = '../progress.html';
  };

  // Event listeners
  document.addEventListener('DOMContentLoaded', () => {
    const checkBtn = $('#check-question');
    const nextBtn = $('#next-question');
    
    if (checkBtn) checkBtn.addEventListener('click', checkAnswer);
    if (nextBtn) nextBtn.addEventListener('click', nextQuestion);
  });

})();