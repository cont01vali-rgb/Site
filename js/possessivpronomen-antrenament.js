/* Possessivpronomen Antrenament Engine
   - 3 nivele de dificultate: Ușor, Normal, Greu
   - Ușor: opțiuni multiple cu 3 variante
   - Normal: completare manuală în ordine standard
   - Greu: completare manuală cu ordine amestecată
*/

(function(){
  // ====== Utilitare ======
  const $ = sel => document.querySelector(sel);
  const $$ = sel => document.querySelectorAll(sel);
  
  // Funcție pentru amestecare array
  const shuffle = arr => {
    const array = arr.slice();
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // ====== Date de bază ======
  const pronounData = [
    { person: "ich", masculine: "mein", neuter: "mein", feminine: "meine", plural: "meine" },
    { person: "du", masculine: "dein", neuter: "dein", feminine: "deine", plural: "deine" },
    { person: "er", masculine: "sein", neuter: "sein", feminine: "seine", plural: "seine" },
    { person: "sie (ea)", masculine: "ihr", neuter: "ihr", feminine: "ihre", plural: "ihre" },
    { person: "es", masculine: "sein", neuter: "sein", feminine: "seine", plural: "seine" },
    { person: "wir", masculine: "unser", neuter: "unser", feminine: "unsere", plural: "unsere" },
    { person: "ihr", masculine: "euer", neuter: "euer", feminine: "eure", plural: "eure" },
    { person: "sie (ei)", masculine: "ihr", neuter: "ihr", feminine: "ihre", plural: "ihre" },
    { person: "Sie (formal)", masculine: "Ihr", neuter: "Ihr", feminine: "Ihre", plural: "Ihre" }
  ];

  // Toate variantele posibile pentru opțiuni multiple
  const allOptions = ["mein", "meine", "dein", "deine", "sein", "seine", "ihr", "ihre", "unser", "unsere", "euer", "eure", "Ihr", "Ihre"];

  // ====== State ======
  let currentLevel = 'easy';
  let currentData = [];
  let isChecked = false;

  // ====== Funcții principale ======
  function initializeTraining() {
    setupDifficultyButtons();
    generateTable();
  }

  function setupDifficultyButtons() {
    $$('.difficulty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Resetează starea
        isChecked = false;
        $('#check-btn').style.display = '';
        $('#reset-btn').style.display = 'none';
        $('#result-display').style.display = 'none';
        
        // Actualizează UI
        $$('.difficulty-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Schimbă nivelul
        currentLevel = btn.dataset.level;
        generateTable();
      });
    });

    $('#check-btn').addEventListener('click', checkAnswers);
    $('#reset-btn').addEventListener('click', resetTable);
  }

  function generateTable() {
    const tbody = $('#training-table-body');
    tbody.innerHTML = '';
    
    // Pregătește datele - amestecate pentru nivel greu
    if (currentLevel === 'hard') {
      currentData = shuffle([...pronounData]);
    } else {
      currentData = [...pronounData];
    }

    currentData.forEach((row, rowIndex) => {
      const tr = document.createElement('tr');
      
      // Coloana persoană (întotdeauna completată)
      const personCell = document.createElement('td');
      personCell.textContent = row.person;
      personCell.style.fontWeight = '600';
      tr.appendChild(personCell);
      
      // Celulele pentru pronume
      ['masculine', 'neuter', 'feminine', 'plural'].forEach(gender => {
        const cell = document.createElement('td');
        cell.style.padding = '8px';
        
        if (currentLevel === 'easy') {
          // Mod ușor: buton cu dropdown
          const button = document.createElement('button');
          button.className = 'easy-btn';
          button.style.cssText = `
            width: 100%; 
            padding: 8px; 
            border: 2px solid #ddd; 
            border-radius: 4px; 
            background: white; 
            cursor: pointer;
            font-size: 14px;
          `;
          button.textContent = '---';
          button.dataset.correct = row[gender];
          button.dataset.row = rowIndex;
          button.dataset.gender = gender;
          
          button.addEventListener('click', () => showOptions(button));
          cell.appendChild(button);
          
        } else {
          // Mod normal/greu: input de text
          const input = document.createElement('input');
          input.type = 'text';
          input.style.cssText = `
            width: 90%; 
            padding: 8px; 
            border: 2px solid #ddd; 
            border-radius: 4px; 
            text-align: center;
            font-size: 14px;
          `;
          input.dataset.correct = row[gender];
          input.dataset.row = rowIndex;
          input.dataset.gender = gender;
          cell.appendChild(input);
        }
        
        tr.appendChild(cell);
      });
      
      tbody.appendChild(tr);
    });
  }

  function showOptions(button) {
    if (isChecked) return; // Nu permite modificări după verificare
    
    // Închide alte dropdown-uri
    $$('.options-dropdown').forEach(dropdown => dropdown.remove());
    
    const correctAnswer = button.dataset.correct;
    
    // Generează 3 opțiuni: răspunsul corect + 2 greșite
    let options = [correctAnswer];
    const otherOptions = allOptions.filter(opt => opt !== correctAnswer);
    
    // Adaugă 2 opțiuni greșite random
    while (options.length < 3 && otherOptions.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherOptions.length);
      options.push(otherOptions.splice(randomIndex, 1)[0]);
    }
    
    // Amestecă opțiunile
    options = shuffle(options);
    
    // Creează dropdown
    const dropdown = document.createElement('div');
    dropdown.className = 'options-dropdown';
    dropdown.style.cssText = `
      position: absolute;
      background: white;
      border: 2px solid #ccc;
      border-radius: 4px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      z-index: 1000;
      min-width: 120px;
    `;
    
    options.forEach(option => {
      const optionBtn = document.createElement('button');
      optionBtn.textContent = option;
      optionBtn.style.cssText = `
        width: 100%;
        padding: 8px 12px;
        border: none;
        background: white;
        cursor: pointer;
        text-align: left;
        font-size: 14px;
      `;
      
      optionBtn.addEventListener('mouseenter', () => {
        optionBtn.style.backgroundColor = '#f0f0f0';
      });
      optionBtn.addEventListener('mouseleave', () => {
        optionBtn.style.backgroundColor = 'white';
      });
      
      optionBtn.addEventListener('click', () => {
        button.textContent = option;
        button.dataset.selected = option;
        dropdown.remove();
      });
      
      dropdown.appendChild(optionBtn);
    });
    
    // Poziționează dropdown-ul
    const rect = button.getBoundingClientRect();
    dropdown.style.position = 'fixed';
    dropdown.style.top = (rect.bottom + 5) + 'px';
    dropdown.style.left = rect.left + 'px';
    
    document.body.appendChild(dropdown);
    
    // Închide dropdown la click în afara lui
    const closeDropdown = (e) => {
      if (!dropdown.contains(e.target) && e.target !== button) {
        dropdown.remove();
        document.removeEventListener('click', closeDropdown);
      }
    };
    setTimeout(() => document.addEventListener('click', closeDropdown), 10);
  }

  function checkAnswers() {
    if (isChecked) return;
    
    let correct = 0;
    let total = 0;
    
    if (currentLevel === 'easy') {
      // Verifică butoanele
      $$('.easy-btn').forEach(button => {
        total++;
        const selected = button.dataset.selected;
        const correctAnswer = button.dataset.correct;
        
        if (selected === correctAnswer) {
          correct++;
          // Feedback corect: bordură verde + background verde pal
          button.style.borderColor = '#22c55e';
          button.style.backgroundColor = '#dcfce7';
          button.style.color = 'black';
        } else {
          // Feedback greșit: bordură roșie + background roșu pal + text roșu
          button.style.borderColor = '#ef4444';
          button.style.backgroundColor = '#fee2e2';
          button.style.color = '#ef4444';
          
          // Afișează răspunsul corect
          if (!selected) {
            button.textContent = `✗ ${correctAnswer}`;
          } else {
            button.textContent = `✗ ${correctAnswer}`;
          }
        }
      });
      
    } else {
      // Verifică input-urile
      $$('#training-table-body input').forEach(input => {
        total++;
        const userAnswer = input.value.trim();
        const correctAnswer = input.dataset.correct;
        
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
          correct++;
          // Feedback corect: bordură verde
          input.style.borderColor = '#22c55e';
          input.style.backgroundColor = '#dcfce7';
          input.style.color = 'black';
        } else {
          // Feedback greșit: bordură roșie + background roșu pal + text roșu
          input.style.borderColor = '#ef4444';
          input.style.backgroundColor = '#fee2e2';
          input.style.color = '#ef4444';
          
          // Afișează răspunsul corect dacă e gol sau greșit
          if (!userAnswer) {
            input.value = correctAnswer;
          } else {
            input.value = `${userAnswer} → ${correctAnswer}`;
          }
        }
        input.disabled = true;
      });
    }
    
    // Afișează rezultatele
    const percentage = Math.round((correct / total) * 100);
    $('#result-display').style.display = 'block';
    $('#result-title').textContent = `Rezultat: ${percentage}%`;
    $('#result-details').textContent = `Ai completat corect ${correct} din ${total} căsuțe.`;
    
    // Schimbă butoanele
    $('#check-btn').style.display = 'none';
    $('#reset-btn').style.display = '';
    
    isChecked = true;
  }

  function resetTable() {
    isChecked = false;
    $('#check-btn').style.display = '';
    $('#reset-btn').style.display = 'none';
    $('#result-display').style.display = 'none';
    
    // Regenerează tabelul
    generateTable();
  }

  // ====== Inițializare ======
  document.addEventListener('DOMContentLoaded', initializeTraining);

})();