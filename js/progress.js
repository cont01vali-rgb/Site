(function(){
  const $ = s => document.querySelector(s);

  const labelCat = (key) => ({
    'die-wochentage':'Wochentage',
    'die-jahreszeiten':'Jahreszeiten',
    'die-uhrzeit':'Uhrzeit',
    'die-tageszeiten':'Tageszeiten',
    'der-die-das':'Der/Die/Das',
    'das-nomen':'Das Nomen',
    'das-adjektiv':'Das Adjektiv',
    'das-verb':'Das Verb',
    'personalpronomen':'Personalpronomen',
    'possessivpronomen':'Possessivpronomen',
    'das-schulsystem':'Das Schulsystem',
    'buchstabiertafel':'Buchstabiertafel'
  }[key] || key);

  function badgeClass(percent) {
    if (percent <= 20) return 'red';
    if (percent < 80) return 'yellow';
    return 'green';
  }

  function getDifficultyClass(difficulty) {
    const diff = String(difficulty || '').toLowerCase();
    switch(diff) {
      case 'easy': return 'diff-easy';
      case 'medium': return 'diff-medium';
      case 'hard': return 'diff-hard';
      case 'hero': return 'diff-hero';
      case 'crazy': return 'diff-crazy';
      default: return 'diff-default';
    }
  }

  function renderWithAnimation() {
    const list = $('#historyList');
    const currentCards = list.querySelectorAll('.progress-card');
    const showVocabulary = $('#vocabularyToggle')?.checked || false;
    
    if (currentCards.length > 0) {
      // Animație de ieșire
      currentCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add(showVocabulary ? 'slide-down' : 'slide-up');
        }, index * 50); // Delay progresiv pentru efect elegant
      });
      
      // După animație, renderează conținutul nou
      setTimeout(() => {
        renderContent();
      }, currentCards.length * 50 + 500);
    } else {
      // Dacă nu sunt carduri, renderează direct
      renderContent();
    }
  }

  function renderContent() {
    const list = $('#historyList');
    const empty = $('#historyEmpty');
    const showVocabulary = $('#vocabularyToggle')?.checked || false;
    list.innerHTML = '';

    // Obține utilizatorul curent
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      empty.style.display = '';
      empty.textContent = 'Te rog să selectezi un utilizator de pe pagina principală pentru a vedea progresul.';
      return;
    }

    // Încarcă istoricele pentru utilizatorul curent
    let generalItems = [];
    let vocabularyItems = [];
    try { 
      const allGeneralHistory = JSON.parse(localStorage.getItem('generalTestHistory')||'[]');
      const allVocabularyHistory = JSON.parse(localStorage.getItem('vocabularyTestHistory')||'[]');
      
      // Filtrează doar pentru utilizatorul curent
      generalItems = allGeneralHistory.filter(item => item.user === currentUser);
      vocabularyItems = allVocabularyHistory.filter(item => item.user === currentUser);
    }
    catch { generalItems = []; vocabularyItems = []; }

    // Determină ce să afișeze
    let itemsToShow = [];
    if (showVocabulary) {
      // DOAR vocabular
      itemsToShow = vocabularyItems.map(item => ({...item, testType: 'vocabulary'}));
    } else {
      // DOAR generale
      itemsToShow = generalItems.map(item => ({...item, testType: 'general'}));
    }

    if (!itemsToShow.length) {
      empty.style.display = '';
      empty.textContent = showVocabulary 
        ? `${currentUser} nu a făcut încă teste de vocabular.` 
        : `${currentUser} nu a făcut încă teste generale.`;
      return;
    }
    empty.style.display = 'none';

    // sort desc by date
    itemsToShow.sort((a,b)=> new Date(b.when) - new Date(a.when));

    // Create cards with fade-in animation
    itemsToShow.forEach((it, idx) => {
      const cls = badgeClass(Number(it.percent||0));
      const diffClass = it.testType === 'vocabulary' ? 'diff-vocabulary' : getDifficultyClass(it.difficulty);

      const date = new Date(it.when);
      const dstr = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}`;

      // Pentru testul de vocabular, afișăm breakdown-ul pe categorii
      let hoverContent = '';
      if (it.testType === 'vocabulary') {
        hoverContent = `
          <div class="hover-title">Rezultate pe categorii</div>
          ${it.categoryBreakdown ? Object.entries(it.categoryBreakdown).map(([cat, stats]) => {
            const catName = {
              'das-nomen': 'Substantive',
              'das-adjektiv': 'Adjective', 
              'das-verb': 'Verbe',
              'sentence-completion': 'Completări'
            }[cat] || cat;
            const catPercent = Math.round((stats.correct / stats.total) * 100);
            return `<div style="margin:2px 0;">• ${catName}: ${stats.correct}/${stats.total} (${catPercent}%)</div>`;
          }).join('') : '<div class="muted">Fără detalii</div>'}
        `;
      } else {
        // Pentru testul general, afișăm greșelile pe lecții
        const wrongCats = Array.isArray(it.wrongCategories) ? it.wrongCategories : [];
        const wrongList = wrongCats.map(labelCat);
        hoverContent = `
          <div class="hover-title">Greșeli pe lecții</div>
          ${wrongList.length
            ? `<ul class="hover-list">${wrongList.map(x=>`<li>${x}</li>`).join('')}</ul>`
            : `<div class="muted">Nicio greșeală 🎉</div>`
          }
        `;
      }

      const displayLabel = it.testType === 'vocabulary' ? 'Vocabular' : (it.difficulty ?? '-');

      const card = document.createElement('div');
      card.className = `progress-card ${cls}`;
      // Add initial hide class for animation
      card.classList.add('animate-in');
      
      card.innerHTML = `
        <div class="bar"></div>
        <div class="card-head">
          <div class="pill ${diffClass}">${displayLabel}</div>
          <div class="score">${it.score}/${it.total} • ${it.percent}%</div>
        </div>
        <div class="muted">${dstr}</div>
        <div class="hover-panel">
          ${hoverContent}
        </div>
      `;
      
      list.appendChild(card);
      
      // Trigger animation with delay for staggered effect
      setTimeout(() => {
        card.classList.remove('animate-in');
        card.classList.add('fade-in-down');
      }, idx * 100);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Afișează utilizatorul curent
    updateUserInfo();
    
    $('#refreshBtn').addEventListener('click', renderWithAnimation);
    $('#vocabularyToggle')?.addEventListener('change', renderWithAnimation);
    $('#clearBtn').addEventListener('click', () => {
      if (confirm('Ștergi întreg istoricul testelor (generale și vocabular)?')) {
        localStorage.removeItem('generalTestHistory');
        localStorage.removeItem('generalTestLast');
        localStorage.removeItem('vocabularyTestHistory');
        localStorage.removeItem('vocabularyTestLast');
        renderWithAnimation();
      }
    });
    renderContent(); // Prima încărcare fără animație
  });

  function updateUserInfo() {
    const currentUser = localStorage.getItem('currentUser');
    const userInfoText = $('#userInfoText');
    
    if (currentUser) {
      userInfoText.textContent = `📊 Progresul utilizatorului: ${currentUser}`;
      userInfoText.parentElement.style.background = '#dcfce7';
      userInfoText.parentElement.style.borderColor = '#22c55e';
      userInfoText.style.color = '#166534';
      userInfoText.style.fontWeight = '600';
    } else {
      userInfoText.textContent = 'Te rog să selectezi un utilizator de pe pagina principală.';
      userInfoText.parentElement.style.background = '#fef3c7';
      userInfoText.parentElement.style.borderColor = '#f59e0b';
      userInfoText.style.color = '#92400e';
      userInfoText.style.fontWeight = 'normal';
    }
  }
})();