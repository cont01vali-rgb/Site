/********************************************
 * TEST1.JS – Logica testului pentru lecția 1
 ********************************************/

const questions = [
  { type: "truefalse", question: "Umlautul „ä” se pronunță aproximativ ca „e” în limba germană.", correct: true },
  { type: "truefalse", question: "Litera „ß” există și ca majusculă în alfabetul german.", correct: false },
  { type: "truefalse", question: "Dublul vocal „ie” se citește ca un „i” lung.", correct: true },
  { type: "truefalse", question: "„ö” se pronunță ca „o” normal.", correct: false },
  { type: "multiple", question: "Cuvântul „das Öl” conține:", options: ["ä", "ö", "ü"], correct: "ö" },
  { type: "multiple", question: "Care cuvânt conține „ß”?", options: ["Straße", "Käse", "Suppe"], correct: "Straße" },
  { type: "fill", question: "Cuvântul „die Lösung” conține Umlautul:", correct: "ö" },
  { type: "multiple", question: "În cuvântul „bitten”, consoana dublă „tt” se pronunță:", options: ["prelungit", "scurt, rapid", "moale"], correct: "scurt, rapid" },
  { type: "multiple", question: "„Der Staat” se pronunță cu „st” ca:", options: ["st", "șt", "s + t"], correct: "șt" },
  { type: "fill", question: "În germană, numele proprii și denumirile de țări se scriu cu:", correct: "Majuscula" },
  { type: "truefalse", question: "Litera germană „ß” se citește ca două s-uri (ss).", correct: true },
  { type: "truefalse", question: "„Österreich” conține Umlautul „ö”.", correct: true },
  { type: "truefalse", question: "Umlautul „ü” se pronunță la fel ca „u”.", correct: false },
  { type: "multiple", question: "Care cuvânt conține Umlautul „ä”?", options: ["der Käse", "das Haus", "die Sonne"], correct: "der Käse" },
  { type: "multiple", question: "Care dintre următoarele cuvinte are diftongul „eu”?", options: ["Leute", "Bäume", "Mai"], correct: "Leute" },
  { type: "multiple", question: "În ce cuvânt se pronunță „st” ca „șt”?", options: ["Stein", "Mitte", "Haus"], correct: "Stein" },
  { type: "fill", question: "Completează: Cuvântul „die Lösung” conține Umlautul ____.", correct: "ö" },
  { type: "fill", question: "Completează: În germană, toate substantivele se scriu cu literă ____.", correct: "mare" },
  { type: "multiple", question: "Ce înseamnă cuvântul „Großschreibung”?", options: ["Scriere cu majusculă", "Scriere cu litere mici", "Scriere fonetică"], correct: "Scriere cu majusculă" },
  { type: "truefalse", question: "În cuvinte ca „stehen”/„Stein”, „st” se pronunță ca „șt”.", correct: true },
  { type: "truefalse", question: "„v” se pronunță întotdeauna ca „v” în germană.", correct: false },
  { type: "multiple", question: "Alege diftongul corect pentru „Leute”.", options: ["eu", "ei", "ie"], correct: "eu" },
  { type: "multiple", question: "Ce cuvânt conține „sch”?", options: ["Schule", "Stadt", "Karte"], correct: "Schule" },
  { type: "fill", question: "Litera ß se numește „_____”.", correct: "Eszett" },
  { type: "multiple", question: "Ce Umlaut apare în „Käse”?", options: ["ä", "ö", "ü"], correct: "ä" },
  { type: "truefalse", question: "Toate substantivele în germană se scriu cu literă mare.", correct: true },
  { type: "multiple", question: "Cum se citește „ie” în germană?", options: ["i lung", "ie separat", "e lung"], correct: "i lung" },

  // 3 întrebări audio
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "Apfel", options: ["Apfel", "Apfeln", "Äpfel"], correct: "Apfel" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "Straße", options: ["Straße", "Strase", "Strasse"], correct: "Straße" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "Bäume", options: ["Bäume", "Baume", "Bäumer"], correct: "Bäume" },
  { type: "audio", question: "Ce litera auzi?", word: "a", options: ["c", "e", "a"], correct: "a" },
  { type: "audio", question: "Ce litera auzi?", word: "ü", options: ["u", "ü", "i"], correct: "ü" },
  { type: "audio", question: "Ce litera auzi?", word: "ö", options: ["o", "ö", "u"], correct: "ö" },
  { type: "audio", question: "Ce litera auzi?", word: "ß", options: ["b", "ß", "s"], correct: "ß" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "Lösung", options: ["Losung", "Lösung", "Lösang"], correct: "Lösung" },
  { type: "audio", question: "Ce litera auzi?", word: "ä", options: ["a", "ä", "e"], correct: "ä" },
  { type: "audio", question: "Ce litera auzi?", word: "v", options: ["f", "w", "v"], correct: "v" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "Österreich", options: ["Österreich", "Osterreich", "Österraich"], correct: "Österreich" },
  { type: "audio", question: "Ascultă și alege cuvântul corect:", word: "Mädchen", options: ["Mädchen", "Madchen", "Mädtschen"], correct: "Mädchen" }

];

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
