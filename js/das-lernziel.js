// Renderer actualizat: numărul și textul pe același rând, afișare traducere (finuță), evidențiere culori,
// card layout și buton test jos de tot.
document.addEventListener('DOMContentLoaded', () => {
  const data = window.fragenkatalogA1 || [];
  const perPage = 10;
  let page = 0;

  const listEl = document.getElementById('fragen-list');
  const prevBtn = document.getElementById('prevPage');
  const nextBtn = document.getElementById('nextPage');
  const pageInfo = document.getElementById('pageInfo');

  function render() {
    listEl.innerHTML = '';
    const start = page * perPage;
    const pageItems = data.slice(start, start + perPage);

    pageItems.forEach((item, i) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'frage';

      // header: number + german text on same line
      const header = document.createElement('div');
      header.className = 'frage-header';
      const numSpan = document.createElement('span');
      numSpan.className = 'frage-number';
      numSpan.textContent = (start + i + 1) + '. ';
      const textSpan = document.createElement('span');
      textSpan.className = 'frage-content';
      textSpan.innerHTML = escapeHtml(item.text);
      header.appendChild(numSpan);
      header.appendChild(textSpan);
      wrapper.appendChild(header);

      // translation (faint, centered)
      if (item.translation) {
        const tr = document.createElement('div');
        tr.className = 'frage-translation';
        tr.innerHTML = escapeHtml(item.translation);
        wrapper.appendChild(tr);
      }

      // answers area
      const ans = document.createElement('div');
      ans.className = 'frage-answer';

      if (item.type === 'tf') {
        // show a. richtig b. falsch with colored bold (correct green, incorrect red)
        if (item.answer === true) {
          ans.innerHTML = `a. <strong class="correct-true">richtig</strong> &nbsp;&nbsp; b. <strong class="incorrect-false">falsch</strong>`;
        } else {
          ans.innerHTML = `a. <strong class="incorrect-false">richtig</strong> &nbsp;&nbsp; b. <strong class="correct-true">falsch</strong>`;
        }
      } else if (item.type === 'mc') {
        // options are strings like "a. text" — render inline, bold + green only on correct letter
        const optEls = item.options.map((opt, idx) => {
          const letter = ['a','b','c'][idx] || String.fromCharCode(97+idx);
          const isCorrect = (String(item.correct||'').toLowerCase() === letter);
          const letterHtml = isCorrect ? `<strong class="mc-correct">${letter}.</strong>` : `${letter}.`;
          const content = opt.replace(/^[a-z]\.\s*/i, '');
          return `<div class="mc-row">${letterHtml} ${escapeHtml(content)}</div>`;
        }).join('');
        ans.innerHTML = optEls;
      }

      wrapper.appendChild(ans);
      listEl.appendChild(wrapper);
    });

    pageInfo.textContent = `Pagina ${page + 1} / ${Math.max(1, Math.ceil(data.length / perPage))}`;
    prevBtn.disabled = page === 0;
    nextBtn.disabled = (page + 1) * perPage >= data.length;
  }

  prevBtn.addEventListener('click', () => { if (page>0) { page--; render(); }});
  nextBtn.addEventListener('click', () => { if ((page+1)*perPage < data.length) { page++; render(); }});

  // escapeHTML
  function escapeHtml(s) {
    return (s||'').toString()
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  render();

  // add test button at page bottom (navighează la test fără afișarea răspunsurilor)
  addTestButton();
  function addTestButton() {
    const wrapper = document.getElementById('fragen-wrapper');
    if (!wrapper) return;
    // don't add twice
    if (document.getElementById('lernziel-test-btn')) return;
    const btnDiv = document.createElement('div');
    btnDiv.style.textAlign = 'center';
    btnDiv.style.marginTop = '18px';
    const a = document.createElement('a');
    a.id = 'lernziel-test-btn';
    a.className = 'test-button';
    a.href = '../tests/lernziel-test.html'; // pagina de test (fără afișare răspunsuri) - creează dacă nu există
    a.textContent = 'Testează-te (fără răspunsuri afișate) →';
    btnDiv.appendChild(a);
    wrapper.appendChild(btnDiv);
  }
});