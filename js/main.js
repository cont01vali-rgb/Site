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

// ===== SISTEM UTILIZATORI ȘI BUG REPORTS =====

(function() {
  // Lista administratorilor
  const ADMINS = ['Vali', 'Gabi'];
  
  // Gestionare utilizatori
  function initUserSystem() {
    const userSelect = document.getElementById('userSelect');
    const currentUserSpan = document.getElementById('currentUser');
    const adminPanel = document.getElementById('adminPanel');
    
    if (!userSelect) return;
    
    // Încarcă utilizatorul salvat
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      userSelect.value = savedUser;
      updateCurrentUser(savedUser);
    }
    
    // Event listener pentru schimbarea utilizatorului
    userSelect.addEventListener('change', function() {
      const selectedUser = this.value;
      if (selectedUser) {
        localStorage.setItem('currentUser', selectedUser);
        updateCurrentUser(selectedUser);
      } else {
        localStorage.removeItem('currentUser');
        currentUserSpan.textContent = '';
        adminPanel.style.display = 'none';
      }
    });
    
    function updateCurrentUser(username) {
      currentUserSpan.textContent = `✅ Conectat ca: ${username}`;
      
      // Afișează panelul admin dacă e administrator
      if (ADMINS.includes(username)) {
        adminPanel.style.display = 'block';
      } else {
        adminPanel.style.display = 'none';
      }
    }
  }
  
  // Sistem raportare bug-uri
  function initBugReporting() {
    const submitBtn = document.getElementById('submitBug');
    const bugDescription = document.getElementById('bugDescription');
    const successMessage = document.getElementById('bugSuccess');
    
    if (!submitBtn) return;
    
    submitBtn.addEventListener('click', async function() {
      const description = bugDescription.value.trim();
      const currentUser = localStorage.getItem('currentUser');
      
      if (!description) {
        alert('Te rog să descrii problema.');
        return;
      }
      
      if (!currentUser) {
        alert('Te rog să selectezi un utilizator mai întâi.');
        return;
      }
      
      // Dezactivează butonul în timpul trimiterii
      submitBtn.disabled = true;
      submitBtn.textContent = 'Se trimite...';
      
      try {
        // Încearcă să trimită direct pe GitHub Issues
        const success = await submitToGitHubIssues(currentUser, description);
        
        if (success) {
          // Succes - GitHub Issues
          bugDescription.value = '';
          successMessage.innerHTML = '✅ Mulțumim! Raportul a fost trimis și va fi vizibil pentru administratori pe GitHub.';
          successMessage.style.display = 'block';
        } else {
          // Fallback - localStorage local
          await submitToLocalStorage(currentUser, description);
          bugDescription.value = '';
          successMessage.innerHTML = '✅ Raportul a fost salvat local. Va fi vizibil pentru administratorii care folosesc acest calculator.';
          successMessage.style.display = 'block';
        }
        
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 5000);
        
      } catch (error) {
        console.error('Eroare la trimiterea raportului:', error);
        alert('A apărut o eroare la trimiterea raportului. Te rog să încerci din nou.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Trimite raportul';
      }
    });
  }
  
  // Trimite pe GitHub Issues (funcție nouă)
  async function submitToGitHubIssues(user, description) {
    try {
      const issueTitle = `🐛 Bug raportat de ${user}`;
      const issueBody = `**Utilizator:** ${user}
**Data:** ${new Date().toLocaleString('ro-RO')}
**Browser:** ${navigator.userAgent}

**Descrierea problemei:**
${description}

---
*Acest raport a fost generat automat de sistemul de bug reports.*`;

      // Creează URL pentru GitHub Issues
      const repoOwner = 'cont01vali-rgb';
      const repoName = 'Site';
      const githubUrl = `https://github.com/${repoOwner}/${repoName}/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}&labels=bug,user-report`;
      
      // Deschide GitHub Issues într-o fereastră nouă
      window.open(githubUrl, '_blank');
      
      return true; // Considerăm că a avut succes
    } catch (error) {
      console.error('Eroare GitHub Issues:', error);
      return false;
    }
  }
  
  // Fallback - salvare în localStorage
  async function submitToLocalStorage(user, description) {
    const bugReport = {
      id: Date.now(),
      user: user,
      description: description,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleString('ro-RO'),
      browser: navigator.userAgent.substring(0, 100)
    };
    
    const bugReports = JSON.parse(localStorage.getItem('bugReports') || '[]');
    bugReports.push(bugReport);
    localStorage.setItem('bugReports', JSON.stringify(bugReports));
    
    console.log('🐛 Bug raportat local:', bugReport);
  }
  
  // Panel administrator
  function initAdminPanel() {
    const viewBugsBtn = document.getElementById('viewBugs');
    const clearBugsBtn = document.getElementById('clearBugs');
    const bugsList = document.getElementById('bugsList');
    
    if (!viewBugsBtn) return;
    
    viewBugsBtn.addEventListener('click', function() {
      const bugReports = JSON.parse(localStorage.getItem('bugReports') || '[]');
      
      let content = `
        <div style="margin-bottom: 15px; padding: 10px; background: #e0f2fe; border-radius: 6px;">
          <strong>📋 Vezi toate rapoartele:</strong>
          <br>
          <a href="https://github.com/cont01vali-rgb/Site/issues?q=is%3Aissue+label%3Abug+label%3Auser-report" 
             target="_blank" 
             style="color: #0066cc; text-decoration: underline;">
            🔗 Deschide GitHub Issues (rapoarte de pe toate calculatoarele)
          </a>
          <br><br>
          <strong>💻 Rapoarte locale (doar de pe acest calculator):</strong>
        </div>
      `;
      
      if (bugReports.length === 0) {
        content += '<p style="padding:15px;text-align:center;color:#6b7280;">Nu există rapoarte locale de bug-uri.</p>';
      } else {
        content += bugReports.map(bug => `
          <div class="bug-item">
            <div class="bug-header">
              <span class="bug-user">👤 ${bug.user}</span>
              <span class="bug-date">📅 ${bug.date}</span>
            </div>
            <div class="bug-description">
              "${bug.description}"
            </div>
            ${bug.browser ? `<div style="font-size: 0.8rem; color: #6b7280; margin-top: 4px;">🌐 ${bug.browser}</div>` : ''}
          </div>
        `).join('');
      }
      
      bugsList.innerHTML = content;
      bugsList.style.display = bugsList.style.display === 'block' ? 'none' : 'block';
    });
    
    clearBugsBtn.addEventListener('click', function() {
      if (confirm('Ești sigur că vrei să ștergi toate rapoartele locale de bug-uri?\n\nAcesta va șterge doar rapoartele de pe acest calculator, nu și cele de pe GitHub Issues.')) {
        localStorage.removeItem('bugReports');
        bugsList.innerHTML = `
          <div style="margin-bottom: 15px; padding: 10px; background: #e0f2fe; border-radius: 6px;">
            <strong>📋 Vezi toate rapoartele:</strong>
            <br>
            <a href="https://github.com/cont01vali-rgb/Site/issues?q=is%3Aissue+label%3Abug+label%3Auser-report" 
               target="_blank" 
               style="color: #0066cc; text-decoration: underline;">
              🔗 Deschide GitHub Issues (rapoarte de pe toate calculatoarele)
            </a>
          </div>
          <p style="padding:15px;text-align:center;color:#6b7280;">Toate rapoartele locale au fost șterse.</p>
        `;
        setTimeout(() => {
          bugsList.style.display = 'none';
        }, 3000);
      }
    });
  }
  
  // Inițializează sistemele când DOM-ul este gata
  document.addEventListener('DOMContentLoaded', function() {
    initUserSystem();
    initBugReporting();
    initAdminPanel();
  });
})();
