// Load nouns from JSON and populate table
document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#nounsTable tbody');
  const searchInput = document.getElementById('searchInput');

  fetch('../data/nouns.json')
    .then(response => response.json())
    .then(data => {
      renderTable(data);

      // Live search
      searchInput.addEventListener('input', () => {
        const term = normalize(searchInput.value.toLowerCase());
        const filtered = data.filter(item =>
          normalize(item.nomen.toLowerCase()).includes(term) ||
          normalize(item.traducere.toLowerCase()).includes(term)
        );
        renderTable(filtered);
      });
    })
    .catch(err => {
      console.error("Eroare la încărcarea fișierului nouns.json:", err);
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
      row.innerHTML += `
        <td>${item.nomen}</td>
        <td>${item.gen}</td>
        <td>${item.traducere}</td>
        <td>${item.exemplu}</td>
      `;

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
