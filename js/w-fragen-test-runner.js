/* W-Fragen Test Engine
   - 60 exerciții: întrebări cu opțiuni multiple și completare
   - Tipuri: multiple choice, fill-in
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

  // ====== Exerciții W-Fragen ======
  const wFragenExercises = [
    {
      type: "multiple-choice",
      question: "… wohnst du?",
      options: ["Wo", "Wohin", "Woher"],
      correct: "Wo",
      explanation: {
        correct: "De ce corect: întrebăm \"Unde locuiești?\" (loc fix).",
        wrong: "Greșite: Wohin = \"încotro\" (direcție); Woher = \"de unde\" (origine)."
      }
    },
    {
      type: "multiple-choice",
      question: "… kommst du?",
      options: ["Wo", "Woher", "Wohin"],
      correct: "Woher",
      explanation: {
        correct: "De ce corect: \"De unde vii/ești?\" (origine).",
        wrong: "Greșite: Wo = \"unde\" (loc fix); Wohin = \"încotro\" (direcție)."
      }
    },
    {
      type: "multiple-choice",
      question: "… gehst du am Sonntag?",
      options: ["Wo", "Was", "Wohin"],
      correct: "Wohin",
      explanation: {
        correct: "De ce corect: \"Încotro mergi duminică?\" (direcție).",
        wrong: "Greșite: Wo = loc fix; Was = \"ce\" (nu e despre direcție)."
      }
    },
    {
      type: "multiple-choice",
      question: "… heißt du?",
      options: ["Wie", "Was", "Wer"],
      correct: "Wie",
      explanation: {
        correct: "De ce corect: formula fixă \"Wie heißt du?\" = \"Cum te numești?\"",
        wrong: "Greșite: Was = \"ce\" (nu se folosește pentru nume); Wer = \"cine\" (nu e forma uzuală pentru nume)."
      }
    },
    {
      type: "multiple-choice",
      question: "… ist das?",
      options: ["Wer", "Was", "Welche"],
      correct: "Was",
      explanation: {
        correct: "De ce corect: \"Ce este asta?\" (lucru).",
        wrong: "Greșite: Wer = cine (persoană); Welche = \"care\" dintr-un set."
      }
    },
    {
      type: "multiple-choice",
      question: "… ist dein Lehrer?",
      options: ["Wer", "Wo", "Was"],
      correct: "Wer",
      explanation: {
        correct: "De ce corect: întrebăm despre o persoană (\"Cine este profesorul tău?\").",
        wrong: "Greșite: Wo = loc; Was = \"ce\" (nu e definiție de obiect)."
      }
    },
    {
      type: "multiple-choice",
      question: "Wie … bist du?",
      options: ["alt", "viel", "spät"],
      correct: "alt",
      explanation: {
        correct: "De ce corect: \"Wie alt bist du?\" = \"Câți ani ai?\"",
        wrong: "Greșite: Wie viel = pentru cantități; Wie spät = pentru oră."
      }
    },
    {
      type: "multiple-choice",
      question: "Wie … ist es?",
      options: ["alt", "viel", "spät"],
      correct: "spät",
      explanation: {
        correct: "De ce corect: \"Wie spät ist es?\" = \"Cât e ceasul?\"",
        wrong: "Greșite: Wie alt = pentru vârstă; Wie viel = pentru cantitate/preț."
      }
    },
    {
      type: "multiple-choice",
      question: "Wie … kostet das Brot?",
      options: ["viel", "viele", "spät"],
      correct: "viel",
      explanation: {
        correct: "De ce corect: pentru preț întrebăm \"Wie viel …?\"",
        wrong: "Greșite: Wie viele = \"câți/câte\" (plural, numărabile); Wie spät = pentru oră."
      }
    },
    {
      type: "multiple-choice",
      question: "Wie … Geschwister hast du?",
      options: ["viel", "viele", "alt"],
      correct: "viele",
      explanation: {
        correct: "De ce corect: frații/surorile sunt numărabili → \"Wie viele…?\"",
        wrong: "Greșite: Wie viel = ne-numărabile; Wie alt = pentru vârstă."
      }
    },
    {
      type: "multiple-choice",
      question: "… beginnt der Kurs?",
      options: ["Wo", "Wie", "Wann"],
      correct: "Wann",
      explanation: {
        correct: "De ce corect: întrebăm \"Când începe cursul?\"",
        wrong: "Greșite: Wo = loc; Wie = \"cum\"."
      }
    },
    {
      type: "multiple-choice",
      question: "… wohnst du, in Berlin oder in Hamburg?",
      options: ["Wo", "Welche", "Wohin"],
      correct: "Wo",
      explanation: {
        correct: "De ce corect: \"Unde locuiești?\" între două orașe.",
        wrong: "Greșite: Welche = ar cere un substantiv (\"Welche Stadt…?\"); Wohin = direcție."
      }
    },
    {
      type: "multiple-choice",
      question: "… ist die Toilette?",
      options: ["Wohin", "Wo", "Woher"],
      correct: "Wo",
      explanation: {
        correct: "De ce corect: \"Unde este toaleta?\" (loc fix).",
        wrong: "Greșite: Wohin = direcție; Woher = origine."
      }
    },
    {
      type: "multiple-choice",
      question: "… lernst du Deutsch?",
      options: ["Wo", "Wann", "Warum"],
      correct: "Warum",
      explanation: {
        correct: "De ce corect: întrebăm motivul \"De ce înveți germană?\"",
        wrong: "Greșite: Wo = loc; Wann = timp."
      }
    },
    {
      type: "multiple-choice",
      question: "… Farbe hat dein Auto?",
      options: ["Was", "Welche", "Wie"],
      correct: "Welche",
      explanation: {
        correct: "De ce corect: \"Welche Farbe…?\" = \"Ce culoare are mașina ta?\"",
        wrong: "Greșite: Was = \"ce\" generic; Wie = \"cum\"."
      }
    },
    {
      type: "multiple-choice",
      question: "Wie … ist dein Bruder?",
      options: ["alt", "viel", "spät"],
      correct: "alt",
      explanation: {
        correct: "De ce corect: pentru vârstă → \"Wie alt…?\"",
        wrong: "Greșite: Wie viel = cantitate; Wie spät = oră."
      }
    },
    {
      type: "multiple-choice",
      question: "Wie … Äpfel brauchst du?",
      options: ["viel", "viele", "alt"],
      correct: "viele",
      explanation: {
        correct: "De ce corect: cantitate numărabilă → \"Wie viele…?\"",
        wrong: "Greșite: Wie viel = ne-numărabile; Wie alt = vârstă."
      }
    },
    {
      type: "multiple-choice",
      question: "Wie … ist es jetzt?",
      options: ["alt", "viel", "spät"],
      correct: "spät",
      explanation: {
        correct: "De ce corect: pentru oră → \"Wie spät…?\"",
        wrong: "Greșite: Wie alt = vârstă; Wie viel = cantitate."
      }
    },
    {
      type: "multiple-choice",
      question: "… ist die Toilette?",
      options: ["Wo", "Wohin", "Wann"],
      correct: "Wo",
      explanation: {
        correct: "De ce corect: loc fix → \"Wo…?\"",
        wrong: "Greșite: Wohin = direcție; Wann = timp."
      }
    },
    {
      type: "multiple-choice",
      question: "Wie … kostet der Kaffee?",
      options: ["viel", "viele", "spät"],
      correct: "viel",
      explanation: {
        correct: "De ce corect: preț → \"Wie viel…?\"",
        wrong: "Greșite: Wie viele = numărabil; Wie spät = oră."
      }
    },
    {
      type: "multiple-choice",
      question: "… kommst du so spät?",
      options: ["Woher", "Wann", "Warum"],
      correct: "Warum",
      explanation: {
        correct: "De ce corect: cerem motivul → \"Warum…?\"",
        wrong: "Greșite: Woher = proveniență; Wann = moment de timp."
      }
    },
    {
      type: "multiple-choice",
      question: "… gehst du am Freitag?",
      options: ["Wohin", "Wo", "Wer"],
      correct: "Wohin",
      explanation: {
        correct: "De ce corect: direcție/destinație → \"Wohin…?\"",
        wrong: "Greșite: Wo = loc fix; Wer = \"cine\"."
      }
    },
    {
      type: "multiple-choice",
      question: "… Sprache sprichst du zu Hause?",
      options: ["Was", "Welche", "Wie"],
      correct: "Welche",
      explanation: {
        correct: "De ce corect: \"Welche + substantiv\" (selecție dintr-un set de limbi).",
        wrong: "Greșite: Was = \"ce\" generic; Wie = \"cum\"."
      }
    },
    {
      type: "fill",
      question: "… wohnst du genau?",
      correct: "Wo",
      explanation: "Explicație: întrebăm despre un loc fix (adresă) → \"Wo?\""
    },
    {
      type: "fill",
      question: "… kommt der Zug?",
      correct: "Wann",
      explanation: "Explicație: întrebăm despre timp/moment → \"Wann?\""
    },
    {
      type: "fill",
      question: "… fährst du heute?",
      correct: "Wohin",
      explanation: "Explicație: direcție/destinație → \"Wohin?\""
    },
    {
      type: "fill",
      question: "… kommt ihr?",
      correct: "Woher",
      explanation: "Explicație: origine/proveniență → \"Woher?\""
    },
    {
      type: "fill",
      question: "… ist Annas Lieblingsessen?",
      correct: "Was",
      explanation: "Explicație: \"ce?\" pentru lucruri/preferințe → \"Was?\""
    },
    {
      type: "fill",
      question: "… heißt euer Lehrer?",
      correct: "Wie",
      explanation: "Explicație: formulă fixă pentru nume → \"Wie heißt…?\""
    },
    {
      type: "fill",
      question: "… ist der Supermarkt?",
      correct: "Wo",
      explanation: "Explicație: loc pozițional (unde?) → \"Wo?\""
    },
    {
      type: "fill",
      question: "… Sprache sprichst du zu Hause?",
      correct: "Welche",
      explanation: "Explicație: \"Welche + substantiv\" când alegem/identificăm dintr-un set (limbi)."
    },
    {
      type: "fill",
      question: "Wie … ist es jetzt?",
      correct: "spät",
      explanation: "Explicație: pentru oră/ceas se folosește \"Wie spät…?\""
    },
    {
      type: "fill",
      question: "… machst du am Wochenende?",
      correct: "Was",
      explanation: "Explicație: întrebăm \"ce faci?\" → \"Was?\""
    },
    {
      type: "fill",
      question: "Wie … Uhr ist es?",
      correct: "viel",
      explanation: "Explicație: pentru oră exactă se poate folosi și \"Wie viel Uhr…?\""
    },
    {
      type: "fill",
      question: "… gehst du nach der Schule?",
      correct: "Wohin",
      explanation: "Explicație: direcție (încotro?) → \"Wohin?\""
    },
    {
      type: "fill",
      question: "… ist deine Schwester?",
      correct: "Was",
      explanation: "Explicație: întrebăm despre profesie → \"Was ist sie (von Beruf)?\""
    },
    {
      type: "fill",
      question: "Wie … dauert der Film?",
      correct: "lange",
      explanation: "Explicație: durată de timp → \"Wie lange…?\""
    },
    {
      type: "fill",
      question: "Wie … ist dein Hund?",
      correct: "alt",
      explanation: "Explicație: Pentru vârstă folosim modelul \"Wie alt…?\""
    },
    {
      type: "fill",
      question: "Wie … Geschwister hast du?",
      correct: "viele",
      explanation: "Explicație: Pentru număr de lucruri/persoane (numărabile) folosim \"Wie viele…?\""
    },
    {
      type: "fill",
      question: "Wie … ist es?",
      correct: "spät",
      explanation: "Explicație: Pentru ora exactă folosim \"Wie spät…?\""
    },
    {
      type: "fill",
      question: "Wie … kostet das Ticket?",
      correct: "viel",
      explanation: "Explicație: Pentru preț folosim \"Wie viel…?\""
    },
    {
      type: "fill",
      question: "… kommst du?",
      correct: "Woher",
      explanation: "Explicație: Origine/proveniență → \"Woher…?\""
    },
    {
      type: "fill",
      question: "… gehst du heute Abend?",
      correct: "Wohin",
      explanation: "Explicație: Direcție/destinație → \"Wohin…?\""
    },
    {
      type: "fill",
      question: "… ist der Bahnhof?",
      correct: "Wo",
      explanation: "Explicație: Loc pozițional (unde?) → \"Wo…?\""
    },
    {
      type: "fill",
      question: "… Farbe hat dein Auto?",
      correct: "Welche",
      explanation: "Explicație: \"Welche + substantiv\" când selectăm/identificăm dintr-un set (culori)."
    },
    {
      type: "multiple-choice",
      question: "… wohnst du? – In Berlin.",
      options: ["Wo", "Wohin", "Woher"],
      correct: "Wo",
      explanation: {
        correct: "De ce corect: răspunsul \"In Berlin\" indică un loc fix → \"Wo?\"",
        wrong: "Greșite: Wohin = direcție; Woher = origine."
      }
    },
    {
      type: "multiple-choice", 
      question: "… gehst du? – Zum Supermarkt.",
      options: ["Wo", "Wohin", "Woher"],
      correct: "Wohin",
      explanation: {
        correct: "De ce corect: răspunsul \"Zum Supermarkt\" indică o direcție → \"Wohin?\"",
        wrong: "Greșite: Wo = loc fix; Woher = origine."
      }
    },
    {
      type: "multiple-choice",
      question: "… kommst du? – Aus Rumänien.",
      options: ["Wo", "Wohin", "Woher"],
      correct: "Woher",
      explanation: {
        correct: "De ce corect: răspunsul \"Aus Rumänien\" indică origine → \"Woher?\"",
        wrong: "Greșite: Wo = loc fix; Wohin = direcție."
      }
    },
    {
      type: "multiple-choice",
      question: "… ist das? – Das ist ein Buch.",
      options: ["Wer", "Was", "Wo"],
      correct: "Was",
      explanation: {
        correct: "De ce corect: răspunsul \"Das ist ein Buch\" identifică un obiect → \"Was?\"",
        wrong: "Greșite: Wer = persoană; Wo = loc."
      }
    },
    {
      type: "multiple-choice",
      question: "… ist dein Vater? – Er ist Arzt.",
      options: ["Wer", "Was", "Wo"],
      correct: "Was",
      explanation: {
        correct: "De ce corect: răspunsul \"Er ist Arzt\" indică profesia → \"Was ist er (von Beruf)?\"",
        wrong: "Greșite: Wer = \"cine\" (identitate); Wo = loc."
      }
    },
    {
      type: "multiple-choice",
      question: "… heißt deine Mutter? – Sie heißt Maria.",
      options: ["Wie", "Wer", "Was"],
      correct: "Wie",
      explanation: {
        correct: "De ce corect: răspunsul \"Sie heißt Maria\" dă numele → \"Wie heißt...?\"",
        wrong: "Greșite: Wer = \"cine\"; Was = \"ce\"."
      }
    },
    {
      type: "fill",
      question: "… alt bist du? – Ich bin 25 Jahre alt.",
      correct: "Wie",
      explanation: "Explicație: răspunsul \"25 Jahre alt\" indică vârsta → \"Wie alt?\""
    },
    {
      type: "fill",
      question: "… spät ist es? – Es ist 3 Uhr.",
      correct: "Wie",
      explanation: "Explicație: răspunsul \"Es ist 3 Uhr\" indică ora → \"Wie spät?\""
    },
    {
      type: "fill",
      question: "… viel kostet das? – 5 Euro.",
      correct: "Wie",
      explanation: "Explicație: răspunsul \"5 Euro\" indică prețul → \"Wie viel?\""
    },
    {
      type: "fill",
      question: "… viele Kinder hast du? – Ich habe zwei Kinder.",
      correct: "Wie",
      explanation: "Explicație: răspunsul \"zwei Kinder\" indică numărul → \"Wie viele?\""
    },
    {
      type: "fill",
      question: "… lange dauert der Film? – Zwei Stunden.",
      correct: "Wie",
      explanation: "Explicație: răspunsul \"Zwei Stunden\" indică durata → \"Wie lange?\""
    },
    {
      type: "fill",
      question: "… kommst du zur Arbeit? – Mit dem Bus.",
      correct: "Wie",
      explanation: "Explicație: răspunsul \"Mit dem Bus\" indică mijlocul de transport → \"Wie?\""
    },
    {
      type: "fill",
      question: "… beginnt das Konzert? – Um 20 Uhr.",
      correct: "Wann",
      explanation: "Explicație: răspunsul \"Um 20 Uhr\" indică timpul → \"Wann?\""
    },
    {
      type: "fill",
      question: "… machst du das? – Weil ich Geld brauche.",
      correct: "Warum",
      explanation: "Explicație: răspunsul \"Weil...\" indică motivul → \"Warum?\""
    },
    {
      type: "fill",
      question: "… Auto fährst du? – Einen BMW.",
      correct: "Welches",
      explanation: "Explicație: răspunsul \"Einen BMW\" selectează dintr-un tip → \"Welches Auto?\""
    }
  ];

  // ====== Funcții principale ======
  window.startWFragenTest = function() {
    // Curăță event listener-ul global pentru Enter dacă există
    document.removeEventListener('keypress', handleGlobalEnter);
    
    // Amestecă întrebările pentru o ordine aleatoare
    const shuffledExercises = shuffle(wFragenExercises);
    
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
    
    if (exercise.type === 'multiple-choice') {
      questionArea.innerHTML = `
        <div class="question">
          <p><strong>${exercise.question}</strong></p>
        </div>
        <div class="answers">
          ${exercise.options.map(option => `
            <button class="ans-btn" data-answer="${option}">${option}</button>
          `).join('')}
        </div>
      `;
      
      // Add click handlers for multiple choice
      $$('.ans-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          $$('.ans-btn').forEach(b => b.classList.remove('selected'));
          this.classList.add('selected');
        });
      });
      
    } else if (exercise.type === 'fill') {
      questionArea.innerHTML = `
        <div class="question">
          <p><strong>${exercise.question}</strong></p>
        </div>
        <div class="answers">
          <input type="text" id="user-answer" placeholder="Scrie W-Wort-ul corect…" 
                 style="width:100%;max-width:400px;padding:8px;border:1px solid #ddd;border-radius:4px;">
        </div>
      `;
      
      const input = $('#user-answer');
      input.focus();
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
    
    if (exercise.type === 'multiple-choice') {
      const selected = $('.ans-btn.selected');
      if (!selected) {
        alert('Te rog să alegi un răspuns!');
        return;
      }
      userAnswer = selected.dataset.answer;
      isCorrect = userAnswer === exercise.correct;
      
      // Colorează butoanele
      $$('.ans-btn').forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.answer === exercise.correct) {
          btn.style.backgroundColor = '#dcfce7';
          btn.style.borderColor = '#22c55e';
          btn.style.color = '#000000'; // Text negru pentru contrast
        }
        if (btn.dataset.answer === userAnswer && !isCorrect) {
          btn.style.backgroundColor = '#fee2e2';
          btn.style.borderColor = '#ef4444';
          btn.style.color = '#000000'; // Text negru pentru contrast
        }
      });
      
    } else if (exercise.type === 'fill') {
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
    }
    
    userAnswers.push({
      exercise,
      userAnswer,
      isCorrect
    });
    
    // Afișare explicație
    let feedbackHTML = '';
    if (isCorrect) {
      feedbackHTML = `
        <div style="color:#22c55e;font-weight:600;margin-bottom:8px;">✓ Corect!</div>
      `;
      if (exercise.explanation && exercise.explanation.correct) {
        feedbackHTML += `<div style="color:#666;">${exercise.explanation.correct}</div>`;
      } else if (exercise.explanation) {
        feedbackHTML += `<div style="color:#666;">${exercise.explanation}</div>`;
      }
    } else {
      feedbackHTML = `
        <div style="color:#ef4444;font-weight:600;margin-bottom:8px;">✗ Greșit!</div>
        <div style="color:#ef4444;margin-bottom:8px;">Răspunsul corect: <strong>${exercise.correct}</strong></div>
      `;
      if (exercise.explanation && exercise.explanation.correct) {
        feedbackHTML += `<div style="color:#666;margin-bottom:8px;">${exercise.explanation.correct}</div>`;
      } else if (exercise.explanation) {
        feedbackHTML += `<div style="color:#666;margin-bottom:8px;">${exercise.explanation}</div>`;
      }
      if (exercise.explanation && exercise.explanation.wrong) {
        feedbackHTML += `<div style="color:#666;">${exercise.explanation.wrong}</div>`;
      }
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
    
    const correct = userAnswers.filter(a => a.isCorrect).length;
    const total = userAnswers.length;
    const percentage = Math.round((correct / total) * 100);
    
    let message = '';
    if (percentage >= 90) {
      message = '🎉 Excelent! Stăpânești foarte bine W-Fragen-urile!';
    } else if (percentage >= 75) {
      message = '👏 Foarte bine! Ai o înțelegere solidă a W-Fragen-urilor.';
    } else if (percentage >= 60) {
      message = '👍 Bine! Mai exersează puțin W-Fragen-urile.';
    } else {
      message = '💪 Mai studiază W-Fragen-urile și încearcă din nou!';
    }
    
    $('#test-container').style.display = 'none';
    $('#result-container').style.display = '';
    
    $('#score-percentage').innerHTML = `<strong style="font-size:1.5rem;color:#059669;">${percentage}%</strong>`;
    $('#score-breakdown').textContent = `Ai răspuns corect la ${correct} din ${total} întrebări.`;
    
    const messageEl = document.createElement('p');
    messageEl.style.cssText = 'color:#374151;margin-top:12px;font-weight:500;';
    messageEl.textContent = message;
    $('#score-breakdown').parentNode.insertBefore(messageEl, $('#score-breakdown').nextSibling);
    
    // Salvează progresul
    saveWFragenResult({ percentage, correct, total });
  }

  function saveWFragenResult(result) {
    try {
      const progress = JSON.parse(localStorage.getItem('germanProgress') || '{}');
      progress['w-fragen'] = {
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