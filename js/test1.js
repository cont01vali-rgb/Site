/********************************************
 * TEST1.JS – Logica testului pentru lecția 1
 ********************************************/

const questions = [
  { 
    type: "truefalse", 
    question: "Umlautul \"ä\" se pronunță aproximativ ca \"e\" în limba germană.", 
    correct: true,
    translations: {
      en: { question: "The Umlaut \"ä\" is pronounced approximately like \"e\" in German." },
      ua: { question: "Умлаут \"ä\" вимовляється приблизно як \"e\" в німецькій мові." }
    }
  },
  { 
    type: "truefalse", 
    question: "Litera \"ß\" există și ca majusculă în alfabetul german.", 
    correct: false,
    translations: {
      en: { question: "The letter \"ß\" also exists as a capital letter in the German alphabet." },
      ua: { question: "Літера \"ß\" також існує як велика літера в німецькому алфавіті." }
    }
  },
  { 
    type: "truefalse", 
    question: "Dublul vocal \"ie\" se citește ca un \"i\" lung.", 
    correct: true,
    translations: {
      en: { question: "The double vowel \"ie\" is read as a long \"i\"." },
      ua: { question: "Подвійний голосний \"ie\" читається як довге \"i\"." }
    }
  },
  { 
    type: "truefalse", 
    question: "\"ö\" se pronunță ca \"o\" normal.", 
    correct: false,
    translations: {
      en: { question: "\"ö\" is pronounced like a normal \"o\"." },
      ua: { question: "\"ö\" вимовляється як звичайне \"o\"." }
    }
  },
  { 
    type: "multiple", 
    question: "Cuvântul \"das Öl\" conține:", 
    options: ["ä", "ö", "ü"], 
    correct: "ö",
    translations: {
      en: { question: "The word \"das Öl\" contains:" },
      ua: { question: "Слово \"das Öl\" містить:" }
    }
  },
  { 
    type: "multiple", 
    question: "Care cuvânt conține \"ß\"?", 
    options: ["Straße", "Käse", "Suppe"], 
    correct: "Straße",
    translations: {
      en: { question: "Which word contains \"ß\"?" },
      ua: { question: "Яке слово містить \"ß\"?" }
    }
  },
  { 
    type: "fill", 
    question: "Cuvântul \"die Lösung\" conține Umlautul:", 
    correct: "ö",
    translations: {
      en: { question: "The word \"die Lösung\" contains the Umlaut:" },
      ua: { question: "Слово \"die Lösung\" містить умлаут:" }
    }
  },
  { 
    type: "multiple", 
    question: "În cuvântul \"bitten\", consoana dublă \"tt\" se pronunță:", 
    options: ["prelungit", "scurt, rapid", "moale"], 
    correct: "scurt, rapid",
    translations: {
      en: { 
        question: "In the word \"bitten\", the double consonant \"tt\" is pronounced:",
        options: ["prolonged", "short, rapid", "soft"],
        correct: "short, rapid"
      },
      ua: { 
        question: "У слові \"bitten\" подвійний приголосний \"tt\" вимовляється:",
        options: ["подовжено", "коротко, швидко", "м'яко"],
        correct: "коротко, швидко"
      }
    }
  },
  { 
    type: "multiple", 
    question: "\"Der Staat\" se pronunță cu \"st\" ca:", 
    options: ["st", "șt", "s + t"], 
    correct: "șt",
    translations: {
      en: { 
        question: "\"Der Staat\" is pronounced with \"st\" as:",
        options: ["st", "sht", "s + t"],
        correct: "sht"
      },
      ua: { 
        question: "\"Der Staat\" вимовляється з \"st\" як:",
        options: ["st", "шт", "s + t"],
        correct: "шт"
      }
    }
  },
  { 
    type: "fill", 
    question: "În germană, numele proprii și denumirile de țări se scriu cu:", 
    correct: "Majuscula",
    translations: {
      en: { 
        question: "In German, proper names and country names are written with:",
        correct: "Capital letter"
      },
      ua: { 
        question: "В німецькій мові власні імена та назви країн пишуться з:",
        correct: "Великої літери"
      }
    }
  },
  { 
    type: "truefalse", 
    question: "Litera germană \"ß\" se citește ca două s-uri (ss).", 
    correct: true,
    translations: {
      en: { question: "The German letter \"ß\" is read as two s's (ss)." },
      ua: { question: "Німецька літера \"ß\" читається як два s (ss)." }
    }
  },
  { 
    type: "truefalse", 
    question: "\"Österreich\" conține Umlautul \"ö\".", 
    correct: true,
    translations: {
      en: { question: "\"Österreich\" contains the Umlaut \"ö\"." },
      ua: { question: "\"Österreich\" містить умлаут \"ö\"." }
    }
  },
  { 
    type: "truefalse", 
    question: "Umlautul \"ü\" se pronunță la fel ca \"u\".", 
    correct: false,
    translations: {
      en: { question: "The Umlaut \"ü\" is pronounced the same as \"u\"." },
      ua: { question: "Умлаут \"ü\" вимовляється так само як \"u\"." }
    }
  },
  { 
    type: "multiple", 
    question: "Care cuvânt conține Umlautul \"ä\"?", 
    options: ["der Käse", "das Haus", "die Sonne"], 
    correct: "der Käse",
    translations: {
      en: { question: "Which word contains the Umlaut \"ä\"?" },
      ua: { question: "Яке слово містить умлаут \"ä\"?" }
    }
  },
  { 
    type: "multiple", 
    question: "Care dintre următoarele cuvinte are diftongul \"eu\"?", 
    options: ["Leute", "Bäume", "Mai"], 
    correct: "Leute",
    translations: {
      en: { question: "Which of the following words has the diphthong \"eu\"?" },
      ua: { question: "Яке з наступних слів має дифтонг \"eu\"?" }
    }
  },
  { 
    type: "multiple", 
    question: "În ce cuvânt se pronunță \"st\" ca \"șt\"?", 
    options: ["Stein", "Mitte", "Haus"], 
    correct: "Stein",
    translations: {
      en: { 
        question: "In which word is \"st\" pronounced as \"sht\"?",
        options: ["Stein", "Mitte", "Haus"],
        correct: "Stein"
      },
      ua: { 
        question: "У якому слові \"st\" вимовляється як \"шт\"?",
        options: ["Stein", "Mitte", "Haus"],
        correct: "Stein"
      }
    }
  },
  { 
    type: "fill", 
    question: "Completează: Cuvântul \"die Lösung\" conține Umlautul ____.", 
    correct: "ö",
    translations: {
      en: { question: "Complete: The word \"die Lösung\" contains the Umlaut ____." },
      ua: { question: "Доповни: Слово \"die Lösung\" містить умлаут ____." }
    }
  },
  { 
    type: "fill", 
    question: "Completează: În germană, toate substantivele se scriu cu literă ____.", 
    correct: "mare",
    translations: {
      en: { 
        question: "Complete: In German, all nouns are written with a ____ letter.",
        correct: "capital"
      },
      ua: { 
        question: "Доповни: В німецькій мові всі іменники пишуться з ____ літери.",
        correct: "великої"
      }
    }
  },
  { 
    type: "multiple", 
    question: "Ce înseamnă cuvântul \"Großschreibung\"?", 
    options: ["Scriere cu majusculă", "Scriere cu litere mici", "Scriere fonetică"], 
    correct: "Scriere cu majusculă",
    translations: {
      en: { 
        question: "What does the word \"Großschreibung\" mean?",
        options: ["Capitalization", "Lowercase writing", "Phonetic writing"],
        correct: "Capitalization"
      },
      ua: { 
        question: "Що означає слово \"Großschreibung\"?",
        options: ["Написання з великої літери", "Написання з малої літери", "Фонетичне написання"],
        correct: "Написання з великої літери"
      }
    }
  },
  { 
    type: "truefalse", 
    question: "În cuvinte ca \"stehen\"/\"Stein\", \"st\" se pronunță ca \"șt\".", 
    correct: true,
    translations: {
      en: { question: "In words like \"stehen\"/\"Stein\", \"st\" is pronounced as \"sht\"." },
      ua: { question: "У словах як \"stehen\"/\"Stein\", \"st\" вимовляється як \"шт\"." }
    }
  },
  { 
    type: "truefalse", 
    question: "\"v\" se pronunță întotdeauna ca \"v\" în germană.", 
    correct: false,
    translations: {
      en: { question: "\"v\" is always pronounced as \"v\" in German." },
      ua: { question: "\"v\" завжди вимовляється як \"v\" в німецькій мові." }
    }
  },
  { 
    type: "multiple", 
    question: "Alege diftongul corect pentru \"Leute\".", 
    options: ["eu", "ei", "ie"], 
    correct: "eu",
    translations: {
      en: { question: "Choose the correct diphthong for \"Leute\"." },
      ua: { question: "Оберіть правильний дифтонг для \"Leute\"." }
    }
  },
  { 
    type: "multiple", 
    question: "Ce cuvânt conține \"sch\"?", 
    options: ["Schule", "Stadt", "Karte"], 
    correct: "Schule",
    translations: {
      en: { question: "Which word contains \"sch\"?" },
      ua: { question: "Яке слово містить \"sch\"?" }
    }
  },
  { 
    type: "fill", 
    question: "Litera ß se numește \"_____\".", 
    correct: "Eszett",
    translations: {
      en: { question: "The letter ß is called \"_____\"." },
      ua: { question: "Літера ß називається \"_____\"." }
    }
  },
  { 
    type: "multiple", 
    question: "Ce Umlaut apare în \"Käse\"?", 
    options: ["ä", "ö", "ü"], 
    correct: "ä",
    translations: {
      en: { question: "What Umlaut appears in \"Käse\"?" },
      ua: { question: "Який умлаут з'являється в \"Käse\"?" }
    }
  },
  { 
    type: "truefalse", 
    question: "Toate substantivele în germană se scriu cu literă mare.", 
    correct: true,
    translations: {
      en: { question: "All nouns in German are written with a capital letter." },
      ua: { question: "Всі іменники в німецькій мові пишуться з великої літери." }
    }
  },
  { 
    type: "multiple", 
    question: "Cum se citește \"ie\" în germană?", 
    options: ["i lung", "ie separat", "e lung"], 
    correct: "i lung",
    translations: {
      en: { 
        question: "How is \"ie\" read in German?",
        options: ["long i", "separate ie", "long e"],
        correct: "long i"
      },
      ua: { 
        question: "Як читається \"ie\" в німецькій мові?",
        options: ["довге i", "окреме ie", "довге e"],
        correct: "довге i"
      }
    }
  },

  // 3 întrebări audio
  { 
    type: "audio", 
    question: "Ascultă și alege cuvântul corect:", 
    word: "Apfel", 
    options: ["Apfel", "Apfeln", "Äpfel"], 
    correct: "Apfel",
    translations: {
      en: { question: "Listen and choose the correct word:" },
      ua: { question: "Послухай і обери правильне слово:" }
    }
  },
  { 
    type: "audio", 
    question: "Ce literă auzi?", 
    word: "ü", 
    options: ["u", "ü", "i"], 
    correct: "ü",
    translations: {
      en: { question: "What letter do you hear?" },
      ua: { question: "Яку літеру ти чуєш?" }
    }
  },
  { 
    type: "audio", 
    question: "Ascultă și alege cuvântul corect:", 
    word: "Mädchen", 
    options: ["Mädchen", "Madchen", "Mädtschen"], 
    correct: "Mädchen",
    translations: {
      en: { question: "Listen and choose the correct word:" },
      ua: { question: "Послухай і обери правильне слово:" }
    }
  },

  // 15 întrebări suplimentare
  { 
    type: "truefalse", 
    question: "În germană, \"ch\" se pronunță întotdeauna la fel.", 
    correct: false,
    translations: {
      en: { question: "In German, \"ch\" is always pronounced the same way." },
      ua: { question: "В німецькій мові \"ch\" завжди вимовляється однаково." }
    }
  },
  { 
    type: "multiple", 
    question: "Care dintre următoarele cuvinte conține \"ei\"?", 
    options: ["Zeit", "Haus", "Buch"], 
    correct: "Zeit",
    translations: {
      en: { question: "Which of the following words contains \"ei\"?" },
      ua: { question: "Яке з наступних слів містить \"ei\"?" }
    }
  },
  { 
    type: "fill", 
    question: "În cuvântul \"Mädchen\", litera \"ä\" se pronunță ca ____.", 
    correct: "e",
    translations: {
      en: { question: "In the word \"Mädchen\", the letter \"ä\" is pronounced as ____." },
      ua: { question: "У слові \"Mädchen\" літера \"ä\" вимовляється як ____." }
    }
  },
  { 
    type: "truefalse", 
    question: "Cuvintele germane pot începe cu \"sch\".", 
    correct: true,
    translations: {
      en: { question: "German words can start with \"sch\"." },
      ua: { question: "Німецькі слова можуть починатися з \"sch\"." }
    }
  },
  { 
    type: "multiple", 
    question: "În cuvântul \"spielen\", combinația \"ie\" se pronunță ca:", 
    options: ["i scurt", "i lung", "e lung"], 
    correct: "i lung",
    translations: {
      en: { 
        question: "In the word \"spielen\", the combination \"ie\" is pronounced as:",
        options: ["short i", "long i", "long e"],
        correct: "long i"
      },
      ua: { 
        question: "У слові \"spielen\" комбінація \"ie\" вимовляється як:",
        options: ["коротке i", "довге i", "довге e"],
        correct: "довге i"
      }
    }
  },
  { 
    type: "fill", 
    question: "Litera \"w\" în germană se pronunță ca ____.", 
    correct: "v",
    translations: {
      en: { question: "The letter \"w\" in German is pronounced as ____." },
      ua: { question: "Літера \"w\" в німецькій мові вимовляється як ____." }
    }
  },
  { 
    type: "truefalse", 
    question: "Toate literele în alfabetul german sunt identice cu cele engleze.", 
    correct: false,
    translations: {
      en: { question: "All letters in the German alphabet are identical to English ones." },
      ua: { question: "Всі літери в німецькому алфавіті ідентичні англійським." }
    }
  },
  { 
    type: "multiple", 
    question: "Care cuvânt conține diftongul \"au\"?", 
    options: ["Haus", "Hase", "Höhe"], 
    correct: "Haus",
    translations: {
      en: { question: "Which word contains the diphthong \"au\"?" },
      ua: { question: "Яке слово містить дифтонг \"au\"?" }
    }
  },
  { 
    type: "audio", 
    question: "Ascultă și alege cuvântul corect:", 
    word: "schön", 
    options: ["schön", "schon", "shön"], 
    correct: "schön",
    translations: {
      en: { question: "Listen and choose the correct word:" },
      ua: { question: "Послухай і обери правильне слово:" }
    }
  },
  { 
    type: "fill", 
    question: "În combinația \"qu\", litera \"u\" ____.", 
    correct: "nu se pronunță",
    translations: {
      en: { 
        question: "In the combination \"qu\", the letter \"u\" ____.",
        correct: "is not pronounced"
      },
      ua: { 
        question: "У комбінації \"qu\" літера \"u\" ____.",
        correct: "не вимовляється"
      }
    }
  },
  { 
    type: "truefalse", 
    question: "\"pf\" la începutul unui cuvânt se pronunță ca \"f\".", 
    correct: false,
    translations: {
      en: { question: "\"pf\" at the beginning of a word is pronounced as \"f\"." },
      ua: { question: "\"pf\" на початку слова вимовляється як \"f\"." }
    }
  },
  { 
    type: "multiple", 
    question: "Care dintre următoarele este o literă specifică germană?", 
    options: ["ß", "ç", "ñ"], 
    correct: "ß",
    translations: {
      en: { question: "Which of the following is a German-specific letter?" },
      ua: { question: "Яка з наступних літер є специфічною для німецької мови?" }
    }
  },
  { 
    type: "audio", 
    question: "Ce literă auzi?", 
    word: "z", 
    options: ["s", "z", "ts"], 
    correct: "z",
    translations: {
      en: { question: "What letter do you hear?" },
      ua: { question: "Яку літеру ти чуєш?" }
    }
  },
  { 
    type: "multiple", 
    question: "În cuvântul \"Zug\", litera \"z\" se pronunță ca:", 
    options: ["z", "ts", "s"], 
    correct: "ts",
    translations: {
      en: { 
        question: "In the word \"Zug\", the letter \"z\" is pronounced as:",
        options: ["z", "ts", "s"],
        correct: "ts"
      },
      ua: { 
        question: "У слові \"Zug\" літера \"z\" вимовляється як:",
        options: ["z", "ts", "s"],
        correct: "ts"
      }
    }
  },
  { 
    type: "fill", 
    question: "Numărul total de litere în alfabetul german standard este ____.", 
    correct: "26",
    translations: {
      en: { question: "The total number of letters in the standard German alphabet is ____." },
      ua: { question: "Загальна кількість літер у стандартному німецькому алфавіті становить ____." }
    }
  }

];

let current = 0;
let shuffled = [];
let selectedAnswer = null;
let score = 0;

// Amestecă întrebările
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// Obține limba curentă din localStorage
function getCurrentLanguage() {
  return localStorage.getItem('selectedLanguage') || 'ro';
}

// Obține textul tradus pentru o întrebare
function getTranslatedText(question, lang) {
  if (lang === 'ro' || !question.translations || !question.translations[lang]) {
    return {
      question: question.question,
      options: question.options,
      correct: question.correct
    };
  }
  
  const translation = question.translations[lang];
  return {
    question: translation.question || question.question,
    options: translation.options || question.options,
    correct: translation.correct || question.correct
  };
}

document.addEventListener("DOMContentLoaded", () => {
  shuffled = shuffle(questions);
  
  // Inițializează progresul
  document.getElementById("qTotal").textContent = shuffled.length;
  updateProgress();
  
  showQuestion();

  document.getElementById("verify-btn").addEventListener("click", verifyAnswer);
  document.getElementById("next-btn").addEventListener("click", nextQuestion);
  
  // Listener pentru schimbarea limbii
  document.addEventListener('languageChanged', () => {
    // Re-afișează întrebarea curentă cu noua limbă
    showQuestion();
  });
});

function updateProgress() {
  document.getElementById("qIndex").textContent = current + 1;
  document.getElementById("score").textContent = score;
  
  const progressPercent = ((current + 1) / shuffled.length) * 100;
  document.getElementById("progressFill").style.width = progressPercent + "%";
}

function showQuestion() {
  const q = shuffled[current];
  const currentLang = getCurrentLanguage();
  const translatedQ = getTranslatedText(q, currentLang);
  
  const card = document.getElementById("question-card");
  const feedback = document.getElementById("feedback");
  feedback.textContent = "";
  selectedAnswer = null;

  document.getElementById("verify-btn").style.display = "block";
  document.getElementById("next-btn").style.display = "none";

  let html = `<h2>${translatedQ.question}</h2>`;

  if (q.type === "truefalse") {
    const yesText = currentLang === 'en' ? 'Yes' : currentLang === 'ua' ? 'Так' : 'Da';
    const noText = currentLang === 'en' ? 'No' : currentLang === 'ua' ? 'Ні' : 'Nu';
    
    html += `
      <div class="answers">
        <button class="ans-btn" onclick="selectAnswer(true)">${yesText}</button>
        <button class="ans-btn" onclick="selectAnswer(false)">${noText}</button>
      </div>`;
  } else if (q.type === "multiple") {
    html += `<div class="answers">`;
    translatedQ.options.forEach(opt => {
      html += `<button class="ans-btn" onclick="selectAnswer('${opt}')">${opt}</button>`;
    });
    html += `</div>`;
  } else if (q.type === "fill") {
    const placeholder = currentLang === 'en' ? 'Write the answer...' : 
                      currentLang === 'ua' ? 'Напишіть відповідь...' : 
                      'Scrie răspunsul...';
    html += `<input type="text" id="fill-input" class="fill-input-modern" placeholder="${placeholder}">`;
  } else if (q.type === "audio") {
    const listenText = currentLang === 'en' ? '🔊 Listen' : 
                      currentLang === 'ua' ? '🔊 Послухати' : 
                      '🔊 Ascultă';
    html += `<button class="ans-btn" onclick="speakWord('${q.word}')">${listenText}</button>`;
    html += `<div class="answers">`;
    translatedQ.options.forEach(opt => {
      html += `<button class="ans-btn" onclick="selectAnswer('${opt}')">${opt}</button>`;
    });
    html += `</div>`;
  }

  card.innerHTML = html;
  updateProgress();
}

function selectAnswer(value) {
  selectedAnswer = value;
  document.querySelectorAll(".ans-btn").forEach(btn => btn.classList.remove("selected"));
  event.target.classList.add("selected");
}

function verifyAnswer() {
  const q = shuffled[current];
  const currentLang = getCurrentLanguage();
  const translatedQ = getTranslatedText(q, currentLang);
  const feedback = document.getElementById("feedback");

  let correct = false;

  if (q.type === "fill") {
    const userInput = document.getElementById("fill-input").value.trim();
    correct = userInput.toLowerCase() === translatedQ.correct.toLowerCase();
  } else {
    // Pentru multiple choice și true/false, compară cu răspunsul tradus
    correct = selectedAnswer == translatedQ.correct;
  }

  if (correct) {
    score++;
    const correctText = currentLang === 'en' ? '✅ Correct!' : 
                       currentLang === 'ua' ? '✅ Правильно!' : 
                       '✅ Corect!';
    feedback.innerHTML = correctText;
    feedback.className = "test-feedback success";
  } else {
    const wrongText = currentLang === 'en' ? 'Wrong! Correct answer:' : 
                     currentLang === 'ua' ? 'Неправильно! Правильна відповідь:' : 
                     'Greșit! Răspuns corect:';
    feedback.innerHTML = `❌ ${wrongText} ${translatedQ.correct}`;
    feedback.className = "test-feedback error";
  }

  document.getElementById("verify-btn").style.display = "none";
  document.getElementById("next-btn").style.display = "block";
  updateProgress();
}

function nextQuestion() {
  current++;
  if (current < shuffled.length) {
    showQuestion();
  } else {
    // Test terminat - afișează rezultatul final
    const currentLang = getCurrentLanguage();
    const percentage = Math.round((score / shuffled.length) * 100);
    const card = document.getElementById("question-card");
    
    const testCompleteText = currentLang === 'en' ? '🎉 Test completed!' : 
                            currentLang === 'ua' ? '🎉 Тест завершено!' : 
                            '🎉 Test terminat!';
    const yourScoreText = currentLang === 'en' ? 'Your score:' : 
                         currentLang === 'ua' ? 'Ваш результат:' : 
                         'Scorul tău:';
    const percentageText = currentLang === 'en' ? 'Percentage:' : 
                          currentLang === 'ua' ? 'Відсоток:' : 
                          'Procentaj:';
    const congratsText = currentLang === 'en' ? 'Congratulations for completing the test!' : 
                        currentLang === 'ua' ? 'Вітаємо з завершенням тесту!' : 
                        'Felicitări pentru parcurgerea testului!';
    
    card.innerHTML = `
      <div class="test-completed">
        <h2>${testCompleteText}</h2>
        <div class="final-score">
          <p>${yourScoreText} <span class="score-big">${score}/${shuffled.length}</span></p>
          <p>${percentageText} <span class="percentage">${percentage}%</span></p>
        </div>
        <p class="congratulations">${congratsText}</p>
      </div>
    `;
    
    document.getElementById("feedback").textContent = "";
    document.querySelector(".test-controls-modern").style.display = "none";
    
    // Actualizează progress bar la 100%
    document.getElementById("progressFill").style.width = "100%";
  }
}

function speakWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "de-DE";
  speechSynthesis.speak(utterance);
}
