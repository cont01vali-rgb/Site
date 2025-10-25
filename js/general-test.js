/* General Test Engine
   - Exerciții pe categorii (după lecțiile existente)
   - Secțiune separată pentru AUDIO (// - audio)
   - Dificultăți: easy/medium/hard/hero
   - TTS, timer, scor, salvare progres
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

  // SpeechSynthesis (Chrome TTS)
  function speak(text, lang='de-DE') {
    const synth = window.speechSynthesis; if (!synth) return;
    const run = () => {
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text); u.lang = lang;
      const v = synth.getVoices().find(v => /de(-|_)?/i.test(v.lang) || /german/i.test(v.name));
      if (v) u.voice = v; synth.speak(u);
    };
    if (!synth.getVoices().length) { const once = () => { synth.onvoiceschanged = null; run(); }; synth.onvoiceschanged = once; setTimeout(run, 200); }
    else run();
  }

  // ====== Bancă de exerciții ======
  const BANK = {
    categories: {
      // Die Wochentage
      'die-wochentage': {
        tf: [
          { q:'„Montag” este luni.', a:true },
          { q:'„Sonntag” este sâmbătă.', a:false, ex:'Sonntag = duminică, Samstag = sâmbătă.' },
          { q:'„Freitag” vine înainte de „Samstag”.', a:true, ex:'Ordinea: Donnerstag, Freitag, Samstag, Sonntag.' }
        ],
        mc: [
          { q:'Ce urmează după Donnerstag?', opts:['Dienstag','Freitag','Sonntag'], a:1, ex:'După joi (Donnerstag) urmează vineri (Freitag).' },
          { q:'„Wednesday” înseamnă în germană:', opts:['Donnerstag','Dienstag','Mittwoch'], a:2 },
          { q:'Ce zi este „Sonntag”?', opts:['duminică','sâmbătă','luni'], a:0 }
        ],
        fill: [
          { q:'Der erste Tag der Woche ist', a:['montag'] },
          { q:'Nach Dienstag kommt', a:['mittwoch'] },
          { q:'Wochenende: Samstag und ____', a:['sonntag'] }
        ]
      },

      // Die Jahreszeiten
      'die-jahreszeiten': {
        tf: [
          { q:'„der Frühling” = primăvara.', a:true },
          { q:'„der Sommer” = iarna.', a:false },
          { q:'„der Winter” este anotimpul cel mai rece.', a:true }
        ],
        mc: [
          { q:'După Herbst urmează...', opts:['Sommer','Winter','Frühling'], a:1 },
          { q:'Traducere: „der Herbst”', opts:['primăvara','vara','toamna'], a:2 }
        ],
        fill: [
          { q:'Im ____ schneit es oft.', a:['winter'] },
          { q:'Im ____ ist es heiß.', a:['sommer'] },
          { q:'Nach dem Winter kommt der ____', a:['fruhling','frühling'] }
        ]
      },

      // Die Uhrzeit
      'die-uhrzeit': {
        tf: [
          { q:'„Es ist halb drei” = 3:30.', a:false, ex:'„halb drei” = 2:30 (jumătate până la 3, nu jumătate după).' },
          { q:'„Es ist Viertel nach sieben” = 7:15.', a:true, ex:'„Viertel nach” = și un sfert.' },
          { q:'„Es ist fünf vor acht” = 7:55.', a:true, ex:'„vor” = fără, deci 8 fără 5 minute.' }
        ],
        mc: [
          { q:'„Es ist halb acht” înseamnă', opts:['7:30','8:30','8:00'], a:0, ex:'„halb acht” = 7:30.' }
        ],
        fill: [
          { q:'Wie ____ ist es? (Cat este ceasul?)', a:['spät','viel uhr',] },
          { q:'Es ist ____ Uhr. (7:00)', a:['sieben'] }
        ]
      },

      // Die Tageszeiten
      'die-tageszeiten': {
        tf: [
          { q:'„der Morgen” = dimineața.', a:true },
          { q:'„die Nacht” e masculină.', a:false, ex:'„die Nacht” este feminin (articol: die).' }
        ],
        mc: [
          { q:'Corect pentru noapte:', opts:['am Nacht','in der Nacht','im Nacht'], a:1 }
        ],
        fill: [
          { q:'Am ____ trinke ich Kaffee. (dimineața DE)', a:['morgen'] }
        ]
      },

      // Der/Die/Das (cu imagini)
      'der-die-das': {
        mc: [
          { q:'„das Mädchen” are articolul...', opts:['der','die','das'], a:2, ex:'Sufixul -chen → genul neutru (das).' },
          { q:'„der Sommer” este...', opts:['masculin','feminin','neutru'], a:0 },
          { q:'Alege articolul corect:', img:'../assets/nouns/apfel.jpg', opts:['der','die','das'], a:0 },
          { q:'Alege articolul corect:', img:'../assets/nouns/rose.jpg', opts:['der','die','das'], a:1 },
          { q:'Alege articolul corect:', img:'../assets/nouns/haus.jpg', opts:['der','die','das'], a:2 },
          { q:'Alege articolul corect:', img:'../assets/nouns/uhr.jpg', opts:['der','die','das'], a:1 }
        ],
        tf: [
          { q:'Sufixul -chen dă de obicei genul neutru.', a:true, ex:'Ex.: das Mädchen, das Häuschen.' }
        ]
      },

      // Das Nomen
      'das-nomen': {
        tf: [
          { q:'Toate substantivele se scriu cu literă mare.', a:true, ex:'În germană, toate substantivele sunt capitalizate (ex.: das Haus).' }
        ],
        mc: [
          { q:'Articol tipic pentru feminin:', opts:['der','die','das'], a:1 },
          { q:'Ce reprezintă imaginea?', img:'../assets/nouns/apfel.jpg', opts:['Apfel','Haus','Blume'], a:0 },
          { q:'Ce reprezintă imaginea?', img:'../assets/nouns/haus.jpg', opts:['Auto','Haus','Pix'], a:1 },
          { q:'Ce reprezintă imaginea?', img:'../assets/nouns/blume.jpg', opts:['Blume','Frau','Straße'], a:0 },
          { q:'Ce reprezintă imaginea?', img:'../assets/nouns/auto.jpg', opts:['Frau','Auto','Bruder'], a:1 }
        ],
        fill: [
          { q:'Pluralul la „Apfel” este ____', a:['apfel','äpfel'] },
          { q:'Traducere RO: „Uhr” = ____', a:['ceas'] }
        ]
      },

      // Das Verb
      'das-verb': {
        tf: [
          { q:'Infinitivul are pronume personal.', a:false, ex:'Infinitivul este forma de dicționar (ex.: kommen), fără pronume.' },
          { q:'Verbul e, de obicei, pe poziția 2 în propoziție.', a:true, ex:'Declarațiile simple în germană au verbul pe poziția 2 (ex.: Ich gehe heute).' }
        ],
        mc: [
          { q:'Terminație pentru „du” (Präsens):', opts:['-e','-st','-t'], a:1, ex:'du kommst, du machst (terminație -st).' },
          { q:'Terminație pentru „ihr” (Präsens):', opts:['-en','-t','-st'], a:1, ex:'ihr kommt, ihr macht (terminație -t).' }
        ],
        fill: [
          { q:'ich komm__ (kommen, Präsens)', a:['e'] },
          { q:'wir komm__ (kommen, Präsens)', a:['en'] },
          { q:'er/sie/es geh__ (gehen, Präsens)', a:['t'] }
        ]
      },

      // Personalpronomen
      'personalpronomen': {
        mc: [
          { q:'„wir” în Dativ:', opts:['uns','euch','ihnen'], a:0 },
          { q:'„sie” (3 pl.) în Akkusativ:', opts:['ihnen','sie','ihr'], a:1 }
        ],
        tf: [
          { q:'„ich” Dativ = mir.', a:true, ex:'ich → mir (Dativ), ich → mich (Akkusativ).' }
        ],
        fill: [
          { q:'„ihr” (2 pl.) Dativ = ____', a:['euch'] }
        ]
      },

      // Possessivpronomen
      'possessivpronomen': {
        mc: [
          { q:'„al meu” (fem., Nominativ):', opts:['mein','meine','meinen'], a:1 },
          { q:'„al tău” (masc., Akkusativ):', opts:['deinen','dein','deine'], a:0 }
        ],
        fill: [
          { q:'Ich habe ____ Auto. (al meu)', a:['mein'] }
        ]
      },

      // Das Schulsystem
      'das-schulsystem': {
        tf: [
          { q:'AHS se termină cu Matura.', a:true },
          { q:'BMS oferă Matură.', a:false },
          { q:'„die Lehre” este duală (muncă + școală).', a:true }
        ],
        mc: [
          { q:'Polytechnische Schule pentru vârsta:', opts:['6–10','10–14','14–15'], a:2 },
          { q:'„die Lehre” începe de regulă după:', opts:['școala primară','școala obligatorie','Matura'], a:1 },
          { q:'AHS are:', opts:['Unterstufe + Oberstufe','Bacalaureat dual','doar primar'], a:0 }
        ],
        fill: [
          { q:'Gymnasium (AHS) are Unterstufe și ____', a:['oberstufe'] }
        ]
      },

      // Buchstabiertafel
      'buchstabiertafel': {
        tf: [
          { q:'Litera ß se numește „scharfes s”.', a:true }
        ],
        fill: [
          { q:'Scrie litera specială: „____ eszett”', a:['ß','ss'] }
        ]
      }
    },

    // ====== - audio (toate exercițiile audio într-un singur loc) ======
    audio: {
      // - audio: Wochentage
      'die-wochentage': [
        { q:'Ascultă și scrie ziua:', tts:'Montag', a:['montag'] },
        { q:'Ascultă și traduce în RO:', tts:'Sonntag', a:['duminica','duminică'] }
      ],
      // - audio: Jahreszeiten
      'die-jahreszeiten': [
        { q:'Ascultă și scrie anotimpul:', tts:'Frühling', a:['fruhling','frühling'] }
      ],
      // - audio: Uhrzeit
      'die-uhrzeit': [
        { q:'Ascultă și scrie ora (ex. 7:30):', tts:'Es ist halb acht', a:['7:30','07:30','7 30'] },
        { q:'Ascultă și scrie: 8:45', tts:'Es ist Viertel vor neun', a:['8:45','08:45','8 45'] }
      ],
      // - audio: Tageszeiten
      'die-tageszeiten': [
        { q:'Ascultă și scrie partea zilei:', tts:'der Morgen', a:['morgen'] }
      ],
      // - audio: Verb
      'das-verb': [
        { q:'Ascultă și scrie infinitivul:', tts:'kommen', a:['kommen'] },
        { q:'Ascultă și scrie infinitivul:', tts:'gehen', a:['gehen'] }
      ],
      // - audio: Nomen (vocabular)
      'das-nomen': [
        { q:'Ascultă și scrie substantivul:', tts:'die Blume', a:['blume'] },
        { q:'Ascultă și scrie substantivul:', tts:'das Haus', a:['haus'] }
      ]
    }
  };

  // ====== Engine ======
  const LEVELS = {
    easy:   { count: 10, minutes: 20 },
    medium: { count: 15, minutes: 20 },
    hard:   { count: 25, minutes: 25 },
    hero:   { count: 40, minutes: 35 }
  };

  let state = { questions:[], index:0, score:0, answered:false, difficulty:'easy', timerId:null, deadline:0, usedCategories:[], wrongs: [] };

  function buildPool() {
    const pool = []; const usedCats = new Set();
    Object.entries(BANK.categories).forEach(([cat, sets])=>{
      ['tf','mc','fill','select','match'].forEach(type=>{
        (sets[type]||[]).forEach(item=>{ pool.push({ cat, type, ...item }); usedCats.add(cat); });
      });
    });
    Object.entries(BANK.audio).forEach(([cat, arr])=>{
      arr.forEach(item=>{ pool.push({ cat, type:'audio', ...item }); usedCats.add(cat); });
    });
    return { pool: shuffle(pool), cats: Array.from(usedCats) };
  }

  function pickQuestions(pool, count) {
    const byCat = pool.reduce((m,q)=> (m[q.cat]??=[]).push(q), {}), cats = Object.keys(byCat);
    const result = [];
    let ci = 0;
    while (result.length < Math.min(count, pool.length) && cats.length) {
      const c = cats[ci % cats.length]; const arr = byCat[c];
      if (arr && arr.length) result.push(arr.shift());
      ci++;
      for (let i=cats.length-1;i>=0;i--) if (!byCat[cats[i]]?.length) cats.splice(i,1);
    }
    if (result.length < count) {
      const rest = pool.filter(q=>!result.includes(q));
      result.push(...rest.slice(0, count - result.length));
    }
    return result.slice(0, count);
  }

  function startGeneralTest(levelKey='easy') {
    const level = LEVELS[levelKey] || LEVELS.easy;
    const { pool } = buildPool();
    const questions = pickQuestions(pool, level.count);
    state = {
      questions, index:0, score:0, answered:false,
      difficulty: levelKey, timerId:null,
      deadline: Date.now() + level.minutes*60*1000,
      usedCategories: Array.from(new Set(questions.map(q=>q.cat))),
      wrongs: [] // colectăm categoriile întrebărilor greșite
    };
    $('#difficulty-selection').style.display = 'none';
    $('#test-container').style.display = '';
    $('#result-container').style.display = 'none';
    $('#check-question').onclick = onCheck;
    $('#next-question').onclick = onNext;
    renderCurrent(); startTimer();
  }

  function startTimer() {
    const tick = () => {
      const sec = Math.max(0, Math.floor((state.deadline - Date.now())/1000));
      const mm = String(Math.floor(sec/60)).padStart(2,'0'), ss = String(sec%60).padStart(2,'0');
      $('#time-left').textContent = `${mm}:${ss}`;
      if (sec <= 0) { clearInterval(state.timerId); state.timerId=null; finish(); }
    };
    tick(); if (state.timerId) clearInterval(state.timerId); state.timerId = setInterval(tick, 1000);
  }

  function renderCurrent() {
    const q = state.questions[state.index]; const area = $('#question-area'); if (!q) return;
    let head = `<div class="q-head"><div style="display:flex;justify-content:space-between;align-items:center;">
      <div><strong>${state.index+1} / ${state.questions.length}</strong> · <span style="opacity:.8">${labelCat(q.cat)}</span></div>
      ${q.type==='audio' ? `<button class="btn" id="playAudio">🔊 Ascultă</button>`:''}
    </div></div>`;

    const media = q.img ? `<div class="q-media"><img class="q-img" src="${q.img}" alt="media"></div>` : '';

    let body = '';
    if (q.type === 'tf') {
      body = `${media}<div class="question-card" style="margin-top:8px;">${q.q}</div>
      <div class="answers">
        <label><input type="radio" name="ans" value="true"> Adevărat</label>
        <label><input type="radio" name="ans" value="false"> Fals</label>
      </div>`;
    } else if (q.type === 'mc') {
      body = `${media}<div class="question-card" style="margin-top:8px;">${q.q}</div>
      <div class="answers" style="display:grid;gap:8px;margin-top:6px;">
        ${q.opts.map((opt,i)=>`<label><input type="radio" name="ans" value="${i}"> ${opt}</label>`).join('')}
      </div>`;
    } else if (q.type === 'fill' || q.type === 'audio') {
      body = `${media}<div class="question-card" style="margin-top:8px;">${q.q} <input id="fillInput" type="text" style="min-width:200px;"></div>`;
    } else {
      body = `<div class="question-card">Tip necunoscut.</div>`;
    }

    area.innerHTML = head + body;
    if (q.type === 'audio') {
      $('#playAudio')?.addEventListener('click', ()=> speak(q.tts));
      setTimeout(()=> speak(q.tts), 200);
    }
    state.answered = false; $('#check-question').disabled = false; $('#next-question').disabled = true;
  }

  // Helper: textul răspunsului corect + (explicație opțional)
  function getCorrectText(q) {
    if (!q) return '';
    if (q.type === 'tf') return q.a ? 'Adevărat' : 'Fals';
    if (q.type === 'mc') return (q.opts?.[q.a] ?? '');
    if (q.type === 'fill' || q.type === 'audio') {
      const arr = Array.isArray(q.a) ? q.a : [q.a];
      const uniq = Array.from(new Set(arr.filter(Boolean)));
      if (!uniq.length) return '';
      if (uniq.length === 1) return uniq[0];
      return `${uniq[0]} (sau: ${uniq.slice(1).join(', ')})`;
    }
    return '';
  }

  // Modifică onCheck să trimită și întrebarea în feedback
  function onCheck() {
    if (state.answered) return;
    const q = state.questions[state.index]; let ok = false;
    if (q.type === 'tf') {
      const v = $('input[name="ans"]:checked')?.value; ok = (String(q.a) === v);
    } else if (q.type === 'mc') {
      const v = $('input[name="ans"]:checked')?.value; ok = (String(q.a) === String(v));
    } else if (q.type === 'fill' || q.type === 'audio') {
      const v = $('#fillInput')?.value || ''; const answers = Array.isArray(q.a) ? q.a : [q.a];
      ok = answers.some(ans => norm(v) === norm(ans));
    }

    if (ok) {
      state.score++;
    } else {
      // LOG: categoria întrebării greșite (pentru progress.html)
      state.wrongs.push(q.cat);
    }

    showFeedback(q, ok);
    state.answered = true; $('#check-question').disabled = true; $('#next-question').disabled = false;
  }

  function onNext() { if (state.index < state.questions.length - 1) { state.index++; renderCurrent(); } else { finish(); } }

  function showFeedback(q, ok) {
    const area = $('#question-area'); 
    const fb = document.createElement('div');
    fb.className = 'important'; 
    fb.style.marginTop = '10px';
    if (ok) {
      fb.textContent = 'Corect!';
    } else {
      const correct = getCorrectText(q);
      const ex = q?.ex ? `<div class="muted" style="margin-top:4px;">Explicație: ${q.ex}</div>` : '';
      fb.innerHTML = `Răspuns greșit. <br>Răspuns corect: <strong>${escapeHtml(correct)}</strong>${ex}`;
    }
    area.appendChild(fb);
  }

  // Mic utilitar pentru securitate HTML în feedback
  function escapeHtml(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function finish() {
    clearInterval(state.timerId); state.timerId = null;
    $('#test-container').style.display = 'none'; $('#result-container').style.display = '';
    const percent = Math.round(state.score / state.questions.length * 100);
    $('#score-percentage').textContent = `Scor: ${state.score}/${state.questions.length} (${percent}%)`;
    $('#score-breakdown').textContent = `Dificultate: ${state.difficulty} · Categorii: ${state.usedCategories.map(labelCat).join(', ')}`;
    const rec = {
      when:new Date().toISOString(),
      difficulty: state.difficulty,
      total: state.questions.length,
      score: state.score,
      percent,
      categories: state.usedCategories,
      wrongCategories: Array.from(new Set(state.wrongs)) // <-- doar titlurile lecțiilor cu greșeli
    };
    try {
      const all = JSON.parse(localStorage.getItem('generalTestHistory')||'[]');
      all.push(rec);
      localStorage.setItem('generalTestHistory', JSON.stringify(all));
      localStorage.setItem('generalTestLast', JSON.stringify(rec));
    } catch {}
  }

  function saveAndGoProgress() { window.location.href = '../progress.html'; }

  function labelCat(key) {
    const map = {
      'die-wochentage':'Wochentage','die-jahreszeiten':'Jahreszeiten','die-uhrzeit':'Uhrzeit','die-tageszeiten':'Tageszeiten',
      'der-die-das':'Der/Die/Das','das-nomen':'Das Nomen','das-adjektiv':'Das Adjektiv','das-verb':'Das Verb',
      'personalpronomen':'Personalpronomen','possessivpronomen':'Possessivpronomen','das-schulsystem':'Das Schulsystem',
      'buchstabiertafel':'Buchstabiertafel'
    }; return map[key] || key;
  }

  window.startGeneralTest = startGeneralTest;
  window.saveAndGoProgress = saveAndGoProgress;
})();