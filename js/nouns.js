// Nouns data
const nounsData = [
  {"nomen": "Apfel",  "gen": "der", "plural": "Äpfel",   "traducere": "măr",      "exemplu": "Der Apfel ist rot.", "image": "apfel.jpg"},
  {"nomen": "Haus",   "gen": "das", "plural": "Häuser",  "traducere": "casă",     "exemplu": "Das Haus ist groß.", "image": "haus.jpg"},
  {"nomen": "Blume",  "gen": "die", "plural": "Blumen",  "traducere": "floare",   "exemplu": "Die Blume ist schön.", "image": "blume.jpg"},
  {"nomen": "Auto",   "gen": "das", "plural": "Autos",   "traducere": "mașină",   "exemplu": "Das Auto ist schnell.", "image": "auto.jpg"},
  {"nomen": "Rose",   "gen": "die", "plural": "Rosen",   "traducere": "trandafir","exemplu": "Die Rose ist schön.", "image": "rose.jpg"},
  {"nomen": "Brille", "gen": "die", "plural": "Brillen", "traducere": "ochelari", "exemplu": "Meine Brille liegt auf dem Tisch.", "image": "brille.jpg"},
  {"nomen": "Schere", "gen": "die", "plural": "Scheren", "traducere": "foarfecă","exemplu": "Die Schere ist scharf.", "image": "schere.jpg"},
  {"nomen": "Adresse","gen": "die", "plural": "Adressen","traducere":"adresă",   "exemplu":"Meine Adresse ist in Wien.", "image":"adresse.jpg"},
  {"nomen": "Arbeit", "gen": "die", "plural": "Arbeiten","traducere":"muncă",    "exemplu":"Ich habe heute viel Arbeit.", "image":"arbeit.jpg"},
  {"nomen": "Bruder","gen":"der","plural":"Brüder","traducere":"frate","exemplu":"Mein Bruder ist 20 Jahre alt.","image":"bruder.jpg"},
  {"nomen": "Bub", "gen": "der", "plural": "Buben", "traducere": "băiat", "exemplu": "Der Bub spielt im Garten.", "image": "bub.jpg"},
  {"nomen": "Deutschkurs", "gen": "der", "plural": "Deutschkurse", "traducere": "curs de germană", "exemplu": "Ich besuche einen Deutschkurs.", "image": "deutschkurs.jpg"},
  {"nomen": "Eltern", "gen": "die", "plural": "-", "traducere": "părinți", "exemplu": "Meine Eltern wohnen in Graz.", "image": "eltern.jpg"},
  {"nomen": "Erwachsener", "gen": "der", "plural": "Erwachsenen", "traducere": "adult", "exemplu": "Ein Erwachsener muss Verantwortung zeigen."},
  {"nomen": "Erwachsene", "gen": "die", "plural": "Erwachsenen", "traducere": "adultă", "exemplu": "Die Erwachsene liest ein Buch."},
  {"nomen": "Familienstand", "gen": "der", "plural": "-", "traducere": "stare civilă", "exemplu": "Der Familienstand ist ledig."},
  {"nomen": "Formular","gen":"das","plural":"Formulare","traducere":"formular","exemplu":"Bitte füllen Sie das Formular aus.","image":"formular.jpg"},
  {"nomen": "Geburtsdatum", "gen": "das", "plural": "Geburtsdaten", "traducere": "data nașterii", "exemplu": "Mein Geburtsdatum ist der 3. Mai."},
  {"nomen": "Geschwister", "gen": "die", "plural": "-", "traducere": "frați", "exemplu": "Ich habe zwei Geschwister."},
  {"nomen": "Grammatik", "gen": "die", "plural": "Grammatiken", "traducere": "gramatică", "exemplu": "Die Grammatik ist manchmal schwierig."},
  {"nomen": "Hausaufgabe", "gen": "die", "plural": "Hausaufgaben", "traducere": "temă pentru acasă", "exemplu": "Ich mache meine Hausaufgaben am Abend."},
  {"nomen": "Hausübung", "gen": "die", "plural": "Hausübungen", "traducere": "exercițiu pentru acasă", "exemplu": "Die Hausübung ist einfach."},
  {"nomen": "Hort", "gen": "der", "plural": "Horte", "traducere": "centru de zi", "exemplu": "Das Kind geht in den Hort."},
  {"nomen": "Kind", "gen": "das", "plural": "Kinder", "traducere": "copil", "exemplu": "Das Kind spielt draußen.", "image": "kind.jpg"},
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
  {"nomen": "Uhr", "gen": "die", "plural": "Uhren", "traducere": "ceas", "exemplu": "Meine Uhr ist kaputt.", "image": "uhr.jpg"},
  {"nomen": "Universität", "gen": "die", "plural": "Universitäten", "traducere": "universitate", "exemplu": "Er studiert an der Universität Graz."},
  {"nomen": "Unterschrift", "gen": "die", "plural": "Unterschriften", "traducere": "semnătură", "exemplu": "Bitte geben Sie Ihre Unterschrift hier."},
  {"nomen": "Antwort","gen": "die", "plural": "Antworten","traducere":"răspuns","exemplu":"Ich habe die richtige Antwort gefunden.", "image":"antwort.jpg"},
  {"nomen": "Aufgabe", "gen": "die", "plural": "Aufgaben", "traducere": "sarcină / exercițiu", "exemplu": "Die Aufgabe ist leicht.", "image": "aufgabe.jpg"},
  {"nomen": "Beruf","gen":"der","plural":"Berufe","traducere":"profesie","exemplu":"Mein Beruf ist Lehrer.","image":"beruf.jpg"},
  {"nomen": "Ausbildung", "gen": "die", "plural": "Ausbildungen", "traducere": "formare profesională", "exemplu": "Sie macht eine Ausbildung als Krankenschwester."},
  {"nomen": "Berater","gen":"der","plural":"Berater","traducere":"consilier","exemplu":"Der Berater hilft den Kunden.","image":"berater.jpg"},
  {"nomen": "Beraterin","gen":"die","plural":"Beraterinnen","traducere":"consilieră","exemplu":"Die Beraterin erklärt alles sehr gut.","image":"beraterin.jpg"},
  {"nomen": "Bleistift", "gen": "der", "plural": "Bleistifte", "traducere": "creion", "exemplu": "Ich schreibe mit einem Bleistift.", "image": "bleistift.jpg"},
  {"nomen": "Berufsschule", "gen": "die", "plural": "Berufsschulen", "traducere": "școală profesională", "exemplu": "Er besucht die Berufsschule."},
  {"nomen": "Berufswunsch", "gen": "der", "plural": "Berufswünsche", "traducere": "dorință profesională", "exemplu": "Mein Berufswunsch ist Arzt."},
  {"nomen": "Block","gen":"der","plural":"Blöcke","traducere":"bloc / caiet","exemplu":"Ich schreibe in meinen Block.","image":"block.jpg"},
  {"nomen": "Fachhochschule", "gen": "die", "plural": "Fachhochschulen", "traducere": "universitate de științe aplicate", "exemplu": "Er studiert an einer Fachhochschule."},
  {"nomen": "Füllfeder", "gen": "die", "plural": "Füllfedern", "traducere": "stilou", "exemplu": "Ich schreibe mit einer Füllfeder."},
  {"nomen": "Geburtsort", "gen": "der", "plural": "Geburtsorte", "traducere": "locul nașterii", "exemplu": "Mein Geburtsort ist Bukarest."},
  {"nomen": "Gymnasium", "gen": "das", "plural": "Gymnasien", "traducere": "liceu teoretic", "exemplu": "Meine Tochter geht ins Gymnasium."},
  {"nomen": "Handelsakademie (HAK)", "gen": "die", "plural": "Handelsakademien", "traducere": "academie comercială", "exemplu": "Er besucht die Handelsakademie."},
  {"nomen": "Hilfe", "gen": "die", "plural": "Hilfen", "traducere": "ajutor", "exemplu": "Danke für deine Hilfe!"},
  {"nomen": "Höhere Technische Lehranstalt (HTL)", "gen": "die", "plural": "Höheren Technischen Lehranstalten", "traducere": "liceu tehnic superior", "exemplu": "Er lernt an der HTL."},
  {"nomen": "Information", "gen": "die", "plural": "Informationen", "traducere": "informație", "exemplu": "Ich brauche mehr Informationen."},
  {"nomen": "Kindergartenpflicht", "gen": "die", "plural": "-", "traducere": "obligativitatea grădiniței", "exemplu": "Die Kindergartenpflicht gilt für alle Kinder."},
  {"nomen": "Kugelschreiber", "gen": "der", "plural": "Kugelschreiber", "traducere": "pix", "exemplu": "Der Kugelschreiber liegt auf dem Tisch.", "image": "kuli.jpg"},
  {"nomen": "Kursraum", "gen": "der", "plural": "Kursräume", "traducere": "sală de curs", "exemplu": "Der Kursraum ist groß und hell."},
  {"nomen": "Lehre", "gen": "die", "plural": "-", "traducere": "ucenicie / instruire", "exemplu": "Er macht eine Lehre als Mechaniker."},
  {"nomen": "Lineal", "gen": "das", "plural": "Lineale", "traducere": "riglă", "exemplu": "Ich messe die Linie mit dem Lineal.", "image": "lineal.jpg"},
  {"nomen": "Lösung", "gen": "die", "plural": "Lösungen", "traducere": "soluție", "exemplu": "Ich habe die Lösung gefunden."},
  {"nomen": "Mädchen", "gen": "das", "plural": "Mädchen", "traducere": "fată", "exemplu": "Das Mädchen spielt im Park.", "image": "madchen.jpg"},
  {"nomen": "Mappe", "gen": "die", "plural": "Mappen", "traducere": "mapă / dosar", "exemplu": "Die Mappe ist auf dem Tisch.", "image": "mappe.jpg"},
  {"nomen": "Mittelschule", "gen": "die", "plural": "Mittelschulen", "traducere": "școală gimnazială", "exemplu": "Er geht in die Mittelschule."},
  {"nomen": "Oberstufe", "gen": "die", "plural": "Oberstufen", "traducere": "ciclu superior", "exemplu": "Die Oberstufe dauert vier Jahre."},
  {"nomen": "Radiergummi", "gen": "der", "plural": "Radiergummis", "traducere": "gumă de șters", "exemplu": "Ich brauche einen neuen Radiergummi.", "image": "radiergummi.jpg"},

  // A1 – Obiecte prin casă
  {"nomen":"Tisch","gen":"der","plural":"Tische","traducere":"masă","exemplu":"Der Tisch ist groß.","image":"tisch.jpg"},
  {"nomen":"Stuhl","gen":"der","plural":"Stühle","traducere":"scaun","exemplu":"Der Stuhl ist bequem.","image":"stuhl.jpg"},
  {"nomen":"Bett","gen":"das","plural":"Betten","traducere":"pat","exemplu":"Das Bett ist neu.","image":"bett.jpg"},
  {"nomen":"Schrank","gen":"der","plural":"Schränke","traducere":"dulap","exemplu":"Der Schrank ist im Schlafzimmer.","image":"schrank.jpg"},
  {"nomen":"Kühlschrank","gen":"der","plural":"Kühlschränke","traducere":"frigider","exemplu":"Der Kühlschrank ist leer.","image":"kuhlschrank.jpg"},
  {"nomen":"Herd","gen":"der","plural":"Herde","traducere":"aragaz","exemplu":"Der Herd funktioniert gut.","image":"herd.jpg"},
  {"nomen":"Lampe","gen":"die","plural":"Lampen","traducere":"lampă","exemplu":"Die Lampe ist hell.","image":"lampe.jpg"},
  {"nomen":"Fenster","gen":"das","plural":"Fenster","traducere":"fereastră","exemplu":"Das Fenster ist offen.","image":"fenster.jpg"},
  {"nomen":"Tür","gen":"die","plural":"Türen","traducere":"ușă","exemplu":"Die Tür ist geschlossen.","image":"tuer.jpg"},
  {"nomen":"Küche","gen":"die","plural":"Küchen","traducere":"bucătărie","exemplu":"Die Küche ist modern.","image":"kuche.jpg"},
  {"nomen":"Bad","gen":"das","plural":"Bäder","traducere":"baie","exemplu":"Das Bad ist klein.","image":"bad.jpg"},
  {"nomen":"Badezimmer","gen":"das","plural":"Badezimmer","traducere":"baie","exemplu":"Das Badezimmer ist sauber.","image":"badezimmer.jpg"},
  {"nomen":"Wohnzimmer","gen":"das","plural":"Wohnzimmer","traducere":"sufragerie","exemplu":"Das Wohnzimmer ist gemütlich.","image":"wohnzimmer.jpg"},
  {"nomen":"Schlafzimmer","gen":"das","plural":"Schlafzimmer","traducere":"dormitor","exemplu":"Das Schlafzimmer ist ruhig.","image":"schlafzimmer.jpg"},
  {"nomen":"Sofa","gen":"das","plural":"Sofas","traducere":"canapea","exemplu":"Das Sofa ist weich.","image":"sofa.jpg"},
  {"nomen":"Fernseher","gen":"der","plural":"Fernseher","traducere":"televizor","exemplu":"Der Fernseher ist neu.","image":"fernseher.jpg"},
  {"nomen":"Computer","gen":"der","plural":"Computer","traducere":"computer","exemplu":"Der Computer ist langsam.","image":"computer.jpg"},

  // A1 – Veselă/ustensile
  {"nomen":"Teller","gen":"der","plural":"Teller","traducere":"farfurie","exemplu":"Ich brauche einen Teller.","image":"teller.jpg"},
  {"nomen":"Tasse","gen":"die","plural":"Tassen","traducere":"cană","exemplu":"Die Tasse ist leer.","image":"tasse.jpg"},
  {"nomen":"Glas","gen":"das","plural":"Gläser","traducere":"pahar","exemplu":"Das Glas ist voll.","image":"glas.jpg"},
  {"nomen":"Löffel","gen":"der","plural":"Löffel","traducere":"lingură","exemplu":"Ich nehme einen Löffel.","image":"loffel.jpg"},
  {"nomen":"Gabel","gen":"die","plural":"Gabeln","traducere":"furculiță","exemplu":"Die Gabel ist sauber.","image":"gabel.jpg"},
  {"nomen":"Messer","gen":"das","plural":"Messer","traducere":"cuțit","exemplu":"Das Messer ist scharf.","image":"messer.jpg"},

  // A1 – Alimente & băuturi
  {"nomen":"Brot","gen":"das","plural":"Brote","traducere":"pâine","exemplu":"Das Brot ist frisch.","image":"brot.jpg"},
  {"nomen":"Wasser","gen":"das","plural":"-","traducere":"apă","exemplu":"Ich trinke Wasser.","image":"wasser.png"},
  {"nomen":"Milch","gen":"die","plural":"-","traducere":"lapte","exemplu":"Die Milch ist kalt.","image":"milch.jpg"},
  {"nomen":"Kaffee","gen":"der","plural":"-","traducere":"cafea","exemplu":"Der Kaffee ist heiß."},
  {"nomen":"Tee","gen":"der","plural":"-","traducere":"ceai","exemplu":"Der Tee ist grün.","image":"tee.jpg"},

  // A1 – Fructe
  {"nomen":"Banane","gen":"die","plural":"Bananen","traducere":"banană","exemplu":"Die Banane ist gelb.","image":"banane.jpg"},
  {"nomen":"Orange","gen":"die","plural":"Orangen","traducere":"portocală","exemplu":"Die Orange ist süß.","image":"orange.jpg"},
  {"nomen":"Erdbeere","gen":"die","plural":"Erdbeeren","traducere":"căpșună","exemplu":"Die Erdbeere ist frisch.","image":"erdbeere.jpg"},
  {"nomen":"Traube","gen":"die","plural":"Trauben","traducere":"strugure","exemplu":"Die Trauben sind lila.","image":"traube.jpg"},
  {"nomen":"Birne","gen":"die","plural":"Birnen","traducere":"pară","exemplu":"Die Birne ist saftig.","image":"birne.jpg"},
  {"nomen":"Zitrone","gen":"die","plural":"Zitronen","traducere":"lămâie","exemplu":"Die Zitrone ist sauer.","image":"zitrone.jpg"},

  // A1 – Legume
  {"nomen":"Tomate","gen":"die","plural":"Tomaten","traducere":"roșie","exemplu":"Die Tomate ist rot.","image":"tomate.jpg"},
  {"nomen":"Gurke","gen":"die","plural":"Gurken","traducere":"castravete","exemplu":"Die Gurke ist grün.","image":"gurke.jpg"},
  {"nomen":"Kartoffel","gen":"die","plural":"Kartoffeln","traducere":"cartof","exemplu":"Die Kartoffeln sind billig.","image":"kartoffel.jpg"},
  {"nomen":"Zwiebel","gen":"die","plural":"Zwiebeln","traducere":"ceapă","exemplu":"Die Zwiebel ist klein.","image":"zwiebel.jpg"},
  {"nomen":"Karotte","gen":"die","plural":"Karotten","traducere":"morcov","exemplu":"Die Karotte ist orange.","image":"karotte.jpg"},
  {"nomen":"Paprika","gen":"der","plural":"Paprikas","traducere":"ardei","exemplu":"Der Paprika ist rot.","image":"paprika.jpg"},
  {"nomen":"Salat","gen":"der","plural":"Salate","traducere":"salată","exemplu":"Der Salat ist frisch.","image":"salat.jpg"},

  // A1 – Școală / obiecte uzuale
  {"nomen":"Buch","gen":"das","plural":"Bücher","traducere":"carte","exemplu":"Das Buch ist interessant.","image":"buch.jpg"},
  {"nomen":"Heft","gen":"das","plural":"Hefte","traducere":"caiet","exemplu":"Das Heft ist neu.","image":"heft.jpg"},
  {"nomen":"Rucksack","gen":"der","plural":"Rucksäcke","traducere":"rucsac","exemplu":"Der Rucksack ist schwer.","image":"rucksack.jpg"},
  {"nomen":"Handy","gen":"das","plural":"Handys","traducere":"telefon mobil","exemplu":"Mein Handy ist alt.","image":"handy.jpg"},
  {"nomen":"Geld","gen":"das","plural":"-","traducere":"bani","exemplu":"Ich habe kein Geld.","image":"geld.jpg"},

  // A1 – Îmbrăcăminte
  {"nomen":"T-Shirt","gen":"das","plural":"T-Shirts","traducere":"tricou","exemplu":"Das T-Shirt ist blau.","image":"tshirt.jpg"},
  {"nomen":"Hose","gen":"die","plural":"Hosen","traducere":"pantaloni","exemplu":"Die Hose ist schwarz.","image":"hose.jpg"},
  {"nomen":"Schuh","gen":"der","plural":"Schuhe","traducere":"pantof","exemplu":"Die Schuhe sind neu.","image":"schuh.jpg"},
  {"nomen":"Jacke","gen":"die","plural":"Jacken","traducere":"geacă","exemplu":"Die Jacke ist warm.","image":"jacke.jpg"},

  // A1 – Familie și locuri
  {"nomen":"Mutter","gen":"die","plural":"Mütter","traducere":"mamă","exemplu":"Meine Mutter kocht.","image":"mutter.jpg"},
  {"nomen":"Vater","gen":"der","plural":"Väter","traducere":"tată","exemplu":"Mein Vater arbeitet.","image":"vater.jpg"},
  {"nomen":"Familie","gen":"die","plural":"Familien","traducere":"familie","exemplu":"Meine Familie ist groß.","image":"familie.jpg"},
  {"nomen":"Supermarkt","gen":"der","plural":"Supermärkte","traducere":"supermarket","exemplu":"Der Supermarkt ist in der Nähe.","image":"supermarkt.jpg"},
  {"nomen":"Bahnhof","gen":"der","plural":"Bahnhöfe","traducere":"gară","exemplu":"Der Bahnhof ist alt.","image":"bahnhof.jpg"},
  {"nomen":"Schule","gen":"die","plural":"Schulen","traducere":"școală","exemplu":"Die Schule ist groß.","image":"schule.jpg"},
  {"nomen":"Park","gen":"der","plural":"Parks","traducere":"parc","exemplu":"Der Park ist schön.","image":"park.jpg"},
  {"nomen":"Zimmer","gen":"das","plural":"Zimmer","traducere":"cameră","exemplu":"Das Zimmer ist klein.","image":"zimmer.jpeg"}

];

window.nounsData = nounsData;

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
