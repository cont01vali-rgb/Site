// Runner pentru testul Das Lernziel — nu afișează răspunsurile corecte automat.
// Folosește window.fragenkatalogA1 (încarcat din ../data/fragenkatalog-a1.js).
document.addEventListener('DOMContentLoaded', () => {
  const data = Array.isArray(window.fragenkatalogA1) ? [...window.fragenkatalogA1] : [];
  const questionArea = document.getElementById('questionArea');
  const feedback = document.getElementById('feedback');
  const qIndexEl = document.getElementById('qIndex');
  const qTotalEl = document.getElementById('qTotal');
  const scoreEl = document.getElementById('score');
  const verifyBtn = document.getElementById('verify-btn');
  const nextBtn = document.getElementById('next-btn');

  if (!data.length) {
    questionArea.textContent = 'Încă nu există întrebări — verifică data/fragenkatalog-a1.js';
    verifyBtn.style.display = 'none';
    return;
  }

  // opțional shuffle pentru test (activare implicită)
  shuffleArray(data);

  let idx = 0, score = 0, selected = null;

  qTotalEl.textContent = data.length;
  renderCurrent();

  verifyBtn.addEventListener('click', () => {
    if (!canVerify()) return;
    const correct = checkAnswer();
    // Feedback but do NOT reveal correct option text
    feedback.style.color = correct ? 'green' : 'red';
    feedback.textContent = correct ? '✅ Corect!' : '❌ Greșit!';
    if (correct) score++;
    scoreEl.textContent = score;
    verifyBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
  });

  nextBtn.addEventListener('click', () => {
    idx++;
    if (idx >= data.length) {
      finish();
      return;
    }
    selected = null;
    feedback.textContent = '';
    verifyBtn.style.display = 'inline-block';
    nextBtn.style.display = 'none';
    renderCurrent();
  });

  // Render current question (no translations shown in test)
  function renderCurrent() {
    const q = data[idx];
    qIndexEl.textContent = idx + 1;
    scoreEl.textContent = score;
    questionArea.innerHTML = '';

    const qTitle = document.createElement('h3');
    qTitle.style.margin = '.2rem 0 .6rem 0';
    qTitle.textContent = `${idx + 1}. ${q.text}`;
    questionArea.appendChild(qTitle);

    // no translation shown in test environment to increase difficulty

    if (q.type === 'tf') {
      const row = document.createElement('div');
      row.className = 'answers';
      const aBtn = makeOptionBtn('a', 'richtig');
      const bBtn = makeOptionBtn('b', 'falsch');
      row.appendChild(aBtn);
      row.appendChild(bBtn);
      questionArea.appendChild(row);
    } else if (q.type === 'mc') {
      const row = document.createElement('div');
      row.className = 'answers';
      (q.options || []).forEach((opt, i) => {
        // normalize options like "a. text" -> keep text after letter
        const content = (opt || '').toString().replace(/^[a-z]\.\s*/i, '');
        const letter = ['a','b','c'][i] || String.fromCharCode(97 + i);
        const btn = makeOptionBtn(letter, content);
        row.appendChild(btn);
      });
      questionArea.appendChild(row);
    } else {
      questionArea.textContent = 'Tip întrebare necunoscut';
    }

    // bind option selection
    questionArea.querySelectorAll('.ans-btn').forEach(b => {
      b.addEventListener('click', (ev) => {
        questionArea.querySelectorAll('.ans-btn').forEach(x => x.classList.remove('selected'));
        ev.currentTarget.classList.add('selected');
        selected = ev.currentTarget.dataset.val;
      });
    });
  }

  function makeOptionBtn(letterOrId, label) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ans-btn';
    btn.style.minWidth = '140px';
    btn.style.margin = '6px';
    btn.dataset.val = letterOrId;
    btn.textContent = `${letterOrId}. ${label}`;
    return btn;
  }

  function canVerify() {
    if (!selected) return false;
    return true;
  }

  function checkAnswer() {
    const q = data[idx];
    if (q.type === 'tf') {
      // selected is 'a' or 'b' -> map to boolean
      const selBool = selected === 'a' ? true : false;
      return selBool === Boolean(q.answer);
    } else if (q.type === 'mc') {
      // selected is letter
      return String(selected).toLowerCase() === String(q.correct).toLowerCase();
    }
    return false;
  }

  function finish() {
    questionArea.innerHTML = `<h2>🎉 Test terminat</h2>
      <p>Scor: ${score} / ${data.length}</p>
      <p>Dacă vrei, te poți întoarce la lecție sau poți reface testul.</p>
      <div style="margin-top:1rem;">
        <a href="../lessons/das-lernziel.html" class="btn">Înapoi la lecție</a>
        <button id="review-btn" class="btn" style="margin-left:.6rem;">Arată răspunsurile corecte</button>
      </div>`;
    verifyBtn.style.display = 'none';
    nextBtn.style.display = 'none';

    // reveal correct answers on demand
    const reviewBtn = document.getElementById('review-btn');
    if (reviewBtn) {
      reviewBtn.addEventListener('click', () => revealCorrectAnswers());
    }
  }

  function revealCorrectAnswers() {
    // render all questions with correct answers highlighted (reuse card style)
    questionArea.innerHTML = '';
    data.forEach((q, i) => {
      const card = document.createElement('div');
      card.className = 'frage';
      // header
      const h = document.createElement('div');
      h.innerHTML = `<strong>${i + 1}.</strong> ${escapeHtml(q.text)}`;
      card.appendChild(h);
      // translation if present
      if (q.translation) {
        const t = document.createElement('div');
        t.className = 'frage-translation';
        t.textContent = q.translation;
        card.appendChild(t);
      }
      // answers with correct markings
      const ans = document.createElement('div');
      if (q.type === 'tf') {
        if (q.answer) {
          ans.innerHTML = `a. <strong class="correct-true">richtig</strong> &nbsp;&nbsp; b. falsch`;
        } else {
          ans.innerHTML = `a. richtig &nbsp;&nbsp; b. <strong class="correct-true">falsch</strong>`;
        }
      } else if (q.type === 'mc') {
        const rows = (q.options || []).map((opt, idx) => {
          const letter = ['a','b','c'][idx] || String.fromCharCode(97 + idx);
          const content = opt.replace(/^[a-z]\.\s*/i, '');
          const mark = (String(q.correct).toLowerCase() === letter) ? `<strong class="mc-correct">${letter}.</strong>` : `${letter}.`;
          return `<div class="mc-row">${mark} ${escapeHtml(content)}</div>`;
        }).join('');
        ans.innerHTML = rows;
      }
      card.appendChild(ans);
      questionArea.appendChild(card);
    });
    // remove review button after reveal
    const rb = document.getElementById('review-btn');
    if (rb) rb.remove();
  }

  // helpers
  function shuffleArray(arr) {
    for (let i = arr.length -1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function escapeHtml(s) {
    return (s||'').toString().replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
});