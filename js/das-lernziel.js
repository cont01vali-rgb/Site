// Renderer actualizat: sistemul acordeon pentru capitole cu traduceri
document.addEventListener('DOMContentLoaded', () => {
  const data = window.fragenkatalogA1 || [];
  
  // Împărțire în capitole (primul capitol: 0-46, al doilea: 47-59)
  const capitol1 = data.slice(0, 47);
  const capitol2 = data.slice(47);
  
  const listEl = document.getElementById('fragen-list');
  const paginationEl = document.querySelector('.pagination');

  // Funcția de toggle pentru acordeon
  function toggleLernzielChapter(chapterNumber) {
    const chapter = document.getElementById(`lernziel-chapter-${chapterNumber}`);
    if (!chapter) return;
    
    const isActive = chapter.classList.contains('active');
    
    // Închide toate capitolele
    document.querySelectorAll('#fragen-list .chapter').forEach(ch => {
      ch.classList.remove('active');
    });
    
    // Deschide capitolul curent dacă nu era activ
    if (!isActive) {
      chapter.classList.add('active');
    }
  }

  function render() {
    listEl.innerHTML = '';
    
    // Render Capitol 1 cu acordeon
    if (capitol1.length > 0) {
      const chapter1 = createChapterAccordion(1, 'lernziel.chapter1', capitol1, 1);
      listEl.appendChild(chapter1);
    }
    
    // Render Capitol 2 cu acordeon
    if (capitol2.length > 0) {
      const chapter2 = createChapterAccordion(2, 'lernziel.chapter2', capitol2, capitol1.length + 1);
      listEl.appendChild(chapter2);
    }
    
    // Ascunde paginarea
    if (paginationEl) {
      paginationEl.style.display = 'none';
    }
    
    // Deschide primul capitol implicit
    setTimeout(() => {
      const firstChapter = document.getElementById('lernziel-chapter-1');
      if (firstChapter) {
        firstChapter.classList.add('active');
      }
    }, 100);
  }

  function createChapterAccordion(chapterNumber, i18nKey, questions, startIndex) {
    const chapter = document.createElement('div');
    chapter.className = 'chapter';
    chapter.id = `lernziel-chapter-${chapterNumber}`;
    
    // Header acordeon
    const header = document.createElement('div');
    header.className = 'chapter-header';
    header.onclick = () => toggleLernzielChapter(chapterNumber);
    
    const titleSpan = document.createElement('span');
    titleSpan.setAttribute('data-i18n', i18nKey);
    titleSpan.textContent = chapterNumber === 1 ? 'Capitolul 1' : 'Capitolul 2';
    
    const arrow = document.createElement('span');
    arrow.className = 'chapter-arrow';
    arrow.textContent = '▼';
    
    header.appendChild(titleSpan);
    header.appendChild(arrow);
    
    // Conținut acordeon
    const content = document.createElement('div');
    content.className = 'chapter-content';
    
    const questionsContainer = document.createElement('div');
    questionsContainer.className = 'questions-container';
    
    questions.forEach((item, i) => {
      const wrapper = createQuestionElement(item, startIndex + i);
      questionsContainer.appendChild(wrapper);
    });
    
    content.appendChild(questionsContainer);
    
    chapter.appendChild(header);
    chapter.appendChild(content);
    
    return chapter;
  }

  function createQuestionElement(item, questionNumber) {
    const wrapper = document.createElement('div');
    wrapper.className = 'frage';

    // Header: numărul și textul german pe același rând
    const header = document.createElement('div');
    header.className = 'frage-header';
    const numSpan = document.createElement('span');
    numSpan.className = 'frage-number';
    numSpan.textContent = questionNumber + '. ';
    const textSpan = document.createElement('span');
    textSpan.className = 'frage-content';
    textSpan.innerHTML = escapeHtml(item.text);
    header.appendChild(numSpan);
    header.appendChild(textSpan);
    wrapper.appendChild(header);

    // Traducerea (fină, centrată) - dinamică pe baza limbii
    if (item.translations || item.translation) {
      const tr = document.createElement('div');
      tr.className = 'frage-translation';
      
      // Obține limba curentă din localStorage (același key ca în translate.js)
      const currentLang = localStorage.getItem('selectedLanguage') || 'en';
      let translationText = '';
      
      if (item.translations) {
        // Nou sistem cu traduceri multiple
        translationText = item.translations[currentLang] || item.translations['ro'] || '';
      } else if (item.translation) {
        // Sistem vechi - presupunem că este româna
        translationText = item.translation;
      }
      
      tr.innerHTML = escapeHtml(translationText);
      wrapper.appendChild(tr);
    }

    // Zona de răspunsuri cu evidențiere îmbunătățită
    const ans = document.createElement('div');
    ans.className = 'frage-answer';

    if (item.type === 'tf') {
      // Pentru true/false: evidențiere verde pentru corect, roșu pentru incorect
      if (item.answer === true) {
        ans.innerHTML = `a. <strong class="answer-correct">richtig</strong> &nbsp;&nbsp; b. <strong class="answer-incorrect">falsch</strong>`;
      } else {
        ans.innerHTML = `a. <strong class="answer-incorrect">richtig</strong> &nbsp;&nbsp; b. <strong class="answer-correct">falsch</strong>`;
      }
    } else if (item.type === 'mc') {
      // Pentru multiple choice: evidențiere verde doar pentru răspunsul corect
      const optEls = item.options.map((opt, idx) => {
        const letter = ['a','b','c'][idx] || String.fromCharCode(97+idx);
        const isCorrect = (String(item.correct||'').toLowerCase() === letter);
        const letterHtml = isCorrect ? `<strong class="answer-correct">${letter}.</strong>` : `<span class="answer-neutral">${letter}.</span>`;
        const content = opt.replace(/^[a-z]\.\s*/i, '');
        return `<div class="mc-row">${letterHtml} ${escapeHtml(content)}</div>`;
      }).join('');
      ans.innerHTML = optEls;
    }

    wrapper.appendChild(ans);
    return wrapper;
  }

  // Funcție escape HTML
  function escapeHtml(s) {
    return (s||'').toString()
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  render();

  // Funcție pentru a actualiza traducerile când se schimbă limba
  function updateTranslations() {
    const currentLang = localStorage.getItem('selectedLanguage') || 'en';
    console.log('Actualizez traducerile pentru limba:', currentLang);
    
    // Actualizează toate traducerile din întrebări
    document.querySelectorAll('.frage-translation').forEach((tr, index) => {
      const allQuestions = [...capitol1, ...capitol2];
      const item = allQuestions[index];
      
      if (item && (item.translations || item.translation)) {
        let translationText = '';
        
        if (item.translations) {
          translationText = item.translations[currentLang] || item.translations['ro'] || '';
        } else if (item.translation) {
          translationText = item.translation;
        }
        
        tr.innerHTML = escapeHtml(translationText);
      }
    });

    // Actualizează butonul de test (se va face și prin sistemul global, dar adăugăm pentru siguranță)
    const testBtn = document.getElementById('lernziel-test-btn');
    if (testBtn && window.getTranslationSystem) {
      const translationSystem = window.getTranslationSystem();
      if (translationSystem) {
        const btnText = translationSystem.t('lernziel.test_button');
        if (btnText) {
          testBtn.innerHTML = btnText;
        }
      }
    }
  }

  // Ascultă schimbările de limbă
  window.addEventListener('storage', (e) => {
    if (e.key === 'selectedLanguage') {
      updateTranslations();
    }
  });

  // Ascultă și evenimentele customizate pentru schimbarea limbii (pentru aceeași pagină)
  document.addEventListener('languageChanged', updateTranslations);

  // Adaugă butonul de test la sfârșitul paginii
  addTestButton();
  function addTestButton() {
    const wrapper = document.getElementById('fragen-wrapper');
    if (!wrapper) return;
    if (document.getElementById('lernziel-test-btn')) return;
    
    const btnDiv = document.createElement('div');
    btnDiv.style.textAlign = 'center';
    btnDiv.style.marginTop = '32px';
    btnDiv.style.paddingTop = '24px';
    btnDiv.style.borderTop = '2px solid #e3e3e3';
    
    const a = document.createElement('a');
    a.id = 'lernziel-test-btn';
    a.className = 'test-button';
    a.href = '../tests/lernziel-test.html';
    a.setAttribute('data-i18n', 'lernziel.test_button');
    a.innerHTML = '📝 Testează-te →'; // Text implicit, va fi înlocuit de sistemul de traduceri
    btnDiv.appendChild(a);
    wrapper.appendChild(btnDiv);
  }
});