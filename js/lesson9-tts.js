// Extindere mică: butoanele .tts-day pronunță data-phoneme sau data-text;
// Dacă există data-seq (JSON array string) va rosti elementele în succesiune cu pauze.
document.addEventListener('DOMContentLoaded', () => {
  function speak(text, opts = {}) {
    if (!window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(String(text || ''));
    u.lang = 'de-DE';
    u.rate = (opts.rate !== undefined) ? opts.rate : 0.9;
    u.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  // util: rostire secvențială din array
  async function speakSequence(arr, opts = {}) {
    for (const item of arr) {
      speak(item, opts);
      // așteaptă aproximativ durata pronunției (estimare): 650ms per unitate + pauză
      await new Promise(r => setTimeout(r, (opts.delayMs || 900)));
    }
  }

  document.body.addEventListener('click', (ev) => {
    const btn = ev.target.closest('.tts-day');
    if (!btn) return;
    ev.preventDefault();

    // data-seq (JSON array sau virgule separate) pentru exemple multiple
    const seqRaw = btn.getAttribute('data-seq');
    if (seqRaw) {
      let seq = [];
      try {
        seq = JSON.parse(seqRaw);
      } catch (e) {
        // fallback: split by comma
        seq = seqRaw.split(/\s*,\s*/).filter(Boolean);
      }
      speakSequence(seq, { rate: 0.88, delayMs: 1000 });
      return;
    }

    const phoneme = btn.getAttribute('data-phoneme') || btn.getAttribute('data-text') || btn.dataset.text;
    if (phoneme) {
      speak(phoneme, { rate: 0.88 });
    }
  });
});