// Simplu modul TTS pentru lesson1: butoane .tts-btn pronunță data-text; buton alfabet pronunță alfabetul.
// Folosește SpeechSynthesis API (funcționează offline în browser).
document.addEventListener('DOMContentLoaded', () => {
  function speak(text, opts = {}) {
    if (!window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(String(text || ''));
    u.lang = 'de-DE';
    // dacă e un "phoneme" redăm mai lent și clar
    if (opts.type === 'phoneme') {
      u.rate = 0.75;
      u.pitch = 1;
    } else if (opts.type === 'letters') {
      u.rate = 0.8;
      u.pitch = 1;
    } else {
      u.rate = 0.95;
      u.pitch = 1;
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  // delegare pentru butoanele tts-btn
  document.body.addEventListener('click', (ev) => {
    const btn = ev.target.closest('.tts-btn');
    if (!btn) return;
    ev.preventDefault();

    // dacă există atribut data-phoneme, pronunțăm doar combinația (ex: "au", "ö", "ch")
    const phoneme = btn.dataset.phoneme;
    const mode = btn.dataset.mode; // optional: "letters"
    if (phoneme) {
      // pronunciția directă a șirului; limba germană (de-DE) ar trebui să redea corect
      speak(phoneme, { type: 'phoneme' });
      return;
    }

    // dacă cerem să fie rostite literele individual (ex: alfabet litera cu literă)
    if (mode === 'letters') {
      const letters = (btn.dataset.text || '').replace(/\s+/g, ' ').trim();
      // separăm literele/unitațile prin spațiu pentru claritate
      const spaced = letters.split('').join(' ');
      speak(spaced, { type: 'letters' });
      return;
    }

    // fallback: pronunțăm textul complet din data-text (ex: exemple)
    const text = btn.dataset.text || btn.getAttribute('data-text') || '';
    if (text) speak(text);
  });
});