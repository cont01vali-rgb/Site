// filepath: d:\site\js\w-fragen-test.js
(function(){
  const $ = s => document.querySelector(s);
  const norm = s => String(s||'').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/ă|â/g,'a').replace(/î/g,'i').replace(/ș|ş/g,'s').replace(/ț|ţ/g,'t')
    .trim();

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
        if (Array.isArray(window.wfragenExercises) && window.wfragenExercises.length) return resolve(window.wfragenExercises);
        if (Date.now() - start > timeout) return resolve(window.wfragenExercises || []);
        setTimeout(tick, 50);
      };
      tick();
    });
  }

  const MAX_QUESTIONS = 65;
  let ALL = [];
  let state = { items:[], idx:0, score:0, wrongs:[] };

  function shuffle(a){ a = a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
  function pickSet(){ return shuffle(ALL).slice(0, Math.min(MAX_QUESTIONS, ALL.length)); }

  function render() {
    const root = $('#wfragenTestRoot');
    const it = state.items[state.idx];
    if (!it) return finish();

    const type = (it.type === 'truefalse') ? 'tf' : it.type;
    let body = '';

    if (type === 'fill') {
      body = `
        <div class="question-card">${it.question}</div>
        <div style="margin-top:8px;"><input id="fillInput" type="text" class="text-input" placeholder="Răspuns"></div>
      `;
    } else if (type === 'multiple') {
      body = `
        <div class="question-card">${it.question}</div>
        <div class="answers" style="display:grid;gap:8px;margin-top:6px;">
          ${it.options.map(o=>`<label><input type="radio" name="ans" value="${o}"> ${o}</label>`).join('')}
        </div>
      `;
    } else if (type === 'audio') {
      body = `
        <div class="question-card">${it.question} <button id="playAudio" class="btn">🔊 Ascultă</button></div>
        <div style="margin-top:8px;">
          ${it.options?.length
            ? `<div class="answers" style="display:grid;gap:8px;margin-top:6px;">
                 ${it.options.map(o=>`<label><input type="radio" name="ans" value="${o}"> ${o}</label>`).join('')}
               </div>`
            : `<input id="fillInput" type="text" class="text-input" placeholder="Ce ai auzit?">`
          }
        </div>
      `;
    } else if (type === 'tf') {
      body = `
        <div class="question-card">${it.question}</div>
        <div class="answers" style="display:flex;gap:12px;margin-top:6px;">
          <label><input type="radio" name="ans" value="true"> Adevărat</label>
          <label><input type="radio" name="ans" value="false"> Fals</label>
        </div>
      `;
    } else {
      body = `<div class="question-card">Tip necunoscut.</div>`;
    }

    root.innerHTML = `
      <div class="q-head" style="display:flex;justify-content:space-between;align-items:center;">
        <div><strong>${state.idx+1}</strong> / ${state.items.length}</div>
        <div>Scor: ${state.score}</div>
      </div>
      ${body}
      <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:10px;">
        <button id="checkBtn" class="btn">Verifică</button>
        <button id="nextBtn" class="btn" disabled>Următoarea</button>
      </div>
    `;

    if (type === 'audio') {
      const say = () => speak(it.word);
      $('#playAudio')?.addEventListener('click', say);
      setTimeout(say, 250);
    }
    $('#checkBtn').onclick = onCheck;
    $('#nextBtn').onclick = onNext;
  }

  function onCheck() {
    const it = state.items[state.idx];
    const type = (it.type === 'truefalse') ? 'tf' : it.type;
    let ok = false;

    if (type === 'fill') {
      const v = $('#fillInput')?.value || '';
      const answers = it.answer ? [it.answer] : (Array.isArray(it.answers) ? it.answers : []);
      ok = answers.some(a => norm(v) === norm(a));
    } else if (type === 'multiple') {
      const v = (document.querySelector('input[name="ans"]:checked')?.value) || '';
      ok = v === it.correct;
    } else if (type === 'audio') {
      if (it.options?.length) {
        const v = (document.querySelector('input[name="ans"]:checked')?.value) || '';
        ok = v === it.correct;
      } else {
        const v = $('#fillInput')?.value || '';
        ok = norm(v) === norm(it.word);
      }
    } else if (type === 'tf') {
      const v = (document.querySelector('input[name="ans"]:checked')?.value) || '';
      ok = String(it.correct) === v;
    }

    const fb = document.createElement('div');
    fb.className = 'important'; fb.style.marginTop = '8px';
    fb.textContent = ok ? 'Corect!' : `Greșit. Răspuns corect: ${it.correct || it.answer || it.word}`;
    $('#wfragenTestRoot').appendChild(fb);

    if (ok) state.score++; else state.wrongs.push(it.question);

    $('#checkBtn').disabled = true;
    $('#nextBtn').disabled = false;
  }

  function onNext() {
    if (state.idx < state.items.length - 1) { state.idx++; render(); }
    else finish();
  }

  function finish() {
    const root = $('#wfragenTestRoot');
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
        </div>
      </div>
    `;
    try {
      const all = JSON.parse(localStorage.getItem('wFragenTestHistory')||'[]');
      all.push({ when:new Date().toISOString(), total:state.items.length, score:state.score, percent });
      localStorage.setItem('wFragenTestHistory', JSON.stringify(all));
    } catch {}
    $('#restartAll')?.addEventListener('click', start);
  }

  function start() {
    state = { items: pickSet(), idx:0, score:0, wrongs:[] };
    if (!state.items.length) {
      $('#wfragenTestRoot').innerHTML = `
        <div>Nu s-au găsit exerciții. Verifică încărcarea data/w-fragen-exercises.js și reîncearcă (Ctrl+F5).</div>
      `;
      return;
    }
    render();
  }

  document.addEventListener('DOMContentLoaded', async () => {
    ALL = await waitForExercises();
    ALL = Array.isArray(ALL) ? ALL : [];
    if (document.getElementById('wfragenTestRoot')) start();

    // Activează butonul spre testul dedicat (dacă există pe pagină)
    const b = document.getElementById('wfragenTestBtn');
    if (b) b.addEventListener('click', () => { window.location.href = '../tests/w-fragen-test.html'; });
  });
})();