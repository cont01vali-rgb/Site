// Adjectives data
const adjectivesData = [
  {"adjektiv": "allein",      "comparativ": "alleiner",      "superlativ": "am alleinsten",      "traducere": "singur",         "exemplu": "Er ist allein zu Hause."},
  {"adjektiv": }
];

// Load adjectives and populate table
document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#adjektivTable tbody');
  const searchInput = document.getElementById('searchInput');
  let currentData = adjectivesData;
  let selectedRowIndex = -1;

  renderTable(adjectivesData);

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
    selectedRowIndex = -1;
    renderTable(filtered);
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
    } else if (e.key === 'Enter' && selectedRowIndex >= 0 && selectedRowIndex < currentData.length) {
      e.preventDefault();
      const item = currentData[selectedRowIndex];
      playPronunciation(item.adjektiv);
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

  // Render table
  function renderTable(items) {
    tableBody.innerHTML = "";
    const sorted = [...items].sort((a, b) => a.adjektiv.localeCompare(b.adjektiv, 'de'));
    currentData = sorted;
    sorted.forEach(item => {
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