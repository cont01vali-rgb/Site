// Verb data
const verbsData = [
  {"verb":"wohnen","traducere":"a locui","exemplu":"Ich wohne in Graz."},
  {"verb":"heißen","traducere":"a se numi","exemplu":"Ich heiße Maria."},
  {"verb":"lieben","traducere":"a iubi","exemplu":"Er liebt Musik."},
  {"verb":"lernen","traducere":"a învăța","exemplu":"Sie lernt Deutsch."},
  {"verb":"arbeiten","traducere":"a lucra","exemplu":"Er arbeitet im Büro."},
  {"verb":"machen","traducere":"a face","exemplu":"Wir machen die Hausaufgaben."},
  {"verb":"spielen","traducere":"a se juca / a juca","exemplu":"Die Kinder spielen im Park."},
  {"verb":"haben","traducere":"a avea","exemplu":"Ich habe Zeit."},
  {"verb":"sein","traducere":"a fi","exemplu":"Das ist richtig."},
  {"verb":"brauchen","traducere":"a avea nevoie","exemplu":"Ich brauche Hilfe."},
  {"verb":"kaufen","traducere":"a cumpăra","exemplu":"Sie kauft ein Brot."},
  {"verb":"trinken","traducere":"a bea","exemplu":"Wir trinken Wasser."},
  {"verb":"essen","traducere":"a mânca","exemplu":"Er isst eine Suppe."},
  {"verb":"lesen","traducere":"a citi","exemplu":"Sie liest ein Buch."},
  {"verb":"schreiben","traducere":"a scrie","exemplu":"Wir schreiben einen Brief."},
  {"verb":"hören","traducere":"a auzi / a asculta","exemplu":"Ich höre Musik."},

    // A1 – Rutina zilnică și acțiuni de bază
  {"verb":"schlafen","traducere":"a dormi","exemplu":"Ich schlafe acht Stunden.","image":"schlafen.jpeg"},
  {"verb":"kochen","traducere":"a găti","exemplu":"Ich koche Suppe.","image":"kochen.jpg"},
  {"verb":"waschen","traducere":"a spăla","exemplu":"Ich wasche die Hände.","image":"waschen.jpeg"},
  {"verb":"putzen","traducere":"a curăța","exemplu":"Ich putze die Wohnung.","image":"putzen.jpg"},
  {"verb":"einkaufen","traducere":"a face cumpărături","exemplu":"Ich kaufe im Supermarkt ein.","image":"einkaufen.jpg"},
  {"verb":"frühstücken","traducere":"a lua micul dejun","exemplu":"Ich frühstücke um acht."},

  // A1 – Comunicare
  {"verb":"antworten","traducere":"a răspunde","exemplu":"Ich antworte schnell."},
  {"verb":"verstehen","traducere":"a înțelege","exemplu":"Ich verstehe dich."},

  // A1 – Percepție și mișcare
  {"verb":"sehen","traducere":"a vedea","exemplu":"Ich sehe den Film."},
  {"verb":"schauen","traducere":"a privi / a se uita","exemplu":"Ich schaue TV."},
  {"verb":"schwimmen","traducere":"a înota","exemplu":"Ich schwimme im Schwimmbad.","image":"schwimmen.jpg"},
  {"verb":"sitzen","traducere":"a sta jos","exemplu":"Ich sitze auf dem Stuhl.","image":"sitzen.jpg"},
  {"verb":"stehen","traducere":"a sta în picioare","exemplu":"Ich stehe im Bus."},

  // A1 – Folositoare la cumpărături/oraș
  {"verb":"bezahlen","traducere":"a plăti","exemplu":"Ich bezahle die Rechnung."},
  {"verb":"nehmen","traducere":"a lua","exemplu":"Ich nehme den Bus."},
  {"verb":"geben","traducere":"a da","exemplu":"Ich gebe dir das Buch."},
  {"verb":"bringen","traducere":"a aduce","exemplu":"Ich bringe das Wasser."},
  {"verb":"öffnen","traducere":"a deschide","exemplu":"Ich öffne die Tür."},
  {"verb":"schließen","traducere":"a închide","exemplu":"Ich schließe das Fenster."},
  {"verb":"warten","traducere":"a aștepta","exemplu":"Ich warte an der Haltestelle."},
  {"verb":"telefonieren","traducere":"a vorbi la telefon","exemplu":"Ich telefoniere mit Maria."},
  {"verb":"suchen","traducere":"a căuta","exemplu":"Ich suche meine Brille."},
  {"verb":"finden","traducere":"a găsi","exemplu":"Ich finde den Schlüssel."},
  {"verb":"bleiben","traducere":"a rămâne","exemplu":"Ich bleibe zu Hause."},

  // Verbe de mișcare și transport
  {"verb":"kommen","traducere":"a veni","exemplu":"Ich komme morgen."},
  {"verb":"gehen","traducere":"a merge (pe jos)","exemplu":"Ich gehe zur Schule."},
  {"verb":"fahren","traducere":"a merge (cu mijlocul de transport)","exemplu":"Ich fahre mit dem Bus."},
  {"verb":"fliegen","traducere":"a zbura","exemplu":"Wir fliegen nach Berlin."},
  {"verb":"laufen","traducere":"a alerga","exemplu":"Er läuft jeden Tag.","image":"laufen.jpg"},
  {"verb":"rennen","traducere":"a fugi","exemplu":"Das Kind rennt schnell."},

  // Verbe de comunicare
  {"verb":"sprechen","traducere":"a vorbi","exemplu":"Ich spreche Deutsch."},
  {"verb":"sagen","traducere":"a spune","exemplu":"Ich sage die Wahrheit."},
  {"verb":"fragen","traducere":"a întreba","exemplu":"Ich frage den Lehrer."},
  {"verb":"erklären","traducere":"a explica","exemplu":"Der Lehrer erklärt die Regel."},
  {"verb":"erzählen","traducere":"a povesti","exemplu":"Sie erzählt eine Geschichte."},

  // Verbe de activități zilnice
  {"verb":"aufstehen","traducere":"a se scula","exemplu":"Ich stehe um 7 Uhr auf."},
  {"verb":"duschen","traducere":"a face duș","exemplu":"Ich dusche jeden Morgen."},
  {"verb":"anziehen","traducere":"a se îmbrăca","exemplu":"Ich ziehe mich an."},
  {"verb":"ausziehen","traducere":"a se dezbrăca","exemplu":"Er zieht sich aus."},
  {"verb":"kämmen","traducere":"a se pieptăna","exemplu":"Sie kämmt sich die Haare."},
  {"verb":"rasieren","traducere":"a se bărbieri","exemplu":"Er rasiert sich jeden Tag."},

  // Verbe pentru casă și muncă
  {"verb":"aufräumen","traducere":"a face ordine","exemplu":"Ich räume mein Zimmer auf."},
  {"verb":"bügeln","traducere":"a călca (haine)","exemplu":"Sie bügelt das Hemd."},
  {"verb":"staubsaugen","traducere":"a aspira","exemplu":"Er staubsaugt das Wohnzimmer."},
  {"verb":"reparieren","traducere":"a repara","exemplu":"Ich repariere das Auto."},

  // Verbe pentru sentiment și gândire
  {"verb":"denken","traducere":"a gândi","exemplu":"Ich denke an dich."},
  {"verb":"fühlen","traducere":"a simți","exemplu":"Ich fühle mich gut."},
  {"verb":"hoffen","traducere":"a spera","exemplu":"Ich hoffe auf besseres Wetter."},
  {"verb":"wünschen","traducere":"a dori","exemplu":"Ich wünsche dir alles Gute."},
  {"verb":"träumen","traducere":"a visa","exemplu":"Ich träume von Urlaub."},

  // Verbe pentru școală și învățare
  {"verb":"studieren","traducere":"a studia","exemplu":"Er studiert Medizin."},
  {"verb":"üben","traducere":"a exersa","exemplu":"Sie übt Klavier."},
  {"verb":"wiederholen","traducere":"a repeta","exemplu":"Wir wiederholen die Lektion."},
  {"verb":"merken","traducere":"a-și aminti","exemplu":"Ich merke mir die Nummer."},
  {"verb":"vergessen","traducere":"a uita","exemplu":"Ich vergesse oft Namen."},

  // Verbe pentru activități de timp liber
  {"verb":"tanzen","traducere":"a dansa","exemplu":"Wir tanzen auf der Party."},
  {"verb":"singen","traducere":"a cânta","exemplu":"Sie singt sehr schön."},
  {"verb":"zeichnen","traducere":"a desena","exemplu":"Er zeichnet ein Bild."},
  {"verb":"malen","traducere":"a picta","exemplu":"Sie malt ein Porträt."},
  {"verb":"fotografieren","traducere":"a fotografia","exemplu":"Ich fotografiere die Landschaft."},

  // Verbe pentru cumpărături și mâncare
  {"verb":"verkaufen","traducere":"a vinde","exemplu":"Er verkauft sein Auto."},
  {"verb":"kosten","traducere":"a costa","exemplu":"Das Buch kostet 15 Euro."},
  {"verb":"schmecken","traducere":"a avea gust","exemplu":"Das Essen schmeckt gut."},
  {"verb":"probieren","traducere":"a încerca/gusta","exemplu":"Ich probiere das neue Gericht."},
  {"verb":"bestellen","traducere":"a comanda","exemplu":"Wir bestellen Pizza."}
];

window.verbsData = verbsData;

// Load verbs and populate table + nav + TTS
document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#verbTable tbody');
  const searchInput = document.getElementById('searchInput');
  const paginationEl = document.getElementById('vPagination');
  const paginationInfo = document.getElementById('vPaginationInfo');
  if (!tableBody) return;

  // TTS cu preferință voce feminină (DE)
  function speak(text, lang='de-DE') {
    const synth = window.speechSynthesis;
    if (!synth) return;

    function pickDeVoice() {
      const voices = synth.getVoices() || [];
      const de = voices.filter(v => v.lang && /^de(-|_)/i.test(v.lang));

      // Heuristici pentru voce feminină
      const preferredNames = [
        'Google Deutsch', 'Google Deutsch Female', 'Anna', 'Vicki', 'Petra', 'Marlene', 'Helena', 'Katja', 'Steffi'
      ];

      // 1) Nume preferate
      for (const name of preferredNames) {
        const v = de.find(x => x.name && x.name.toLowerCase().includes(name.toLowerCase()));
        if (v) return v;
      }
      // 2) Euristică „female” în nume
      const femaleGuess = de.find(v => /fem|frau|female/i.test(v.name || ''));
      if (femaleGuess) return femaleGuess;

      // 3) Prima voce germană disponibilă
      return de[0] || voices.find(v => /german/i.test(v.name || ''));
    }

    const speakNow = () => {
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      const v = pickDeVoice();
      if (v) u.voice = v;
      // opțional: u.rate = 0.95; u.pitch = 1.05;
      synth.speak(u);
    };

    if (!synth.getVoices().length) {
      const once = () => { synth.onvoiceschanged = null; speakNow(); };
      synth.onvoiceschanged = once;
      setTimeout(speakNow, 200);
    } else {
      speakNow();
    }
  }

  // state
  let filtered = [...verbsData].sort((a,b)=>a.verb.localeCompare(b.verb,'de'));
  let currentPage = 1;
  const pageSize = 25;
  let selectedRowIndex = -1; // index în pagina curentă

  render();

  // live search
  searchInput?.addEventListener('input', () => {
    const term = normalize(searchInput.value);
    filtered = verbsData.filter(v =>
      normalize(v.verb).includes(term) ||
      normalize(v.traducere || '').includes(term) ||
      normalize(v.exemplu || '').includes(term)
    ).sort((a,b)=>a.verb.localeCompare(b.verb,'de'));
    currentPage = 1;
    selectedRowIndex = -1;
    render();
  });

  // pagination handler
  paginationEl?.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-page]');
    if (!btn) return;
    const p = Number(btn.getAttribute('data-page'));
    if (!Number.isNaN(p)) {
      currentPage = p;
      selectedRowIndex = -1;
      render();
    }
  });

  // keyboard nav + Enter = TTS (ca la Das Nomen)
  document.addEventListener('keydown', (e) => {
    const rows = tableBody.querySelectorAll('tr');
    if (!rows.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (selectedRowIndex < rows.length - 1) {
        selectedRowIndex++;
      } else if (selectedRowIndex === -1) {
        selectedRowIndex = 0;
      }
      updateSelection(rows);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (selectedRowIndex > 0) {
        selectedRowIndex--;
        updateSelection(rows);
      }
    } else if (e.key === 'Enter' && selectedRowIndex >= 0) {
      e.preventDefault();
      const globalIndex = (currentPage - 1) * pageSize + selectedRowIndex;
      const item = filtered[globalIndex];
      if (item?.verb) speak(item.verb);
    }
  });

  function updateSelection(rows) {
    rows.forEach((row, i) => {
      if (i === selectedRowIndex) {
        row.classList.add('selected-row');
        row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        row.classList.remove('selected-row');
      }
    });
  }

  function render() {
    tableBody.innerHTML = '';
    if (!filtered.length) {
      tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:#666;padding:12px;">Niciun rezultat.</td></tr>`;
      paginationEl && (paginationEl.innerHTML = '');
      paginationInfo && (paginationInfo.textContent = '');
      return;
    }

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * pageSize;
    const pageItems = filtered.slice(start, start + pageSize);

    pageItems.forEach((v, i) => {
      const tr = document.createElement('tr');

      // AUDIO BTN (prima coloană ca în Das Nomen)
      const audioCell = document.createElement('td');
      const audioBtn = document.createElement('button');
      audioBtn.textContent = '🔊';
      audioBtn.className = 'audio-btn';
      audioBtn.addEventListener('click', () => speak(v.verb));
      audioCell.appendChild(audioBtn);
      tr.appendChild(audioCell);

      tr.insertAdjacentHTML('beforeend', `
        <td>${escapeHtml(v.verb)}</td>
        <td>${escapeHtml(v.traducere || '')}</td>
        <td>${escapeHtml(v.exemplu || '')}</td>
      `);

      tr.addEventListener('click', () => {
        selectedRowIndex = i;
        updateSelection(tableBody.querySelectorAll('tr'));
      });

      tableBody.appendChild(tr);
    });

    // reset selecție la fiecare render
    selectedRowIndex = -1;

    renderPagination(totalPages);
    paginationInfo && (paginationInfo.textContent = `Afișez ${start + 1}–${start + pageItems.length} din ${total}`);
  }

  function renderPagination(totalPages) {
    if (!paginationEl) return;
    paginationEl.innerHTML = '';
    if (totalPages <= 1) return;

    const mk = (label, page, active=false) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'sub-btn';
      b.setAttribute('data-page', page);
      b.textContent = label;
      if (active) {
        b.style.background = '#2b78c8';
        b.style.color = '#4d0096ff';
      }
      return b;
    };

    paginationEl.appendChild(mk('«', Math.max(1, currentPage - 1)));
    const maxButtons = 7;
    let s = Math.max(1, currentPage - Math.floor(maxButtons/2));
    let e = Math.min(totalPages, s + maxButtons - 1);
    if (e - s < maxButtons - 1) s = Math.max(1, e - maxButtons + 1);
    for (let p = s; p <= e; p++) paginationEl.appendChild(mk(String(p), p, p === currentPage));
    paginationEl.appendChild(mk('»', Math.min(totalPages, currentPage + 1)));
  }

  function normalize(str) {
    return String(str || '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .replace(/ă|â/g,'a').replace(/î/g,'i')
      .replace(/ș|ş/g,'s').replace(/ț|ţ/g,'t');
  }

  function escapeHtml(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[c]));
  }
});