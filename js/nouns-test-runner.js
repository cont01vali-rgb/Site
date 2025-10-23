// Runner care încearcă fetch la JSON, dar folosește fallback window.nounsExercises (offline file://)
document.addEventListener('DOMContentLoaded', async () => {
  const questionArea = document.getElementById('questionArea');
  const feedback = document.getElementById('feedback');
  const qIndexEl = document.getElementById('qIndex');
  const qTotalEl = document.getElementById('qTotal');
  const scoreEl = document.getElementById('score');
  const verifyBtn = document.getElementById('verify-btn');
  const nextBtn = document.getElementById('next-btn');

  let exercises = [];

  // încearcă să încarce ../data/nouns-exercises.json (server) — dacă eșuează folosește window.nounsExercises
  try {
    const resp = await fetch('../data/nouns-exercises.json');
    if (resp.ok) {
      exercises = await resp.json();
    }
  } catch (e) {
    // ignore, vom folosi fallback
  }
  if ((!Array.isArray(exercises) || exercises.length === 0) && Array.isArray(window.nounsExercises)) {
    exercises = window.nounsExercises;
  }

  // shuffle exercises so questions appear in random order
  if (Array.isArray(exercises) && exercises.length > 1) {
    exercises = shuffleArray(exercises);
  }
  
  if (!Array.isArray(exercises) || exercises.length === 0) {
    questionArea.textContent = 'Nu există exerciții disponibile. Pune data/nouns-exercises.json sau data/nouns-exercises.js.';
    verifyBtn.style.display = 'none';
    return;
  }

  let idx = 0, score = 0, selected = null;

  qTotalEl.textContent = exercises.length;
  renderCurrent();

  verifyBtn.addEventListener('click', () => {
    const ok = validateCurrent();
    if (!ok) return;
    verifyBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
  });

  nextBtn.addEventListener('click', () => {
    idx++;
    if (idx >= exercises.length) {
      finish();
      return;
    }
    selected = null;
    feedback.textContent = '';
    verifyBtn.style.display = 'inline-block';
    nextBtn.style.display = 'none';
    renderCurrent();
  });

  function renderCurrent() {
    const ex = exercises[idx];
    qIndexEl.textContent = idx + 1;
    scoreEl.textContent = score;
    questionArea.innerHTML = '';
    feedback.textContent = '';

    if (ex.type === 'truefalse') {
      questionArea.innerHTML = `<h3>${escapeHtml(ex.question)}</h3>
        <div class="answers">
          <button class="ans-btn" data-val="true">Da</button>
          <button class="ans-btn" data-val="false">Nu</button>
        </div>`;
      bindButtons();
    } else if (ex.type === 'multiple') {
      let html = `<h3>${escapeHtml(ex.question)}</h3><div class="answers">`;
      (ex.options || []).forEach(opt => {
        html += `<button class="ans-btn" data-val="${escapeHtml(opt)}">${escapeHtml(opt)}</button>`;
      });
      html += '</div>';
      questionArea.innerHTML = html;
      bindButtons();
    } else if (ex.type === 'fill') {
      questionArea.innerHTML = `<h3>${escapeHtml(ex.question)}</h3><input id="fill-input" type="text" placeholder="Scrie răspunsul..." autofocus>`;
    } else if (ex.type === 'audio') {
      questionArea.innerHTML = `<h3>${escapeHtml(ex.question)}</h3>
        <button id="play-audio" class="btn">🔊 Ascultă</button>
        <div class="answers" style="margin-top:.6rem;"></div>`;
      const answersDiv = questionArea.querySelector('.answers');
      (ex.options || []).forEach(opt => {
        const b = document.createElement('button');
        b.className = 'ans-btn';
        b.textContent = opt;
        b.dataset.val = opt;
        answersDiv.appendChild(b);
      });
      document.getElementById('play-audio').addEventListener('click', () => {
        const u = new SpeechSynthesisUtterance(ex.word || '');
        u.lang = 'de-DE';
        speechSynthesis.speak(u);
      });
      bindButtons();
    } else if (ex.type === 'img') {
      const imgPath = ex.image ? `../assets/nouns/${ex.image}` : `../assets/nouns/${slugify(ex.word || ex.answer || '')}.jpg`;
      questionArea.innerHTML = `<h3>${escapeHtml(ex.question || 'Ce vezi în imagine?')}</h3>
        <img src="${imgPath}" alt="" style="max-width:260px;display:block;margin:0.5rem 0;">
        <input id="fill-input" type="text" placeholder="Scrie răspunsul în germană..." autofocus>`;
    } else {
      questionArea.textContent = 'Tip exercițiu necunoscut: ' + (ex.type || '');
    }
  }

  function bindButtons() {
    questionArea.querySelectorAll('.ans-btn').forEach(btn => {
      btn.addEventListener('click', (ev) => {
        questionArea.querySelectorAll('.ans-btn').forEach(b => b.classList.remove('selected'));
        ev.currentTarget.classList.add('selected');
        selected = ev.currentTarget.dataset.val;
      });
    });
  }

  function validateCurrent() {
    const ex = exercises[idx];
    let correct = false;
    if (ex.type === 'fill' || ex.type === 'img') {
      const v = (document.getElementById('fill-input') || {}).value || '';
      if (!v.trim()) return false;
      correct = normalize(v) === normalize(ex.answer || ex.word || ex.expected || '');
    } else if (ex.type === 'audio' || ex.type === 'multiple' || ex.type === 'truefalse') {
      if (selected === null) return false;
      const expected = String(ex.correct !== undefined ? ex.correct : ex.answer || ex.word || ex.expected);
      correct = normalize(String(selected)) === normalize(String(expected));
    }

    feedback.textContent = correct ? '✅ Corect!' : `❌ Greșit — corect: ${ex.correct || ex.answer || ex.word || ''}`;
    feedback.style.color = correct ? 'green' : 'red';
    if (correct) score++;
    scoreEl.textContent = score;
    return true;
  }

  function finish() {
    questionArea.innerHTML = `<h2>🎉 Test terminat</h2><p>Scor: ${score} / ${exercises.length}</p>`;
    verifyBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  }

  // helpers
  function shuffleArray(arr) {
    // Fisher‑Yates shuffle (in-place)
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function normalize(s) {
    return (s||'').toString().toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/ă/g,'a').replace(/â/g,'a').replace(/î/g,'i')
      .replace(/ș/g,'s').replace(/ş/g,'s').replace(/ț/g,'t').replace(/ţ/g,'t')
      .replace(/\s+/g,' ').trim();
  }

  function slugify(str) {
    return (str||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  }

  function escapeHtml(s) {
    return (s||'').toString().replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
});