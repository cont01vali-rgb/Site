/* General Test Engine
   - Exerciții pe categorii (după lecțiile existente)
   - Secțiune separată pentru AUDIO (// - audio)
   - Dificultăți: easy/medium/hard/hero/crazy
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
          { q:'„Miercuri” înseamnă în germană:', opts:['Donnerstag','Dienstag','Mittwoch'], a:2 },
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
          { q:'„Mädchen” are articolul...', opts:['der','die','das'], a:2, ex:'Sufixul -chen → genul neutru (das).' },
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
          { q:'Care este terminatia verbului :ich komm__ (kommen, Präsens)', a:['e'] },
          { q:'Care este terminatia verbului :wir komm__ (kommen, Präsens)', a:['en'] },
          { q:'Care este terminatia verbului :er/sie/es geh__ (gehen, Präsens)', a:['t'] }
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
        { q:'Ascultă și scrie ora: (ex. 23:42):', tts:'Es ist halb acht', a:['7:30','07:30','7 30'] },
        { q:'Ascultă și scrie ora: (ex. 23:42):', tts:'Es ist Viertel vor neun', a:['8:45','08:45','8 45'] }
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

  // Mapare exerciții externe (data/general-exercises.js) în BANK
  function mergeExternalExercisesIntoBank(B, ext) {
    if (!ext) return;
    const ensureCat = (cat) => {
      if (!B.categories[cat]) B.categories[cat] = { tf:[], mc:[], fill:[] };
      if (!B.audio[cat]) B.audio[cat] = [];
      return B.categories[cat];
    };
    Object.entries(ext).forEach(([cat, items]) => {
      if (!Array.isArray(items)) return;
      const bucket = ensureCat(cat);
      items.forEach(it => {
        const t = String(it.type || '').toLowerCase();
        const qText = it.question || it.text || '';
        const ex = it.explanation ?? it.ex;
        const img = it.img || it.image; // opțional
        if (t === 'truefalse' || t === 'tf') {
          // Verifică dacă folosește 'answer' în loc de 'correct'
          const correctAnswer = it.correct !== undefined ? !!it.correct : !!it.answer;
          bucket.tf.push({ q: qText, a: correctAnswer, ...(ex?{ex}:{}), ...(img?{img}:{}) });
        } else if (t === 'multiple' || t === 'mc') {
          const opts = Array.isArray(it.options) ? it.options.slice() : [];
          let idx = 0;
          
          // Verifică dacă correct este o literă (a, b, c)
          if (typeof it.correct === 'string' && it.correct.match(/^[abc]$/i)) {
            idx = it.correct.toLowerCase().charCodeAt(0) - 97; // a=0, b=1, c=2
          } else {
            // Căutare normală după valoare
            idx = Math.max(0, opts.findIndex(o => String(o) === String(it.correct)));
          }
          
          const out = { q: qText, opts, a: idx, ...(ex?{ex}:{}), ...(img?{img}:{}) };
          if (it.word) out.tts = it.word; // MC cu audio
          bucket.mc.push(out);
        } else if (t === 'fill') {
          const corr = Array.isArray(it.correct) ? it.correct : [it.correct];
          bucket.fill.push({ q: qText, a: corr.filter(Boolean), ...(ex?{ex}:{}), ...(img?{img}:{}) });
        } else if (t === 'audio') {
          // audio cu opțiuni -> MC + tts; altfel -> secțiunea audio (răspuns scris)
          if (Array.isArray(it.options) && it.options.length) {
            const opts = it.options.slice();
            let idx = Math.max(0, opts.findIndex(o => String(o) === String(it.correct)));
            bucket.mc.push({ q: qText, opts, a: idx, tts: it.word, ...(ex?{ex}:{}), ...(img?{img}:{}) });
          } else {
            const corr = Array.isArray(it.correct) ? it.correct : [it.correct];
            B.audio[cat].push({ q: qText, tts: it.word, a: corr.filter(Boolean) });
          }
        } else if (t === 'img') {
          // dacă are opțiuni -> MC, altfel -> FILL, cu imagine
          if (Array.isArray(it.options) && it.options.length) {
            const opts = it.options.slice();
            let idx = Math.max(0, opts.findIndex(o => String(o) === String(it.correct)));
            bucket.mc.push({ q: qText || 'Alege varianta corectă', opts, a: idx, ...(img?{img}:{}), ...(ex?{ex}:{}) });
          } else {
            const corr = Array.isArray(it.correct) ? it.correct : [it.correct];
            bucket.fill.push({ q: qText || 'Ce vezi în imagine?', a: corr.filter(Boolean), ...(img?{img}:{}), ...(ex?{ex}:{}) });
          }
        }
      });
    });
  }

  // Integrează banca externă (dacă există)
  function waitForExternalExercises(timeout=5000) {
    return new Promise(resolve => {
      const start = Date.now();
      const tick = () => {
        if (window.generalExercises) {
          try { 
            console.log('=== MERGING EXTERNAL EXERCISES ===');
            console.log('Available external categories:', Object.keys(window.generalExercises));
            console.log('BANK before merge - categories:', Object.keys(BANK.categories));
            console.log('BANK before merge - audio:', Object.keys(BANK.audio));
            
            mergeExternalExercisesIntoBank(BANK, window.generalExercises); 
            
            console.log('BANK after merge - categories:', Object.keys(BANK.categories));
            console.log('BANK after merge - audio:', Object.keys(BANK.audio));
            
            // Verifică categoriile specifice
            if (BANK.categories['die-zahlen']) {
              console.log('die-zahlen in BANK.categories:', {
                tf: BANK.categories['die-zahlen'].tf?.length || 0,
                mc: BANK.categories['die-zahlen'].mc?.length || 0,
                fill: BANK.categories['die-zahlen'].fill?.length || 0
              });
            }
            if (BANK.categories['das-lernziel']) {
              console.log('das-lernziel in BANK.categories:', {
                tf: BANK.categories['das-lernziel'].tf?.length || 0,
                mc: BANK.categories['das-lernziel'].mc?.length || 0,
                fill: BANK.categories['das-lernziel'].fill?.length || 0
              });
            }
            
            console.log('=== MERGE COMPLETE ===');
            return resolve(true);
          } catch(e) { 
            console.error('Eroare încărcare exerciții externe:', e); 
            console.log('Stack trace:', e.stack);
          }
        }
        if (Date.now() - start > timeout) {
          console.warn('Timeout waiting for external exercises');
          return resolve(false);
        }
        setTimeout(tick, 50);
      };
      tick();
    });
  }

  // ====== Engine ======
  const LEVELS = {
    easy:   { count: 10, minutes: 12 },
    medium: { count: 15, minutes: 15 },
    hard:   { count: 25, minutes: 13 },
    hero:   { count: 40, minutes: 15 },
    crazy:  { count: 150, minutes: 40 }
  };

  let state = { questions:[], index:0, score:0, answered:false, difficulty:'easy', timerId:null, deadline:0, usedCategories:[], wrongs: [] };

  // ====== Sistem anti-repetare ======
  function getRecentQuestions() {
    try {
      return JSON.parse(localStorage.getItem('generalRecentQuestions') || '[]');
    } catch {
      return [];
    }
  }

  function saveRecentQuestions(questions) {
    try {
      // Păstrăm ultimele 100 de întrebări pentru a evita repetarea
      const recent = questions.slice(-100);
      localStorage.setItem('generalRecentQuestions', JSON.stringify(recent));
    } catch (e) {
      console.error('Eroare la salvarea întrebărilor recente:', e);
    }
  }

  function getQuestionSignature(q) {
    // Creează o semnătură unică pentru întrebare
    return `${q.cat}-${q.type}-${(q.q || '').substring(0, 50)}`;
  }

  // Event handler global pentru Enter - doar pentru general test
  function handleGlobalEnter(e) {
    // Verifică că suntem într-un test activ
    if (!state.questions || !state.questions.length) return;
    
    if (e.key === 'Enter') {
      // Previne comportamentul default pentru a evita interferențele
      e.preventDefault();
      
      if (!state.answered) {
        // Dacă nu am verificat încă răspunsul, verifică-l
        onCheck();
      } else {
        // Dacă am verificat deja, treci la următoarea întrebare
        onNext();
      }
    }
  }

  function buildPool() {
    const pool = []; const usedCats = new Set();
    
    // Verifică încărcarea exercițiilor externe
    console.log('=== BUILD POOL START ===');
    console.log('External exercises loaded:', !!window.generalExercises);
    if (window.generalExercises) {
      console.log('External categories:', Object.keys(window.generalExercises));
      // Verifică categoriile specifice
      if (window.generalExercises['die-zahlen']) {
        console.log('die-zahlen exercises:', window.generalExercises['die-zahlen'].length);
      }
      if (window.generalExercises['das-lernziel']) {
        console.log('das-lernziel exercises:', window.generalExercises['das-lernziel'].length);
      }
    }
    
    console.log('BANK categories:', Object.keys(BANK.categories));
    console.log('BANK audio:', Object.keys(BANK.audio));
    
    Object.entries(BANK.categories).forEach(([cat, sets])=>{
      console.log(`Processing BANK category ${cat}:`, {
        tf: sets.tf?.length || 0,
        mc: sets.mc?.length || 0,
        fill: sets.fill?.length || 0,
        select: sets.select?.length || 0,
        match: sets.match?.length || 0
      });
      
      ['tf','mc','fill','select','match'].forEach(type=>{
        (sets[type]||[]).forEach(item=>{ pool.push({ cat, type, ...item }); usedCats.add(cat); });
      });
    });
    
    Object.entries(BANK.audio).forEach(([cat, arr])=>{
      console.log(`Processing BANK audio category ${cat}: ${arr.length} exercises`);
      arr.forEach(item=>{ pool.push({ cat, type:'audio', ...item }); usedCats.add(cat); });
    });
    
    console.log('=== FINAL POOL ===');
    console.log('Final pool size:', pool.length);
    console.log('Categories found:', Array.from(usedCats));
    
    // Contează exercițiile pe categorie
    const categoryCounts = pool.reduce((acc, q) => {
      acc[q.cat] = (acc[q.cat] || 0) + 1;
      return acc;
    }, {});
    console.log('Exercises by category:', categoryCounts);
    console.log('=== BUILD POOL END ===');
    
    return { pool: shuffle(pool), cats: Array.from(usedCats) };
  }

  function pickQuestions(pool, count) {
    const recentQuestions = getRecentQuestions();
    const recentSignatures = new Set(recentQuestions);
    
    // Filtrează pool-ul pentru a evita întrebările recente
    const freshPool = pool.filter(q => {
      const signature = getQuestionSignature(q);
      return !recentSignatures.has(signature);
    });
    
    console.log('Total pool:', pool.length, 'Fresh pool (excluding recent):', freshPool.length);
    
    // Folosește fresh pool-ul dacă e suficient de mare, altfel folosește pool-ul complet
    const poolToUse = freshPool.length >= count ? freshPool : pool;
    
    const byCat = {}; 
    poolToUse.forEach(q => {
      if (!byCat[q.cat]) byCat[q.cat] = [];
      byCat[q.cat].push(q);
    });
    
    const cats = Object.keys(byCat);
    console.log('Categories with questions:', cats);
    cats.forEach(cat => {
      console.log(`${cat}: ${byCat[cat].length} questions`);
    });
    
    const result = [];
    let ci = 0;
    
    // Prima fază: distribuie echilibrat pe categorii
    while (result.length < Math.min(count, poolToUse.length) && cats.length) {
      const c = cats[ci % cats.length]; 
      const arr = byCat[c];
      if (arr && arr.length) {
        result.push(arr.shift());
      }
      ci++;
      
      // Elimină categoriile goale
      for (let i = cats.length - 1; i >= 0; i--) {
        if (!byCat[cats[i]]?.length) {
          cats.splice(i, 1);
        }
      }
    }
    
    // A doua fază: dacă încă avem nevoie de întrebări și există în pool, le adăugăm
    if (result.length < count) {
      const remaining = poolToUse.filter(q => !result.some(r => r === q));
      const needed = count - result.length;
      result.push(...remaining.slice(0, needed));
    }
    
    console.log('Final questions selected:', result.length);
    console.log('Questions by category:', result.reduce((acc, q) => {
      acc[q.cat] = (acc[q.cat] || 0) + 1;
      return acc;
    }, {}));
    
    return result.slice(0, count);
  }

  async function startGeneralTest(levelKey='easy') {
    // Curăță event listener-ul global pentru Enter dacă există
    document.removeEventListener('keypress', handleGlobalEnter);
    
    // Așteptăm exercițiile externe și forțăm merge-ul
    console.log('🔄 Aștept exercițiile externe...');
    const mergeSuccess = await waitForExternalExercises();
    
    if (!mergeSuccess && window.generalExercises) {
      console.log('⚠️ waitForExternalExercises a eșuat, încerc merge manual...');
      try {
        mergeExternalExercisesIntoBank(BANK, window.generalExercises);
        console.log('✅ Merge manual reușit!');
      } catch (error) {
        console.error('❌ Merge manual eșuat:', error);
      }
    }
    
    const level = LEVELS[levelKey] || LEVELS.easy;
    const { pool } = buildPool();
    const questions = pickQuestions(pool, level.count);
    
    // Salvează întrebările selectate în tracker-ul recent
    const signatures = questions.map(q => getQuestionSignature(q));
    saveRecentQuestions(signatures);
    
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
    
    // Adaugă event listener global pentru Enter
    document.addEventListener('keypress', handleGlobalEnter);
    
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
    const canPlay = (q.type==='audio') || !!q.tts;
    let head = `<div class="q-head"><div style="display:flex;justify-content:space-between;align-items:center;">
      <div><strong>${state.index+1} / ${state.questions.length}</strong> · <span style="opacity:.8">${labelCat(q.cat)}</span></div>
      ${canPlay ? `<button class="btn" id="playAudio">🔊 Ascultă</button>`:''}
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
      body = `${media}<div class="question-card" style="margin-top:8px;">${q.q} <input id="fillInput" type="text" style="min-width:200px;padding:8px;border:1px solid #ddd;border-radius:4px;"></div>`;
    } else {
      body = `<div class="question-card">Tip necunoscut.</div>`;
    }

    area.innerHTML = head + body;
    
    // Focus pe input dacă există
    const fillInput = $('#fillInput');
    if (fillInput) {
      fillInput.focus();
    }
    
    if (canPlay) {
      const say = () => speak(q.tts || q.tts || q.tts || q.tts); // q.tts pentru audio/MC audio
      $('#playAudio')?.addEventListener('click', say);
      setTimeout(say, 200);
    }
    state.answered = false; 
    $('#check-question').disabled = false; 
    $('#check-question').style.display = '';
    $('#next-question').disabled = true;
    $('#next-question').style.display = 'none';
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
      
      // Stilizează input-ul ca la vocabulary test
      const input = $('#fillInput');
      if (input) {
        input.style.backgroundColor = ok ? '#dcfce7' : '#fee2e2';
        input.style.borderColor = ok ? '#22c55e' : '#ef4444';
        input.disabled = true;
      }
    }

    if (ok) {
      state.score++;
    } else {
      // LOG: categoria întrebării greșite (pentru progress.html)
      state.wrongs.push(q.cat);
    }

    showFeedback(q, ok);
    state.answered = true; 
    $('#check-question').disabled = true; 
    $('#check-question').style.display = 'none';
    $('#next-question').disabled = false;
    $('#next-question').style.display = '';
  }

  function onNext() { if (state.index < state.questions.length - 1) { state.index++; renderCurrent(); } else { finish(); } }

  function showFeedback(q, ok) {
    const area = $('#question-area'); 
    
    if (ok) {
      // Design verde frumos pentru răspuns corect
      const feedbackDiv = document.createElement('div');
      feedbackDiv.style.cssText = 'margin-top:8px;padding:8px;background:#dcfce7;border-radius:4px;color:#16a34a;';
      feedbackDiv.innerHTML = '<strong>✓ Correct!</strong>';
      area.appendChild(feedbackDiv);
    } else {
      // Design roșu frumos pentru răspuns greșit cu răspunsul corect
      const correct = getCorrectText(q);
      const feedbackDiv = document.createElement('div');
      feedbackDiv.style.cssText = 'margin-top:8px;padding:8px;background:#fee2e2;border-radius:4px;color:#dc2626;';
      
      let feedbackContent = `<strong>✗ Incorect!</strong> Răspunsul corect: <strong>${escapeHtml(correct)}</strong>`;
      
      // Adaugă explicația dacă există
      if (q?.ex) {
        feedbackContent += `<div style="margin-top:4px;opacity:0.9;font-size:0.9rem;"><em>Explicație: ${escapeHtml(q.ex)}</em></div>`;
      }
      
      feedbackDiv.innerHTML = feedbackContent;
      area.appendChild(feedbackDiv);
    }
  }

  // Mic utilitar pentru securitate HTML în feedback
  function escapeHtml(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function finish() {
    // Curăță event listener-ul global pentru Enter
    document.removeEventListener('keypress', handleGlobalEnter);
    
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

  function saveAndGoProgress() { 
    // Curăță event listener-ul înainte de a părăsi pagina
    document.removeEventListener('keypress', handleGlobalEnter);
    window.location.href = '../progress.html'; 
  }

  function labelCat(key) {
    const map = {
      'die-wochentage':'Wochentage','die-jahreszeiten':'Jahreszeiten','die-uhrzeit':'Uhrzeit','die-tageszeiten':'Tageszeiten',
      'der-die-das':'Der/Die/Das','das-nomen':'Das Nomen','das-adjektiv':'Das Adjektiv','das-verb':'Das Verb',
      'personalpronomen':'Personalpronomen','possessivpronomen':'Possessivpronomen','das-schulsystem':'Das Schulsystem',
      'buchstabiertafel':'Alfabet','die-zahlen':'Zahlen','w-fragen':'W‑Fragen','grosse-9':'Große 9','das-lernziel':'Das Lernziel'
    }; return map[key] || key;
  }

  window.startGeneralTest = startGeneralTest;
  window.saveAndGoProgress = saveAndGoProgress;
  
  // Funcții de debugging pentru console
  window.clearRecentQuestions = () => {
    localStorage.removeItem('generalRecentQuestions');
    console.log('Recent questions cleared!');
  };
  
  window.showRecentQuestions = () => {
    const recent = getRecentQuestions();
    console.log('Recent questions:', recent);
    return recent;
  };
  
  // Funcție de testare manuală a merge-ului
  window.forceTestMerge = () => {
    console.log('=== TESTARE MANUALĂ MERGE ===');
    console.log('BANK înainte de merge:', {
      categories: Object.keys(BANK.categories),
      audio: Object.keys(BANK.audio)
    });
    
    if (window.generalExercises) {
      console.log('Exerciții externe disponibile:', Object.keys(window.generalExercises));
      
      try {
        mergeExternalExercisesIntoBank(BANK, window.generalExercises);
        console.log('✅ Merge executat cu succes!');
        console.log('BANK după merge:', {
          categories: Object.keys(BANK.categories),
          audio: Object.keys(BANK.audio)
        });
        
        // Verifică categoriile specifice
        if (BANK.categories['die-zahlen']) {
          console.log('✅ die-zahlen găsit în BANK:', BANK.categories['die-zahlen']);
        }
        if (BANK.categories['das-lernziel']) {
          console.log('✅ das-lernziel găsit în BANK:', BANK.categories['das-lernziel']);
        }
        
        return true;
      } catch (error) {
        console.error('❌ Eroare la merge:', error);
        return false;
      }
    } else {
      console.error('❌ window.generalExercises nu este disponibil');
      return false;
    }
  };
  
  // Expune funcții pentru testare
  window.buildPool = buildPool;
  window.waitForExternalExercises = waitForExternalExercises;
  window.mergeExternalExercisesIntoBank = mergeExternalExercisesIntoBank;
  window.BANK = BANK; // Expune BANK pentru debugging
  
  // Curăță event listener-ul când se părăsește pagina
  window.addEventListener('beforeunload', () => {
    document.removeEventListener('keypress', handleGlobalEnter);
  });
})();