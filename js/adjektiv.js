// Adjectives data
const adjectivesData = [
  // -- personenstand
  {"adjektiv": "geschieden",  "comparativ": "geschiedener",  "superlativ": "am geschiedensten", "traducere": "divorțat",       "exemplu": "Er ist seit zwei Jahren geschieden.", "category": "personenstand"},
  {"adjektiv": "ledig",       "comparativ": "lediger",       "superlativ": "am ledigsten",      "traducere": "necăsătorit",    "exemplu": "Sie ist noch ledig.", "category": "personenstand"},
  {"adjektiv": "verheiratet", "comparativ": "verheirateter", "superlativ": "am verheiratetsten", "traducere": "căsătorit",      "exemplu": "Sie ist seit 2010 verheiratet.", "category": "personenstand"},
  {"adjektiv": "verwitwet",   "comparativ": "verwitweter",   "superlativ": "am verwitwetsten",  "traducere": "văduv",          "exemplu": "Er ist seit kurzem verwitwet.", "category": "personenstand"},

  // -- zustand
  {"adjektiv": "allein",      "comparativ": "alleiner",      "superlativ": "am alleinsten",      "traducere": "singur",         "exemplu": "Er ist allein zu Hause.", "category": "zustand"},
  {"adjektiv": "richtig",     "comparativ": "richtiger",     "superlativ": "am richtigsten",    "traducere": "corect",         "exemplu": "Das ist die richtige Antwort.", "category": "zustand"},
  {"adjektiv": "offen",       "comparativ": "offener",       "superlativ": "am offensten",      "traducere": "deschis",        "exemplu": "Er ist sehr offen gegenüber Ideen.", "category": "zustand"},
  {"adjektiv": "müde",        "comparativ": "müder",         "superlativ": "am müdesten",       "traducere": "obosit",         "exemplu": "Ich bin müde.", "category": "zustand"},
  {"adjektiv": "gesund",      "comparativ": "gesünder",      "superlativ": "am gesündesten",    "traducere": "sănătos",        "exemplu": "Sport ist gesund.", "category": "zustand"},
  {"adjektiv": "ungesund",    "comparativ": "ungesünder",    "superlativ": "am ungesündesten",  "traducere": "nesănătos",      "exemplu": "Rauchen ist ungesund.", "category": "zustand"},
  {"adjektiv": "krank",       "comparativ": "kränker",       "superlativ": "am kränksten",      "traducere": "bolnav",         "exemplu": "Er ist heute krank.", "category": "zustand"},
  {"adjektiv": "hungrig",     "comparativ": "hungriger",     "superlativ": "am hungrigsten",    "traducere": "flămând",        "exemplu": "Ich bin sehr hungrig.", "category": "zustand"},
  {"adjektiv": "satt",        "comparativ": "satter",        "superlativ": "am sattesten",      "traducere": "sătul",          "exemplu": "Nach dem Essen bin ich satt.", "category": "zustand"},
  {"adjektiv": "falsch",      "comparativ": "falscher",      "superlativ": "am falschesten",    "traducere": "greșit",         "exemplu": "Die Antwort ist falsch.", "category": "zustand"},
  {"adjektiv": "geschlossen", "comparativ": "geschlossener", "superlativ": "am geschlossensten", "traducere": "închis",        "exemplu": "Die Tür ist geschlossen.", "category": "zustand"},

  // -- gefuehle_charakter
  {"adjektiv": "froh",        "comparativ": "froher",        "superlativ": "am frohsten",       "traducere": "fericit",        "exemplu": "Ich bin froh über die Nachricht.", "category": "gefuehle_charakter"},
  {"adjektiv": "nervös",      "comparativ": "nervöser",      "superlativ": "am nervösesten",    "traducere": "nervos",         "exemplu": "Sie ist vor dem Test nervös.", "category": "gefuehle_charakter"},
  {"adjektiv": "glücklich",   "comparativ": "glücklicher",   "superlativ": "am glücklichsten",  "traducere": "fericit",        "exemplu": "Er ist sehr glücklich.", "category": "gefuehle_charakter"},
  {"adjektiv": "traurig",     "comparativ": "trauriger",     "superlativ": "am traurigsten",    "traducere": "trist",          "exemplu": "Sie ist traurig.", "category": "gefuehle_charakter"},
  {"adjektiv": "mutig",       "comparativ": "mutiger",       "superlativ": "am mutigsten",      "traducere": "curajos",        "exemplu": "Der Soldat ist mutig.", "category": "gefuehle_charakter"},
  {"adjektiv": "feig",        "comparativ": "feiger",        "superlativ": "am feigsten",       "traducere": "laș",            "exemplu": "Er ist feig vor Spinnen.", "category": "gefuehle_charakter"},
  {"adjektiv": "ängstlich",   "comparativ": "ängstlicher",   "superlativ": "am ängstlichsten",  "traducere": "fricos",         "exemplu": "Das Kind ist ängstlich.", "category": "gefuehle_charakter"},
  {"adjektiv": "lustig",      "comparativ": "lustiger",      "superlativ": "am lustigsten",     "traducere": "amuzant",        "exemplu": "Der Clown ist lustig.", "category": "gefuehle_charakter"},
  {"adjektiv": "faul",        "comparativ": "fauler",        "superlativ": "am faulsten",       "traducere": "leneș",          "exemplu": "Er ist heute faul.", "category": "gefuehle_charakter"},
  {"adjektiv": "fleißig",     "comparativ": "fleißiger",     "superlativ": "am fleißigsten",    "traducere": "harnic",         "exemplu": "Sie ist sehr fleißig.", "category": "gefuehle_charakter"},
  {"adjektiv": "brav",        "comparativ": "braver",        "superlativ": "am bravsten",       "traducere": "cuminte",        "exemplu": "Das Kind ist brav.", "category": "gefuehle_charakter"},

  // -- farben
  {"adjektiv": "rot",         "comparativ": "röter",         "superlativ": "am rötesten",       "traducere": "roșu",           "exemplu": "Das Auto ist rot.", "category": "farben"},
  {"adjektiv": "blau",        "comparativ": "blauer",        "superlativ": "am blauesten",      "traducere": "albastru",       "exemplu": "Der Himmel ist blau.", "category": "farben"},
  {"adjektiv": "grün",        "comparativ": "grüner",        "superlativ": "am grünsten",       "traducere": "verde",          "exemplu": "Das Gras ist grün.", "category": "farben"},
  {"adjektiv": "gelb",        "comparativ": "gelber",        "superlativ": "am gelbsten",       "traducere": "galben",         "exemplu": "Die Sonne ist gelb.", "category": "farben"},
  {"adjektiv": "schwarz",     "comparativ": "schwärzer",     "superlativ": "am schwärzesten",   "traducere": "negru",          "exemplu": "Die Katze ist schwarz.", "category": "farben"},
  {"adjektiv": "weiß",        "comparativ": "weißer",        "superlativ": "am weißesten",      "traducere": "alb",            "exemplu": "Der Schnee ist weiß.", "category": "farben"},

  // -- eigenschaften
  {"adjektiv": "groß",        "comparativ": "größer",        "superlativ": "am größten",        "traducere": "mare",           "exemplu": "Das Haus ist sehr groß.", "category": "eigenschaften"},
  {"adjektiv": "männlich",    "comparativ": "männlicher",    "superlativ": "am männlichsten",   "traducere": "masculin",       "exemplu": "Die Merkmale sind männlich.", "category": "eigenschaften"},
  {"adjektiv": "weiblich",    "comparativ": "weiblicher",    "superlativ": "am weiblichsten",   "traducere": "feminin",        "exemplu": "Die Figur wirkt weiblich.", "category": "eigenschaften"},
  {"adjektiv": "klein",       "comparativ": "kleiner",       "superlativ": "am kleinsten",      "traducere": "mic",            "exemplu": "Das Kind ist klein.", "category": "eigenschaften"},
  {"adjektiv": "alt",         "comparativ": "älter",         "superlativ": "am ältesten",       "traducere": "bătrân/vechi",   "exemplu": "Der Mann ist alt.", "category": "eigenschaften"},
  {"adjektiv": "jung",        "comparativ": "jünger",        "superlativ": "am jüngsten",       "traducere": "tânăr",          "exemplu": "Sie ist noch jung.", "category": "eigenschaften"},
  {"adjektiv": "neu",         "comparativ": "neuer",         "superlativ": "am neuesten",       "traducere": "nou",            "exemplu": "Das Buch ist neu.", "category": "eigenschaften"},
  {"adjektiv": "lang",        "comparativ": "länger",        "superlativ": "am längsten",       "traducere": "lung",           "exemplu": "Der Weg ist lang.", "category": "eigenschaften"},
  {"adjektiv": "kurz",        "comparativ": "kürzer",        "superlativ": "am kürzesten",      "traducere": "scurt",          "exemplu": "Das Kleid ist kurz.", "category": "eigenschaften"},
  {"adjektiv": "schön",       "comparativ": "schöner",       "superlativ": "am schönsten",      "traducere": "frumos",         "exemplu": "Das Wetter ist schön.", "category": "eigenschaften"},
  {"adjektiv": "hässlich",    "comparativ": "hässlicher",    "superlativ": "am hässlichsten",   "traducere": "urât",           "exemplu": "Das Gebäude ist hässlich.", "category": "eigenschaften"},
  {"adjektiv": "schnell",     "comparativ": "schneller",     "superlativ": "am schnellsten",    "traducere": "rapid",          "exemplu": "Das Auto ist schnell.", "category": "eigenschaften"},
  {"adjektiv": "langsam",     "comparativ": "langsamer",     "superlativ": "am langsamsten",    "traducere": "încet",          "exemplu": "Der Zug ist langsam.", "category": "eigenschaften"},
  {"adjektiv": "stark",       "comparativ": "stärker",       "superlativ": "am stärksten",      "traducere": "puternic",       "exemplu": "Er ist sehr stark.", "category": "eigenschaften"},
  {"adjektiv": "schwach",     "comparativ": "schwächer",     "superlativ": "am schwächsten",    "traducere": "slab",           "exemplu": "Sie fühlt sich schwach.", "category": "eigenschaften"},
  {"adjektiv": "dunkel",      "comparativ": "dunkler",       "superlativ": "am dunkelsten",     "traducere": "întunecat",      "exemplu": "Das Zimmer ist dunkel.", "category": "eigenschaften"},
  {"adjektiv": "hell",        "comparativ": "heller",        "superlativ": "am hellsten",       "traducere": "luminos",        "exemplu": "Die Sonne ist hell.", "category": "eigenschaften"},
  {"adjektiv": "kräftig",     "comparativ": "kräftiger",     "superlativ": "am kräftigsten",    "traducere": "puternic/tare",  "exemplu": "Er hat kräftige Arme.", "category": "eigenschaften"},
  {"adjektiv": "natürlich",   "comparativ": "natürlicher",   "superlativ": "am natürlichsten",  "traducere": "natural",        "exemplu": "Das ist natürliches Licht.", "category": "eigenschaften"},
  {"adjektiv": "künstlich",   "comparativ": "künstlicher",   "superlativ": "am künstlichsten",  "traducere": "artificial",     "exemplu": "Das Licht ist künstlich.", "category": "eigenschaften"},
  {"adjektiv": "hoch",        "comparativ": "höher",         "superlativ": "am höchsten",       "traducere": "înalt",          "exemplu": "Der Berg ist hoch.", "category": "eigenschaften"},
  {"adjektiv": "niedrig",     "comparativ": "niedriger",     "superlativ": "am niedrigsten",    "traducere": "jos",            "exemplu": "Der Tisch ist niedrig.", "category": "eigenschaften"},
  {"adjektiv": "nah",         "comparativ": "näher",         "superlativ": "am nächsten",       "traducere": "aproape",        "exemplu": "Die Schule ist nah.", "category": "eigenschaften"},
  {"adjektiv": "weit",        "comparativ": "weiter",        "superlativ": "am weitesten",      "traducere": "departe",        "exemplu": "Die Stadt ist weit.", "category": "eigenschaften"},
  {"adjektiv": "fern",        "comparativ": "ferner",        "superlativ": "am fernsten",       "traducere": "îndepărtat",     "exemplu": "Das Land ist fern.", "category": "eigenschaften"},
  {"adjektiv": "dick",        "comparativ": "dicker",        "superlativ": "am dicksten",       "traducere": "gras",           "exemplu": "Das Buch ist dick.", "category": "eigenschaften"},
  {"adjektiv": "dünn",        "comparativ": "dünner",        "superlativ": "am dünnsten",       "traducere": "subțire",        "exemplu": "Das Papier ist dünn.", "category": "eigenschaften"},
  {"adjektiv": "lockig",      "comparativ": "lockiger",      "superlativ": "am lockigsten",     "traducere": "creț",           "exemplu": "Sie hat lockige Haare.", "category": "eigenschaften"},
  {"adjektiv": "leicht",      "comparativ": "leichter",      "superlativ": "am leichtesten",    "traducere": "ușor",           "exemplu": "Die Tasche ist leicht.", "category": "eigenschaften"},
  {"adjektiv": "schwer",      "comparativ": "schwerer",      "superlativ": "am schwersten",     "traducere": "greu",           "exemplu": "Der Koffer ist schwer.", "category": "eigenschaften"},

  // -- wetter_temperatur
  {"adjektiv": "warm",        "comparativ": "wärmer",        "superlativ": "am wärmsten",       "traducere": "cald",           "exemplu": "Es ist warm heute.", "category": "wetter_temperatur"},
  {"adjektiv": "kalt",        "comparativ": "kälter",        "superlativ": "am kältesten",      "traducere": "rece",           "exemplu": "Der Winter ist kalt.", "category": "wetter_temperatur"},
  {"adjektiv": "heiß",        "comparativ": "heißer",        "superlativ": "am heißesten",      "traducere": "fierbinte",      "exemplu": "Der Sommer ist heiß.", "category": "wetter_temperatur"},
  {"adjektiv": "wolkig",      "comparativ": "wolkiger",      "superlativ": "am wolkigsten",     "traducere": "înnorat",        "exemplu": "Der Himmel ist wolkig.", "category": "wetter_temperatur"},

  // -- geschmack_textur
  {"adjektiv": "süß",         "comparativ": "süßer",         "superlativ": "am süßesten",       "traducere": "dulce",          "exemplu": "Der Kuchen ist süß.", "category": "geschmack_textur"},
  {"adjektiv": "sauer",       "comparativ": "saurer",        "superlativ": "am sauersten",      "traducere": "acru",           "exemplu": "Die Zitrone ist sauer.", "category": "geschmack_textur"},
  {"adjektiv": "glatt",       "comparativ": "glatter",       "superlativ": "am glättesten",     "traducere": "neted",          "exemplu": "Das Eis ist glatt.", "category": "geschmack_textur"},

  // -- intelligenz
  {"adjektiv": "dumm",        "comparativ": "dümmer",        "superlativ": "am dümmsten",       "traducere": "prost",          "exemplu": "Das war dumm von mir.", "category": "intelligenz"},
  {"adjektiv": "klug",        "comparativ": "klüger",        "superlativ": "am klügsten",       "traducere": "deștept",        "exemplu": "Sie ist sehr klug.", "category": "intelligenz"},
  {"adjektiv": "schlau",      "comparativ": "schlauer",      "superlativ": "am schlauesten",    "traducere": "isteț",          "exemplu": "Der Fuchs ist schlau.", "category": "intelligenz"},
  {"adjektiv": "clever",      "comparativ": "cleverer",      "superlativ": "am cleversten",     "traducere": "inteligent",     "exemplu": "Das war eine clevere Idee.", "category": "intelligenz"},
  {"adjektiv": "intelligent", "comparativ": "intelligenter", "superlativ": "am intelligentesten", "traducere": "inteligent",   "exemplu": "Er ist sehr intelligent.", "category": "intelligenz"},

  // -- wert_qualitaet
  {"adjektiv": "gut",         "comparativ": "besser",        "superlativ": "am besten",         "traducere": "bun",            "exemplu": "Das Essen ist gut.", "category": "wert_qualitaet"},
  {"adjektiv": "schlecht",    "comparativ": "schlechter",    "superlativ": "am schlechtesten",  "traducere": "rău",            "exemplu": "Das Wetter ist schlecht.", "category": "wert_qualitaet"},
  {"adjektiv": "arm",         "comparativ": "ärmer",         "superlativ": "am ärmsten",        "traducere": "sărac",          "exemplu": "Die Familie ist arm.", "category": "wert_qualitaet"},
  {"adjektiv": "reich",       "comparativ": "reicher",       "superlativ": "am reichsten",      "traducere": "bogat",          "exemplu": "Er ist sehr reich.", "category": "wert_qualitaet"},
  {"adjektiv": "schlimm",     "comparativ": "schlimmer",     "superlativ": "am schlimmsten",    "traducere": "rău/grav",       "exemplu": "Das ist sehr schlimm.", "category": "wert_qualitaet"},
  {"adjektiv": "teuer",       "comparativ": "teurer",        "superlativ": "am teuersten",      "traducere": "scump",          "exemplu": "Das Auto ist teuer.", "category": "wert_qualitaet"},
  {"adjektiv": "billig",      "comparativ": "billiger",      "superlativ": "am billigsten",     "traducere": "ieftin",         "exemplu": "Das Brot ist billig.", "category": "wert_qualitaet"}
];

// Load adjectives and populate table with pagination
document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#adjektivTable tbody');
  const searchInput = document.getElementById('searchInput');
  let currentData = adjectivesData;
  let selectedRowIndex = -1;
  let currentPage = 1;
  const pageSize = 25;

  // Verifică dacă tabelul adjektivTable există (pentru compatibility cu multiple pagini)
  const adjektivTableEl = document.getElementById('adjektivTable');
  if (!adjektivTableEl) {
    console.log('adjektivTable nu a fost găsit - probabili suntem pe o pagină de test');
    return; // Oprește execuția dacă nu este pagina cu tabel
  }

  // Create pagination elements
  const tableContainer = adjektivTableEl.parentElement;
  const paginationInfo = document.createElement('div');
  paginationInfo.id = 'aPaginationInfo';
  paginationInfo.style.cssText = 'margin-top:8px;color:#444;';
  
  const paginationEl = document.createElement('div');
  paginationEl.id = 'aPagination';
  paginationEl.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:6px;';
  
  tableContainer.appendChild(paginationInfo);
  tableContainer.appendChild(paginationEl);

  render();

  // Live search
  searchInput.addEventListener('input', () => {
    const term = normalize(searchInput.value.toLowerCase());
    const filtered = adjectivesData.filter(item =>
      normalize((item.adjektiv || "").toLowerCase()).includes(term) ||
      normalize((item.traducere || "").toLowerCase()).includes(term) ||
      normalize((item.comparativ || "").toLowerCase()).includes(term) ||
      normalize((item.superlativ || "").toLowerCase()).includes(term)
    );
    currentData = filtered;
    currentPage = 1;
    selectedRowIndex = -1;
    render();
  });

  // Pagination handler
  paginationEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-page]');
    if (!btn) return;
    const p = Number(btn.getAttribute('data-page'));
    if (!Number.isNaN(p)) {
      currentPage = p;
      selectedRowIndex = -1;
      render();
    }
  });

  // Keyboard navigation (ArrowUp/Down + Enter to play)
  document.addEventListener('keydown', (e) => {
    const rows = tableBody.querySelectorAll('tr');
    if (rows.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (selectedRowIndex < rows.length - 1) {
        selectedRowIndex++;
        updateSelection(rows);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (selectedRowIndex > 0) {
        selectedRowIndex--;
        updateSelection(rows);
      } else if (selectedRowIndex === -1 && rows.length > 0) {
        selectedRowIndex = 0;
        updateSelection(rows);
      }
    } else if (e.key === 'Enter' && selectedRowIndex >= 0) {
      e.preventDefault();
      const globalIndex = (currentPage - 1) * pageSize + selectedRowIndex;
      const item = currentData[globalIndex];
      if (item) playPronunciation(item.adjektiv);
    }
  });

  function updateSelection(rows) {
    rows.forEach((row, index) => {
      if (index === selectedRowIndex) {
        row.classList.add('selected-row');
        row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        row.classList.remove('selected-row');
      }
    });
  }

  // Render table with pagination
  function render() {
    tableBody.innerHTML = "";
    
    if (!currentData.length) {
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#666;padding:12px;">Niciun rezultat.</td></tr>`;
      paginationEl.innerHTML = '';
      paginationInfo.textContent = '';
      return;
    }

    const sorted = [...currentData].sort((a, b) => a.adjektiv.localeCompare(b.adjektiv, 'de'));
    currentData = sorted;
    
    const total = sorted.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * pageSize;
    const pageItems = sorted.slice(start, start + pageSize);

    pageItems.forEach(item => {
      const row = document.createElement('tr');

      // audio column
      const audioCell = document.createElement('td');
      const audioBtn = document.createElement('button');
      audioBtn.innerHTML = "🔊";
      audioBtn.classList.add('audio-btn');
      audioBtn.addEventListener('click', () => playPronunciation(item.adjektiv));
      audioCell.appendChild(audioBtn);
      row.appendChild(audioCell);

      // adjektiv
      const adjCell = document.createElement('td');
      adjCell.textContent = item.adjektiv || "";
      row.appendChild(adjCell);

      // comparativ
      const compCell = document.createElement('td');
      compCell.textContent = item.comparativ || "";
      row.appendChild(compCell);

      // superlativ
      const supCell = document.createElement('td');
      supCell.textContent = item.superlativ || "";
      row.appendChild(supCell);

      // traducere
      const tradCell = document.createElement('td');
      tradCell.textContent = item.traducere || "";
      row.appendChild(tradCell);

      // exemplu
      const exCell = document.createElement('td');
      exCell.textContent = item.exemplu || "";
      row.appendChild(exCell);

      tableBody.appendChild(row);
    });

    // Reset selection
    selectedRowIndex = -1;
    
    renderPagination(totalPages);
    paginationInfo.textContent = `Afișez ${start + 1}–${start + pageItems.length} din ${total}`;
  }

  function renderPagination(totalPages) {
    paginationEl.innerHTML = '';
    if (totalPages <= 1) return;

    const mk = (label, page, active = false) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'sub-btn';
      b.setAttribute('data-page', page);
      b.textContent = label;
      if (active) {
        b.style.background = '#2b78c8';
        b.style.color = 'white';
      }
      return b;
    };

    paginationEl.appendChild(mk('«', Math.max(1, currentPage - 1)));
    const maxButtons = 7;
    let s = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let e = Math.min(totalPages, s + maxButtons - 1);
    if (e - s < maxButtons - 1) s = Math.max(1, e - maxButtons + 1);
    for (let p = s; p <= e; p++) paginationEl.appendChild(mk(String(p), p, p === currentPage));
    paginationEl.appendChild(mk('»', Math.min(totalPages, currentPage + 1)));
  }

  // TTS
  function playPronunciation(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'de-DE';
    window.speechSynthesis.speak(utterance);
  }

  // Normalize Romanian diacritics for search
  function normalize(str) {
    return str
      .replace(/ă/g, 'a')
      .replace(/â/g, 'a')
      .replace(/î/g, 'i')
      .replace(/ș/g, 's')
      .replace(/ş/g, 's')
      .replace(/ț/g, 't')
      .replace(/ţ/g, 't');
  }
});

// Export data pentru vocabulary test
window.adjectivesData = adjectivesData;