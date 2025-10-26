/********************************************
 * MAIN.JS – General logic for the whole site
 ********************************************/

// --- TEST SIMPLU PENTRU LECȚII (ex: test1.html) ---
function checkAnswer(answer) {
  const resultText = document.getElementById('result-text');
  if (answer === true) {
    resultText.textContent = 'Corect!';
    resultText.style.color = 'green';
  } else {
    resultText.textContent = 'Greșit!';
    resultText.style.color = 'red';
  }
}


// --- GENERAL TEST SECTION ---
let currentTest = [];
let currentQuestion = 0;
let correctAnswers = 0;
let timer;
let totalTime = 0;

// Pornirea testului general
function startGeneralTest(level) {
  const difficultyMap = {
    easy: { count: 10, time: 12 },
    medium: { count: 15, time: 15 },
    hard: { count: 25, time: 13 },
    hero: { count: 40, time: 15 },
    crazy: { count: 150, time: 40 }
  };

  const selected = difficultyMap[level];
  totalTime = selected.time * 60; // în secunde
  correctAnswers = 0;
  currentQuestion = 0;

  document.getElementById('difficulty-selection').style.display = 'none';
  document.getElementById('test-container').style.display = 'block';

  fetch('../data/general-tests.json')
    .then(res => res.json())
    .then(data => {
      // Selectăm numărul potrivit de întrebări
      currentTest = shuffleArray(data).slice(0, selected.count);
      showQuestion();
      startTimer();
    })
    .catch(err => console.error('Eroare la încărcarea testelor:', err));
}

// Afișează întrebarea curentă
function showQuestion() {
  const qArea = document.getElementById('question-area');
  const questionObj = currentTest[currentQuestion];

  qArea.innerHTML = `
    <p><b>Întrebarea ${currentQuestion + 1}:</b> ${questionObj.question}</p>
  `;

  if (questionObj.type === "truefalse") {
    qArea.innerHTML += `
      <button onclick="submitAnswer('Yes')">Da</button>
      <button onclick="submitAnswer('No')">Nu</button>
    `;
  } else if (questionObj.type === "fill") {
    qArea.innerHTML += `
      <input type="text" id="fill-answer" placeholder="Scrie răspunsul...">
      <button onclick="submitFill()">Trimite</button>
    `;
  } else if (questionObj.type === "multiple") {
    questionObj.options.forEach(opt => {
      qArea.innerHTML += `<button onclick="submitAnswer('${opt}')">${opt}</button>`;
    });
  }

  document.getElementById('next-question').style.display = 'none';
}

// Verificare răspunsuri
function submitAnswer(answer) {
  const q = currentTest[currentQuestion];
  const result = (answer === q.correctAnswer);
  if (result) correctAnswers++;

  const qArea = document.getElementById('question-area');
  qArea.innerHTML += `<p style="color:${result ? 'green' : 'red'};">
    ${result ? 'Corect!' : 'Greșit!'} Răspuns corect: ${q.correctAnswer}
  </p>`;

  document.getElementById('next-question').style.display = 'block';
}

function submitFill() {
  const answer = document.getElementById('fill-answer').value.trim();
  submitAnswer(answer);
}

// Următoarea întrebare
document.addEventListener('DOMContentLoaded', () => {
  const nextBtn = document.getElementById('next-question');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentQuestion++;
      if (currentQuestion < currentTest.length) {
        showQuestion();
      } else {
        finishTest();
      }
    });
  }
});

// Cronometru
function startTimer() {
  const timerDisplay = document.getElementById('time-left');
  let timeLeft = totalTime;

  function updateTimer() {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    timerDisplay.textContent = `${min}:${sec < 10 ? '0' + sec : sec}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      finishTest();
    }
    timeLeft--;
  }

  updateTimer();
  timer = setInterval(updateTimer, 1000);
}

// Terminarea testului
function finishTest() {
  clearInterval(timer);

  const total = currentTest.length;
  const percentage = Math.round((correctAnswers / total) * 100);
  const resultContainer = document.getElementById('result-container');
  const testContainer = document.getElementById('test-container');

  testContainer.style.display = 'none';
  resultContainer.style.display = 'block';

  const scoreText = document.getElementById('score-percentage');
  let color = 'red';
  if (percentage >= 80) color = 'green';
  else if (percentage >= 21) color = 'orange';

  scoreText.textContent = `Scorul tău: ${percentage}%`;
  scoreText.style.color = color;

  saveProgress(percentage, total);
}

// Salvează progresul în localStorage
function saveProgress(percentage, total) {
  const history = JSON.parse(localStorage.getItem('testHistory') || '[]');
  const newEntry = {
    date: new Date().toLocaleString(),
    score: percentage,
    total: total
  };
  history.push(newEntry);
  localStorage.setItem('testHistory', JSON.stringify(history));
}

// Navighează la pagina de progres
function saveAndGoProgress() {
  window.location.href = "../progress.html";
}

// Funcție de amestecare (randomizare)
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
