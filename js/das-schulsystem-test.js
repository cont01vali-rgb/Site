(function(){
  const $ = s => document.querySelector(s);
  const norm = s => String(s||'').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/ă|â/g,'a').replace(/î/g,'i').replace(/ș|ş/g,'s').replace(/ț|ţ/g,'t')
    .trim();

  // Funcție pentru obținerea limbii actuale
  function getCurrentLanguage() {
    return localStorage.getItem('selectedLanguage') || 'en';
  }

  // Funcție pentru obținerea textului în limba corectă
  function getLocalizedText(textObj, fallbackText = '') {
    const lang = getCurrentLanguage();
    if (typeof textObj === 'string') return textObj;
    if (typeof textObj === 'object' && textObj) {
      return textObj[lang] || textObj['ro'] || fallbackText;
    }
    return fallbackText;
  }

  // TTS
  function speak(text, lang='de-DE') {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const run = () => {
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      const v = synth.getVoices().find(v => /de(-|_)?/i.test(v.lang) || /german/i.test(v.name));
      if (v) u.voice = v;
      u.rate = 0.95;
      synth.speak(u);
    };
    if (!synth.getVoices().length) {
      synth.onvoiceschanged = () => { synth.onvoiceschanged = null; run(); };
      setTimeout(run, 150);
    } else run();
  }

  function waitForExercises(timeout=5000) {
    return new Promise(resolve => {
      const start = Date.now();
      const tick = () => {
        if (Array.isArray(window.schulsystemExercises) && window.schulsystemExercises.length) return resolve(window.schulsystemExercises);
        if (Date.now() - start > timeout) return resolve(window.schulsystemExercises || []);
        setTimeout(tick, 50);
      };
      tick();
    });
  }

  const MAX_QUESTIONS = 20;
  let ALL = [];
  let state = { items:[], idx:0, score:0, wrongs:[] };

  function shuffle(a){ a = a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
  function pickSet(){ return shuffle(ALL).slice(0, Math.min(MAX_QUESTIONS, ALL.length)); }

  function render() {
    const root = $('#schulsystemTestRoot');
    const qIndexEl = $('#qIndex');
    const qTotalEl = $('#qTotal');
    const scoreEl = $('#score');
    const progressFill = $('#progressFill');
    
    const it = state.items[state.idx];
    if (!it) return finish();

    // Actualizează elementele de progres din header
    if (qIndexEl) qIndexEl.textContent = state.idx + 1;
    if (qTotalEl) qTotalEl.textContent = state.items.length;
    if (scoreEl) scoreEl.textContent = state.score;
    if (progressFill) {
      const percentage = ((state.idx + 1) / state.items.length) * 100;
      progressFill.style.width = `${percentage}%`;
    }

    const type = (it.type === 'truefalse') ? 'tf' : it.type;
    let body = '';

    if (type === 'fill') {
      const questionText = getLocalizedText(it.question, it.question);
      const placeholderText = getCurrentLanguage() === 'en' ? 'Enter your answer here...' : 
                             getCurrentLanguage() === 'ua' ? 'Введіть вашу відповідь тут...' : 
                             'Introdu răspunsul aici...';
      body = `
        <div class="question-text">${questionText}</div>
        <div class="fill-input-container" style="margin-top:16px;">
          <input id="fillInput" type="text" class="modern-text-input" placeholder="${placeholderText}">
        </div>
      `;
    } else if (type === 'multiple') {
      const questionText = getLocalizedText(it.question, it.question);
      const options = getLocalizedText(it.options, it.options);
      const optionsArray = Array.isArray(options) ? options : it.options;
      
      body = `
        <div class="question-text">${questionText}</div>
        <div class="question-options">
          ${optionsArray.map((o, idx) => `
            <button class="ans-btn" data-value="${o}" data-original-value="${Array.isArray(it.options) ? it.options[idx] : o}">
              ${String.fromCharCode(97 + idx)}. ${o}
            </button>
          `).join('')}
        </div>
      `;
    } else if (type === 'audio') {
      const questionText = getLocalizedText(it.question, it.question);
      const audioButtonText = getCurrentLanguage() === 'en' ? '🔊 Listen' : 
                             getCurrentLanguage() === 'ua' ? '🔊 Слухати' : 
                             '🔊 Ascultă';
      const audioPlaceholder = getCurrentLanguage() === 'en' ? 'Write what you heard...' : 
                              getCurrentLanguage() === 'ua' ? 'Напишіть те, що ви чули...' : 
                              'Scrie ce ai auzit...';
      
      body = `
        <div class="question-text">
          ${questionText} 
          <button id="playAudio" class="btn btn-audio">${audioButtonText}</button>
        </div>
        <div style="margin-top:16px;">
          ${it.options?.length
            ? `<div class="question-options">
                 ${it.options.map((o, idx) => `
                   <button class="ans-btn" data-value="${o}">
                     ${String.fromCharCode(97 + idx)}. ${o}
                   </button>
                 `).join('')}
               </div>`
            : `<div class="fill-input-container">
                 <input id="fillInput" type="text" class="modern-text-input" placeholder="${audioPlaceholder}">
               </div>`
          }
        </div>
      `;
    } else if (type === 'tf') {
      const questionText = getLocalizedText(it.question, it.question);
      const trueText = getCurrentLanguage() === 'en' ? 'True' : 
                      getCurrentLanguage() === 'ua' ? 'Правда' : 
                      'Adevărat';
      const falseText = getCurrentLanguage() === 'en' ? 'False' : 
                       getCurrentLanguage() === 'ua' ? 'Неправда' : 
                       'Fals';
      
      body = `
        <div class="question-text">${questionText}</div>
        <div class="question-options">
          <button class="ans-btn" data-value="true">a. ${trueText}</button>
          <button class="ans-btn" data-value="false">b. ${falseText}</button>
        </div>
      `;
    } else {
      body = `<div class="question-text">Tip necunoscut.</div>`;
    }

    root.innerHTML = body;

    // Adaugă event listeners pentru noile butoane moderne
    document.querySelectorAll('.ans-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Resetează toate butoanele
        document.querySelectorAll('.ans-btn').forEach(b => b.classList.remove('selected'));
        // Marchează butonul selectat
        btn.classList.add('selected');
        btn.dataset.selected = btn.dataset.value;
      });
    });

    if (type === 'audio') {
      const say = () => speak(it.word);
      $('#playAudio')?.addEventListener('click', say);
      setTimeout(say, 250);
    }
    
    // Conectează butoanele moderne din header
    const verifyBtn = $('#verify-btn');
    const nextBtn = $('#next-btn');
    const feedback = $('#feedback');
    
    if (verifyBtn) {
      verifyBtn.onclick = () => onCheck(feedback);
      verifyBtn.style.display = 'inline-flex';
    }
    if (nextBtn) {
      nextBtn.onclick = onNext;
      nextBtn.style.display = 'none';
    }
  }

  function onCheck(feedback) {
    const it = state.items[state.idx];
    const type = (it.type === 'truefalse') ? 'tf' : it.type;
    let ok = false;

    if (type === 'fill') {
      const v = $('#fillInput')?.value || '';
      const answers = it.answer ? [it.answer] : (Array.isArray(it.answers) ? it.answers : []);
      ok = answers.some(a => norm(v) === norm(a));
    } else if (type === 'multiple' || type === 'audio' && it.options?.length) {
      const selectedBtn = document.querySelector('.ans-btn.selected');
      const v = selectedBtn?.dataset.value || '';
      const originalV = selectedBtn?.dataset.originalValue || v;
      
      // Pentru opțiunile cu traduceri, verifică atât răspunsul tradus cât și cel original
      const correctAnswer = getLocalizedText(it.correct, it.correct);
      ok = v === correctAnswer || originalV === it.correct || v === it.correct;
    } else if (type === 'audio' && !it.options?.length) {
      const v = $('#fillInput')?.value || '';
      ok = norm(v) === norm(it.word);
    } else if (type === 'tf') {
      const selectedBtn = document.querySelector('.ans-btn.selected');
      const v = selectedBtn?.dataset.value || '';
      ok = String(it.correct) === v;
    }

    // Feedback cu design modern
    if (feedback) {
      const correctText = getCurrentLanguage() === 'en' ? '✅ Correct!' : 
                         getCurrentLanguage() === 'ua' ? '✅ Правильно!' : 
                         '✅ Corect!';
      const wrongPrefix = getCurrentLanguage() === 'en' ? '❌ Wrong. Correct answer:' : 
                         getCurrentLanguage() === 'ua' ? '❌ Неправильно. Правильна відповідь:' : 
                         '❌ Greșit. Răspuns corect:';
      
      feedback.className = ok ? 'test-feedback success' : 'test-feedback error';
      
      if (ok) {
        feedback.textContent = correctText;
      } else {
        const correctAnswer = getLocalizedText(it.correct, it.correct || it.answer || it.word);
        feedback.textContent = `${wrongPrefix} ${correctAnswer}`;
      }
    }

    if (ok) state.score++; else state.wrongs.push(it.question);

    // Actualizează butoanele
    const verifyBtn = $('#verify-btn');
    const nextBtn = $('#next-btn');
    if (verifyBtn) verifyBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'inline-flex';
  }

  function onNext() {
    // Resetează feedback-ul
    const feedback = $('#feedback');
    if (feedback) {
      feedback.textContent = '';
      feedback.className = 'test-feedback';
    }
    
    if (state.idx < state.items.length - 1) { 
      state.idx++; 
      render(); 
    } else {
      finish();
    }
  }

  function finish() {
    const root = $('#schulsystemTestRoot');
    const percent = Math.round(state.score / state.items.length * 100);
    root.innerHTML = `
      <div class="question-card">
        <h3>Rezultat</h3>
        <p>Scor: ${state.score}/${state.items.length} (${percent}%)</p>
        ${state.wrongs.length ? `
          <div class="question-card" style="margin-top:8px;">
            <strong>Întrebări greșite:</strong>
            <ul style="margin:6px 0 0 16px;">${state.wrongs.map(w=>`<li>${w}</li>`).join('')}</ul>
          </div>` : `<p>Bravo! Nicio greșeală 🎉</p>`
        }
        <div style="display:flex;gap:8px;margin-top:10px;">
          <button id="restartAll" class="btn">Reia testul</button>
          <a href="../lessons/das-schulsystem.html" class="btn">Înapoi la lecție</a>
        </div>
      </div>
    `;
    try {
      const all = JSON.parse(localStorage.getItem('schulsystemTestHistory')||'[]');
      all.push({ when:new Date().toISOString(), total:state.items.length, score:state.score, percent });
      localStorage.setItem('schulsystemTestHistory', JSON.stringify(all));
    } catch {}
    $('#restartAll')?.addEventListener('click', start);
  }

  function start() {
    state = { items: pickSet(), idx:0, score:0, wrongs:[] };
    if (!state.items.length) {
      $('#schulsystemTestRoot').innerHTML = `
        <div>Nu s-au găsit exerciții. Verifică încărcarea data/das-schulsystem-exercises.js și reîncearcă (Ctrl+F5).</div>
      `;
      return;
    }
    render();
  }

  document.addEventListener('DOMContentLoaded', async () => {
    ALL = await waitForExercises();
    ALL = Array.isArray(ALL) ? ALL : [];
    if (document.getElementById('schulsystemTestRoot')) start();
    
    // Listener pentru schimbarea limbii
    document.addEventListener('languageChanged', () => {
      render();
    });
    
    // Listener pentru selectorul de limbă din navbar
    const languageSelector = document.getElementById('languageSelector');
    if (languageSelector) {
      languageSelector.addEventListener('change', () => {
        setTimeout(() => render(), 100); // Mic delay pentru a se salva în localStorage
      });
    }
  });
})();