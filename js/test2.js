/********************************************
 * TEST2.JS – Logica testului pentru lecția 1
 ********************************************/

const questions = [
  // ===== FILL =====
  { type: "fill", question: "Scrie în germană: „1”", correct: "eins" },
  { type: "fill", question: "Scrie în germană: „2”", correct: "zwei" },
  { type: "fill", question: "Scrie în germană: „3”", correct: "drei" },
  { type: "fill", question: "Scrie în germană: „4”", correct: "vier" },
  { type: "fill", question: "Scrie în germană: „5”", correct: "fünf" },
  { type: "fill", question: "Scrie în germană: „6”", correct: "sechs" },
  { type: "fill", question: "Scrie în germană: „7”", correct: "sieben" },
  { type: "fill", question: "Scrie în germană: „8”", correct: "acht" },
  { type: "fill", question: "Scrie în germană: „9”", correct: "neun" },
  { type: "fill", question: "Scrie în germană: „10”", correct: "zehn" },
  { type: "fill", question: "Scrie în germană: „11”", correct: "elf" },
  { type: "fill", question: "Scrie în germană: „12”", correct: "zwölf" },
  { type: "fill", question: "Scrie în germană: „13”", correct: "dreizehn" },
  { type: "fill", question: "Scrie în germană: „14”", correct: "vierzehn" },
  { type: "fill", question: "Scrie în germană: „15”", correct: "fünfzehn" },
  { type: "fill", question: "Scrie în germană: „16”", correct: "sechzehn" },
  { type: "fill", question: "Scrie în germană: „17”", correct: "siebzehn" },
  { type: "fill", question: "Scrie în germană: „18”", correct: "achtzehn" },
  { type: "fill", question: "Scrie în germană: „19”", correct: "neunzehn" },
  { type: "fill", question: "Scrie în germană: „20”", correct: "zwanzig" },
  { type: "fill", question: "Traducerea în română a numărului „einundzwanzig” este:", correct: "21" },
  { type: "fill", question: "Traducerea în română a numărului „vierzig” este:", correct: "40" },
  { type: "fill", question: "Scrie în germană: „50”", correct: "fünfzig" },
  { type: "fill", question: "Scrie în germană: „60”", correct: "sechzig" },
  { type: "fill", question: "Scrie în germană: „70”", correct: "siebzig" },
  { type: "fill", question: "Scrie în germană: „80”", correct: "achtzig" },
  { type: "fill", question: "Scrie în germană: „90”", correct: "neunzig" },
  { type: "fill", question: "Scrie în germană: „100”", correct: "hundert" },
  { type: "fill", question: "Scrie în germană: „21”", correct: "einundzwanzig" },
  { type: "fill", question: "Scrie în germană: „25”", correct: "fünfundzwanzig" },
  { type: "fill", question: "Scrie în germană: „37”", correct: "siebenunddreißig" },
  { type: "fill", question: "Scrie în germană: „42”", correct: "zweiundvierzig" },
  { type: "fill", question: "Scrie în germană: „58”", correct: "achtundfünfzig" },
  { type: "fill", question: "Scrie în germană: „63”", correct: "dreiundsechzig" },
  { type: "fill", question: "Scrie în germană: „77”", correct: "siebenundsiebzig" },
  { type: "fill", question: "Scrie în germană: „84”", correct: "vierundachtzig" },
  { type: "fill", question: "Scrie în germană: „99”", correct: "neunundneunzig" },
  { type: "fill", question: "Traducerea în română a numărului „achtundvierzig” este:", correct: "48" },
  { type: "fill", question: "Traducerea în română a numărului „dreiundzwanzig” este:", correct: "23" },
  { type: "fill", question: "Traducerea în română a numărului „sechsundneunzig” este:", correct: "96" },
  { type: "fill", question: "Scrie în germană: „100”", correct: "einhundert" },
  { type: "fill", question: "Scrie în germană: „101”", correct: "einhunderteins" },
  { type: "fill", question: "Scrie în germană: „125”", correct: "einhundertfünfundzwanzig" },
  { type: "fill", question: "Scrie în germană: „245”", correct: "zweihundertfünfundvierzig" },
  { type: "fill", question: "Scrie în germană: „312”", correct: "dreihundertzwölf" },
  { type: "fill", question: "Scrie în germană: „478”", correct: "vierhundertachtundsiebzig" },
  { type: "fill", question: "Scrie în germană: „599”", correct: "fünfhundertneunundneunzig" },
  { type: "fill", question: "Scrie în germană: „634”", correct: "sechshundertvierunddreißig" },
  { type: "fill", question: "Scrie în germană: „786”", correct: "siebenhundertsechsundachtzig" },
  { type: "fill", question: "Scrie în germană: „902”", correct: "neunhundertzwei" },
  { type: "fill", question: "Traducerea în română a numărului „zweihundertachtundvierzig” este:", correct: "248" },
  { type: "fill", question: "Traducerea în română a numărului „sechshundertneunzehn” este:", correct: "619" },
  { type: "fill", question: "Traducerea în română a numărului „neunhundertfünfundachtzig” este:", correct: "985" },
  { type: "fill", question: "Scrie în germană: „1000”", correct: "tausend" },
  { type: "fill", question: "Scrie în germană: „1500”", correct: "eintausendfünfhundert" },
  { type: "fill", question: "Scrie în germană: „2023”", correct: "zweitausenddreiundzwanzig" },
  { type: "fill", question: "Scrie în germană: „1987”", correct: "eintausendneunhundertsiebenundachtzig" },
  { type: "fill", question: "Scrie în germană: „2500”", correct: "zweitausendfünfhundert" },
  { type: "fill", question: "Scrie în germană: „3001”", correct: "dreitausendeins" },
  { type: "fill", question: "Scrie în germană: „4040”", correct: "viertausendvierzig" },
  { type: "fill", question: "Scrie în germană: „5123”", correct: "fünftausendeinhundertdreiundzwanzig" },


  // ===== MULTIPLE =====
  { type: "multiple", question: "Cum se spune „2” în germană?", options: ["eins", "zwei", "drei", "vier"], correct: "zwei" },
  { type: "multiple", question: "Ce înseamnă „fünfzehn”?", options: ["cincisprezece", "cincizeci", "cinci", "paisprezece"], correct: "cincisprezece" },
  { type: "multiple", question: "„vierzig” înseamnă:", options: ["paisprezece", "patruzeci", "patru", "patruzeci și unu"], correct: "patruzeci" },
  { type: "multiple", question: "Cum se spune „9” în germană?", options: ["zehn", "acht", "neun", "neunzehn"], correct: "neun" },
  { type: "multiple", question: "„achtzig” înseamnă:", options: ["opt", "optzeci", "optsprezece", "optzeci și unu"], correct: "optzeci" },
  { type: "multiple", question: "Cum se spune „21” în germană?", options: ["zwanzigundeins", "einundzwanzig", "einsundzwanzig", "zwanzigeins"], correct: "einundzwanzig" },
  { type: "multiple", question: "„siebzig” înseamnă:", options: ["șaptezeci", "șaptesprezece", "șapte", "șaizeci"], correct: "șaptezeci" },
  { type: "multiple", question: "Cum se spune „100” în germană?", options: ["hundert", "einhundert", "tausend", "zehnzig"], correct: "hundert" },
  { type: "multiple", question: "Ce înseamnă „dreißig”?", options: ["treizeci", "treisprezece", "trei", "treizeci și unu"], correct: "treizeci" },
  { type: "multiple", question: "Cum se spune „40” în germană?", options: ["vierzig", "vierzehn", "vierhundert", "vierundzwanzig"], correct: "vierzig" },
  { type: "multiple", question: "Cum se spune „24” în germană?", options: ["vierundzwanzig", "vierzig", "zwölf", "vierzehn"], correct: "vierundzwanzig" },
  { type: "multiple", question: "„fünfundvierzig” înseamnă:", options: ["patruzeci și cinci", "cincisprezece", "cincizeci și patru", "patruzeci și opt"], correct: "patruzeci și cinci" },
  { type: "multiple", question: "Cum se spune „32” în germană?", options: ["zweiunddreißig", "dreiundzwanzig", "dreißigzwei", "dreizwanzig"], correct: "zweiunddreißig" },
  { type: "multiple", question: "Ce înseamnă „achtundsechzig”?", options: ["șasezeci și opt", "optzeci și șase", "șaptezeci și opt", "optzeci și șase"], correct: "șasezeci și opt" },
  { type: "multiple", question: "Cum se spune „53” în germană?", options: ["fünfzigdrei", "dreiundfünfzig", "fünfunddreißig", "dreifünfzig"], correct: "dreiundfünfzig" },
  { type: "multiple", question: "„neunundachtzig” înseamnă:", options: ["optzeci și nouă", "nouăzeci și opt", "nouăzeci", "optsprezece"], correct: "optzeci și nouă" },
  { type: "multiple", question: "Cum se spune „74” în germană?", options: ["vierundsiebzig", "siebenundvierzig", "siebzigvier", "vierundsiebzehn"], correct: "vierundsiebzig" },
  { type: "multiple", question: "Ce înseamnă „einundneunzig”?", options: ["nouăzeci și unu", "optzeci și unu", "nouăzeci și nouă", "nouăsprezece"], correct: "nouăzeci și unu" },
  { type: "multiple", question: "Cum se spune „200” în germană?", options: ["zweihundert", "zweitausend", "zweiundhundert", "zweihund"], correct: "zweihundert" },
  { type: "multiple", question: "„dreihundertfünfundvierzig” înseamnă:", options: ["trei sute patruzeci și cinci", "patruzeci și cinci", "trei sute cincizeci", "patruzeci și trei"], correct: "trei sute patruzeci și cinci" },
  { type: "multiple", question: "Cum se spune „520” în germană?", options: ["fünfhundertzwanzig", "fünfhundertzwanzig", "fünfzwanzighundert", "fünfzehnhundert"], correct: "fünfhundertzwanzig" },
  { type: "multiple", question: "Ce înseamnă „vierhundertsiebenundneunzig”?", options: ["patru sute nouăzeci și șapte", "patruzeci și șapte", "patru sute șaptezeci și nouă", "nouăzeci și patru"], correct: "patru sute nouăzeci și șapte" },
  { type: "multiple", question: "Cum se spune „850” în germană?", options: ["achthundertfünfzig", "achtfünfzig", "achtundfünfzig", "fünfzighundert"], correct: "achthundertfünfzig" },
  { type: "multiple", question: "„sechshundertvierundachtzig” înseamnă:", options: ["șase sute optzeci și patru", "șaizeci și opt", "opt sute șaizeci și patru", "șase sute patruzeci și opt"], correct: "șase sute optzeci și patru" },
  { type: "multiple", question: "Cum se spune „999” în germană?", options: ["neunhundertneunundneunzig", "neunundneunzighundert", "neunzehnhundertneun", "neunhundertneunzig"], correct: "neunhundertneunundneunzig" },
  { type: "multiple", question: "Ce înseamnă „siebenhundertzweiundvierzig”?", options: ["șapte sute patruzeci și doi", "șaptezeci și doi", "șapte sute douăzeci și patru", "șaptezeci și patru"], correct: "șapte sute patruzeci și doi" },
  { type: "multiple", question: "Cum se spune „1500” în germană?", options: ["eintausendfünfhundert", "fünfhundertsiebzig", "tausendfünfhundert", "eintausendsiebenhundert"], correct: "eintausendfünfhundert" },
  { type: "multiple", question: "Ce înseamnă „zweitausenddreiundzwanzig”?", options: ["două mii douăzeci și trei", "două mii treizeci și doi", "două mii douăzeci și doi", "două mii treizeci și trei"], correct: "două mii douăzeci și trei" },
  { type: "multiple", question: "Cum se spune „2024” în germană?", options: ["zweitausendvierundzwanzig", "zweitausendvierzig", "zweitausendvier", "zweitausendvierzehn"], correct: "zweitausendvierundzwanzig" },
  { type: "multiple", question: "Ce înseamnă „eintausendachthundert”?", options: ["o mie opt sute", "o mie optzeci", "o mie optsprezece", "o mie nouă sute"], correct: "o mie opt sute" },
  { type: "multiple", question: "Cum se spune „1503” în germană?", options: ["eintausendfünfhundertdrei", "eintausenddreihundertfünf", "fünfhundertdreiundtausend", "dreihundertfünfzehn"], correct: "eintausendfünfhundertdrei" },


  // ===== TRUE/FALSE =====
  { type: "truefalse", question: "„eins” înseamnă unu.", correct: true },
  { type: "truefalse", question: "„zehn” înseamnă cincisprezece.", correct: false },
  { type: "truefalse", question: "„neun” înseamnă nouă.", correct: true },
  { type: "truefalse", question: "„zwölf” este 20.", correct: false },
  { type: "truefalse", question: "„fünfzehn” este 15.", correct: true },
  { type: "truefalse", question: "„siebzehn” înseamnă șaptesprezece.", correct: true },
  { type: "truefalse", question: "„achtzig” înseamnă optzeci.", correct: true },
  { type: "truefalse", question: "„vier” înseamnă cinci.", correct: false },
  { type: "truefalse", question: "„hundert” înseamnă o sută.", correct: true },
  { type: "truefalse", question: "„neunzig” înseamnă nouăsprezece.", correct: false },
  { type: "truefalse", question: "„fünfundzwanzig” înseamnă douăzeci și cinci.", correct: true },
  { type: "truefalse", question: "„dreiundvierzig” este patruzeci și trei.", correct: true },
  { type: "truefalse", question: "„achtundneunzig” este optzeci și nouă.", correct: false },
  { type: "truefalse", question: "„fünfundsechzig” este șaizeci și cinci.", correct: true },
  { type: "truefalse", question: "„neunundzwanzig” este douăzeci și nouă.", correct: true },
  { type: "truefalse", question: "„zweiundachtzig” este optzeci și doi.", correct: true },
  { type: "truefalse", question: "„sechsundvierzig” înseamnă șaizeci și patru.", correct: false },
  { type: "truefalse", question: "„einundachtzig” este optzeci și unu.", correct: true },
  { type: "truefalse", question: "„neunundfünfzig” este cincizeci și nouă.", correct: true },
  { type: "truefalse", question: "„vierundneunzig” este nouăzeci și patru.", correct: true },
  { type: "truefalse", question: "„einhundert” înseamnă o sută.", correct: true },
  { type: "truefalse", question: "„zweihundertfünfzehn” înseamnă două sute cincisprezece.", correct: true },
  { type: "truefalse", question: "„vierhundertachtundneunzig” este patru sute nouăzeci și opt.", correct: true },
  { type: "truefalse", question: "„sechshundertzehn” este șaizeci și zece.", correct: false },
  { type: "truefalse", question: "„siebenhundertneunundachtzig” este șapte sute optzeci și nouă.", correct: true },
  { type: "truefalse", question: "„achthundertdreiundfünfzig” este opt sute cincizeci și trei.", correct: true },
  { type: "truefalse", question: "„neunhundertneunzehn” este nouă sute nouăsprezece.", correct: true },
  { type: "truefalse", question: "„dreihundertachtzehn” este optsprezece sute trei.", correct: false },
  { type: "truefalse", question: "„fünfhundertvierundvierzig” este cinci sute patruzeci și patru.", correct: true },
  { type: "truefalse", question: "„vierhundert” înseamnă patruzeci.", correct: false },
  { type: "truefalse", question: "„achtzig” este optzeci.", correct: true },
  { type: "truefalse", question: "„neunzig” este nouăzeci.", correct: true },
  { type: "truefalse", question: "„zweihundert” este două sute.", correct: true },
  { type: "truefalse", question: "„siebenundsiebzig” este șaptezeci și șapte.", correct: true },
  { type: "truefalse", question: "„dreiunddreißig” este treizeci și trei.", correct: true },
  { type: "truefalse", question: "„fünfundvierzig” este cincizeci și patru.", correct: false },
  { type: "truefalse", question: "„sechsundfünfzig” este cinzeci și șase.", correct: true },
  { type: "truefalse", question: "„neunundachtzig” este optzeci și nouă.", correct: true },



  // ===== AUDIO =====
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "eins", options: ["eins", "zwei", "drei"], correct: "eins" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "zwei", options: ["zwei", "zwölf", "zehn"], correct: "zwei" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "fünf", options: ["fünf", "fünfzehn", "fünfzig"], correct: "fünf" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "zehn", options: ["zehn", "zwanzig", "eins"], correct: "zehn" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "achtzehn", options: ["achtzehn", "acht", "achtzig"], correct: "achtzehn" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "zwanzig", options: ["zwanzig", "zwei", "zehn"], correct: "zwanzig" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "vierzig", options: ["vier", "vierzehn", "vierzig"], correct: "vierzig" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "achtzig", options: ["acht", "achtzehn", "achtzig"], correct: "achtzig" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "neunzig", options: ["neun", "neunzehn", "neunzig"], correct: "neunzig" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "hundert", options: ["hundert", "tausend", "zehn"], correct: "hundert" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "einundzwanzig", options: ["einundzwanzig", "zwanzigeins", "einsundzwanzig"], correct: "einundzwanzig" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "dreiunddreißig", options: ["dreiunddreißig", "dreizehn", "dreißig"], correct: "dreiunddreißig" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "fünfundvierzig", options: ["fünfundvierzig", "fünfzig", "vierzig"], correct: "fünfundvierzig" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "sechsundfünfzig", options: ["sechsundfünfzig", "fünfundsechzig", "sechzehn"], correct: "sechsundfünfzig" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "neunundachtzig", options: ["neunundachtzig", "achtundneunzig", "neunzig"], correct: "neunundachtzig" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "vierundsiebzig", options: ["vierundsiebzig", "siebzigvier", "siebzehn"], correct: "vierundsiebzig" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "achtundneunzig", options: ["achtundneunzig", "neunundachtzig", "achtzig"], correct: "achtundneunzig" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "fünfundachtzig", options: ["fünfundachtzig", "achtundfünfzig", "fünfzig"], correct: "fünfundachtzig" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "einhundert", options: ["einhundert", "hundert", "zweihundert"], correct: "einhundert" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "zweihundertfünfundvierzig", options: ["zweihundertfünfundvierzig", "zweihundertvierundfünfzig", "vierhundertzweiundfünfzig"], correct: "zweihundertfünfundvierzig" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "dreihundertneunundachtzig", options: ["dreihundertneunundachtzig", "dreihundertachtundneunzig", "achtunddreihundert"], correct: "dreihundertneunundachtzig" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "vierhundertsechsundfünfzig", options: ["vierhundertsechsundfünfzig", "vierhundertfünfundsechzig", "fünfzigsechshundert"], correct: "vierhundertsechsundfünfzig" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "fünfhundertneunundneunzig", options: ["fünfhundertneunundneunzig", "fünfneunhundertneunzig", "neunhundertfünfundneunzig"], correct: "fünfhundertneunundneunzig" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "sechshundertvierundzwanzig", options: ["sechshundertvierundzwanzig", "vierundsechshundertzwanzig", "sechshundertzwanzigvier"], correct: "sechshundertvierundzwanzig" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "siebenhundertsiebenundsiebzig", options: ["siebenhundertsiebenundsiebzig", "siebenundsiebzighundert", "siebzigundsiebenhundert"], correct: "siebenhundertsiebenundsiebzig" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "neunhundertachtundsechzig", options: ["neunhundertachtundsechzig", "achtundneunzighundert", "sechshundertneunundachtzig"], correct: "neunhundertachtundsechzig" },
  { type: "audio", question: "Ascultă și alege numărul:", word: "sechsundvierzig", options: ["46", "64", "56"], correct: "46" },
  { type: "audio", question: "Ascultă și alege varianta corectă:", word: "zweitausenddreiundzwanzig", options: ["2023", "2230", "2032"], correct: "2023" },
  { type: "audio", question: "Ascultă și alege numărul:", word: "eintausendfünfhundert", options: ["1500", "1550", "1050"], correct: "1500" }
  

]
;

let current = 0;
let shuffled = [];
let selectedAnswer = null;

// Amestecă întrebările
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

document.addEventListener("DOMContentLoaded", () => {
  shuffled = shuffle(questions);
  showQuestion();

  document.getElementById("verify-btn").addEventListener("click", verifyAnswer);
  document.getElementById("next-btn").addEventListener("click", nextQuestion);
});

function showQuestion() {
  const q = shuffled[current];
  const card = document.getElementById("question-card");
  const feedback = document.getElementById("feedback");
  feedback.textContent = "";
  selectedAnswer = null;

  document.getElementById("verify-btn").style.display = "block";
  document.getElementById("next-btn").style.display = "none";

  let html = `<h2>${q.question}</h2>`;

  if (q.type === "truefalse") {
    html += `
      <div class="answers">
        <button class="ans-btn" onclick="selectAnswer(true)">Da</button>
        <button class="ans-btn" onclick="selectAnswer(false)">Nu</button>
      </div>`;
  } else if (q.type === "multiple") {
    html += `<div class="answers">`;
    q.options.forEach(opt => {
      html += `<button class="ans-btn" onclick="selectAnswer('${opt}')">${opt}</button>`;
    });
    html += `</div>`;
  } else if (q.type === "fill") {
    html += `<input type="text" id="fill-input" placeholder="Scrie răspunsul...">`;
  } else if (q.type === "audio") {
    // buton TTS
    html += `<button class="ans-btn" onclick="speakWord('${q.word}')">🔊 Ascultă</button>`;
    html += `<div class="answers">`;
    q.options.forEach(opt => {
      html += `<button class="ans-btn" onclick="selectAnswer('${opt}')">${opt}</button>`;
    });
    html += `</div>`;
  }

  document.getElementById("progress-text").textContent = `Întrebarea ${current + 1} din ${shuffled.length}`;
  card.innerHTML = html;
}

function selectAnswer(value) {
  selectedAnswer = value;
  document.querySelectorAll(".ans-btn").forEach(btn => btn.classList.remove("selected"));
  event.target.classList.add("selected");
}

function verifyAnswer() {
  const q = shuffled[current];
  const feedback = document.getElementById("feedback");

  let correct = false;

  if (q.type === "fill") {
    const userInput = document.getElementById("fill-input").value.trim();
    correct = userInput.toLowerCase() === q.correct.toLowerCase();
  } else {
    correct = selectedAnswer == q.correct;
  }

  feedback.textContent = correct ? "✅ Corect!" : `❌ Greșit! Răspuns corect: ${q.correct}`;
  feedback.style.color = correct ? "green" : "red";

  document.getElementById("verify-btn").style.display = "none";
  document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
  current++;
  if (current < shuffled.length) {
    showQuestion();
  } else {
    document.getElementById("question-card").innerHTML = "<h2>🎉 Test terminat! Felicitări!</h2>";
    document.getElementById("feedback").textContent = "";
    document.querySelector(".test-controls").style.display = "none";
  }
}

function speakWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "de-DE";
  speechSynthesis.speak(utterance);
}
