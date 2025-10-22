// Nouns data
const nounsData = [
  {"nomen": "Apfel",  "gen": "der", "plural": "Äpfel",   "traducere": "măr",      "exemplu": "Der Apfel ist rot."},
  {"nomen": "Haus",   "gen": "das", "plural": "Häuser",  "traducere": "casă",     "exemplu": "Das Haus ist groß."},
  {"nomen": "Blume",  "gen": "die", "plural": "Blumen",  "traducere": "floare",   "exemplu": "Die Blume ist schön."},
  {"nomen": "Auto",   "gen": "das", "plural": "Autos",   "traducere": "mașină",   "exemplu": "Das Auto ist schnell."},
  {"nomen": "Rose",   "gen": "die", "plural": "Rosen",   "traducere": "trandafir","exemplu": "Die Rose ist schön."},
  {"nomen": "Brille", "gen": "die", "plural": "Brillen", "traducere": "ochelari", "exemplu": "Meine Brille liegt auf dem Tisch."},
  {"nomen": "Schere", "gen": "die", "plural": "Scheren",  "traducere": "foarfecă", "exemplu": "Die Schere ist scharf."},
  {"nomen": "Adresse", "gen": "die", "plural": "Adressen", "traducere": "adresă", "exemplu": "Meine Adresse ist in Wien."},
  {"nomen": "Arbeit", "gen": "die", "plural": "Arbeiten", "traducere": "muncă", "exemplu": "Ich habe heute viel Arbeit."},
  {"nomen": "Bruder", "gen": "der", "plural": "Brüder", "traducere": "frate", "exemplu": "Mein Bruder ist 20 Jahre alt."},
  {"nomen": "Bub", "gen": "der", "plural": "Buben", "traducere": "băiat", "exemplu": "Der Bub spielt im Garten."},
  {"nomen": "Deutschkurs", "gen": "der", "plural": "Deutschkurse", "traducere": "curs de germană", "exemplu": "Ich besuche einen Deutschkurs."},
  {"nomen": "Eltern", "gen": "die", "plural": "-", "traducere": "părinți", "exemplu": "Meine Eltern wohnen in Graz."},
  {"nomen": "Erwachsener", "gen": "der", "plural": "Erwachsenen", "traducere": "adult", "exemplu": "Ein Erwachsener muss Verantwortung zeigen."},
  {"nomen": "Erwachsene", "gen": "die", "plural": "Erwachsenen", "traducere": "adultă", "exemplu": "Die Erwachsene liest ein Buch."},
  {"nomen": "Familienstand", "gen": "der", "plural": "-", "traducere": "stare civilă", "exemplu": "Der Familienstand ist ledig."},
  {"nomen": "Formular", "gen": "das", "plural": "Formulare", "traducere": "formular", "exemplu": "Bitte füllen Sie das Formular aus."},
  {"nomen": "Geburtsdatum", "gen": "das", "plural": "Geburtsdaten", "traducere": "data nașterii", "exemplu": "Mein Geburtsdatum ist der 3. Mai."},
  {"nomen": "Geschwister", "gen": "die", "plural": "-", "traducere": "frați", "exemplu": "Ich habe zwei Geschwister."},
  {"nomen": "Grammatik", "gen": "die", "plural": "Grammatiken", "traducere": "gramatică", "exemplu": "Die Grammatik ist manchmal schwierig."},
  {"nomen": "Hausaufgabe", "gen": "die", "plural": "Hausaufgaben", "traducere": "temă pentru acasă", "exemplu": "Ich mache meine Hausaufgaben am Abend."},
  {"nomen": "Hausübung", "gen": "die", "plural": "Hausübungen", "traducere": "exercițiu pentru acasă", "exemplu": "Die Hausübung ist einfach."},
  {"nomen": "Hort", "gen": "der", "plural": "Horte", "traducere": "centru de zi", "exemplu": "Das Kind geht in den Hort."},
  {"nomen": "Kind", "gen": "das", "plural": "Kinder", "traducere": "copil", "exemplu": "Das Kind spielt draußen."},
  {"nomen": "Kindergarten", "gen": "der", "plural": "Kindergärten", "traducere": "grădiniță", "exemplu": "Mein Sohn geht in den Kindergarten."},
  {"nomen": "Meldezettel", "gen": "der", "plural": "Meldezettel", "traducere": "fișă de înregistrare", "exemplu": "Ich brauche den Meldezettel für das Amt."},
  {"nomen": "Monat", "gen": "der", "plural": "Monate", "traducere": "lună", "exemplu": "Ein Jahr hat zwölf Monate."},
  {"nomen": "Nationalität", "gen": "die", "plural": "Nationalitäten", "traducere": "naționalitate", "exemplu": "Meine Nationalität ist rumänisch."},
  {"nomen": "Postleitzahl", "gen": "die", "plural": "Postleitzahlen", "traducere": "cod poștal", "exemplu": "Wie ist deine Postleitzahl?"},
  {"nomen": "Schwester", "gen": "die", "plural": "Schwestern", "traducere": "soră", "exemplu": "Meine Schwester studiert in Wien."},
  {"nomen": "Sohn", "gen": "der", "plural": "Söhne", "traducere": "fiu", "exemplu": "Mein Sohn spielt Fußball."},
  {"nomen": "Staatsbürgerschaft", "gen": "die", "plural": "Staatsbürgerschaften", "traducere": "cetățenie", "exemplu": "Ich habe die österreichische Staatsbürgerschaft."},
  {"nomen": "Straße", "gen": "die", "plural": "Straßen", "traducere": "stradă", "exemplu": "Ich wohne in der Hauptstraße."},
  {"nomen": "Telefonnummer", "gen": "die", "plural": "Telefonnummern", "traducere": "număr de telefon", "exemplu": "Wie ist deine Telefonnummer?"},
  {"nomen": "Tochter", "gen": "die", "plural": "Töchter", "traducere": "fiică", "exemplu": "Meine Tochter ist fünf Jahre alt."},
  {"nomen": "Uhr", "gen": "die", "plural": "Uhren", "traducere": "ceas", "exemplu": "Meine Uhr ist kaputt."},
  {"nomen": "Universität", "gen": "die", "plural": "Universitäten", "traducere": "universitate", "exemplu": "Er studiert an der Universität Graz."},
  {"nomen": "Unterschrift", "gen": "die", "plural": "Unterschriften", "traducere": "semnătură", "exemplu": "Bitte geben Sie Ihre Unterschrift hier."},
  {"nomen": "Antwort", "gen": "die", "plural": "Antworten", "traducere": "răspuns", "exemplu": "Ich habe die richtige Antwort gefunden."},
  {"nomen": "Aufgabe", "gen": "die", "plural": "Aufgaben", "traducere": "sarcină / exercițiu", "exemplu": "Die Aufgabe ist leicht."},
  {"nomen": "Beruf", "gen": "der", "plural": "Berufe", "traducere": "profesie", "exemplu": "Mein Beruf ist Lehrer."},
  {"nomen": "Ausbildung", "gen": "die", "plural": "Ausbildungen", "traducere": "formare profesională", "exemplu": "Sie macht eine Ausbildung als Krankenschwester."},
  {"nomen": "Berater", "gen": "der", "plural": "Berater", "traducere": "consilier", "exemplu": "Der Berater hilft den Kunden."},
  {"nomen": "Beraterin", "gen": "die", "plural": "Beraterinnen", "traducere": "consilieră", "exemplu": "Die Beraterin erklärt alles sehr gut."},
  {"nomen": "Bleistift", "gen": "der", "plural": "Bleistifte", "traducere": "creion", "exemplu": "Ich schreibe mit einem Bleistift."},
  {"nomen": "Berufsschule", "gen": "die", "plural": "Berufsschulen", "traducere": "școală profesională", "exemplu": "Er besucht die Berufsschule."},
  {"nomen": "Berufswunsch", "gen": "der", "plural": "Berufswünsche", "traducere": "dorință profesională", "exemplu": "Mein Berufswunsch ist Arzt."},
  {"nomen": "Block", "gen": "der", "plural": "Blöcke", "traducere": "bloc / caiet", "exemplu": "Ich schreibe in meinen Block."},
  {"nomen": "Fachhochschule", "gen": "die", "plural": "Fachhochschulen", "traducere": "universitate de științe aplicate", "exemplu": "Er studiert an einer Fachhochschule."},
  {"nomen": "Füllfeder", "gen": "die", "plural": "Füllfedern", "traducere": "stilou", "exemplu": "Ich schreibe mit einer Füllfeder."},
  {"nomen": "Geburtsort", "gen": "der", "plural": "Geburtsorte", "traducere": "locul nașterii", "exemplu": "Mein Geburtsort ist Bukarest."},
  {"nomen": "Gymnasium", "gen": "das", "plural": "Gymnasien", "traducere": "liceu teoretic", "exemplu": "Meine Tochter geht ins Gymnasium."},
  {"nomen": "Handelsakademie (HAK)", "gen": "die", "plural": "Handelsakademien", "traducere": "academie comercială", "exemplu": "Er besucht die Handelsakademie."},
  {"nomen": "Hilfe", "gen": "die", "plural": "Hilfen", "traducere": "ajutor", "exemplu": "Danke für deine Hilfe!"},
  {"nomen": "Höhere Technische Lehranstalt (HTL)", "gen": "die", "plural": "Höheren Technischen Lehranstalten", "traducere": "liceu tehnic superior", "exemplu": "Er lernt an der HTL."},
  {"nomen": "Information", "gen": "die", "plural": "Informationen", "traducere": "informație", "exemplu": "Ich brauche mehr Informationen."},
  {"nomen": "Kindergartenpflicht", "gen": "die", "plural": "-", "traducere": "obligativitatea grădiniței", "exemplu": "Die Kindergartenpflicht gilt für alle Kinder."},
  {"nomen": "Kugelschreiber", "gen": "der", "plural": "Kugelschreiber", "traducere": "pix", "exemplu": "Der Kugelschreiber liegt auf dem Tisch."},
  {"nomen": "Kursraum", "gen": "der", "plural": "Kursräume", "traducere": "sală de curs", "exemplu": "Der Kursraum ist groß und hell."},
  {"nomen": "Lehre", "gen": "die", "plural": "-", "traducere": "ucenicie / instruire", "exemplu": "Er macht eine Lehre als Mechaniker."},
  {"nomen": "Lineal", "gen": "das", "plural": "Lineale", "traducere": "riglă", "exemplu": "Ich messe die Linie mit dem Lineal."},
  {"nomen": "Lösung", "gen": "die", "plural": "Lösungen", "traducere": "soluție", "exemplu": "Ich habe die Lösung gefunden."},
  {"nomen": "Mädchen", "gen": "das", "plural": "Mädchen", "traducere": "fată", "exemplu": "Das Mädchen spielt im Park."},
  {"nomen": "Mappe", "gen": "die", "plural": "Mappen", "traducere": "mapă / dosar", "exemplu": "Die Mappe ist auf dem Tisch."},
  {"nomen": "Mittelschule", "gen": "die", "plural": "Mittelschulen", "traducere": "școală gimnazială", "exemplu": "Er geht in die Mittelschule."},
  {"nomen": "Oberstufe", "gen": "die", "plural": "Oberstufen", "traducere": "ciclu superior", "exemplu": "Die Oberstufe dauert vier Jahre."},
  {"nomen": "Radiergummi", "gen": "der", "plural": "Radiergummis", "traducere": "gumă de șters", "exemplu": "Ich brauche einen neuen Radiergummi."}

];

// Load nouns and populate table
document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#nounsTable tbody');
  const searchInput = document.getElementById('searchInput');
  let currentData = nounsData;
  let selectedRowIndex = -1;

  renderTable(nounsData);

  // Live search
  searchInput.addEventListener('input', () => {
    const term = normalize(searchInput.value.toLowerCase());
    const filtered = nounsData.filter(item =>
      normalize(item.nomen.toLowerCase()).includes(term) ||
      normalize((item.traducere || "").toLowerCase()).includes(term) ||
      normalize((item.plural || "").toLowerCase()).includes(term)
    );
    currentData = filtered;
    selectedRowIndex = -1;
    renderTable(filtered);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const rows = tableBody.querySelectorAll('tr');
    if (rows.length === 0) return;

    // Arrow Down
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (selectedRowIndex < rows.length - 1) {
        selectedRowIndex++;
        updateSelection(rows);
      }
    }
    // Arrow Up
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (selectedRowIndex > 0) {
        selectedRowIndex--;
        updateSelection(rows);
      } else if (selectedRowIndex === -1 && rows.length > 0) {
        selectedRowIndex = 0;
        updateSelection(rows);
      }
    }
    // Enter - play audio
    else if (e.key === 'Enter' && selectedRowIndex >= 0 && selectedRowIndex < currentData.length) {
      e.preventDefault();
      const item = currentData[selectedRowIndex];
      playPronunciation(item.nomen);
    }
  });

  // Update visual selection
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

  // Function to render the table
  function renderTable(items) {
    tableBody.innerHTML = "";
    const sorted = [...items].sort((a, b) => a.nomen.localeCompare(b.nomen, 'de'));
    currentData = sorted;
    sorted.forEach(item => {
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
      genCell.textContent = item.gen || "";
      row.appendChild(genCell);

      const pluralCell = document.createElement('td');
      pluralCell.textContent = item.plural || "";
      row.appendChild(pluralCell);

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
