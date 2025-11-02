// Trennbare Verben data și funcționalitate pentru tabel
const trennbareVerbenData = [
  {
    "verb": "anrufen",
    "traducere": "a suna, a telefona",
    "exemplu": "Ich rufe meine Freundin an. (O sun pe prietena mea.)",
    "forma_separata": "rufe ... an",
    "prefix": "an",
    "radical": "rufen"
  },
  {
    "verb": "aufstehen",
    "traducere": "a se trezi, a se ridica",
    "exemplu": "Er steht jeden Tag um 7 Uhr auf. (El se trezește zilnic la 7.)",
    "forma_separata": "stehe ... auf",
    "prefix": "auf",
    "radical": "stehen"
  },
  {
    "verb": "einkaufen",
    "traducere": "a face cumpărături",
    "exemplu": "Wir kaufen am Samstag ein. (Noi facem cumpărături sâmbăta.)",
    "forma_separata": "kaufe ... ein",
    "prefix": "ein",
    "radical": "kaufen"
  },
  {
    "verb": "fernsehen",
    "traducere": "a se uita la televizor",
    "exemplu": "Siehst du oft fern? (Te uiți des la televizor?)",
    "forma_separata": "sehe ... fern",
    "prefix": "fern",
    "radical": "sehen"
  },
  {
    "verb": "mitkommen",
    "traducere": "a veni împreună",
    "exemplu": "Kommst du ins Kino mit? (Vii cu noi la film?)",
    "forma_separata": "komme ... mit",
    "prefix": "mit",
    "radical": "kommen"
  },
  {
    "verb": "abholen",
    "traducere": "a lua (pe cineva) de undeva",
    "exemplu": "Mein Vater holt mich vom Bahnhof ab. (Tatăl meu mă ia de la gară.)",
    "forma_separata": "hole ... ab",
    "prefix": "ab",
    "radical": "holen"
  },
  {
    "verb": "zumachen",
    "traducere": "a închide (o ușă, un geam)",
    "exemplu": "Mach bitte die Tür zu! (Închide ușa, te rog!)",
    "forma_separata": "mache ... zu",
    "prefix": "zu",
    "radical": "machen"
  },
  {
    "verb": "anfangen",
    "traducere": "a începe",
    "exemplu": "Der Unterricht fängt um 9 Uhr an. (Ora începe la ora 9.)",
    "forma_separata": "fange ... an",
    "prefix": "an",
    "radical": "fangen"
  },
  {
    "verb": "aussehen",
    "traducere": "a arăta (ca aspect)",
    "exemplu": "Du siehst heute gut aus. (Arăți bine astăzi.)",
    "forma_separata": "sehe ... aus",
    "prefix": "aus",
    "radical": "sehen"
  },
  {
    "verb": "vorstellen",
    "traducere": "a prezenta (pe cineva)",
    "exemplu": "Ich stelle dir meinen Bruder vor. (Ți-l prezint pe fratele meu.)",
    "forma_separata": "stelle ... vor",
    "prefix": "vor",
    "radical": "stellen"
  }
];

window.trennbareVerbenData = trennbareVerbenData;

// Load verbs and populate table + nav + TTS
document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#trennbareVerbenTable tbody');
  const searchInput = document.getElementById('searchInput');
  const paginationEl = document.getElementById('pagination');
  const paginationInfo = document.getElementById('paginationInfo');
  
  if (!tableBody) return;

  // TTS cu preferință voce feminină (DE)
  function speak(text, lang='de-DE') {
    const synth = window.speechSynthesis;
    if (!synth) return;

    function pickDeVoice() {
      const voices = synth.getVoices();
      const deVoices = voices.filter(v => v.lang.startsWith('de'));
      const femaleVoice = deVoices.find(v => 
        v.name.toLowerCase().includes('female') || 
        v.name.toLowerCase().includes('zira') ||
        v.name.toLowerCase().includes('hedda') ||
        v.name.toLowerCase().includes('katja')
      );
      return femaleVoice || deVoices[0] || voices[0];
    }

    const speakNow = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.voice = pickDeVoice();
      synth.speak(utterance);
    };

    if (!synth.getVoices().length) {
      synth.addEventListener('voiceschanged', speakNow, { once: true });
    } else {
      speakNow();
    }
  }

  // state
  let filtered = [...trennbareVerbenData].sort((a,b)=>a.verb.localeCompare(b.verb,'de'));
  let currentPage = 1;
  const pageSize = 25;
  let selectedRowIndex = -1; // index în pagina curentă

  render();

  // live search
  searchInput?.addEventListener('input', () => {
    const term = normalize(searchInput.value);
    filtered = trennbareVerbenData.filter(v =>
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

  // keyboard nav + Enter = TTS
  document.addEventListener('keydown', (e) => {
    const rows = tableBody.querySelectorAll('tr');
    if (!rows.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedRowIndex = Math.min(selectedRowIndex + 1, rows.length - 1);
      updateSelection(rows);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedRowIndex = Math.max(selectedRowIndex - 1, -1);
      updateSelection(rows);
    } else if (e.key === 'Enter' && selectedRowIndex >= 0) {
      e.preventDefault();
      const row = rows[selectedRowIndex];
      const verbText = row.cells[1]?.textContent || '';
      if (verbText) speak(verbText);
    }
  });

  function updateSelection(rows) {
    rows.forEach((row, i) => {
      if (i === selectedRowIndex) {
        row.style.backgroundColor = '#e3f2fd';
        row.scrollIntoView({ block: 'nearest' });
      } else {
        row.style.backgroundColor = '';
      }
    });
  }

  function render() {
    tableBody.innerHTML = '';
    if (!filtered.length) {
      tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#888;">Nu s-au găsit verbe</td></tr>';
      return;
    }

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * pageSize;
    const pageItems = filtered.slice(start, start + pageSize);

    pageItems.forEach((v, i) => {
      const originalIndex = trennbareVerbenData.findIndex(verb => verb.verb === v.verb);
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><button onclick="speak('${escapeHtml(v.verb)}')" class="speak-btn">🔊</button></td>
        <td class="verb-col">
          <strong class="clickable-verb" onclick="showConjugationModal(trennbareVerbenData[${originalIndex}])">${escapeHtml(v.verb)}</strong>
        </td>
        <td>${escapeHtml(v.traducere || '')}</td>
        <td class="example-col">${escapeHtml(v.exemplu || '')}</td>
        <td class="separated-form-col">${escapeHtml(v.forma_separata || '')}</td>
      `;
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
      const btn = document.createElement('button');
      btn.textContent = label;
      btn.setAttribute('data-page', page);
      btn.style.cssText = `padding:6px 12px;margin:0;border:1px solid #ccc;background:${active?'#007bff':'#f8f9fa'};color:${active?'white':'#333'};cursor:pointer;border-radius:4px;`;
      return btn;
    };

    paginationEl.appendChild(mk('«', Math.max(1, currentPage - 1)));
    const maxButtons = 7;
    let s = Math.max(1, currentPage - Math.floor(maxButtons/2));
    let e = Math.min(totalPages, s + maxButtons - 1);
    if (e - s < maxButtons - 1) s = Math.max(1, e - maxButtons + 1);
    for (let p = s; p <= e; p++) paginationEl.appendChild(mk(p, p, p === currentPage));
    paginationEl.appendChild(mk('»', Math.min(totalPages, currentPage + 1)));
  }

  function normalize(str) {
    return (str||'').toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .replace(/ă|â/g,'a').replace(/î/g,'i').replace(/ș|ş/g,'s').replace(/ț|ţ/g,'t');
  }

  function escapeHtml(s) {
    return (s||'').toString()
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // Expune funcția speak global pentru butoanele TTS
  window.speak = speak;

  // Funcție pentru conjugarea verbelor separabile
  function getConjugation(verbData) {
    const { prefix, radical } = verbData;
    
    // Conjugări pentru radicalul verbului (forme de bază pentru A1)
    const conjugations = {
      'rufen': ['rufe', 'rufst', 'ruft', 'rufen', 'ruft', 'rufen'],
      'stehen': ['stehe', 'stehst', 'steht', 'stehen', 'steht', 'stehen'],
      'kaufen': ['kaufe', 'kaufst', 'kauft', 'kaufen', 'kauft', 'kaufen'],
      'sehen': ['sehe', 'siehst', 'sieht', 'sehen', 'seht', 'sehen'],
      'kommen': ['komme', 'kommst', 'kommt', 'kommen', 'kommt', 'kommen'],
      'holen': ['hole', 'holst', 'holt', 'holen', 'holt', 'holen'],
      'machen': ['mache', 'machst', 'macht', 'machen', 'macht', 'machen'],
      'fangen': ['fange', 'fängst', 'fängt', 'fangen', 'fangt', 'fangen'],
      'stellen': ['stelle', 'stellst', 'stellt', 'stellen', 'stellt', 'stellen']
    };
    
    const forms = conjugations[radical] || ['?', '?', '?', '?', '?', '?'];
    const pronouns = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];
    
    return pronouns.map((pronoun, index) => ({
      pronoun,
      conjugated: forms[index],
      example: `${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} ${forms[index]} ... ${prefix}.`
    }));
  }

  // Afișează modal cu conjugarea
  function showConjugationModal(verbData) {
    const modal = document.getElementById('conjugationModal') || createConjugationModal();
    const conjugation = getConjugation(verbData);
    
    document.getElementById('modalVerbTitle').textContent = verbData.verb;
    document.getElementById('modalVerbTranslation').textContent = verbData.traducere;
    
    const tbody = document.getElementById('conjugationTableBody');
    tbody.innerHTML = '';
    
    conjugation.forEach(form => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><strong>${form.pronoun}</strong></td>
        <td>${form.conjugated}</td>
        <td>${form.example}</td>
      `;
      tbody.appendChild(row);
    });
    
    modal.style.display = 'block';
  }

  // Creează modal-ul pentru conjugare
  function createConjugationModal() {
    const modal = document.createElement('div');
    modal.id = 'conjugationModal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3 id="modalVerbTitle"></h3>
          <p id="modalVerbTranslation"></p>
          <span class="close">&times;</span>
        </div>
        <div class="modal-body">
          <table class="conjugation-table">
            <thead>
              <tr>
                <th>Pronume</th>
                <th>Verb conjugat</th>
                <th>Exemplu (cu separare)</th>
              </tr>
            </thead>
            <tbody id="conjugationTableBody"></tbody>
          </table>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Închide modal când se face click pe X sau în afara modal-ului
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('close')) {
        modal.style.display = 'none';
      }
    });
    
    return modal;
  }

  // Expune funcția global
  window.showConjugationModal = showConjugationModal;
});