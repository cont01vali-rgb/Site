// Nouns data
const nounsData = [
  {"nomen": "Apfel", "gen": "der", "traducere": "măr", "exemplu": "Der Apfel ist rot."},
  {"nomen": "Haus", "gen": "das", "traducere": "casă", "exemplu": "Das Haus ist groß."},
  {"nomen": "Blume", "gen": "die", "traducere": "floare", "exemplu": "Die Blume ist schön."},
  {"nomen": "Auto", "gen": "das", "traducere": "mașină", "exemplu": "Das Auto ist schnell."}
  {"nomen": "Rose",  "gen": "die", "traducere": "trandafir", "exemplu": "Die Rose ist schön."},
  {"nomen": "Brille", "gen": "die", "traducere": "ochelari",  "exemplu": "Meine Brille liegt auf dem Tisch."},
  {"nomen": "Schere", "gen": "die", "traducere": "foarfecă",  "exemplu": "Die Schere ist scharf."}
];

// Load nouns and populate table
document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#nounsTable tbody');
  const searchInput = document.getElementById('searchInput');

  renderTable(nounsData);

  // Live search
  searchInput.addEventListener('input', () => {
    const term = normalize(searchInput.value.toLowerCase());
    const filtered = nounsData.filter(item =>
      normalize(item.nomen.toLowerCase()).includes(term) ||
      normalize(item.traducere.toLowerCase()).includes(term)
    );
    renderTable(filtered);
  });

  // Function to render the table
  function renderTable(items) {
    tableBody.innerHTML = "";
    items.sort((a, b) => a.nomen.localeCompare(b.nomen, 'de'));
    items.forEach(item => {
      const row = document.createElement('tr');

      // AUDIO COLUMN
      const audioCell = document.createElement('td');
      const audioBtn = document.createElement('button');
      audioBtn.innerHTML = "🔊";
      audioBtn.classList.add('audio-btn');
      audioBtn.addEventListener('click', () => playPronunciation(item.nomen));
      audioCell.appendChild(audioBtn);
      row.appendChild(audioCell);

      // TEXT COLUMNS
      const nomenCell = document.createElement('td');
      nomenCell.textContent = item.nomen;
      row.appendChild(nomenCell);

      const genCell = document.createElement('td');
      genCell.textContent = item.gen;
      row.appendChild(genCell);

      const traducereCell = document.createElement('td');
      traducereCell.textContent = item.traducere;
      row.appendChild(traducereCell);

      const exempluCell = document.createElement('td');
      exempluCell.textContent = item.exemplu;
      row.appendChild(exempluCell);

      tableBody.appendChild(row);
    });
  }

  // Function for pronunciation
  function playPronunciation(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'de-DE';
    window.speechSynthesis.speak(utterance);
  }

  // Normalize text (remove Romanian diacritics for search)
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
