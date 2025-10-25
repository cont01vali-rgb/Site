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

  function render() {
    const list = $('#historyList');
    const empty = $('#historyEmpty');
    list.innerHTML = '';

    let items = [];
    try { items = JSON.parse(localStorage.getItem('generalTestHistory')||'[]'); }
    catch { items = []; }

    if (!items.length) {
      empty.style.display = '';
      return;
    }
    empty.style.display = 'none';

    // sort desc by date
    items.sort((a,b)=> new Date(b.when) - new Date(a.when));

    items.forEach((it, idx) => {
      const cls = badgeClass(Number(it.percent||0));
      const wrongCats = Array.isArray(it.wrongCategories) ? it.wrongCategories : [];
      const wrongList = wrongCats.map(labelCat);

      const date = new Date(it.when);
      const dstr = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}`;

      const card = document.createElement('div');
      card.className = `progress-card ${cls}`;
      card.innerHTML = `
        <div class="bar"></div>
        <div class="card-head">
          <div class="pill">${it.difficulty ?? '-'}</div>
          <div class="score">${it.score}/${it.total} • ${it.percent}%</div>
        </div>
        <div class="muted">${dstr}</div>
        <div class="hover-panel">
          <div class="hover-title">Greșeli pe lecții</div>
          ${wrongList.length
            ? `<ul class="hover-list">${wrongList.map(x=>`<li>${x}</li>`).join('')}</ul>`
            : `<div class="muted">Nicio greșeală 🎉</div>`
          }
        </div>
      `;
      list.appendChild(card);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    $('#refreshBtn').addEventListener('click', render);
    $('#clearBtn').addEventListener('click', () => {
      if (confirm('Ștergi întreg istoricul testelor?')) {
        localStorage.removeItem('generalTestHistory');
        localStorage.removeItem('generalTestLast');
        render();
      }
    });
    render();
  });
})();