(function(){
  const $ = s => document.querySelector(s);
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

  // Așteaptă banca de exerciții
  function waitForExercises(timeout=5000) {
    return new Promise(resolve => {
      const start = Date.now();
      const tick = () => {
        if (Array.isArray(window.nounsExercises) && window.nounsExercises.length) return resolve(window.nounsExercises);
        if (Date.now() - start > timeout) return resolve(window.nounsExercises || []);
        setTimeout(tick, 50);
      };
      tick();
    });
  }

  let ALL = [];
  const MAX_QUESTIONS = 65;

  // Weak-tracking
  function getWeak() { try { return JSON.parse(localStorage.getItem('weakNouns')||'{}'); } catch { return {}; } }
  function setWeak(map){ try { localStorage.setItem('weakNouns', JSON.stringify(map)); } catch {} }
  function bumpWeak(lemma){
    if (!lemma) return;
    const m = getWeak();
    const e = m[lemma] || { count:0, lastWrongAt:null };
    e.count += 1; e.lastWrongAt = new Date().toISOString();
    m[lemma] = e; setWeak(m);
  }
  function decayWeak(lemma){
    const m = getWeak();
    if (!m[lemma]) return;
    m[lemma].count = Math.max(0, m[lemma].count - 1);
    if (m[lemma].count === 0) delete m[lemma];
    setWeak(m);
  }

  function getLemma(item){ return item.lemma || item.answer || item.correct || item.word || ''; }
  function shuffle(a){ a = a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

  function pickSet() {
    const SIZE = Math.min(MAX_QUESTIONS, ALL.length || 0) || 0;
    if (!SIZE) return [];
    const weakMap = getWeak();
    const weakLemmas = Object.keys(weakMap).sort((a,b)=>(weakMap[b]?.count||0)-(weakMap[a]?.count||0));
    const byLemma = ALL.reduce((m,x)=>{ const k=getLemma(x); if(!k) return m; (m[k]=m[k]||[]).push(x); return m; }, {});
    const chosen = [];

    // până la 50% din slăbiciuni
    const targetWeak = Math.min(Math.ceil(SIZE/2), weakLemmas.length);
    for (let i=0; i<targetWeak; i++) {
      const lem = weakLemmas[i];
      const arr = byLemma[lem];
      if (arr && arr.length) chosen.push(arr[Math.floor(Math.random()*arr.length)]);
    }

    // completează aleator
    const pool = shuffle(ALL).filter(it => !chosen.includes(it));
    while (chosen.length < SIZE && pool.length) chosen.push(pool.shift());

    return shuffle(chosen).slice(0, SIZE);
  }

  let state = { items:[], idx:0, score:0, wrongs:[] };

  function start() {
    state = { items: pickSet(), idx:0, score:0, wrongs:[] };
    if (!state.items.length) {
      $('#nounsTestRoot').innerHTML = `
        <div>Nu s-au găsit exerciții. Verifică încărcarea data/nouns-exercises.js, apoi reîncarcă (Ctrl+F5).</div>
      `;
      return;
    }
    render();
  }

  function render() {
    const root = $('#nounsTestRoot');
    const it = state.items[state.idx];
    if (!it) return finish();

    const type = (it.type === 'truefalse') ? 'tf' : it.type;
    const media = it.image ? `<div class="q-media"><img class="q-img" src="../assets/nouns/${it.image}" alt=""></div>` : '';

    let body = '';
    if (type === 'img' || type === 'fill') {
      body = `
        ${media}
        <div class="question-card">${it.question}</div>
        <div style="margin-top:8px;"><input id="fillInput" type="text" class="text-input" placeholder="Răspuns"></div>
      `;
    } else if (type === 'multiple') {
      body = `
        ${media}
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
        ${media}
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
      $('#playAudio')?.addEventListener('click', ()=> speak(it.word));
      setTimeout(()=> speak(it.word), 200);
    }
    $('#checkBtn').onclick = onCheck;
    $('#nextBtn').onclick = onNext;
  }

  function onCheck() {
    const it = state.items[state.idx];
    const type = (it.type === 'truefalse') ? 'tf' : it.type;
    let ok = false;

    if (type === 'img' || type === 'fill') {
      const v = $('#fillInput')?.value || '';
      ok = norm(v) === norm(it.answer);
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
    fb.className = 'important';
    fb.style.marginTop = '8px';
    fb.textContent = ok ? 'Corect!' : `Greșit. Răspuns corect: ${it.correct || it.answer || it.word}`;
    $('#nounsTestRoot').appendChild(fb);

    const lemma = getLemma(it);
    if (ok) {
      state.score++;
      decayWeak(lemma);
    } else {
      state.wrongs.push({ lemma, shown: (it.answer || it.correct || it.word) });
      bumpWeak(lemma);
    }

    $('#checkBtn').disabled = true;
    $('#nextBtn').disabled = false;
  }

  function onNext() {
    if (state.idx < state.items.length - 1) {
      state.idx++;
      render();
    } else {
      finish();
    }
  }

  function finish() {
    const root = $('#nounsTestRoot');
    const wrongs = state.wrongs;
    const percent = Math.round(state.score / state.items.length * 100);

    // salvează sumar
    const rec = {
      when: new Date().toISOString(),
      total: state.items.length,
      score: state.score,
      percent,
      wrongs: wrongs.map(w=>w.lemma)
    };
    try {
      const all = JSON.parse(localStorage.getItem('nounsTestHistory')||'[]');
      all.push(rec);
      localStorage.setItem('nounsTestHistory', JSON.stringify(all));
    } catch {}

    root.innerHTML = `
      <div class="question-card">
        <h3>Rezultat</h3>
        <p>Scor: ${state.score}/${state.items.length} (${percent}%)</p>
        ${wrongs.length ? `
          <div class="question-card" style="margin-top:8px;">
            <strong>Substantive greșite:</strong>
            <ul style="margin:6px 0 0 16px;">
              ${wrongs.map(w=>`<li>${w.lemma}</li>`).join('')}
            </ul>
          </div>` : `<p>Bravo! Nicio greșeală 🎉</p>`
        }
        <div style="display:flex;gap:8px;margin-top:10px;">
          <button id="retryWrong" class="btn" ${wrongs.length? '' : 'disabled'}>Repetă greșelile</button>
          <button id="restartAll" class="btn">Reia testul</button>
        </div>
      </div>
    `;

    $('#retryWrong')?.addEventListener('click', () => retryWrong(wrongs.map(w=>w.lemma)));
    $('#restartAll')?.addEventListener('click', start);
  }

  function retryWrong(lemmas) {
    if (!lemmas?.length) return start();
    const byLemma = ALL.reduce((m,x)=>{ const k=getLemma(x); if(!k) return m; (m[k]=m[k]||[]).push(x); return m; }, {});
    const items = [];
    lemmas.forEach(l => {
      const arr = byLemma[l];
      if (arr?.length) items.push(arr[Math.floor(Math.random()*arr.length)]);
    });
    const pool = shuffle(ALL).filter(x => !items.includes(x));
    while (items.length < Math.min(10, MAX_QUESTIONS) && pool.length) items.push(pool.shift());
    state = { items: shuffle(items), idx:0, score:0, wrongs:[] };
    render();
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const arr = await waitForExercises();
    ALL = Array.isArray(arr) ? arr.slice() : [];
    if (document.getElementById('nounsTestRoot')) start();
  });
})();